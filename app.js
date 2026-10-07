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
    "PlayStation","PlayStation 2","PlayStation 3","PlayStation 4","PlayStation 5","PlayStation Vita","PlayStation Portable",
    "Xbox","Xbox 360","Xbox One","Xbox Series X","Xbox Series S","Nintendo Entertainment System",
    "Super Nintendo Entertainment System","Nintendo 64","Nintendo GameCube","Wii","Wii U","Nintendo Switch",
    "Nintendo Switch Lite","Nintendo Switch OLED","Game Boy","Game Boy Color","Game Boy Advance","Nintendo DS",
    "Nintendo 3DS","Sega Genesis","Sega Saturn","Dreamcast","Atari 2600","Neo Geo"
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
  "playstation":["ps1","psx","playstation 1"],
  "playstation 2":["ps2","ps 2"],
  "playstation 3":["ps3","ps 3"],
  "playstation 4":["ps4","ps 4"],
  "playstation 5":["ps5","ps 5"],
  "playstation vita":["ps vita","psv","psvita","psv vita","vita"],
  "playstation portable":["psp","ps portable"],
  "xbox":["original xbox"],
  "xbox 360":["x360","xbox360"],
  "xbox one":["xbone","xbox1","xbox 1"],
  "xbox series x":["xboxseriesx","series x"],
  "xbox series s":["xboxseriess","series s"],
  "nintendo entertainment system":["nes","famicom"],
  "super nintendo entertainment system":["snes","super nintendo","super famicom"],
  "nintendo 64":["n64"],
  "nintendo gamecube":["gamecube","gc"],
  "nintendo switch":["switch"],
  "nintendo switch lite":["switch lite"],
  "nintendo switch oled":["switch oled","switch oled model"],
  "game boy":["gameboy","gb"],
  "game boy color":["gameboy color","gbc"],
  "game boy advance":["gba","gameboy advance"],
  "nintendo ds":["nds"],
  "nintendo 3ds":["3ds"],
  "sega genesis":["mega drive"],
  "grand theft auto v":["gta v","gta 5","gtav"],
  "the legend of zelda breath of the wild":["botw","breath of the wild"],
  "red dead redemption 2":["rdr2","red dead 2"],
  "the elder scrolls v skyrim":["skyrim"],
  "resident evil 4":["re4"],
  "five nights at freddys":["fnaf"],
  "the last of us":["tlou"],
  "the lord of the rings":["lotr"],
  "game of thrones":["got"],
  "better call saul":["bcs"],
  "attack on titan":["aot","snk"],
  "my hero academia":["mha","bnha"],
  "fullmetal alchemist":["fma","fmab"],
  "jojo s bizarre adventure":["jojo","jjba"],
  "spy family":["spy x family"],
  "one punch man":["opm"],
  "hunter hunter":["hxh","hunter x hunter"],
  "jujutsu kaisen":["jjk"],
  "demon slayer":["kny","kimetsu no yaiba"],
  "chainsaw man":["csm"],
  "neon genesis evangelion":["nge","evangelion"],
  "pokemon":["pokémon"],
  "dwayne johnson":["the rock"],
  "robert downey jr":["rdj"],
  "new york city":["new york","nyc"],
  "master sword":["mastersword"],
  "keyblade":["key blade"],
  "triforce":["tri force"],
  "lightsaber":["light saber","lightsabre"],
  "one ring":["ring of power"]
};

function normalize(value) {
  return String(value).toLowerCase().replace(/&/g,"and").replace(/[×:.,'’!?()\-]/g," ")
    .replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
}

function generatedAliases(title) {
  const n=normalize(title);
  const out=new Set([n,n.replace(/^the /,"")]);
  const words=n.split(" ").filter(Boolean);
  const significant=words.filter(w=>!["the","of","and","a","an","to","in","on","for"].includes(w));
  // Acronyms are only generated when there are at least 3 meaningful words and 3+ letters.
  if(significant.length>=3){
    const acronym=significant.map(w=>w[0]).join("");
    if(acronym.length>=3) out.add(acronym);
  }
  return [...out];
}

function damerauLevenshtein(a,b) {
  const da = new Map();
  const maxDist = a.length + b.length;
  const matrix = Array.from({length:a.length + 2},()=>Array(b.length + 2).fill(0));

  matrix[0][0] = maxDist;
  for(let i=0;i<=a.length;i++) {
    matrix[i+1][0] = maxDist;
    matrix[i+1][1] = i;
  }
  for(let j=0;j<=b.length;j++) {
    matrix[0][j+1] = maxDist;
    matrix[1][j+1] = j;
  }

  for(let i=1;i<=a.length;i++) {
    let db = 0;
    for(let j=1;j<=b.length;j++) {
      const i1 = da.get(b[j-1]) || 0;
      const j1 = db;
      let cost = 1;
      if(a[i-1] === b[j-1]) {
        cost = 0;
        db = j;
      }

      matrix[i+1][j+1] = Math.min(
        matrix[i][j] + cost,
        matrix[i+1][j] + 1,
        matrix[i][j+1] + 1,
        matrix[i1][j1] + (i-i1-1) + 1 + (j-j1-1)
      );
    }
    da.set(a[i-1],i);
  }

  return matrix[a.length+1][b.length+1];
}

function wordTypoMatch(input,title) {
  const aWords=normalize(input).split(" ").filter(Boolean);
  const tWords=normalize(title).split(" ").filter(Boolean);
  if(aWords.length!==tWords.length) return false;

  return aWords.every((word,index)=>{
    const target=tWords[index];
    const maxDistance = word.length >= 8 ? 2 : word.length >= 5 ? 1 : 0;
    return damerauLevenshtein(word,target) <= maxDistance;
  });
}

function classifyAnswer(input,title) {
  const a=normalize(input);
  const t=normalize(title);
  if(!a) return {correct:false,type:"empty"};
  if(a===t) return {correct:true,type:"exact"};

  const aliases=new Set([
    ...(answerAliases[t]||[]),
    ...generatedAliases(title)
  ].map(normalize));

  if([...aliases].some(alias=>alias===a)) return {correct:true,type:"alias"};

  // Dynamic typo detection: handles missing/extra letters, transposed letters,
  // and small per-word mistakes without accepting partial words.
  if(wordTypoMatch(a,t)) {
    return {correct:false,type:"typo",correctTitle:title};
  }

  if(a.length>=5 && t.length>=5){
    const distance=damerauLevenshtein(a,t);
    const limit = t.length >= 14 ? 2 : t.length >= 8 ? 1 : 0;
    if(distance<=limit) return {correct:false,type:"typo",correctTitle:title};
  }

  return {correct:false,type:"wrong"};
}

function answerMatches(input,title) {
  return classifyAnswer(input,title).correct;
}

async function prepareConsoleImage(subject) {
  if (window.GuessVision?.prepareConsoleImage) {
    return window.GuessVision.prepareConsoleImage(subject);
  }
  return subject?.image;
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
      startCategory(name + " — " + sub,pool,name,sub);
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

const animeSourceQueries = {
  "demon slayer":"Kimetsu no Yaiba",
  "neon genesis evangelion":"Neon Genesis Evangelion",
  "hunter hunter":"Hunter x Hunter",
  "spy family":"Spy x Family",
  "fullmetal alchemist":"Fullmetal Alchemist",
  "my hero academia":"Boku no Hero Academia",
  "jojo s bizarre adventure":"JoJo no Kimyou na Bouken"
};

const IMAGE_REJECT_PATTERNS = [
  /\blogo\b/i, /\bwordmark\b/i, /\bicon\b/i, /\bsymbol\b/i, /\bemblem\b/i,
  /\bmonogram\b/i, /\bseal\b/i, /\bbadge\b/i, /\btitle.?card\b/i, /\bbrand.?mark\b/i
];

const CONSOLE_IMAGE_REJECT_PATTERNS = [
  ...IMAGE_REJECT_PATTERNS,
  /\bcontroller\b/i, /\bgamepad\b/i, /\bjoystick\b/i, /\bremote\b/i,
  /\bbox art\b/i, /\bpackaging\b/i, /\bpackage\b/i, /\bmanual\b/i,
  /\bscreenshot\b/i, /\bwallpaper\b/i, /\bbanner\b/i
];

const CONSOLE_TITLE_REJECT_PATTERNS = [
  /\bdivision\b/i, /\bcompany\b/i, /\bcorporation\b/i, /\bbrand\b/i,
  /\bservice\b/i, /\bnetwork\b/i, /\bstore\b/i, /\blogo\b/i, /\bcontroller\b/i,
  /\baccessory\b/i, /\bprototype\b/i, /\bdevelopment\b/i
];

function imageNameLooksBad(name,category) {
  const value = String(name || "");
  const patterns = category === "Consoles"
    ? CONSOLE_IMAGE_REJECT_PATTERNS
    : IMAGE_REJECT_PATTERNS;
  return patterns.some(pattern => pattern.test(value));
}

function consoleTitleLooksValid(title) {
  const value = String(title || "");
  if (CONSOLE_TITLE_REJECT_PATTERNS.some(pattern => pattern.test(value))) return false;
  const normalized = normalize(value)
    .replace(/\s+console$/,"")
    .replace(/\s+system$/,"");
  if (!normalized || normalized === "video game console" || normalized === "video game consoles") return false;
  if (/^xbox (series x and series s|series x s)$/.test(normalized)) return false;
  return true;
}

function canonicalConsoleTitle(title) {
  return String(title || "").replace(/\s+\((console|video game console)\)$/i,"").trim();
}

function imageIsUsable(info,category) {
  if (!info?.url) return false;
  if (/^image\/svg/i.test(info.mime || "")) return false;
  if (imageNameLooksBad(info.name,category)) return false;
  const width = Number(info.width || 0);
  const height = Number(info.height || 0);
  if (width && height) {
    if (Math.min(width,height) < 260) return false;
    const ratio = Math.max(width,height) / Math.max(1,Math.min(width,height));
    if (ratio > 4.5) return false;
  }
  return true;
}

function scoreImage(info,category) {
  const name = String(info.name || "");
  let score = 0;
  if (/\.jpe?g$|\.png$|\.webp$/i.test(name)) score += 10;
  if ((info.width || 0) >= 700 && (info.height || 0) >= 500) score += 6;
  if (category === "Consoles") {
    if (/\bconsole\b|\bsystem\b/i.test(name)) score += 10;
    if (/\bseries x\b|\bseries s\b|\bxbox\b|\bplaystation\b|\bnintendo\b|\bgame boy\b|\bsega\b|\batari\b/i.test(name)) score += 4;
  }
  return score;
}

async function getWikipediaAlternateImage(pageId,category) {
  const imagesUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=images" +
    "&imlimit=50&pageids=" + encodeURIComponent(pageId);
  const imagesResponse = await fetch(imagesUrl);
  if (!imagesResponse.ok) throw new Error("Wikipedia image list failed");

  const page = Object.values((await imagesResponse.json()).query?.pages || {})[0];
  const fileTitles = (page?.images || [])
    .map(item => item.title)
    .filter(title => /^File:/i.test(title))
    .filter(title => !imageNameLooksBad(title,category))
    .slice(0,30);

  if (!fileTitles.length) throw new Error("No alternate image files");

  const infoUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*" +
    "&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1600&titles=" +
    encodeURIComponent(fileTitles.join("|"));
  const infoResponse = await fetch(infoUrl);
  if (!infoResponse.ok) throw new Error("Wikipedia image info failed");

  const files = Object.values((await infoResponse.json()).query?.pages || {})
    .map(file => {
      const info = file.imageinfo?.[0];
      if (!info) return null;
      return {
        name: file.title || "",
        url: info.thumburl || info.url,
        width: info.width || info.thumbwidth,
        height: info.height || info.thumbheight,
        mime: info.mime || ""
      };
    })
    .filter(info => imageIsUsable(info,category))
    .sort((a,b) => scoreImage(b,category) - scoreImage(a,category));

  if (!files.length) throw new Error("No usable alternate image");
  return files[0];
}

async function getWikipediaPage(title,options={}) {
  const category = options.category || "";
  if (category === "Consoles" && !consoleTitleLooksValid(title)) {
    throw new Error("Rejected non-hardware console title");
  }

  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&titles=" +
    encodeURIComponent(title) + "&prop=pageimages|info&inprop=url&piprop=name|original|thumbnail&pithumbsize=1600";

  const response = await fetch(url);
  if (!response.ok) throw new Error("Wikipedia request failed");

  const page = Object.values((await response.json()).query?.pages || {})[0];
  if (!page || page.missing) throw new Error("Wikipedia page missing");

  const imageInfo = {
    name: page.pageimage || "",
    url: page.original?.source || page.thumbnail?.source || "",
    width: page.original?.width || page.thumbnail?.width || 0,
    height: page.original?.height || page.thumbnail?.height || 0,
    mime: ""
  };

  let usable = imageIsUsable(imageInfo,category);
  let selected = usable ? imageInfo : null;

  if (!selected && page.pageid) {
    try {
      selected = await getWikipediaAlternateImage(page.pageid,category);
      usable = Boolean(selected);
    } catch (_) {}
  }

  if (!usable || !selected?.url) throw new Error("No usable Wikipedia image");

  const answerTitle = category === "Consoles" ? canonicalConsoleTitle(page.title || title) : title;

  return {
    image:selected.url,
    title:answerTitle,
    source:"Wikipedia",
    sourceUrl:page.fullurl || "https://en.wikipedia.org/wiki/" + encodeURIComponent(page.title || title)
  };
}

async function getWikipediaSearchCandidates(query,category) {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search" +
    "&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=0&gsrlimit=50&prop=pageimages|info&inprop=url&piprop=name|original|thumbnail&pithumbsize=1600";

  const response = await fetch(url);
  if (!response.ok) throw new Error("Wikipedia discovery failed");

  const pages = Object.values((await response.json()).query?.pages || {});
  return pages
    .filter(page => page.thumbnail?.source || page.original?.source)
    .filter(page => !/(list of|disambiguation|category:|timeline of|index of)/i.test(page.title || ""))
    .filter(page => category !== "Consoles" || consoleTitleLooksValid(page.title));
}

const movieWikiQueries = {
  All: ["film -intitle:list -intitle:category"],
  "Sci-Fi": ['incategory:"Science fiction films" -intitle:list'],
  Horror: ['incategory:"Horror films" -intitle:list'],
  Fantasy: ['incategory:"Fantasy films" -intitle:list'],
  Animation: ['incategory:"Animated films" -intitle:list'],
  Action: ['incategory:"Action films" -intitle:list'],
  Comedy: ['incategory:"Comedy films" -intitle:list'],
  Drama: ['incategory:"Drama films" -intitle:list']
};

const wikiDiscoveryQueries = {
  Consoles: ['incategory:"Video game consoles" -intitle:list -intitle:category'],
  Characters: ['incategory:"Fictional characters" -intitle:list -intitle:category'],
  People: ['actor OR actress OR director OR "game designer" -intitle:list -intitle:category'],
  Places: ['"fictional location" OR landmark OR city -intitle:list -intitle:category'],
  Objects: ['incategory:"Fictional objects" -intitle:list -intitle:category'],
  Franchises: ['"media franchise" -intitle:list -intitle:category'],
  Games: ['"video game" -intitle:list -intitle:category'],
  Movies: movieWikiQueries.All
};

async function getWikipediaDiscovery(sourceCategory,subcategory="All") {
  const queries = sourceCategory === "Movies"
    ? (movieWikiQueries[subcategory] || movieWikiQueries.All)
    : (wikiDiscoveryQueries[sourceCategory] || [sourceCategory]);

  for (let attempt=0; attempt<10; attempt++) {
    const query = queries[Math.floor(Math.random() * queries.length)];
    const pages = await getWikipediaSearchCandidates(query,sourceCategory);
    if (!pages.length) continue;

    const shuffled = [...pages].sort(() => Math.random() - 0.5);
    for (const page of shuffled.slice(0,12)) {
      const answerTitle = sourceCategory === "Consoles"
        ? canonicalConsoleTitle(page.title)
        : page.title;
      try {
        const subject = await getWikipediaPage(answerTitle,{category:sourceCategory});
        if (sourceCategory === "Consoles" && !consoleTitleLooksValid(subject.title)) continue;
        return subject;
      } catch (_) {}
    }
  }

  throw new Error("No Wikipedia candidate");
}

async function getAniListImage(title) {
  const query = 'query ($search: String) { Page(perPage: 10) { media(search: $search, type: ANIME) { id title { romaji english native } coverImage { extraLarge large } } } }';
  const response = await fetch("https://graphql.anilist.co",{
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({query,variables:{search:animeSourceQueries[normalize(title)] || title}})
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
    sourceUrl:"https://anilist.co/anime/" + selected.id,
    category:"Anime"
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
  return {image:show.image.original,title,source:"TVMaze",sourceUrl:"https://www.tvmaze.com/shows/" + show.id,category:"TV"};
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
    sourceUrl:"https://www.themoviedb.org/movie/" + item.id,
    category:"Movies"
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
  return {image:item.background_image,title,source:"RAWG",sourceUrl:"https://rawg.io/games/" + (item.slug || item.id),category:"Games"};
}

function loadImage(url) {
  return new Promise((resolve,reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = () => reject(new Error("Image failed to load"));
    image.src = url;
  });
}

async function getAniListRandomImage() {
  const page=Math.floor(Math.random()*80)+1;
  const query='query ($page:Int) { Page(page:$page,perPage:50) { media(type:ANIME,sort:POPULARITY_DESC,isAdult:false) { id title { romaji english } coverImage { extraLarge } } } }';
  const response=await fetch("https://graphql.anilist.co",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({query,variables:{page}})});
  if(!response.ok) throw new Error("AniList discovery failed");
  const list=(await response.json()).data?.Page?.media||[];
  const item=list.filter(x=>x.coverImage?.extraLarge)[Math.floor(Math.random()*list.filter(x=>x.coverImage?.extraLarge).length)];
  if(!item) throw new Error("No AniList candidate");
  return {image:item.coverImage.extraLarge,title:item.title.english||item.title.romaji,source:"AniList",sourceUrl:"https://anilist.co/anime/"+item.id,category:"Anime"};
}

const tvGenreMap = {
  All:null, Drama:"Drama", Comedy:"Comedy", Crime:"Crime", "Sci-Fi":"Science-Fiction",
  Horror:"Horror", Animation:"Animation", Action:"Action", Fantasy:"Fantasy",
  Mystery:"Mystery", Thriller:"Thriller"
};

async function getTVMazeRandomImage(subcategory="All") {
  const wantedGenre = tvGenreMap[subcategory] || null;

  for (let attempt=0; attempt<10; attempt++) {
    const page=Math.floor(Math.random()*120);
    const response=await fetch("https://api.tvmaze.com/shows?page="+page);
    if(!response.ok) continue;

    const list=(await response.json())
      .filter(show => show.image?.original)
      .filter(show => !wantedGenre || (show.genres || []).includes(wantedGenre));

    if (!list.length) continue;

    const item=list[Math.floor(Math.random()*list.length)];
    return {
      image:item.image.original,
      title:item.name,
      source:"TVMaze",
      sourceUrl:item.url,
      category:"TV"
    };
  }

  throw new Error("No TVMaze candidate");
}
async function getSubjectImage(title,sourceCategory,subcategory="All") {
  const sources = {
    Anime:[getAniListImage],
    TV:[getTVMazeImage],
    Movies:[getTMDBImage,getWikipediaPage],
    Games:[getRAWGImage,getWikipediaPage],
    Consoles:[title => getWikipediaPage(title,{category:"Consoles"})],
    Characters:[title => getWikipediaPage(title,{category:"Characters"})],
    People:[title => getWikipediaPage(title,{category:"People"})],
    Places:[title => getWikipediaPage(title,{category:"Places"})],
    Objects:[title => getWikipediaPage(title,{category:"Objects"})],
    Franchises:[title => getWikipediaPage(title,{category:"Franchises"})]
  };

  for (const source of (sources[sourceCategory] || [title => getWikipediaPage(title,{category:sourceCategory})])) {
    try {
      const subject = await source(title);
      subject.category=sourceCategory;
      await loadImage(subject.image);
      return subject;
    } catch (_) {}
  }

  throw new Error("No image source worked");
}
async function chooseSubject(snapshot) {
  const pool=snapshot.pool||[];
  const sourceCategory=snapshot.sourceCategory;
  const subcategory=snapshot.subcategory || "All";
  const available=pool.filter(title=>!used.has(normalize(title)));

  for(const title of [...available].sort(()=>Math.random()-.5)){
    try{
      const subject=await getSubjectImage(title,sourceCategory,subcategory);
      const key=normalize(subject.title || title);
      if(!used.has(key)){
        used.add(key);
        return subject;
      }
    }catch(_) {}
  }

  // Curated pools are seeds, not the limit. Native APIs/search are used after
  // the seed pool is exhausted, with the active movie/TV genre preserved.
  for(let attempt=0;attempt<18;attempt++){
    try{
      let subject;
      if(sourceCategory==="Anime"){
        subject=await getAniListRandomImage();
      }else if(sourceCategory==="TV"){
        subject=await getTVMazeRandomImage(subcategory);
      }else{
        subject=await getWikipediaDiscovery(sourceCategory,subcategory);
      }

      const key=normalize(subject?.title || "");
      if(subject?.title && key && !used.has(key)){
        used.add(key);
        return subject;
      }
    }catch(_) {}
  }

  throw new Error("Couldn't find a usable subject");
}

async function nextRound() {
  if (!current) return;
  const token = gameToken;
  const snapshot = {
    pool:[...(current.pool || [])],
    sourceCategory:current.sourceCategory,
    subcategory:current.subcategory || "All"
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
    const playableImage = subject.category === "Consoles"
      ? await prepareConsoleImage(subject).catch(() => subject.image)
      : subject.image;
    if (!current || token !== gameToken) return;
    $("#questionImage").crossOrigin = "anonymous";
    $("#questionImage").src = playableImage;
    $("#questionImage").alt = "Mystery image";
    if (liquidGlassInstance) liquidGlassInstance.markChanged($("#questionImage"));
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

function startCategory(name,pool,sourceCategory,subcategory) {
  clearTimeout(transitionTimer);
  gameToken++;
  busy=true;
  roundLocked=true;
  current={
    name,
    pool:pool || [],
    sourceCategory:sourceCategory || name,
    subcategory:subcategory || "All",
    subject:null
  };
  round=0;
  used.clear();
  $("#categoryLabel").textContent=name.toUpperCase();
  $("#home").classList.remove("active");
  $("#game").classList.add("active");
  nextRound();
}

function scheduleNext(delay) {
  clearTimeout(transitionTimer);
  roundLocked=true;
  transitionTimer=setTimeout(()=>{
    transitionTimer=null;
    nextRound();
  },delay);
}

function finish(points,message,good) {
  score+=points;
  $("#score").textContent=score;
  $("#lastPoints").textContent=points;
  $("#feedback").innerHTML=message;
  $("#feedback").className="feedback "+(good ? "good" : "bad");
}

$("#questionImage").addEventListener("error",()=>{
  if(busy || !current?.subject || roundLocked) return;
  used.delete(normalize(current.subject.title));
  current.subject=null;
  nextRound();
});

$("#answerForm").addEventListener("submit",event=>{
  event.preventDefault();
  if(!current?.subject || busy || roundLocked) return;

  const guess=$("#answer").value.trim();
  if(!guess) return;

  const result=classifyAnswer(guess,current.subject.title);

  if(result.correct){
    streak++;
    const points=100+Math.min(streak-1,10)*10;
    $("#streak").textContent=streak;
    finish(points,"correct — <strong>"+current.subject.title+"</strong>",true);
    scheduleNext(1100);
  }else if(result.type==="typo"){
    $("#feedback").textContent="there's a typo. try again.";
    $("#feedback").className="feedback typo";
    $("#answer").focus();
  }else{
    $("#feedback").textContent="not quite. try again, skip, or reveal.";
    $("#feedback").className="feedback wrong";
    $("#answer").focus();
  }
});

$("#skip").onclick=()=>{
  if(!current?.subject || busy || roundLocked) return;
  streak=0;
  $("#streak").textContent="0";
  finish(0,"skipped — <strong>"+current.subject.title+"</strong>",false);
  scheduleNext(700);
};

$("#reveal").onclick=()=>{
  if(!current?.subject || busy || roundLocked) return;
  streak=0;
  $("#streak").textContent="0";
  finish(0,"the answer was <strong>"+current.subject.title+"</strong>",false);
  scheduleNext(1000);
};

$("#homeBrand").onclick=event=>{
  event.preventDefault();
  $("#backHome").click();
};

$("#backHome").onclick=()=>{
  clearTimeout(transitionTimer);
  gameToken++;
  transitionTimer=null;
  busy=false;
  roundLocked=false;
  current=null;
  $("#game").classList.remove("active");
  $("#home").classList.add("active");
};

$("#randomCategory").onclick=()=>{
  const modes=[];
  Object.entries(movieSubcategories).forEach(([name,pool]) =>
    modes.push({label:"Movies — "+name,pool,source:"Movies",subcategory:name})
  );
  Object.entries(tvSubcategories).forEach(([name,pool]) =>
    modes.push({label:"TV — "+name,pool,source:"TV",subcategory:name})
  );
  Object.keys(categories).filter(name=>name!=="Movies" && name!=="TV")
    .forEach(name=>modes.push({label:name,pool:categories[name],source:name,subcategory:"All"}));

  const mode=modes[Math.floor(Math.random()*modes.length)];
  startCategory(mode.label,mode.pool,mode.source,mode.subcategory);
};

let liquidGlassInstance=null;

async function initLiquidGlass(){
  if(!window.LiquidGlass || liquidGlassInstance) return;

  const root=document.querySelector("#liquidRoot");
  const glass=document.querySelector("#glassOverlay");
  if(!root || !glass) return;

  // IMPORTANT: the glass must be a sibling of the page content.
  // LiquidGlass rasterises non-glass root children as the scene behind the
  // shader. Making the entire app the glass causes the renderer to have
  // nothing useful behind it.
  const timeout=(promise,ms)=>Promise.race([
    promise,
    new Promise((_,reject)=>setTimeout(
      ()=>reject(new Error("Liquid Glass initialization timed out")),
      ms
    ))
  ]);

  try{
    glass.classList.add("webgl-glass-loading");

    liquidGlassInstance=await timeout(
      window.LiquidGlass.init({
        root,
        glassElements:[glass],
        defaults:{
          blurAmount:0.22,
          refraction:0.38,
          chromAberration:0.012,
          edgeHighlight:0.07,
          specular:0.08,
          fresnel:0.48,
          distortion:0,
          cornerRadius:34,
          zRadius:20,
          opacity:0.88,
          saturation:0.02,
          tintStrength:0.015,
          brightness:0.015,
          shadowOpacity:0.25,
          shadowSpread:16,
          shadowOffsetY:7,
          bevelMode:0
        }
      }),
      2500
    );

    glass.classList.remove("webgl-glass-loading");
    glass.classList.add("webgl-glass-ready");
  }catch(error){
    console.warn("Liquid Glass failed; using the CSS fallback.",error);
    liquidGlassInstance=null;
    glass.classList.remove("webgl-glass-loading","webgl-glass-ready");
  }
}

renderCategories();
window.addEventListener("load",()=>initLiquidGlass(),{once:true});
window.addEventListener("liquidglassready",()=>initLiquidGlass(),{once:true});

["contextmenu","dragstart"].forEach(type =>
  $("#questionImage").addEventListener(type,event=>event.preventDefault())
);
