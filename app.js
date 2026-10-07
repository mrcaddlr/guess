const categories = {
  Movies: [
    "The Godfather","Pulp Fiction","The Dark Knight","Inception","The Matrix","Jurassic Park",
    "Titanic","Back to the Future","Home Alone","Jaws","Alien","The Shining","Interstellar",
    "Avatar","Forrest Gump","The Lord of the Rings","Harry Potter","Spider-Man","Shrek","Toy Story"
  ],
  TV: [
    "Breaking Bad","The Office","Stranger Things","Friends","The Simpsons","The Walking Dead",
    "Game of Thrones","The Sopranos","Better Call Saul","Wednesday","The Boys","Black Mirror",
    "The Mandalorian","Sherlock","Seinfeld","South Park","Lost","The Last of Us","Squid Game","House"
  ],
  Anime: [
    "One Piece","Naruto","Bleach","Dragon Ball","Death Note","Attack on Titan","Demon Slayer",
    "Jujutsu Kaisen","Chainsaw Man","My Hero Academia","Hunter × Hunter","Fullmetal Alchemist",
    "JoJo's Bizarre Adventure","Sailor Moon","Pokémon","Neon Genesis Evangelion","Cowboy Bebop",
    "Spy × Family","Mob Psycho 100","One-Punch Man"
  ],
  Games: [
    "Minecraft","Grand Theft Auto V","The Legend of Zelda: Breath of the Wild","Super Mario Odyssey",
    "Portal 2","Half-Life 2","Red Dead Redemption 2","The Last of Us","Resident Evil 4",
    "Elden Ring","Terraria","Stardew Valley","Undertale","Fortnite","Among Us","Doom",
    "The Elder Scrolls V: Skyrim","Hades","Celeste","Hollow Knight"
  ],
  Consoles: [
    "PlayStation 2","PlayStation 3","PlayStation 4","PlayStation 5","PlayStation Vita","Xbox (console)",
    "Xbox 360","Xbox One","Xbox Series X and Series S","Nintendo Entertainment System",
    "Super Nintendo Entertainment System","Nintendo 64","Nintendo GameCube","Wii","Wii U",
    "Nintendo Switch","Game Boy","Game Boy Advance","Nintendo DS","Nintendo 3DS","PlayStation Portable"
  ],
  Characters: [
    "Mario","Luigi","Link","Pikachu","Sonic the Hedgehog","Pac-Man","Kirby","Samus Aran","Mega Man",
    "Lara Croft","Master Chief","Kratos","Cloud Strife","Darth Vader","Spider-Man","Batman",
    "Superman","Wonder Woman","Shrek","Doraemon"
  ],
  People: [
    "Keanu Reeves","Tom Hanks","Leonardo DiCaprio","Robert Downey Jr.","Dwayne Johnson","Jackie Chan",
    "Jim Carrey","Robin Williams","Morgan Freeman","Christopher Nolan","Steven Spielberg",
    "Hayao Miyazaki","Stan Lee","Hideo Kojima","Shigeru Miyamoto","Walt Disney","Tim Burton",
    "Pedro Pascal","Ryan Reynolds","Emma Stone"
  ],
  Places: [
    "Hogwarts","Gotham City","Metropolis","Middle-earth","Wakanda","Jurassic Park","Silent Hill",
    "Raccoon City","Hyrule","Mushroom Kingdom","Vice City","Los Santos","New York City","Tokyo",
    "London","Paris","Universal Studios","Disneyland","Mount Fuji","Death Star"
  ],
  Objects: [
    "Master Sword","Portal Gun","Poké Ball","Infinity Gauntlet","One Ring","Lightsaber","Buster Sword",
    "Keyblade","Super Scope","Nintendo Zapper","Power Glove","Game Boy Camera","Pip-Boy",
    "Companion Cube","Triforce","Chaos Emerald","Dragon Balls","Mario Kart Wii Wheel","Plasma Pistol",
    "Gravity Gun"
  ],
  Franchises: [
    "Super Mario","The Legend of Zelda","Pokémon","Final Fantasy","Resident Evil","Metal Gear",
    "Sonic the Hedgehog","Halo","Minecraft","Grand Theft Auto","The Elder Scrolls","Fallout",
    "Kingdom Hearts","Street Fighter","Mortal Kombat","Star Wars","Marvel","DC Comics","Harry Potter",
    "Jurassic Park"
  ]
};

const movieSubcategories = {
  All: categories.Movies,
  "Sci-Fi": ["The Matrix","Interstellar","Blade Runner","Blade Runner 2049","The Terminator","Terminator 2: Judgment Day","Alien","Aliens","2001: A Space Odyssey","Star Wars","Star Trek","Dune","Dune: Part Two","The Martian","Arrival","Ex Machina","Avatar"],
  Horror: ["The Exorcist","Halloween","A Nightmare on Elm Street","Friday the 13th","Scream","The Texas Chain Saw Massacre","The Conjuring","It","The Ring","The Grudge","Saw","Insidious","Hereditary","The Babadook","The Blair Witch Project"],
  Fantasy: ["The Lord of the Rings","The Hobbit","Harry Potter","The Chronicles of Narnia","Dune","Maleficent","Pan's Labyrinth","The NeverEnding Story","How to Train Your Dragon"],
  Animation: ["Toy Story","Finding Nemo","The Incredibles","Ratatouille","Up","WALL-E","Frozen","Moana","The Lion King","Aladdin","Beauty and the Beast","How to Train Your Dragon","Kung Fu Panda","Despicable Me"],
  Action: ["The Dark Knight","Mad Max: Fury Road","John Wick","Die Hard","Gladiator","Terminator 2: Judgment Day","The Matrix","Kill Bill","Top Gun: Maverick"],
  Comedy: ["Home Alone","The Hangover","Superbad","Mean Girls","Dumb and Dumber","Groundhog Day","The Mask","Ace Ventura: Pet Detective","Airplane!"],
  Drama: ["The Godfather","Pulp Fiction","Forrest Gump","Titanic","Good Will Hunting","The Shawshank Redemption","Fight Club","Whiplash","Parasite"]
};

const tvSubcategories = {
  All: categories.TV,
  Drama: ["Breaking Bad","The Sopranos","Better Call Saul","Game of Thrones","House","Lost","The Last of Us","Succession","Mad Men","The Crown"],
  Comedy: ["The Office","Friends","Seinfeld","South Park","The Simpsons","Parks and Recreation","Brooklyn Nine-Nine","Community","Modern Family","The Good Place"],
  Crime: ["Breaking Bad","The Sopranos","Better Call Saul","Sherlock","Mindhunter","Narcos","True Detective","Dexter","Ozark","Peaky Blinders"],
  "Sci-Fi": ["Stranger Things","Black Mirror","The Mandalorian","Doctor Who","Westworld","The Expanse","Dark","Star Trek","Altered Carbon"],
  Horror: ["The Walking Dead","Wednesday","The Haunting of Hill House","The Fall of the House of Usher","American Horror Story","Midnight Mass","From","The Last of Us"],
  Animation: ["The Simpsons","South Park","Adventure Time","Regular Show","Rick and Morty","SpongeBob SquarePants","Family Guy","Futurama","Arcane"],
  Action: ["The Boys","The Mandalorian","Game of Thrones","Daredevil","Reacher","Jack Ryan","The Witcher","Cobra Kai"],
  Fantasy: ["Game of Thrones","The Mandalorian","The Witcher","House of the Dragon","Avatar: The Last Airbender","The Sandman","The Wheel of Time"],
  Mystery: ["Sherlock","Wednesday","Lost","Dark","Twin Peaks","True Detective","Only Murders in the Building"],
  Thriller: ["Black Mirror","Stranger Things","The Boys","Mindhunter","You","Squid Game","Mr. Robot","Dexter"]
};

const $ = selector => document.querySelector(selector);
const categoriesEl = $("#categories");
let score = 0, streak = 0, round = 0, current = null, used = new Set();
let busy = false, roundLocked = false, transitionTimer = null, gameToken = 0;

const answerAliases = {
  "playstation vita":["ps vita","psv","psvita","ps v ita"],
  "playstation 2":["ps2","ps 2"], "playstation 3":["ps3","ps 3"], "playstation 4":["ps4","ps 4"],
  "playstation 5":["ps5","ps 5"], "playstation portable":["psp"],
  "xbox console":["xbox","original xbox"], "xbox 360":["x360","xbox360"], "xbox one":["xbone"],
  "xbox series x and series s":["xbox series x","xbox series s","xbox series xs"],
  "nintendo entertainment system":["nes","famicom"], "super nintendo entertainment system":["snes","super nintendo"],
  "nintendo 64":["n64"], "nintendo gamecube":["gamecube","gc"], "nintendo switch":["switch"],
  "game boy":["gameboy","gb"], "game boy advance":["gba"], "nintendo ds":["nds","ds"], "nintendo 3ds":["3ds"],
  "grand theft auto v":["gta v","gta 5","gtav"], "the legend of zelda breath of the wild":["botw","breath of the wild"],
  "red dead redemption 2":["rdr2","red dead 2"], "the elder scrolls v skyrim":["skyrim"],
  "resident evil 4":["re4"], "five nights at freddys":["fnaf"], "the last of us":["tlou"],
  "the lord of the rings":["lotr"], "game of thrones":["got"], "better call saul":["bcs"],
  "attack on titan":["aot","snk"], "my hero academia":["mha","bnha"], "fullmetal alchemist":["fma","fmab"],
  "jojo s bizarre adventure":["jojo","jjba"], "spy family":["spy x family"], "one punch man":["opm"],
  "hunter hunter":["hxh","hunter x hunter"], "jujutsu kaisen":["jjk"], "demon slayer":["kny"],
  "chainsaw man":["csm"], "neon genesis evangelion":["nge","evangelion"], "pokemon":["pokémon"],
  "dwayne johnson":["the rock"], "robert downey jr":["rdj"], "new york city":["new york","nyc"],
  "master sword":["mastersword"], "keyblade":["key blade"], "triforce":["tri force"],
  "lightsaber":["light saber","lightsabre"], "one ring":["ring of power"]
};

function normalize(value) {
  return String(value).toLowerCase().replace(/&/g,"and").replace(/[×:.,'’!?()\-]/g," ")
    .replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
}

function generatedAliases(title) {
  const n = normalize(title);
  const out = new Set([n,n.replace(/^the /,"")]);
  const words = n.split(" ").filter(w => !["the","of","and","a","an","to","in","on","v"].includes(w));
  if (words.length >= 2) out.add(words.map(w => w[0]).join(""));
  out.add(n.replace(/\bv\b/g,"5"));
  return [...out];
}

function answerMatches(input,title) {
  const a = normalize(input);
  const t = normalize(title);
  if (!a) return false;
  if (a === t) return true;

  const aliases = new Set([...(answerAliases[t] || []),...generatedAliases(title)].map(normalize));
  if ([...aliases].some(alias => a === alias)) return true;

  // Allow small typos, but do not accept arbitrary short substrings like "bat" for "batman".
  if (a.length >= 5 && t.length >= 5) {
    const limit = Math.max(1,Math.floor(Math.max(a.length,t.length) / 5));
    if (levenshtein(a,t) <= limit) return true;
  }

  return false;
}
function addDropdown(name,subcategories) {
  const button = document.createElement("button");
  button.className = "category dropdown-toggle";
  button.type = "button";
  button.setAttribute("aria-expanded","false");
  button.innerHTML = "<strong>" + name + "</strong><span>choose a subcategory</span>";

  const grid = document.createElement("div");
  grid.className = "subcategory-grid";
  grid.hidden = true;

  Object.entries(subcategories).forEach(([sub,pool]) => {
    const subButton = document.createElement("button");
    subButton.className = "category subcategory";
    subButton.type = "button";
    subButton.innerHTML = "<strong>" + sub + "</strong><span>" + pool.length + " subjects</span>";
    subButton.onclick = event => {
      event.stopPropagation();
      startCategory(name + " — " + sub,pool,name);
    };
    grid.appendChild(subButton);
  });

  button.onclick = () => {
    const open = !button.hasAttribute("data-open");
    button.toggleAttribute("data-open",open);
    button.setAttribute("aria-expanded",String(open));
    grid.hidden = !open;
    grid.classList.toggle("open",open);
  };

  categoriesEl.appendChild(button);
  categoriesEl.appendChild(grid);
}

function renderCategories() {
  categoriesEl.innerHTML = "";
  addDropdown("Movies",movieSubcategories);
  addDropdown("TV",tvSubcategories);
  Object.keys(categories).filter(name => name !== "Movies" && name !== "TV").forEach(name => {
    const button = document.createElement("button");
    button.className = "category";
    button.type = "button";
    button.innerHTML = "<strong>" + name + "</strong><span>" + categories[name].length + " subjects</span>";
    button.onclick = () => startCategory(name,categories[name],name);
    categoriesEl.appendChild(button);
  });
}

async function getWikipediaPage(title) {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&titles=" +
    encodeURIComponent(title) + "&prop=pageimages|info&inprop=url&pithumbsize=1200";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Wikipedia request failed");
  const page = Object.values((await response.json()).query?.pages || {})[0];
  if (!page || page.missing || !page.thumbnail?.source) throw new Error("No Wikipedia image");
  return {
    image: page.original?.source || page.thumbnail.source,
    title,
    source: "Wikipedia",
    sourceUrl: page.fullurl || "https://en.wikipedia.org/wiki/" + encodeURIComponent(page.title || title)
  };
}

async function getAniListImage(title) {
  const query = 'query ($search: String) { Page(perPage: 10) { media(search: $search, type: ANIME) { id title { romaji english native } coverImage { extraLarge large } } } }';
  const response = await fetch("https://graphql.anilist.co",{
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({query,variables:{search:title}})
  });
  if (!response.ok) throw new Error("AniList request failed");
  const media = (await response.json()).data?.Page?.media || [];
  const wanted = normalize(title);
  const exact = media.find(item =>
    [item.title?.english,item.title?.romaji,item.title?.native]
      .filter(Boolean)
      .some(name => normalize(name) === wanted)
  );
  const selected = exact || media.find(item => item.coverImage?.extraLarge);
  if (!selected?.coverImage?.extraLarge) throw new Error("No AniList image");
  return {
    image:selected.coverImage.extraLarge,
    title,
    source:"AniList",
    sourceUrl:"https://anilist.co/anime/" + selected.id
  };
}

async function getTVMazeImage(title) {
  const response = await fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(title));
  if (!response.ok) throw new Error("TVMaze request failed");
  const shows = (await response.json()).map(x => x.show).filter(Boolean);
  const wanted = normalize(title);
  const exact = shows.filter(show => normalize(show.name) === wanted && show.image?.original);
  const candidates = exact.length ? exact : shows.filter(show => show.image?.original);
  if (!candidates.length) throw new Error("No TVMaze image");
  candidates.sort((a,b) => {
    const aUS = a.network?.country?.code === "US" || a.webChannel?.country?.code === "US";
    const bUS = b.network?.country?.code === "US" || b.webChannel?.country?.code === "US";
    return Number(bUS) - Number(aUS);
  });
  const show = candidates[0];
  return {image:show.image.original,title,source:"TVMaze",sourceUrl:"https://www.tvmaze.com/shows/" + show.id};
}

async function getTMDBImage(title) {
  const key = localStorage.getItem("tmdb_api_key");
  if (!key) throw new Error("TMDB key not configured");
  const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" +
    encodeURIComponent(key) + "&query=" + encodeURIComponent(title));
  if (!response.ok) throw new Error("TMDB request failed");
  const data = await response.json();
  const wanted = normalize(title);
  const item = (data.results || []).find(x => normalize(x.title) === wanted && (x.poster_path || x.backdrop_path)) ||
    (data.results || []).find(x => x.poster_path || x.backdrop_path);
  if (!item) throw new Error("No TMDB image");
  return {
    image:"https://image.tmdb.org/t/p/w1280" + (item.poster_path || item.backdrop_path),
    title,
    source:"TMDB",
    sourceUrl:"https://www.themoviedb.org/movie/" + item.id
  };
}

async function getRAWGImage(title) {
  const key = localStorage.getItem("rawg_api_key");
  if (!key) throw new Error("RAWG key not configured");
  const response = await fetch("https://api.rawg.io/api/games?key=" +
    encodeURIComponent(key) + "&search=" + encodeURIComponent(title) + "&page_size=5");
  if (!response.ok) throw new Error("RAWG request failed");
  const data = await response.json();
  const wanted = normalize(title);
  const item = (data.results || []).find(x => normalize(x.name) === wanted && x.background_image) ||
    (data.results || []).find(x => x.background_image);
  if (!item) throw new Error("No RAWG image");
  return {image:item.background_image,title,source:"RAWG",sourceUrl:"https://rawg.io/games/" + (item.slug || item.id)};
}

function loadImage(url) {
  return new Promise((resolve,reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = () => reject(new Error("Image failed to load"));
    image.src = url;
  });
}

async function getSubjectImage(title,sourceCategory) {
  const sourceMap = {
    Anime:[getAniListImage,getWikipediaPage],
    TV:[getTVMazeImage,getWikipediaPage],
    Movies:[getTMDBImage,getWikipediaPage],
    Games:[getRAWGImage,getWikipediaPage],
    Consoles:[getWikipediaPage],
    Characters:[getWikipediaPage],
    People:[getWikipediaPage],
    Places:[getWikipediaPage],
    Objects:[getWikipediaPage],
    Franchises:[getWikipediaPage]
  };

  for (const source of (sourceMap[sourceCategory] || [getWikipediaPage])) {
    try {
      const subject = await source(title);
      await loadImage(subject.image);
      return subject;
    } catch (_) {}
  }
  throw new Error("No image source worked");
}

async function chooseSubject(snapshot) {
  const pool = snapshot.pool || [];
  if (!pool.length) throw new Error("Empty category");

  let available = pool.filter(title => !used.has(normalize(title)));
  if (!available.length) {
    used.clear();
    available = [...pool];
  }

  for (const title of [...available].sort(() => Math.random() - .5)) {
    try {
      const subject = await getSubjectImage(title,snapshot.sourceCategory);
      used.add(normalize(title));
      return subject;
    } catch (_) {}
  }
  throw new Error("Couldn't find a usable subject");
}

async function nextRound() {
  if (!current) return;
  const token = gameToken;
  const snapshot = {
    pool:[...(current.pool || [])],
    sourceCategory:current.sourceCategory
  };

  busy = true;
  roundLocked = true;
  current.subject = null;
  round++;

  $("#roundLabel").textContent = "round " + round;
  $("#answer").value = "";
  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";
  $("#lastPoints").textContent = "0";
  $("#questionImage").hidden = true;
  $("#questionImage").removeAttribute("src");
  $("#sourceCredit").hidden = true;
  $("#imageWrap .loading").textContent = "finding an image…";

  try {
    const subject = await chooseSubject(snapshot);
    if (!current || token !== gameToken) return;

    current.subject = subject;
    $("#questionImage").src = subject.image;
    $("#questionImage").hidden = false;
    $("#imageWrap .loading").textContent = "";
    $("#sourceCredit").href = subject.sourceUrl || "#";
    $("#sourceCredit").textContent = "image source: " + subject.source;
    $("#sourceCredit").hidden = !subject.source;
  } catch (_) {
    if (token !== gameToken) return;
    $("#imageWrap .loading").textContent = "couldn't find an image — try another category";
  }

  if (token !== gameToken || !current) return;
  busy = false;
  roundLocked = !current.subject;
  if (current.subject) $("#answer").focus();
}

function startCategory(name,pool,sourceCategory) {
  clearTimeout(transitionTimer);
  gameToken++;
  busy=true;
  roundLocked=true;
  current = {name,pool:pool || [],sourceCategory:sourceCategory || name,subject:null};
  round = 0;
  used.clear();
  $("#categoryLabel").textContent = name.toUpperCase();
  $("#home").classList.remove("active");
  $("#game").classList.add("active");
  nextRound();
}

function scheduleNext(delay) {
  clearTimeout(transitionTimer);
  roundLocked = true;
  transitionTimer = setTimeout(() => {
    transitionTimer = null;
    nextRound();
  },delay);
}

function finish(points,message,good) {
  score += points;
  $("#score").textContent = score;
  $("#lastPoints").textContent = points;
  $("#feedback").innerHTML = message;
  $("#feedback").className = "feedback " + (good ? "good" : "bad");
}

$("#questionImage").addEventListener("error",() => {
  if (busy || !current?.subject || roundLocked) return;
  used.delete(normalize(current.subject.title));
  current.subject = null;
  nextRound();
});

$("#answerForm").addEventListener("submit",event => {
  event.preventDefault();
  if (!current?.subject || busy || roundLocked) return;
  const guess = $("#answer").value.trim();
  if (!guess) return;

  if (answerMatches(guess,current.subject.title)) {
    streak++;
    const points = 100 + Math.min(streak - 1,10) * 10;
    $("#streak").textContent = streak;
    finish(points,"correct — <strong>" + current.subject.title + "</strong>",true);
    scheduleNext(900);
  } else {
    streak = 0;
    $("#streak").textContent = "0";
    finish(0,"not quite. try again, skip, or reveal.",false);
  }
});

$("#skip").onclick = () => {
  if (!current?.subject || busy || roundLocked) return;
  streak = 0;
  $("#streak").textContent = "0";
  finish(0,"skipped — <strong>" + current.subject.title + "</strong>",false);
  scheduleNext(700);
};

$("#reveal").onclick = () => {
  if (!current?.subject || busy || roundLocked) return;
  streak = 0;
  $("#streak").textContent = "0";
  finish(0,"the answer was <strong>" + current.subject.title + "</strong>",false);
  scheduleNext(1000);
};

$("#homeBrand").onclick = event => { event.preventDefault(); $("#backHome").click(); };

$("#backHome").onclick = () => {
  clearTimeout(transitionTimer);
  gameToken++;
  transitionTimer = null;
  busy = false;
  roundLocked = false;
  current = null;
  $("#game").classList.remove("active");
  $("#home").classList.add("active");
};

$("#randomCategory").onclick = () => {
  const modes = [];
  Object.entries(movieSubcategories).forEach(([name,pool]) => modes.push({label:"Movies — " + name,pool,source:"Movies"}));
  Object.entries(tvSubcategories).forEach(([name,pool]) => modes.push({label:"TV — " + name,pool,source:"TV"}));
  Object.keys(categories).filter(name => name !== "Movies" && name !== "TV")
    .forEach(name => modes.push({label:name,pool:categories[name],source:name}));
  const mode = modes[Math.floor(Math.random() * modes.length)];
  startCategory(mode.label,mode.pool,mode.source);
};

renderCategories();
