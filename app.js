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
    "One Piece","Naruto","Bleach","Dragon Ball","Death Note","Attack on Titan",
    "Demon Slayer","Jujutsu Kaisen","Chainsaw Man","My Hero Academia","Hunter × Hunter",
    "Fullmetal Alchemist","JoJo's Bizarre Adventure","Sailor Moon","Pokémon",
    "Neon Genesis Evangelion","Cowboy Bebop","Spy × Family","Mob Psycho 100","One-Punch Man"
  ],
  Games: [
    "Minecraft","Grand Theft Auto V","The Legend of Zelda: Breath of the Wild","Super Mario Odyssey",
    "Portal 2","Half-Life 2","Red Dead Redemption 2","The Last of Us","Resident Evil 4",
    "Elden Ring","Terraria","Stardew Valley","Undertale","Fortnite","Among Us","Doom",
    "The Elder Scrolls V: Skyrim","Hades","Celeste","Hollow Knight"
  ],
  Consoles: [
    "PlayStation 2","PlayStation 3","PlayStation 4","PlayStation 5","PlayStation Vita",
    "Xbox (console)","Xbox 360","Xbox One","Xbox Series X and Series S",
    "Nintendo Entertainment System","Super Nintendo Entertainment System","Nintendo 64",
    "Nintendo GameCube","Wii","Wii U","Nintendo Switch","Game Boy","Game Boy Advance",
    "Nintendo DS","Nintendo 3DS","PlayStation Portable"
  ],
  Characters: [
    "Mario","Luigi","Link","Pikachu","Sonic the Hedgehog","Pac-Man","Kirby","Samus Aran",
    "Mega Man","Lara Croft","Master Chief","Kratos","Cloud Strife","Darth Vader",
    "Spider-Man","Batman","Superman","Wonder Woman","Shrek","Doraemon"
  ],
  People: [
    "Keanu Reeves","Tom Hanks","Leonardo DiCaprio","Robert Downey Jr.","Dwayne Johnson",
    "Jackie Chan","Jim Carrey","Robin Williams","Morgan Freeman","Christopher Nolan",
    "Steven Spielberg","Hayao Miyazaki","Stan Lee","Hideo Kojima","Shigeru Miyamoto",
    "Walt Disney","Tim Burton","Pedro Pascal","Ryan Reynolds","Emma Stone"
  ],
  Places: [
    "Hogwarts","Gotham City","Metropolis","Middle-earth","Wakanda","Jurassic Park",
    "Silent Hill","Raccoon City","Hyrule","Mushroom Kingdom","Vice City","Los Santos",
    "New York City","Tokyo","London","Paris","Universal Studios","Disneyland","Mount Fuji","Death Star"
  ],
  Objects: [
    "Master Sword","Portal Gun","Poké Ball","Infinity Gauntlet","One Ring","Lightsaber",
    "Buster Sword","Keyblade","Super Scope","Nintendo Zapper","Power Glove","Game Boy Camera",
    "Pip-Boy","Companion Cube","Triforce","Chaos Emerald","Dragon Balls",
    "Mario Kart Wii Wheel","Plasma Pistol","Gravity Gun"
  ],
  Franchises: [
    "Super Mario","The Legend of Zelda","Pokémon","Final Fantasy","Resident Evil","Metal Gear",
    "Sonic the Hedgehog","Halo","Minecraft","Grand Theft Auto","The Elder Scrolls","Fallout",
    "Kingdom Hearts","Street Fighter","Mortal Kombat","Star Wars","Marvel","DC Comics",
    "Harry Potter","Jurassic Park"
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

const $ = s => document.querySelector(s);
const categoriesEl = $("#categories");
let score = 0, streak = 0, round = 0, current = null, used = new Set(), busy = false;

function renderCategories() {
  categoriesEl.innerHTML = "";

  const movieGroup = document.createElement("div");
  movieGroup.className = "category-group";

  const movieButton = document.createElement("button");
  movieButton.className = "category";
  movieButton.innerHTML = "<strong>Movies</strong><span>choose a genre</span>";
  movieButton.onclick = () => {
    const existing = movieGroup.querySelector(".subcategory-grid");
    if (existing) { existing.remove(); return; }

    const grid = document.createElement("div");
    grid.className = "subcategory-grid";
    Object.entries(movieSubcategories).forEach(([name, pool]) => {
      const b = document.createElement("button");
      b.className = "category subcategory";
      b.innerHTML = "<strong>" + name + "</strong><span>" + pool.length + " subjects</span>";
      b.onclick = e => {
        e.stopPropagation();
        startCategory("Movies — " + name, pool, "Movies");
      };
      grid.appendChild(b);
    });
    movieGroup.appendChild(grid);
  };

  movieGroup.appendChild(movieButton);
  categoriesEl.appendChild(movieGroup);

  Object.keys(categories).filter(name => name !== "Movies").forEach(name => {
    const b = document.createElement("button");
    b.className = "category";
    b.innerHTML = "<strong>" + name + "</strong><span>" + categories[name].length + " subjects</span>";
    b.onclick = () => startCategory(name, categories[name], name);
    categoriesEl.appendChild(b);
  });
}

function normalize(s) {
  return String(s).toLowerCase()
    .replace(/&/g, "and")
    .replace(/[×:.,'’!?()\-]/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const answerAliases = {
  "playstation vita": ["ps vita","psv","psvita","ps v ita"],
  "playstation 2": ["ps2","ps 2"], "playstation 3": ["ps3","ps 3"],
  "playstation 4": ["ps4","ps 4"], "playstation 5": ["ps5","ps 5"],
  "playstation portable": ["psp"], "xbox console": ["xbox","original xbox"],
  "xbox 360": ["x360","xbox360"], "xbox one": ["xbone"],
  "xbox series x and series s": ["xbox series x","xbox series s","xbox series xs"],
  "nintendo entertainment system": ["nes","famicom"], "super nintendo entertainment system": ["snes","super nintendo"],
  "nintendo 64": ["n64"], "nintendo gamecube": ["gamecube","gc"], "nintendo switch": ["switch"],
  "game boy": ["gameboy","gb"], "game boy advance": ["gba"], "nintendo ds": ["nds","ds"], "nintendo 3ds": ["3ds"],
  "grand theft auto v": ["gta v","gta 5","gtav"], "the legend of zelda breath of the wild": ["botw","breath of the wild"],
  "red dead redemption 2": ["rdr2","red dead 2"], "the elder scrolls v skyrim": ["skyrim"],
  "resident evil 4": ["re4"], "five nights at freddys": ["fnaf"], "the last of us": ["tlou"],
  "the lord of the rings": ["lotr"], "game of thrones": ["got"], "better call saul": ["bcs"],
  "attack on titan": ["aot","snk"], "my hero academia": ["mha","bnha"], "fullmetal alchemist": ["fma","fmab"],
  "jojo s bizarre adventure": ["jojo","jjba"], "spy family": ["spy x family"], "one punch man": ["opm"],
  "hunter hunter": ["hxh","hunter x hunter"], "jujutsu kaisen": ["jjk"], "demon slayer": ["kny"],
  "chainsaw man": ["csm"], "neon genesis evangelion": ["nge","evangelion"], "pokemon": ["pokémon"],
  "dwayne johnson": ["the rock"], "robert downey jr": ["rdj"], "new york city": ["new york","nyc"],
  "master sword": ["mastersword"], "keyblade": ["key blade"], "triforce": ["tri force"],
  "lightsaber": ["light saber","lightsabre"], "one ring": ["ring of power"]
};

function generatedAliases(title) {
  const n = normalize(title), out = new Set([n, n.replace(/^the /, "")]);
  const words = n.split(" ").filter(w => !["the","of","and","a","an","to","in","on","v"].includes(w));
  if (words.length >= 2) out.add(words.map(w => w[0]).join(""));
  out.add(n.replace(/\bv\b/g, "5"));
  return [...out].filter(Boolean);
}

function similarity(a, b) {
  a = normalize(a); b = normalize(b);
  if (a === b) return 1;
  if (!a || !b) return 0;
  if (a.includes(b) || b.includes(a)) return .88;
  const aa = new Set(a.split(" ")), bb = new Set(b.split(" "));
  let hit = 0; aa.forEach(x => { if (bb.has(x)) hit++; });
  return hit / Math.max(aa.size, bb.size);
}

function answerMatches(input, title) {
  const a = normalize(input), t = normalize(title);
  if (a === t || similarity(a,t) >= .78) return true;
  return [...new Set([...(answerAliases[t] || []), ...generatedAliases(title)])]
    .map(normalize).some(x => a === x || similarity(a,x) >= .78);
}

async function getWikipediaPage(title) {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&titles=" +
    encodeURIComponent(title) + "&prop=pageimages|info&inprop=url&pithumbsize=1200";
  const r = await fetch(url); if (!r.ok) throw new Error("Wikipedia request failed");
  const d = await r.json(), page = Object.values(d.query?.pages || {})[0];
  if (!page || page.missing || !page.thumbnail?.source) throw new Error("No Wikipedia image");
  return { image: page.original?.source || page.thumbnail.source, title: page.title || title, source: "Wikipedia", pageid: String(page.pageid) };
}

async function getAniListImage(title) {
  const query = `query ($search: String) { Media(search: $search, type: ANIME) { id title { romaji english native } coverImage { extraLarge large } } }`;
  const r = await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({query,variables:{search:title}})});
  if (!r.ok) throw new Error("AniList request failed");
  const m = (await r.json()).data?.Media;
  if (!m?.coverImage?.extraLarge) throw new Error("No AniList image");
  return {image:m.coverImage.extraLarge,title,source:"AniList",pageid:"anilist:"+m.id};
}

async function searchTMDB(title,type) {
  const key = localStorage.getItem("tmdb_api_key"); if (!key) throw new Error("TMDB key missing");
  const r=await fetch("https://api.themoviedb.org/3/search/"+(type==="movie"?"movie":"tv")+"?api_key="+encodeURIComponent(key)+"&query="+encodeURIComponent(title));
  if(!r.ok) throw new Error("TMDB request failed");
  const item=(await r.json()).results?.find(x=>x.poster_path);
  if(!item) throw new Error("No TMDB image");
  return {image:"https://image.tmdb.org/t/p/w1280"+item.poster_path,title,source:"TMDB",pageid:"tmdb:"+item.id};
}

async function getRAWGImage(title) {
  const key=localStorage.getItem("rawg_api_key"); if(!key) throw new Error("RAWG key missing");
  const r=await fetch("https://api.rawg.io/api/games?key="+encodeURIComponent(key)+"&search="+encodeURIComponent(title)+"&page_size=5");
  if(!r.ok) throw new Error("RAWG request failed");
  const g=(await r.json()).results?.find(x=>x.background_image);
  if(!g) throw new Error("No RAWG image");
  return {image:g.background_image,title,source:"RAWG",pageid:"rawg:"+g.id};
}

async function getSubjectImage(title) {
  const map = {
    Anime:[() => getAniListImage(title), () => getWikipediaPage(title)],
    Games:[() => getRAWGImage(title), () => getWikipediaPage(title)],
    Movies:[() => searchTMDB(title,"movie"), () => getWikipediaPage(title)],
    TV:[() => getTVMazeImage(title), () => getWikipediaPage(title)],
    Consoles:[() => getWikipediaPage(title)],
    Characters:[() => getWikipediaPage(title)],
    People:[() => getWikipediaPage(title)],
    Places:[() => getWikipediaPage(title)],
    Objects:[() => getWikipediaPage(title)],
    Franchises:[() => getWikipediaPage(title)]
  };
  for (const source of (map[current.sourceCategory] || [() => getWikipediaPage(title)])) {
    try { return await source(); } catch (_) {}
  }
  throw new Error("No image source worked");
}

async function chooseSubject() {
  const pool=current.pool, available=pool.filter(x=>!used.has(normalize(x)));
  if(!available.length) used.clear();
  for(const title of [...(available.length?available:pool)].sort(()=>Math.random()-.5).slice(0,10)){
    try { const subject=await getSubjectImage(title); used.add(normalize(title)); return subject; } catch (_) {}
  }
  throw new Error("Couldn't find a usable subject");
}

async function nextRound() {
  busy=true; round++; $("#roundLabel").textContent="round "+round;
  $("#answer").value=""; $("#feedback").textContent=""; $("#lastPoints").textContent="0";
  $("#questionImage").hidden=true; $("#imageWrap .loading").textContent="finding an image…";
  try {
    const subject=await chooseSubject(); current.subject=subject;
    $("#questionImage").src=subject.image; $("#questionImage").hidden=false;
    $("#imageWrap .loading").textContent="";
  } catch(e) { $("#imageWrap .loading").textContent="couldn't find an image — try again"; }
  busy=false; $("#answer").focus();
}

function startCategory(name,pool=categories[name],sourceCategory=name) {\n  clearTimeout(transitionTimer);
  current={name,pool,sourceCategory,subject:null}; round=0; used.clear();
  $("#categoryLabel").textContent=name.toUpperCase();
  $("#home").classList.remove("active"); $("#game").classList.add("active"); nextRound();
}

function finish(points,msg,good) {
  score+=points; $("#score").textContent=score; $("#lastPoints").textContent=points;
  $("#feedback").innerHTML=msg; $("#feedback").className="feedback "+(good?"good":"bad");
}

$("#answerForm").addEventListener("submit",e=>{
  e.preventDefault(); if(!current?.subject||busy)return;
  const guess=$("#answer").value.trim(); if(!guess)return;
  if(answerMatches(guess,current.subject.title)){
    streak++; const points=100+Math.min(streak-1,10)*10;
    finish(points,"correct — <strong>"+current.subject.title+"</strong>",true); $("#streak").textContent=streak; scheduleNext(900);
  } else { streak=0; $("#streak").textContent=0; finish(0,"not quite. try again, skip, or reveal.",false); }
});
$("#skip").onclick=()=>{if(!current?.subject||busy)return;streak=0;$("#streak").textContent=0;finish(0,"skipped — <strong>"+current.subject.title+"</strong>",false);scheduleNext(700);};
$("#reveal").onclick=()=>{if(!current?.subject||busy)return;streak=0;$("#streak").textContent=0;finish(0,"the answer was <strong>"+current.subject.title+"</strong>",false);scheduleNext(1000);};
$("#backHome").onclick=()=>{clearTimeout(transitionTimer);transitionTimer=null;busy=false;roundLocked=false;current=null;$("#game").classList.remove("active");$("#home").classList.add("active");};
$("#randomCategory").onclick=()=>{const keys=Object.keys(categories).filter(k=>k!=="Movies");startCategory(keys[Math.floor(Math.random()*keys.length)]);};
renderCategories();
