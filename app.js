const categories = {
  Movies: [
    "The Godfather","Pulp Fiction","The Dark Knight","Inception","The Matrix",
    "Jurassic Park","Titanic","Back to the Future","Home Alone","Jaws",
    "Alien","The Shining","Interstellar","Avatar","Forrest Gump",
    "The Lord of the Rings","Harry Potter","Spider-Man","Shrek","Toy Story"
  ],
  TV: [
    "Breaking Bad","The Office","Stranger Things","Friends","The Simpsons",
    "The Walking Dead","Game of Thrones","The Sopranos","Better Call Saul","Wednesday",
    "The Boys","Black Mirror","The Mandalorian","Sherlock","Seinfeld",
    "South Park","Lost","The Last of Us","Squid Game","House"
  ],
  Anime: [
    "One Piece","Naruto","Bleach","Dragon Ball","Death Note",
    "Attack on Titan","Demon Slayer","Jujutsu Kaisen","Chainsaw Man","My Hero Academia",
    "Hunter × Hunter","Fullmetal Alchemist","JoJo's Bizarre Adventure","Sailor Moon","Pokémon",
    "Neon Genesis Evangelion","Cowboy Bebop","Spy × Family","Mob Psycho 100","One-Punch Man"
  ],
  Games: [
    "Minecraft","Grand Theft Auto V","The Legend of Zelda: Breath of the Wild","Super Mario Odyssey",
    "Portal 2","Half-Life 2","Red Dead Redemption 2","The Last of Us","Resident Evil 4",
    "Elden Ring","Terraria","Stardew Valley","Undertale","Fortnite","Among Us",
    "Doom","The Elder Scrolls V: Skyrim","Hades","Celeste","Hollow Knight"
  ],
  Consoles: [
    "PlayStation 2","PlayStation 3","PlayStation 4","PlayStation 5","PlayStation Vita","Xbox (console)",
    "Xbox 360","Xbox One","Xbox Series X and Series S","Nintendo Entertainment System",
    "Super Nintendo Entertainment System","Nintendo 64","Nintendo GameCube","Wii","Wii U",
    "Nintendo Switch","Game Boy","Game Boy Advance","Nintendo DS","Nintendo 3DS","PlayStation Portable"
  ],
  Characters: [
    "Mario","Luigi","Link","Pikachu","Sonic the Hedgehog",
    "Pac-Man","Kirby","Samus Aran","Mega Man","Lara Croft",
    "Master Chief","Kratos","Cloud Strife","Darth Vader","Spider-Man",
    "Batman","Superman","Wonder Woman","Shrek","Doraemon"
  ],
  People: [
    "Keanu Reeves","Tom Hanks","Leonardo DiCaprio","Robert Downey Jr.","Dwayne Johnson",
    "Jackie Chan","Jim Carrey","Robin Williams","Morgan Freeman","Christopher Nolan",
    "Steven Spielberg","Hayao Miyazaki","Stan Lee","Hideo Kojima","Shigeru Miyamoto",
    "Walt Disney","Tim Burton","Pedro Pascal","Ryan Reynolds","Emma Stone"
  ],
  Places: [
    "Hogwarts","Gotham City","Metropolis","Middle-earth","Wakanda",
    "Jurassic Park","Silent Hill","Raccoon City","Hyrule","Mushroom Kingdom",
    "Vice City","Los Santos","New York City","Tokyo","London",
    "Paris","Universal Studios","Disneyland","Mount Fuji","Death Star"
  ],
  Objects: [
    "Master Sword","Portal Gun","Poké Ball","Infinity Gauntlet","One Ring",
    "Lightsaber","Buster Sword","Keyblade","Super Scope","Nintendo Zapper",
    "Power Glove","Game Boy Camera","Pip-Boy","Companion Cube","Triforce",
    "Chaos Emerald","Dragon Balls","Mario Kart Wii Wheel","Plasma Pistol","Gravity Gun"
  ],
  Franchises: [
    "Super Mario","The Legend of Zelda","Pokémon","Final Fantasy","Resident Evil",
    "Metal Gear","Sonic the Hedgehog","Halo","Minecraft","Grand Theft Auto",
    "The Elder Scrolls","Fallout","Kingdom Hearts","Street Fighter","Mortal Kombat",
    "Star Wars","Marvel","DC Comics","Harry Potter","Jurassic Park"
  ],
  "the godfather": ["godfather"],
  "pulp fiction": ["pulpfiction"],
  "the dark knight": ["dark knight", "tdk"],
  "the matrix": ["matrix"],
  "jurassic park": ["jp"],
  "back to the future": ["bttf"],
  "the lord of the rings": ["lotr", "lord rings"],
  "harry potter": ["hp"],
  "spider man": ["spiderman", "spidey"],
  "toy story": ["toystory"],
  "breaking bad": ["bb"],
  "the office": ["office"],
  "stranger things": ["st"],
  "game of thrones": ["got"],
  "the sopranos": ["sopranos"],
  "better call saul": ["bcs"],
  "the boys": ["boys"],
  "the mandalorian": ["mandalorian", "mando"],
  "the last of us": ["tlou"],
  "one piece": ["op"],
  "hunter hunter": ["hunter x hunter", "hxh"],
  "fullmetal alchemist": ["fma", "fmab", "full metal alchemist"],
  "jojo s bizarre adventure": ["jojo", "jojos", "jjba"],
  "spy family": ["spy x family"],
  "neon genesis evangelion": ["nge", "evangelion"],
  "my hero academia": ["mha", "bnha", "boku no hero"],
  "one punch man": ["opm"],
  "attack on titan": ["aot", "snk"],
  "demon slayer": ["kimetsu no yaiba", "kny"],
  "jujutsu kaisen": ["jjk"],
  "chainsaw man": ["csm"],
  "dragon ball": ["db", "dbz", "dragon ball z"],
  "pokemon": ["pokémon", "poke mon"],
  "grand theft auto v": ["gta v", "gta 5", "gtav"],
  "the legend of zelda breath of the wild": ["botw", "zelda botw", "breath of the wild"],
  "super mario odyssey": ["mario odyssey"],
  "red dead redemption 2": ["rdr2", "red dead 2"],
  "resident evil 4": ["re4"],
  "the elder scrolls v skyrim": ["skyrim", "tes v skyrim", "elder scrolls skyrim"],
  "five nights at freddys": ["fnaf"],
  "playstation 2": ["ps2", "ps 2", "ps2 console"],
  "playstation 3": ["ps3", "ps 3", "ps3 console"],
  "playstation 4": ["ps4", "ps 4", "ps4 console"],
  "playstation 5": ["ps5", "ps 5", "ps5 console"],
  "playstation vita": ["ps vita", "psv", "psvita", "ps v ita", "ps vita console"],
  "playstation portable": ["psp", "ps portable"],
  "xbox console": ["xbox", "original xbox", "xbox 1"],
  "xbox 360": ["x360", "xbox360"],
  "xbox one": ["xbone", "xbox1", "xbox one console"],
  "xbox series x and series s": ["xbox series x", "xbox series s", "xbox series xs", "xbox series x s"],
  "nintendo entertainment system": ["nes", "nintendo", "famicom"],
  "super nintendo entertainment system": ["snes", "super nintendo"],
  "nintendo 64": ["n64"],
  "nintendo gamecube": ["gamecube", "gc"],
  "nintendo switch": ["switch"],
  "game boy": ["gameboy", "gb"],
  "game boy advance": ["gba"],
  "nintendo ds": ["nds", "ds"],
  "nintendo 3ds": ["3ds"],
  "mario": ["super mario", "mario bros"],
  "luigi": ["luigi mario"],
  "link": ["zelda link"],
  "sonic the hedgehog": ["sonic"],
  "pac man": ["pacman"],
  "samus aran": ["samus"],
  "master chief": ["masterchief", "john 117", "john halo"],
  "cloud strife": ["cloud", "cloud ff7", "cloud final fantasy"],
  "darth vader": ["vader"],
  "batman": ["bruce wayne"],
  "superman": ["clark kent"],
  "wonder woman": ["diana prince"],
  "dwayne johnson": ["the rock", "rock"],
  "robert downey jr": ["rdj"],
  "christopher nolan": ["nolan"],
  "steven spielberg": ["spielberg"],
  "hayao miyazaki": ["miyazaki"],
  "hideo kojima": ["kojima"],
  "shigeru miyamoto": ["miyamoto"],
  "new york city": ["new york", "nyc"],
  "tokyo": ["tokyo japan"],
  "los santos": ["gta los santos"],
  "mount fuji": ["fuji", "fuji san"],
  "master sword": ["mastersword"],
  "portal gun": ["portal device"],
  "poke ball": ["pokeball", "poké ball", "pokeball"],
  "infinity gauntlet": ["infinity glove"],
  "one ring": ["ring of power", "one ring to rule them all"],
  "lightsaber": ["light saber", "lightsabre"],
  "buster sword": ["bustersword"],
  "keyblade": ["key blade"],
  "triforce": ["tri force"],
  "chaos emerald": ["chaos emeralds"],
  "dragon balls": ["dragonball", "dragon balls"],
  "super mario": ["mario"],
  "the legend of zelda": ["zelda"],
  "final fantasy": ["ff"],
  "resident evil": ["re"],
  "metal gear": ["mg", "metal gear solid"],
  "sonic the hedgehog": ["sonic"],
  "halo": ["halo games"],
  "grand theft auto": ["gta"],
  "the elder scrolls": ["tes", "elder scrolls"],
  "fallout": ["fallout games"],
  "kingdom hearts": ["kh"],
  "street fighter": ["sf"],
  "mortal kombat": ["mk"],
  "star wars": ["sw"],
  "dc comics": ["dc"],
  "the chronicles of narnia": ["narnia"],
  "house of the dragon": ["hotd"],
  "the witcher": ["witcher"],
  "dungeons and dragons": ["dnd", "d&d"],
  "how to train your dragon": ["httyd"],
  "pan s labyrinth": ["pans labyrinth"]
};

function generatedAliases(title) {
  const n = normalize(title);
  const out = new Set([n]);

  // Common human shorthand: remove leading "the", punctuation, and console/platform suffixes.
  out.add(n.replace(/^the /, ""));
  out.add(n.replace(/\b(the|a|an)\b/g, "").replace(/\s+/g, " ").trim());

  // Initialism, e.g. Grand Theft Auto -> GTA, Attack on Titan -> AOT.
  const words = n.split(" ").filter(w => !["the","of","and","a","an","to","in","on","v"].includes(w));
  if (words.length >= 2) out.add(words.map(w => w[0]).join(""));

  // Common number substitutions.
  out.add(n.replace(/\bv\b/g, "5"));
  out.add(n.replace(/\biv\b/g, "4"));
  out.add(n.replace(/\bii\b/g, "2"));
  out.add(n.replace(/\biii\b/g, "3"));

  return [...out].filter(Boolean);
}

function answerMatches(input, title) {
  const a = normalize(input);
  const t = normalize(title);
  if (!a) return false;
  if (a === t || similarity(a, t) >= .78) return true;

  const aliases = new Set([
    ...generatedAliases(title),
    ...(answerAliases[t] || [])
  ].map(normalize));

  return [...aliases].some(alias => a === alias || similarity(a, alias) >= .78);
}

function similarity(a, b) {
  a = normalize(a); b = normalize(b);
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return .88;
  const aa = new Set(a.split(" ")), bb = new Set(b.split(" "));
  let hit = 0;
  aa.forEach(x => { if (bb.has(x)) hit++; });
  return hit / Math.max(aa.size, bb.size);
}

async function getWikipediaPage(title) {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*"
    + "&redirects=1&titles=" + encodeURIComponent(title)
    + "&prop=pageimages|info&inprop=url&pithumbsize=1200";
  const r = await fetch(url);
  if (!r.ok) throw new Error("Wikipedia request failed");
  const d = await r.json();
  const page = Object.values(d.query?.pages || {})[0];
  if (!page || page.missing || !page.thumbnail?.source) throw new Error("No Wikipedia image");
  return { image: page.original?.source || page.thumbnail.source, title: page.title || title, source: "Wikipedia", pageid: String(page.pageid) };
}

async function searchCommons(title) {
  const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*"
    + "&generator=search&gsrnamespace=6&gsrsearch=" + encodeURIComponent(title + " anime")
    + "&gsrlimit=20&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200";
  const r = await fetch(url);
  if (!r.ok) throw new Error("Commons request failed");
  const d = await r.json();
  const pages = Object.values(d.query?.pages || {});
  const wanted = normalize(title);
  const good = pages.filter(p => {
    const info = p.imageinfo?.[0];
    const text = normalize((p.title || "") + " " + (p.categories || []).join(" "));
    return info?.thumburl &&
      /^image\/(jpeg|png|webp)$/i.test(info.mime || "") &&
      !/logo|icon|flag|stamp|map|poster|collage|sprite|symbol|museum/i.test(text) &&
      (text.includes(wanted) || text.includes("anime"));
  });
  if (!good.length) throw new Error("No matching Commons image");
  const p = good[Math.floor(Math.random() * good.length)];
  return { image: p.imageinfo[0].thumburl, title, source: "Wikimedia Commons", pageid: String(p.pageid) };
}

async function searchOpenverse(title) {
  const url = "https://api.openverse.org/v1/images/?q=" + encodeURIComponent(title + " anime")
    + "&page_size=30&mature=false";
  const r = await fetch(url);
  if (!r.ok) throw new Error("Openverse request failed");
  const d = await r.json();
  const wanted = normalize(title);
  const results = (d.results || []).filter(x => {
    const text = normalize((x.title || "") + " " + (x.tags || []).join(" "));
    return (x.thumbnail || x.url) &&
      !x.mature &&
      !/logo|icon|flag|stamp|map|poster|collage|sprite|symbol|museum/i.test(text) &&
      (text.includes(wanted) || text.includes("anime"));
  });
  if (!results.length) throw new Error("No matching Openverse image");
  const x = results[Math.floor(Math.random() * Math.min(results.length, 15))];
  return { image: x.thumbnail || x.url, title, source: "Openverse", pageid: "openverse:" + x.id };
}

async function getAniListImage(title) {
  const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        id
        title { romaji english native }
        coverImage { extraLarge large }
      }
    }
  `;
  const r = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body: JSON.stringify({ query, variables: { search: title } })
  });
  if (!r.ok) throw new Error("AniList request failed");
  const d = await r.json();
  const m = d.data?.Media;
  if (!m?.coverImage?.extraLarge) throw new Error("No AniList image");
  return {
    image: m.coverImage.extraLarge,
    title,
    source: "AniList",
    pageid: "anilist:" + m.id
  };
}

async function searchTMDB(title, type) {
  const key = localStorage.getItem("tmdb_api_key");
  if (!key) throw new Error("TMDB API key not configured");
  const endpoint = type === "movie" ? "movie" : "tv";
  const r = await fetch("https://api.themoviedb.org/3/search/" + endpoint + "?api_key=" + encodeURIComponent(key) + "&query=" + encodeURIComponent(title));
  if (!r.ok) throw new Error("TMDB request failed");
  const d = await r.json();
  const item = d.results?.[0];
  if (!item?.poster_path) throw new Error("No TMDB image");
  return { image: "https://image.tmdb.org/t/p/w1280" + item.poster_path, title, source: "TMDB", pageid: "tmdb:" + item.id };
}

async function getRAWGImage(title) {
  const key = localStorage.getItem("rawg_api_key");
  if (!key) throw new Error("RAWG API key not configured");
  const r = await fetch("https://api.rawg.io/api/games?key=" + encodeURIComponent(key) + "&search=" + encodeURIComponent(title) + "&page_size=5");
  if (!r.ok) throw new Error("RAWG request failed");
  const d = await r.json();
  const game = d.results?.find(x => x.background_image);
  if (!game) throw new Error("No RAWG image");
  return { image: game.background_image, title, source: "RAWG", pageid: "rawg:" + game.id };
}

async function getIGDBImage(title) {
  const clientId = localStorage.getItem("igdb_client_id");
  const token = localStorage.getItem("igdb_access_token");
  if (!clientId || !token) throw new Error("IGDB credentials not configured");
  const r = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: { "Client-ID": clientId, "Authorization": "Bearer " + token, "Content-Type": "text/plain" },
    body: 'search "' + title.replace(/"/g, '\"') + '"; fields name,cover.image_id,artworks.image_id,screenshots.image_id; limit 5;'
  });
  if (!r.ok) throw new Error("IGDB request failed");
  const d = await r.json();
  const game = d.find(x => x.cover?.image_id || x.artworks?.[0]?.image_id || x.screenshots?.[0]?.image_id);
  if (!game) throw new Error("No IGDB image");
  const id = game.cover?.image_id || game.artworks?.[0]?.image_id || game.screenshots?.[0]?.image_id;
  return { image: "https://images.igdb.com/igdb/image/upload/t_1080p/" + id + ".jpg", title, source: "IGDB", pageid: "igdb:" + game.id };
}

async function getSubjectImage(title) {
  // Every category has its own domain-first provider. Generic sources are only fallbacks.
  const sourceMap = {
    Anime: [() => getAniListImage(title)],
    Games: [() => getRAWGImage(title), () => getIGDBImage(title)],
    Movies: [() => searchTMDB(title, "movie")],
    TV: [() => searchTMDB(title, "tv")],
    Animation: [() => searchTMDB(title, "movie"), () => searchTMDB(title, "tv")],
    Horror: [() => searchTMDB(title, "movie"), () => searchTMDB(title, "tv")],
    "Sci-Fi": [() => searchTMDB(title, "movie"), () => searchTMDB(title, "tv")]
};

$("#reveal").onclick = () => {
  if (!current?.subject || busy) return;
  streak = 0;
  $("#streak").textContent = 0;
  finish(0, "the answer was <strong>" + current.subject.title + "</strong>", false);
  setTimeout(nextRound, 1000);
};

$("#backHome").onclick = () => {
  $("#game").classList.remove("active");
  $("#home").classList.add("active");
};

$("#randomCategory").onclick = () => {
  const keys = Object.keys(categories);
  startCategory(keys[Math.floor(Math.random() * keys.length)]);
};

renderCategories();function renderCategories() {
  categoriesEl.innerHTML = "";

  const movie = document.createElement("div");
  movie.className = "category-group";
  const movieButton = document.createElement("button");
  movieButton.className = "category";
  movieButton.innerHTML = "<strong>Movies</strong><span>choose a movie genre</span>";
  movieButton.onclick = () => {
    const existing = movie.querySelector(".subcategory-grid");
    if (existing) {
      existing.remove();
      return;
    }
    const grid = document.createElement("div");
    grid.className = "subcategory-grid";
    Object.entries(movieSubcategories).forEach(([name, pool]) => {
      const b = document.createElement("button");
      b.className = "category subcategory";
      b.innerHTML = "<strong>" + name + "</strong><span>" + pool.length + " subjects</span>";
      b.onclick = () => startCategory("Movies — " + name, pool, "Movies");
      grid.appendChild(b);
    });
    movie.appendChild(grid);
  };
  movie.appendChild(movieButton);
  categoriesEl.appendChild(movie);

  Object.keys(categories).filter(name => name !== "Movies").forEach(name => {
    const b = document.createElement("button");
    b.className = "category";
    b.innerHTML = "<strong>" + name + "</strong><span>" + categories[name].length + " subjects</span>";
    b.onclick = () => startCategory(name, categories[name], name);
    categoriesEl.appendChild(b);
  });
}
function startCategory(name, pool = categories[name], sourceCategory = name) {
  current = { name, pool, sourceCategory, subject: null };
  round = 0;
  used.clear();
  $("#categoryLabel").textContent = name.toUpperCase();
  $("#home").classList.remove("active");
  $("#game").classList.add("active");
  nextRound();
}

