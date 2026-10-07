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
    "PlayStation 2","PlayStation 3","PlayStation 4","PlayStation 5","Xbox",
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
  Animation: [
    "Toy Story","Finding Nemo","The Incredibles","Ratatouille","Up",
    "WALL-E","Frozen","Moana","The Lion King","Aladdin",
    "Beauty and the Beast","How to Train Your Dragon","Kung Fu Panda","Despicable Me","The Simpsons",
    "Adventure Time","Regular Show","Rick and Morty","SpongeBob SquarePants","Avatar: The Last Airbender"
  ],
  Horror: [
    "The Exorcist","Halloween","A Nightmare on Elm Street","Friday the 13th","Scream",
    "The Texas Chain Saw Massacre","The Conjuring","It","The Ring","The Grudge",
    "Saw","Insidious","Hereditary","The Babadook","The Blair Witch Project",
    "Resident Evil","Silent Hill","Dead by Daylight","Five Nights at Freddy's","Amnesia: The Dark Descent"
  ],
  "Sci-Fi": [
    "Blade Runner","Blade Runner 2049","The Terminator","Terminator 2: Judgment Day","Alien",
    "Aliens","The Matrix","Interstellar","2001: A Space Odyssey","Star Wars",
    "Star Trek","Dune","Dune: Part Two","The Martian","Arrival",
    "Ex Machina","Portal","Half-Life","Mass Effect","Cyberpunk 2077"
  ],
  Fantasy: [
    "The Lord of the Rings","The Hobbit","Harry Potter","The Chronicles of Narnia",
    "Game of Thrones","House of the Dragon","The Witcher","Skyrim","Elden Ring",
    "Dark Souls","Final Fantasy","Kingdom Hearts","The Legend of Zelda",
    "World of Warcraft","Dungeons & Dragons","Percy Jackson","How to Train Your Dragon",
    "Maleficent","Pan's Labyrinth","The NeverEnding Story"
  ]
};

const $ = s => document.querySelector(s);
const categoriesEl = $("#categories");
let score = 0, streak = 0, round = 0, current = null, used = new Set(), busy = false;

function renderCategories() {
  categoriesEl.innerHTML = "";
  Object.keys(categories).forEach(name => {
    const b = document.createElement("button");
    b.className = "category";
    b.innerHTML = "<strong>" + name + "</strong><span>" + categories[name].length + " subjects</span>";
    b.onclick = () => startCategory(name);
    categoriesEl.appendChild(b);
  });
}

function normalize(s) {
  return s.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[×:.,'’!?()\-]/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
    + "&generator=search&gsrnamespace=6&gsrsearch=" + encodeURIComponent('"' + title + '"')
    + "&gsrlimit=12&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1200";
  const r = await fetch(url);
  if (!r.ok) throw new Error("Commons request failed");
  const d = await r.json();
  const pages = Object.values(d.query?.pages || {});
  const good = pages.filter(p =>
    p.imageinfo?.[0]?.thumburl &&
    /^image\/(jpeg|png|webp)$/i.test(p.imageinfo[0].mime || "") &&
    !/logo|icon|flag|stamp|map|poster|collage|sprite|symbol/i.test(p.title || "")
  );
  if (!good.length) throw new Error("No Commons image");
  const p = good[Math.floor(Math.random() * good.length)];
  return { image: p.imageinfo[0].thumburl, title, source: "Wikimedia Commons", pageid: String(p.pageid) };
}

async function searchOpenverse(title) {
  const url = "https://api.openverse.org/v1/images/?q=" + encodeURIComponent('"' + title + '"')
    + "&page_size=20&mature=false";
  const r = await fetch(url);
  if (!r.ok) throw new Error("Openverse request failed");
  const d = await r.json();
  const results = (d.results || []).filter(x =>
    (x.thumbnail || x.url) &&
    !x.mature &&
    !/logo|icon|flag|stamp|map|poster|collage|sprite|symbol/i.test((x.title || "") + " " + (x.tags || []).join(" "))
  );
  if (!results.length) throw new Error("No Openverse image");
  const x = results[Math.floor(Math.random() * Math.min(results.length, 10))];
  return { image: x.thumbnail || x.url, title, source: "Openverse", pageid: "openverse:" + x.id };
}

async function getSubjectImage(title) {
  const sources = [() => searchCommons(title), () => searchOpenverse(title), () => getWikipediaPage(title)]
    .sort(() => Math.random() - 0.5);
  for (const source of sources) {
    try { return await source(); } catch (_) {}
  }
  throw new Error("No image source worked");
}

async function chooseSubject() {
  const pool = categories[current.name];
  const available = pool.filter(title => !used.has(normalize(title)));
  if (!available.length) used.clear();
  const shuffled = [...(available.length ? available : pool)].sort(() => Math.random() - 0.5);
  for (const title of shuffled.slice(0, 10)) {
    const key = normalize(title);
    if (used.has(key)) continue;
    try {
      const subject = await getSubjectImage(title);
      used.add(key);
      return subject;
    } catch (_) {}
  }
  throw new Error("Couldn't find a usable subject");
}

async function nextRound() {
  if (busy) return;
  busy = true;
  round++;
  $("#roundLabel").textContent = "round " + round;
  $("#lastPoints").textContent = "0";
  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";
  $("#answer").value = "";
  $("#questionHint").textContent = "type your answer";
  $("#questionImage").hidden = true;
  $(".loading").textContent = "finding an image…";
  $(".loading").classList.remove("hidden");

  try {
    const subject = await chooseSubject();
    current.subject = subject;

    $("#questionImage").src = subject.image;
    $("#questionImage").alt = "Guess the subject";
    $("#questionImage").hidden = false;
    $(".loading").classList.add("hidden");
  } catch (e) {
    $(".loading").textContent = "couldn't find an image — trying again…";
    busy = false;
    setTimeout(nextRound, 300);
    return;
  }

  busy = false;
  $("#answer").focus();
}

function startCategory(name) {
  current = { name, subject: null };
  round = 0;
  used.clear();
  $("#categoryLabel").textContent = name.toUpperCase();
  $("#home").classList.remove("active");
  $("#game").classList.add("active");
  nextRound();
}

function finish(points, msg, good) {
  score += points;
  $("#score").textContent = score;
  $("#lastPoints").textContent = points;
  $("#feedback").innerHTML = msg;
  $("#feedback").className = "feedback " + (good ? "good" : "bad");
}

$("#answerForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!current?.subject || busy) return;

  const guess = $("#answer").value.trim();
  if (!guess) return;

  const sim = similarity(guess, current.subject.title);

  if (sim === 1 || sim >= .88) {
    streak++;
    const points = 100 + Math.min(streak - 1, 10) * 10;
    finish(points, "correct — <strong>" + current.subject.title + "</strong>", true);
    setTimeout(nextRound, 900);
  } else {
    streak = 0;
    $("#streak").textContent = streak;
    finish(0, "not quite. try again, skip, or reveal.", false);
  }

  $("#streak").textContent = streak;
});

$("#skip").onclick = () => {
  if (!current?.subject || busy) return;
  streak = 0;
  $("#streak").textContent = 0;
  finish(0, "skipped — <strong>" + current.subject.title + "</strong>", false);
  setTimeout(nextRound, 700);
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

renderCategories();
