
(() => {
  "use strict";

  const VISION_VERSION = "4";
  const CACHE_DB = "guess-vision";
  const CACHE_STORE = "decisions";
  const OCR_SCRIPT = "https://cdn.jsdelivr.net/npm/tesseract.js@7/dist/tesseract.esm.min.js";
  const TRANSFORMERS_SCRIPT = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1";

  const debugEnabled = new URLSearchParams(location.search).get("debug") === "1";
  let ocrWorkerPromise = null;
  let objectDetectorPromise = null;
  let semanticClassifierPromise = null;
  let lastReport = null;

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[×:.,'’!?()\-_/]/g, " ")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function compact(value) {
    return normalize(value).replace(/\s+/g, "");
  }

  function editDistance(a, b) {
    const prev = new Array(b.length + 1);
    const next = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) prev[j] = j;
    for (let i = 1; i <= a.length; i++) {
      next[0] = i;
      for (let j = 1; j <= b.length; j++) {
        next[j] = a[i - 1] === b[j - 1]
          ? prev[j - 1]
          : Math.min(prev[j - 1] + 1, prev[j] + 1, next[j - 1] + 1);
      }
      for (let j = 0; j <= b.length; j++) prev[j] = next[j];
    }
    return prev[b.length];
  }

  function consoleManufacturer(title) {
    const n = normalize(title);
    if (n.includes("playstation")) return "Sony";
    if (n.includes("xbox")) return "Microsoft";
    if (n.includes("nintendo") || n.startsWith("wii") || n.startsWith("game boy") || n.startsWith("nintendo ds") || n.startsWith("nintendo 3ds")) return "Nintendo";
    if (n.includes("sega") || n.includes("dreamcast") || n.includes("saturn") || n.includes("genesis")) return "Sega";
    if (n.includes("atari")) return "Atari";
    if (n.includes("neo geo")) return "SNK";
    return "";
  }

  function buildSubjectProfile(subject) {
    const title = String(subject?.title || subject?.name || "").trim();
    const manufacturer = consoleManufacturer(title);
    const terms = new Set([title]);
    const n = normalize(title);

    if (manufacturer) terms.add(manufacturer);

    const aliases = {
      "playstation": ["ps1", "psx", "playstation 1", "ps"],
      "playstation 2": ["ps2", "ps 2"],
      "playstation 3": ["ps3", "ps 3"],
      "playstation 4": ["ps4", "ps 4"],
      "playstation 5": ["ps5", "ps 5"],
      "playstation vita": ["ps vita", "psv", "psvita"],
      "playstation portable": ["psp"],
      "xbox": ["original xbox"],
      "xbox 360": ["x360", "xbox360"],
      "xbox one": ["xbone", "xbox1", "xbox 1"],
      "xbox series x": ["series x", "xbox series x"],
      "xbox series s": ["series s", "xbox series s"],
      "nintendo entertainment system": ["nes", "famicom"],
      "super nintendo entertainment system": ["snes", "super nintendo", "super famicom"],
      "nintendo 64": ["n64"],
      "nintendo gamecube": ["gamecube", "gc"],
      "wii": ["nintendo wii"],
      "wii u": ["wiiu"],
      "nintendo switch": ["switch"],
      "nintendo switch lite": ["switch lite"],
      "nintendo switch oled": ["switch oled", "oled model"],
      "game boy": ["gameboy", "gb"],
      "game boy color": ["gameboy color", "gbc"],
      "game boy advance": ["gba", "gameboy advance"],
      "nintendo ds": ["nds"],
      "nintendo 3ds": ["3ds"],
      "sega genesis": ["mega drive"],
      "sega saturn": ["saturn"],
      "dreamcast": ["sega dreamcast"],
      "neo geo": ["snk neo geo"]
    };

    for (const alias of aliases[n] || []) terms.add(alias);

    const exactTerms = [...terms].filter(Boolean);
    const semanticLabels = [
      "a photograph of a video game console",
      "a photograph of a game console",
      "a photograph of a controller",
      "a photograph of a television",
      "a photograph of a computer or electronic device"
    ];

    return {
      title,
      manufacturer,
      terms: exactTerms,
      normalizedTerms: exactTerms.map(normalize),
      compactTerms: exactTerms.map(compact),
      modelTerms: exactTerms.filter(term => /\d|series|vita|advance|cube|ds|3ds|wii|switch|xbox|playstation|genesis|saturn|dreamcast|neo geo/i.test(term)),
      semanticLabels
    };
  }

  function phraseMatchScore(text, profile) {
    const n = normalize(text);
    const c = compact(text);
    let best = 0;
    let matchedTerm = "";

    for (let i = 0; i < profile.normalizedTerms.length; i++) {
      const term = profile.normalizedTerms[i];
      const compactTerm = profile.compactTerms[i];
      if (!term) continue;

      if (n === term || c === compactTerm) {
        if (term === normalize(profile.title)) best = Math.max(best, 1);
        else if (profile.modelTerms.includes(profile.terms[i])) best = Math.max(best, 0.92);
        else if (profile.manufacturer && term === normalize(profile.manufacturer)) best = Math.max(best, 0.36);
        else best = Math.max(best, 0.62);
        matchedTerm = profile.terms[i];
        continue;
      }

      if (n.includes(term) && term.length >= 4) {
        const ratio = term.length / Math.max(term.length, n.length);
        const score = ratio > 0.72 ? 0.88 : ratio > 0.45 ? 0.68 : 0.45;
        if (score > best) {
          best = score;
          matchedTerm = profile.terms[i];
        }
        continue;
      }

      if (term.length >= 5 && n.length >= 5) {
        const distance = editDistance(n, term);
        const max = term.length >= 10 ? 2 : 1;
        if (distance <= max) {
          const score = profile.modelTerms.includes(profile.terms[i]) ? 0.78 : 0.60;
          if (score > best) {
            best = score;
            matchedTerm = profile.terms[i];
          }
        }
      }
    }

    return { score: best, matchedTerm };
  }

  function rectArea(r) {
    return Math.max(0, r.width) * Math.max(0, r.height);
  }

  function intersectionArea(a, b) {
    const x1 = Math.max(a.x, b.x);
    const y1 = Math.max(a.y, b.y);
    const x2 = Math.min(a.x + a.width, b.x + b.width);
    const y2 = Math.min(a.y + a.height, b.y + b.height);
    return Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  }

  function iou(a, b) {
    const inter = intersectionArea(a, b);
    const union = rectArea(a) + rectArea(b) - inter;
    return union > 0 ? inter / union : 0;
  }

  function expandRect(r, padX, padY, width, height) {
    const x = Math.max(0, Math.round(r.x - padX));
    const y = Math.max(0, Math.round(r.y - padY));
    const right = Math.min(width, Math.round(r.x + r.width + padX));
    const bottom = Math.min(height, Math.round(r.y + r.height + padY));
    return {
      x,
      y,
      width: Math.max(1, right - x),
      height: Math.max(1, bottom - y)
    };
  }

  function clampRect(r, width, height) {
    const x = Math.max(0, Math.min(width - 1, Math.round(r.x)));
    const y = Math.max(0, Math.min(height - 1, Math.round(r.y)));
    const right = Math.max(x + 1, Math.min(width, Math.round(r.x + r.width)));
    const bottom = Math.max(y + 1, Math.min(height, Math.round(r.y + r.height)));
    return { x, y, width: right - x, height: bottom - y };
  }

  function edgeDistanceScore(rect, width, height) {
    const cx = (rect.x + rect.width / 2) / width;
    const cy = (rect.y + rect.height / 2) / height;
    const edge = Math.min(cx, 1 - cx, cy, 1 - cy);
    return edge < 0.18 ? 1 : edge < 0.30 ? 0.75 : edge < 0.40 ? 0.35 : 0.05;
  }

  function sourceFileLooksBad(subject) {
    const source = String(subject?.image || "");
    const title = String(subject?.sourceUrl || "");
    const combined = source + " " + title;
    return /(logo|wordmark|icon|symbol|emblem|title.?card|banner|box.?art|packaging|manual|screenshot|wallpaper)/i.test(combined);
  }

  function createCanvasFromImage(image) {
    const maxW = 1280;
    const scale = Math.min(1, maxW / Math.max(1, image.naturalWidth));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return { canvas, ctx };
  }

  async function loadImageCanvas(url) {
    const image = await new Promise((resolve, reject) => {
      const element = new Image();
      element.crossOrigin = "anonymous";
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("image could not be read for analysis"));
      element.src = url;
    });
    return createCanvasFromImage(image);
  }

  async function getOCRWorker() {
    if (ocrWorkerPromise) return ocrWorkerPromise;
    ocrWorkerPromise = (async () => {
      const mod = await import(OCR_SCRIPT);
      const Tesseract = mod.default || mod;
      const worker = await Tesseract.createWorker("eng", 1);
      await worker.setParameters({
        tessedit_pageseg_mode: "11",
        preserve_interword_spaces: "1"
      });
      return worker;
    })().catch(error => {
      ocrWorkerPromise = null;
      throw error;
    });
    return ocrWorkerPromise;
  }

  async function runOCR(canvas) {
    const maxWidth = 720;
    if (canvas.width > maxWidth) {
      const scaled = document.createElement("canvas");
      scaled.width = maxWidth;
      scaled.height = Math.max(1, Math.round(canvas.height * maxWidth / canvas.width));
      scaled.getContext("2d").drawImage(canvas, 0, 0, scaled.width, scaled.height);
      canvas = scaled;
    }

    const worker = await getOCRWorker();
    const result = await worker.recognize(canvas, {}, { blocks: true });
    const blocks = result?.data?.blocks || [];
    const words = [];

    for (const block of blocks) {
      for (const paragraph of block.paragraphs || []) {
        for (const line of paragraph.lines || []) {
          for (const word of line.words || []) {
            const text = String(word.text || "").trim();
            if (!text) continue;
            words.push({
              text,
              confidence: Number(word.confidence || 0) / 100,
              box: {
                x: word.bbox.x0,
                y: word.bbox.y0,
                width: Math.max(1, word.bbox.x1 - word.bbox.x0),
                height: Math.max(1, word.bbox.y1 - word.bbox.y0)
              }
            });
          }
        }
      }
    }

    const grouped = [];
    for (const word of words) {
      const previous = grouped[grouped.length - 1];
      if (
        previous &&
        Math.abs(previous.box.y - word.box.y) <= Math.max(previous.box.height, word.box.height) * 0.7 &&
        word.box.x >= previous.box.x &&
        word.box.x <= previous.box.x + previous.box.width + previous.box.height * 4
      ) {
        const right = Math.max(previous.box.x + previous.box.width, word.box.x + word.box.width);
        previous.text += " " + word.text;
        previous.box.width = right - previous.box.x;
        previous.box.height = Math.max(previous.box.height, word.box.y + word.box.height - previous.box.y);
        previous.confidence = Math.min(previous.confidence, word.confidence);
      } else {
        grouped.push({ ...word });
      }
    }

    return { words, lines: grouped };
  }

  function makeTextCandidates(ocr, profile, canvas) {
    const candidates = [];

    for (const line of ocr.lines) {
      const relevance = phraseMatchScore(line.text, profile);
      if (relevance.score < 0.45) continue;

      const area = rectArea(line.box);
      const areaRatio = area / (canvas.width * canvas.height);
      if (areaRatio > 0.12) continue;

      candidates.push({
        type: "ocr",
        label: line.text,
        box: clampRect(line.box, canvas.width, canvas.height),
        ocrConfidence: line.confidence,
        answerRelevance: relevance.score,
        matchedTerm: relevance.matchedTerm
      });
    }

    return candidates;
  }

  function analyzeImageQuick(canvas) {
    const width = Math.min(360, canvas.width);
    const height = Math.max(1, Math.round(canvas.height * width / canvas.width));
    const sample = document.createElement("canvas");
    sample.width = width;
    sample.height = height;
    const sctx = sample.getContext("2d", { willReadFrequently: true });
    sctx.drawImage(canvas, 0, 0, width, height);

    const data = sctx.getImageData(0, 0, width, height).data;
    let luminanceVariance = 0;
    let sum = 0;
    const values = new Float32Array(width * height);

    for (let i = 0, p = 0; p < values.length; p++, i += 4) {
      const v = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      values[p] = v;
      sum += v;
    }

    const mean = sum / values.length;
    for (const v of values) luminanceVariance += (v - mean) * (v - mean);
    luminanceVariance /= values.length;

    return {
      width: canvas.width,
      height: canvas.height,
      ratio: canvas.width / Math.max(1, canvas.height),
      variance: luminanceVariance,
      megapixels: canvas.width * canvas.height / 1e6
    };
  }

  async function getTransformers() {
    return import(TRANSFORMERS_SCRIPT);
  }

  function webgpuAvailable() {
    return typeof navigator !== "undefined" && "gpu" in navigator;
  }

  async function getObjectDetector() {
    if (objectDetectorPromise) return objectDetectorPromise;
    objectDetectorPromise = (async () => {
      const { pipeline } = await getTransformers();
      const device = webgpuAvailable() ? "webgpu" : "wasm";
      return pipeline(
        "zero-shot-object-detection",
        "Xenova/owlv2-base-patch16",
        { device, dtype: device === "webgpu" ? "fp16" : "q8" }
      );
    })().catch(error => {
      objectDetectorPromise = null;
      throw error;
    });
    return objectDetectorPromise;
  }

  async function getSemanticClassifier() {
    if (semanticClassifierPromise) return semanticClassifierPromise;
    semanticClassifierPromise = (async () => {
      const { pipeline } = await getTransformers();
      const device = webgpuAvailable() ? "webgpu" : "wasm";
      return pipeline(
        "zero-shot-image-classification",
        "Xenova/clip-vit-base-patch32",
        { device, dtype: device === "webgpu" ? "fp16" : "q8" }
      );
    })().catch(error => {
      semanticClassifierPromise = null;
      throw error;
    });
    return semanticClassifierPromise;
  }

  async function detectAnswerObjects(canvas, profile) {
    try {
      const detector = await getObjectDetector();
      const imageData = canvas.toDataURL("image/jpeg", 0.88);
      const labels = [
        "a video game console",
        "a game console",
        "a controller",
        "a television",
        profile.title ? "a " + profile.title + " console" : "a game console"
      ];

      const output = await detector(imageData, labels, { threshold: 0.08, top_k: 8 });
      const objects = (output || []).map(item => ({
        label: String(item.label || ""),
        score: Number(item.score || 0),
        box: {
          x: Number(item.box?.xmin || 0),
          y: Number(item.box?.ymin || 0),
          width: Math.max(1, Number(item.box?.xmax || 0) - Number(item.box?.xmin || 0)),
          height: Math.max(1, Number(item.box?.ymax || 0) - Number(item.box?.ymin || 0))
        }
      }));

      objects.sort((a, b) => {
        const aTarget = normalize(a.label).includes(normalize(profile.title));
        const bTarget = normalize(b.label).includes(normalize(profile.title));
        return Number(bTarget) - Number(aTarget) || b.score - a.score;
      });

      return objects.slice(0, 6);
    } catch (_) {
      return [];
    }
  }

  async function rankSemanticCandidate(canvas, candidate, profile) {
    try {
      const classifier = await getSemanticClassifier();
      const crop = document.createElement("canvas");
      const padding = Math.round(Math.min(candidate.box.width, candidate.box.height) * 0.75);
      const box = expandRect(candidate.box, padding, padding, canvas.width, canvas.height);
      crop.width = Math.min(512, box.width);
      crop.height = Math.min(512, box.height);
      const ctx = crop.getContext("2d");
      ctx.drawImage(canvas, box.x, box.y, box.width, box.height, 0, 0, crop.width, crop.height);

      const labels = [
        "the logo or branding of " + profile.title,
        "the written name or model of " + profile.title,
        "a logo or brand",
        "a vent, grille, or speaker opening",
        "a button or control",
        "a reflection or highlight",
        "ordinary console surface"
      ];

      const output = await classifier(crop, labels);
      const best = (output || []).slice(0, 7);
      const branding = best.find(item => /logo|branding|written name|model/i.test(String(item.label)));
      const distractor = best.find(item => /vent|grille|button|reflection|ordinary console/i.test(String(item.label)));

      return {
        branding: Number(branding?.score || 0),
        distractor: Number(distractor?.score || 0),
        labels: best
      };
    } catch (_) {
      return { branding: 0, distractor: 0, labels: [] };
    }
  }

  function candidateScore(candidate, profile, objectBoxes, canvas) {
    const relevantObjectScores = objectBoxes
      .filter(object => /console|game console/i.test(object.label))
      .map(object => {
        const overlap = intersectionArea(candidate.box, object.box) / Math.max(1, rectArea(candidate.box));
        const targetBonus = normalize(object.label).includes(normalize(profile.title)) ? 0.20 : 0;
        return Math.max(0, Math.min(1, overlap)) * object.score + targetBonus;
      });

    const objectRelation = Math.max(0, Math.min(1, Math.max(0, ...relevantObjectScores)));
    const location = edgeDistanceScore(candidate.box, canvas.width, canvas.height);
    const size = rectArea(candidate.box) / (canvas.width * canvas.height);

    let score =
      candidate.answerRelevance * 0.42 +
      candidate.ocrConfidence * 0.18 +
      objectRelation * 0.28 +
      location * 0.07;

    if (profile.manufacturer && normalize(candidate.label) === normalize(profile.manufacturer)) {
      score -= 0.16;
    }

    if (size > 0.08) score -= 0.20;
    if (size > 0.16) score -= 0.30;

    return {
      ...candidate,
      objectRelation,
      locationPrior: location,
      areaRatio: size,
      score: Math.max(0, Math.min(1, score))
    };
  }

  function mergeNearbyCandidates(candidates) {
    const sorted = [...candidates].sort((a, b) => b.score - a.score);
    const result = [];

    for (const candidate of sorted) {
      const duplicate = result.find(existing =>
        iou(existing.box, candidate.box) > 0.45 ||
        intersectionArea(existing.box, candidate.box) / Math.max(1, rectArea(candidate.box)) > 0.65
      );

      if (!duplicate) result.push(candidate);
    }

    return result.slice(0, 4);
  }

  function chooseMaskCandidate(candidates, semanticResults, profile, canvas) {
    const scored = candidates.map(candidate => {
      const semantic = semanticResults.get(candidate);
      const semanticBonus = semantic
        ? Math.max(0, Math.min(0.35, semantic.branding * 0.40 - semantic.distractor * 0.22))
        : 0;

      let score = candidate.score + semanticBonus;
      const objectGate = candidate.objectRelation >= 0.28;
      const exactAnswer = candidate.answerRelevance >= 0.90;

      if (!objectGate && !exactAnswer) score -= 0.38;
      if (candidate.areaRatio > 0.045) score -= 0.20;

      return {
        ...candidate,
        semanticBranding: semantic?.branding || 0,
        semanticDistractor: semantic?.distractor || 0,
        finalScore: Math.max(0, Math.min(1, score))
      };
    }).sort((a, b) => b.finalScore - a.finalScore);

    const best = scored[0];
    if (!best) return null;

    const exactText = best.answerRelevance >= 0.90;
    const strongObjectContext = best.objectRelation >= 0.48;
    const strongSemantic = best.semanticBranding >= 0.35 && best.semanticBranding > best.semanticDistractor + 0.08;

    if (
      best.finalScore >= 0.72 &&
      ((exactText && (best.ocrConfidence >= 0.58 || strongObjectContext)) || strongSemantic)
    ) {
      return best;
    }

    return null;
  }

  function maskCanvas(canvas, box) {
    const ctx = canvas.getContext("2d");
    const safeBox = clampRect(box, canvas.width, canvas.height);
    const padX = Math.max(2, Math.round(safeBox.width * 0.06));
    const padY = Math.max(2, Math.round(safeBox.height * 0.10));
    const target = expandRect(safeBox, padX, padY, canvas.width, canvas.height);

    const areaRatio = rectArea(target) / (canvas.width * canvas.height);
    if (areaRatio > 0.055) return { ok: false, reason: "mask too large", box: target };

    const pixelW = Math.max(10, Math.round(target.width / 18));
    const pixelH = Math.max(8, Math.round(target.height / 18));
    const temp = document.createElement("canvas");
    temp.width = pixelW;
    temp.height = pixelH;
    const tctx = temp.getContext("2d");
    tctx.imageSmoothingEnabled = true;
    tctx.drawImage(
      canvas,
      target.x, target.y, target.width, target.height,
      0, 0, pixelW, pixelH
    );

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(temp, 0, 0, pixelW, pixelH, target.x, target.y, target.width, target.height);
    ctx.fillStyle = "rgba(0,0,0,.42)";
    ctx.fillRect(target.x, target.y, target.width, target.height);
    ctx.restore();

    return { ok: true, box: target, areaRatio };
  }

  function damageCheck(originalCanvas, maskedCanvas, mask) {
    if (!mask?.ok) return { ok: false, reason: mask?.reason || "mask failed" };

    const ratio = mask.areaRatio;
    if (ratio > 0.055) return { ok: false, reason: "mask area exceeds safety limit" };

    const scale = Math.min(1, 240 / originalCanvas.width);
    const width = Math.max(1, Math.round(originalCanvas.width * scale));
    const height = Math.max(1, Math.round(originalCanvas.height * scale));

    const a = document.createElement("canvas");
    const b = document.createElement("canvas");
    a.width = b.width = width;
    a.height = b.height = height;

    const actx = a.getContext("2d", { willReadFrequently: true });
    const bctx = b.getContext("2d", { willReadFrequently: true });

    actx.drawImage(originalCanvas, 0, 0, width, height);
    bctx.drawImage(maskedCanvas, 0, 0, width, height);

    const da = actx.getImageData(0, 0, width, height).data;
    const db = bctx.getImageData(0, 0, width, height).data;

    let changedPixels = 0;
    let absoluteDifference = 0;
    const threshold = 18;

    for (let i = 0; i < da.length; i += 4) {
      const delta =
        Math.abs(da[i] - db[i]) +
        Math.abs(da[i + 1] - db[i + 1]) +
        Math.abs(da[i + 2] - db[i + 2]);

      absoluteDifference += delta;
      if (delta >= threshold) changedPixels++;
    }

    const pixels = da.length / 4;
    const changedRatio = changedPixels / Math.max(1, pixels);
    const meanDifference = absoluteDifference / Math.max(1, pixels * 3 * 255);

    if (changedRatio > 0.075 || meanDifference > 0.035) {
      return {
        ok: false,
        reason: "destructive-change check failed",
        changedRatio,
        meanDifference
      };
    }

    return { ok: true, changedRatio, meanDifference };
  }

  function imageLeakDecision(ocr, profile, canvas, objectBoxes) {
    const imageArea = canvas.width * canvas.height;
    const exactLeaks = [];
    let answerTextArea = 0;
    let totalRelevantArea = 0;

    for (const line of ocr.lines) {
      const relevance = phraseMatchScore(line.text, profile);
      if (relevance.score < 0.45) continue;

      const area = rectArea(line.box);
      totalRelevantArea += area;
      answerTextArea += area;

      exactLeaks.push({
        text: line.text,
        score: relevance.score,
        box: line.box,
        matchedTerm: relevance.matchedTerm
      });
    }

    const textAreaRatio = answerTextArea / Math.max(1, imageArea);
    const targetObjectExists = objectBoxes.some(x => /console|game console/i.test(x.label));

    return {
      exactLeaks,
      textAreaRatio,
      targetObjectExists,
      imageLevelReject: textAreaRatio > 0.16 || exactLeaks.some(x => x.score >= 0.98 && rectArea(x.box) / imageArea > 0.10)
    };
  }

  async function analyzeConsole(subject, canvas) {
    const profile = buildSubjectProfile(subject);
    const report = {
      version: VISION_VERSION,
      subject: profile.title,
      manufacturer: profile.manufacturer,
      stages: {},
      candidates: [],
      decision: "untouched",
      reason: ""
    };

    const quick = analyzeImageQuick(canvas);
    report.stages.quick = quick;

    if (sourceFileLooksBad(subject)) {
      report.decision = "reject";
      report.reason = "source metadata looks like an intrinsically bad image";
      return { kind: "reject", report };
    }

    let ocr;
    try {
      ocr = await runOCR(canvas);
      report.stages.ocr = {
        lines: ocr.lines.map(x => ({ text: x.text, confidence: x.confidence, box: x.box })),
        count: ocr.lines.length
      };
    } catch (error) {
      ocr = { words: [], lines: [] };
      report.stages.ocr = { unavailable: true, error: String(error?.message || error) };
    }

    let objects = [];
    // Heavy object detection is an ambiguity resolver, not a prerequisite for
    // every console. Most rounds are decided safely from exact OCR evidence.
    const preliminaryCandidates = makeTextCandidates(ocr, profile, canvas);
    const needsObjectPass = preliminaryCandidates.some(candidate => {
      const relevance = candidate.answerRelevance;
      return relevance >= 0.45 && relevance < 0.90;
    });

    if (needsObjectPass) objects = await detectAnswerObjects(canvas, profile);
    report.stages.objects = objects;

    const leak = imageLeakDecision(ocr, profile, canvas, objects);
    report.stages.leak = leak;

    if (leak.imageLevelReject) {
      report.decision = "reject";
      report.reason = "image contains too much answer-bearing text";
      return { kind: "reject", report };
    }

    let candidates = preliminaryCandidates
      .map(candidate => candidateScore(candidate, profile, objects, canvas));

    candidates = mergeNearbyCandidates(candidates);
    report.candidates = candidates;

    const semanticResults = new Map();

    // Semantic analysis only runs when a real textual candidate exists but
    // cheap signals are not sufficient to trust it.
    if (candidates.length && candidates[0].score < 0.80) {
      for (const candidate of candidates.slice(0, 2)) {
        const semantic = await rankSemanticCandidate(canvas, candidate, profile);
        semanticResults.set(candidate, semantic);
      }
    }

    let best = chooseMaskCandidate(candidates, semanticResults, profile, canvas);

    // A second semantic pass over a few deterministic image tiles catches
    // graphical logos that OCR missed without scanning arbitrary edge windows.
    if (!best && !ocr.lines.length && debugEnabled) {
      const tiles = [];
      const cols = 3;
      const rows = 3;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          tiles.push({
            type: "semantic-tile",
            label: "tile " + row + "," + col,
            box: {
              x: Math.round(canvas.width * col / cols),
              y: Math.round(canvas.height * row / rows),
              width: Math.round(canvas.width / cols),
              height: Math.round(canvas.height / rows)
            },
            answerRelevance: 0,
            ocrConfidence: 0
          });
        }
      }

      for (const tile of tiles) {
        const semantic = await rankSemanticCandidate(canvas, tile, profile);
        semanticResults.set(tile, semantic);
      }

      const rankedTiles = tiles
        .map(tile => ({
          ...tile,
          semanticBranding: semanticResults.get(tile)?.branding || 0,
          semanticDistractor: semanticResults.get(tile)?.distractor || 0,
          finalScore: (semanticResults.get(tile)?.branding || 0) - (semanticResults.get(tile)?.distractor || 0)
        }))
        .sort((a, b) => b.finalScore - a.finalScore);

      const topTile = rankedTiles[0];
      if (topTile && topTile.finalScore >= 0.16) {
        best = {
          ...topTile,
          objectRelation: objects.length ? 0.15 : 0,
          answerRelevance: 0,
          ocrConfidence: 0,
          score: topTile.finalScore,
          finalScore: topTile.finalScore
        };
      }
    }

    if (!best) {
      report.decision = "untouched";
      report.reason = "no sufficiently trustworthy answer-bearing region";
      return { kind: "untouched", report };
    }

    // Never mask an arbitrary central tile. A semantic tile may only be masked
    // when it also overlaps a detected console or has exceptionally strong
    // target-specific branding evidence.
    if (
      best.type === "semantic-tile" &&
      best.objectRelation < 0.28 &&
      best.semanticBranding < 0.55
    ) {
      report.decision = "untouched";
      report.reason = "graphical candidate lacks enough object/branding evidence";
      return { kind: "untouched", report };
    }

    const original = document.createElement("canvas");
    original.width = canvas.width;
    original.height = canvas.height;
    original.getContext("2d").drawImage(canvas, 0, 0);

    const mask = maskCanvas(canvas, best.box);
    report.stages.mask = mask;

    const damage = damageCheck(original, canvas, mask);
    report.stages.damage = damage;

    if (!damage.ok) {
      report.decision = "reject";
      report.reason = damage.reason;
      return { kind: "reject", report };
    }

    report.decision = "masked";
    report.reason = "high-confidence answer-bearing region masked";
    return {
      kind: "masked",
      dataUrl: canvas.toDataURL("image/jpeg", 0.9),
      report
    };
  }

  function dbOpen() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(CACHE_DB, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(CACHE_STORE)) {
          db.createObjectStore(CACHE_STORE, { keyPath: "key" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function cacheGet(key) {
    try {
      const db = await dbOpen();
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(CACHE_STORE, "readonly");
        const req = tx.objectStore(CACHE_STORE).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (_) {
      return null;
    }
  }

  async function cachePut(value) {
    try {
      const db = await dbOpen();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(CACHE_STORE, "readwrite");
        tx.objectStore(CACHE_STORE).put(value);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });

      const all = await new Promise((resolve, reject) => {
        const tx = db.transaction(CACHE_STORE, "readonly");
        const req = tx.objectStore(CACHE_STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });

      if (all.length > 24) {
        all.sort((a, b) => Number(a.updated || 0) - Number(b.updated || 0));
        const tx = db.transaction(CACHE_STORE, "readwrite");
        for (const old of all.slice(0, all.length - 24)) {
          tx.objectStore(CACHE_STORE).delete(old.key);
        }
      }
    } catch (_) {}
  }

  async function prepareConsoleImage(subject) {
    if (subject?.category !== "Consoles") return subject?.image;

    let loaded;
    try {
      loaded = await loadImageCanvas(subject.image);
    } catch (error) {
      return subject.image;
    }

    const { canvas } = loaded;
    const profile = buildSubjectProfile(subject);
    const cacheKey = await cryptoKey(subject.image + "|" + profile.title + "|" + VISION_VERSION);

    const cached = await cacheGet(cacheKey);
    if (cached) {
      lastReport = cached.report;
      updateDebugPanel(lastReport);
      return cached.dataUrl || subject.image;
    }

    const result = await analyzeConsole(subject, canvas);
    lastReport = result.report;
    updateDebugPanel(lastReport);

    if (result.kind === "reject") {
      await cachePut({
        key: cacheKey,
        updated: Date.now(),
        report: result.report,
        dataUrl: ""
      });
      return subject.image;
    }

    const dataUrl = result.kind === "masked" ? result.dataUrl : subject.image;
    await cachePut({
      key: cacheKey,
      updated: Date.now(),
      report: result.report,
      dataUrl: result.kind === "masked" ? dataUrl : ""
    });
    return dataUrl;
  }

  async function cryptoKey(value) {
    try {
      if (crypto?.subtle) {
        const bytes = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest("SHA-256", bytes);
        return Array.from(new Uint8Array(digest)).map(x => x.toString(16).padStart(2, "0")).join("");
      }
    } catch (_) {}
    return encodeURIComponent(value).slice(0, 180);
  }

  function updateDebugPanel(report) {
    if (!debugEnabled) return;
    let panel = document.querySelector("#visionDebug");
    if (!panel) {
      panel = document.createElement("pre");
      panel.id = "visionDebug";
      panel.setAttribute("aria-label", "Vision debugging information");
      document.body.appendChild(panel);
    }
    panel.textContent = JSON.stringify(report, null, 2);
  }

  function getLastReport() {
    return lastReport;
  }

  const prewarmOCR = () => getOCRWorker().catch(() => {});
  if ("requestIdleCallback" in window) {
    requestIdleCallback(prewarmOCR, { timeout: 3500 });
  } else {
    setTimeout(prewarmOCR, 2500);
  }

  window.GuessVision = {
    version: VISION_VERSION,
    prepareConsoleImage,
    analyzeConsole,
    buildSubjectProfile,
    getLastReport,
    clearMemoryCaches() {
      ocrWorkerPromise = null;
      objectDetectorPromise = null;
      semanticClassifierPromise = null;
    }
  };
})();
