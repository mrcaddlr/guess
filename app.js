const categories={
  "Movies":["Movies","Famous movie characters","Superhero movies","Horror movies","Science fiction movies","Animated films"],
  "TV":["Television series","Sitcoms","TV drama series","TV comedy series","TV characters"],
  "Anime":["Anime","Anime characters","Shonen anime","Anime films","Studio Ghibli films"],
  "Games":["Video games","Video game characters","Nintendo games","PlayStation games","Xbox games"],
  "Consoles":["Game consoles","Nintendo consoles","PlayStation consoles","Xbox consoles","Handheld game consoles"],
  "Characters":["Fictional characters","Superheroes","Supervillains","Disney characters","Comic book characters"],
  "People":["Actors","Actresses","Film directors","Television actors","Video game creators"],
  "Places":["Fictional places","Film locations","Video game locations","Theme parks","Cities in film"],
  "Objects":["Movie props","Video game items","Fictional weapons","Video game consoles","Fictional vehicles"],
  "Franchises":["Nintendo franchises","Marvel Comics characters","DC Comics characters","Star Wars","Pokémon"],
  "Animation":["Animated characters","Animated television series","Disney animated films","Pixar films","DreamWorks Animation films"],
  "Horror":["Horror films","Horror film characters","Horror video games","Horror television series"],
  "Sci-Fi":["Science fiction films","Science fiction television series","Science fiction video games"],
  "Fantasy":["Fantasy films","Fantasy television series","Fantasy video games","Fantasy characters"]
};

const $=s=>document.querySelector(s);
const categoriesEl=$("#categories");
let score=0,streak=0,round=0,current=null,used=new Set(),busy=false;

function renderCategories(){
  categoriesEl.innerHTML="";
  Object.entries(categories).forEach(([name,queries])=>{
    const b=document.createElement("button");
    b.className="category";
    b.innerHTML="<strong>"+name+"</strong><span>"+queries.slice(0,3).join(" · ")+"</span>";
    b.onclick=()=>startCategory(name);
    categoriesEl.appendChild(b);
  });
}
function normalize(s){return s.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim()}
function similarity(a,b){
  a=normalize(a);b=normalize(b);if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return .88;
  const aa=new Set(a.split(" ")),bb=new Set(b.split(" "));let hit=0;aa.forEach(x=>{if(bb.has(x))hit++});
  return hit/Math.max(aa.size,bb.size);
}
function wikiUrl(title){return "https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(title.replaceAll(" ","_"))}
async function getImage(title){
  const r=await fetch(wikiUrl(title),{headers:{Accept:"application/json"}});
  if(!r.ok)throw new Error("not found");
  const d=await r.json();
  if(!d.thumbnail?.source)throw new Error("no image");
  return {image:d.originalimage?.source||d.thumbnail.source,title:d.title||title,description:d.description||""};
}
async function findSubject(query){
  const url="https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(query)+"&gsrnamespace=0&gsrlimit=15&prop=pageimages|info&pithumbsize=900&format=json&origin=*";
  const r=await fetch(url);if(!r.ok)throw new Error("search failed");
  const d=await r.json();const pages=Object.values(d.query?.pages||{}).filter(x=>x.thumbnail?.source);
  if(!pages.length)throw new Error("no results");
  const fresh=pages.filter(x=>!used.has(String(x.pageid)));const pool=fresh.length?fresh:pages;
  const p=pool[Math.floor(Math.random()*pool.length)];used.add(String(p.pageid));
  return {image:p.original?.source||p.thumbnail.source,title:p.title,description:p.description||""};
}
async function nextRound(){
  if(busy)return;busy=true;round++;$("#roundLabel").textContent="round "+round;$("#lastPoints").textContent="0";
  $("#feedback").textContent="";$("#feedback").className="feedback";$("#answer").value="";$("#questionHint").textContent="type your answer";
  $("#questionImage").hidden=true;$(".loading").classList.remove("hidden");
  try{
    const q=current.queries[Math.floor(Math.random()*current.queries.length)];
    const subject=await findSubject(q);current.subject=subject;
    $("#questionImage").src=subject.image;$("#questionImage").alt="Image from Wikipedia: "+subject.title;$("#questionImage").hidden=false;$(".loading").classList.add("hidden");
  }catch(e){
    $(".loading").textContent="couldn't find an image — trying again…";busy=false;setTimeout(nextRound,300);return;
  }
  busy=false;$("#answer").focus();
}
function startCategory(name){
  current={name,queries:categories[name],subject:null};round=0;used.clear();$("#categoryLabel").textContent=name.toUpperCase();$("#home").classList.remove("active");$("#game").classList.add("active");nextRound();
}
function finish(points,msg,good){
  score+=points;$("#score").textContent=score;$("#lastPoints").textContent=points;$("#feedback").innerHTML=msg;$("#feedback").className="feedback "+(good?"good":"bad");
}
$("#answerForm").addEventListener("submit",e=>{
  e.preventDefault();if(!current?.subject||busy)return;
  const guess=$("#answer").value.trim();if(!guess)return;
  const sim=similarity(guess,current.subject.title);
  if(sim===1||sim>=.88){
    streak++;const points=100+Math.min(streak-1,10)*10;finish(points,"correct — <strong>"+current.subject.title+"</strong>",true);
    setTimeout(nextRound,900);
  }else{
    streak=0;$("#streak").textContent=streak;finish(0,"not quite. try again, skip, or reveal.",false);
  }
  $("#streak").textContent=streak;
});
$("#skip").onclick=()=>{if(!current?.subject||busy)return;streak=0;$("#streak").textContent=0;finish(0,"skipped — <strong>"+current.subject.title+"</strong>",false);setTimeout(nextRound,700)};
$("#reveal").onclick=()=>{if(!current?.subject||busy)return;streak=0;$("#streak").textContent=0;finish(0,"the answer was <strong>"+current.subject.title+"</strong>",false);setTimeout(nextRound,1000)};
$("#backHome").onclick=()=>{$("#game").classList.remove("active");$("#home").classList.add("active")};
$("#randomCategory").onclick=()=>{const keys=Object.keys(categories);startCategory(keys[Math.floor(Math.random()*keys.length)])};
renderCategories();