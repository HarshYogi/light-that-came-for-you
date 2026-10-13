/* ================= SETTINGS ================= */
const NAME = "Aakansha";
const DOB  = "2001-10-31";                         // YYYY-MM-DD
const WEB3FORMS_KEY = "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE";
/* ============================================= */

const $ = id => document.getElementById(id);
const birth = new Date(DOB + "T12:00:00");
const now   = new Date();
let age = now.getFullYear() - birth.getFullYear();
if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), 12)) age--;

$("nm").textContent  = NAME;
$("fin").textContent = NAME;

/* ---------- Scenes ---------- */
const scenes = [...document.querySelectorAll(".scene")];
const dots = $("dots");
scenes.forEach(() => dots.appendChild(document.createElement("i")));
let timer = null;                                   // declared BEFORE go() is ever called

function go(n) {
  if (typeof stop === "function") stop();
  scenes.forEach((s, i) => s.classList.toggle("on", i === n));
  [...dots.children].forEach((d, i) => d.classList.toggle("a", i === n));
  if (n === 2) { stop(); update(0); }
  if (n === 3) scenes[3].scrollTop = 0;
}
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => go(+b.dataset.go)));

/* ---------- Vega's journey ---------- */
const DIST = 25, START_YEAR = birth.getFullYear();
const MS = {
  24: "Gliese 667C, a red-dwarf system with a possibly habitable planet",
  20: "Gliese 581, a famous early hunting-ground for Earth-like planets",
  17: "Altair, a bright star of the summer sky",
  12: "Tau Ceti, a Sun-like star",
  11: "Procyon, the 'little dog' star",
  10: "Epsilon Eridani, a young Sun-like star",
  9:  "Sirius, the brightest star in our night sky",
  8:  "Wolf 359, a tiny, faint red dwarf",
  6:  "Barnard's Star, one of our closest neighbours",
  4:  "Alpha Centauri, the Sun's nearest star family",
  1:  "the far edge of our Sun's own Oort cloud of comets"
};
const rail = $("rail"), slider = $("sl");
let cur = 0;
for (let i = 0; i <= DIST; i++) {
  const t = document.createElement("div");
  t.className = "tk"; t.style.left = (i / DIST * 100) + "%";
  rail.appendChild(t);
}
const ticks = rail.querySelectorAll(".tk");

function update(i) {
  cur = i; slider.value = i;
  const left = DIST - i;
  $("photon").style.left = (i / DIST * 100) + "%";
  $("fill").style.width  = (i / DIST * 100) + "%";
  ticks.forEach((t, k) => t.classList.toggle("p", k <= i));
  $("yy").textContent  = START_YEAR + i;
  $("ag").textContent  = i === 0 ? "the year you were born ✨" : "the year you turn " + i;
  $("rem").textContent = left === 0 ? "journey complete" : left + " light-year" + (left > 1 ? "s" : "") + " still to go";
  $("ms").innerHTML =
    i === 0   ? "Light leaves Vega, in the constellation Lyra, for a tiny newborn world it has never met." :
    left === 0 ? "31st Oct, " + now.getFullYear() + ": it will touch your eyes.<br><em>It waited 25 years just to meet you, " + NAME + ".</em>" :
    MS[left]  ? "Now as far from Earth as <em>" + MS[left] + "</em>." :
                "Still crossing the quiet dark between the stars…";
  const chips = $("chips"); chips.innerHTML = "";
  for (let k = 1; k <= i; k++) {
    const q = DIST - k;
    if (MS[q]) { const c = document.createElement("span"); c.className = "ch"; c.textContent = (START_YEAR + k) + " · " + MS[q].split(",")[0]; chips.appendChild(c); }
  }
}
const playBtn = $("playBtn");
function stop() { clearInterval(timer); timer = null; playBtn.textContent = (cur >= DIST ? "↺ Replay" : "▶ Play"); }
function play() {
  if (cur >= DIST) update(0);
  playBtn.textContent = "❚❚ Pause";
  timer = setInterval(() => {            // one year every 5 seconds so she can read
    if (cur >= DIST - 1) { update(DIST); stop(); return; }
    update(cur + 1);
  }, 3000);
}
slider.addEventListener("input", () => { stop(); update(+slider.value); });
playBtn.addEventListener("click", () => { timer ? stop() : play(); });

/* ---------- Moons ---------- */
const SYN = 29.530588853, NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);
function phase(ms) { return (((ms - NEW_MOON) / 864e5 % SYN) + SYN) % SYN / SYN; }
function moon(ms) {
  const p = phase(ms), waning = p >= .5, q = waning ? 1 - p : p, r = 20;
  const k = Math.cos(2 * Math.PI * q), rx = Math.abs(k) * r;
  const d = `M20 0A20 20 0 0 1 20 40A${rx} 20 0 0 ${k > 0 ? 0 : 1} 20 0Z`;
  const name = p < .03 || p > .97 ? "New moon" : p < .22 ? "Waxing crescent" : p < .28 ? "First quarter" :
               p < .47 ? "Waxing gibbous" : p < .53 ? "Full moon" : p < .72 ? "Waning gibbous" :
               p < .78 ? "Last quarter" : "Waning crescent";
  return { name, lit: Math.round((1 - Math.cos(2 * Math.PI * p)) / 2 * 100),
    svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#1c2036"/><path d="${d}" fill="#f4ecd0" transform="${waning ? 'translate(40 0) scale(-1 1)' : ''}"/></svg>` };
}
const big = $("big"), info = $("bi"), row = $("moons");
function showMoon(ms, el) {
  const m = moon(ms), D = new Date(ms);
  const bday = D.getUTCMonth() === birth.getMonth() && D.getUTCDate() === birth.getDate();
  const n = D.getUTCFullYear() - birth.getFullYear();
  big.innerHTML = m.svg;
  info.innerHTML = "<b>" + D.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) + "</b><br>" +
    m.name + " · " + m.lit + "% lit" +
    (bday ? "<br><em>" + "</em>" : "");
  row.querySelectorAll(".m").forEach(x => x.classList.toggle("sel", x === el));
}
for (let i = 0; i <= age + 1; i++) {
  const ms = Date.UTC(birth.getFullYear() + i, birth.getMonth(), birth.getDate(), 12);
  const e = document.createElement("div");
  e.className = "m"; e.style.animationDelay = (.4 + i * .1) + "s";
  e.innerHTML = moon(ms).svg + "<b>" + (i === 0 ? "born" : i === age + 1 ? "soon" : i) + "</b>";
  e.addEventListener("click", () => showMoon(ms, e));
  row.appendChild(e);
  if (i === 0) showMoon(ms, e);
}

/* ---------- Sparkles ---------- */
function sparkle(fromEl, count = 14) {
  const r = fromEl.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const e = document.createElement("div");
    e.className = "sp"; e.textContent = ["✨", "⭐", "💫"][i % 3];
    e.style.left = r.left + r.width / 2 + "px"; e.style.top = r.top + r.height / 2 + "px";
    e.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
    e.style.animationDelay = Math.random() * .5 + "s";
    document.body.appendChild(e); setTimeout(() => e.remove(), 3200);
  }
}

/* ---------- Wish box + Web3Forms ---------- */
const modal = $("modal"), text = $("wishText"), err = $("err");
function openWish()  { modal.classList.add("open"); $("wishFormBody").hidden = false; $("wishDone").hidden = true; err.textContent = ""; setTimeout(() => text.focus(), 400); }
function closeWish() { modal.classList.remove("open"); }
big.addEventListener("click", openWish);
$("wishBtn").addEventListener("click", openWish);
$("closeWish").addEventListener("click", closeWish);
$("doneBtn").addEventListener("click", closeWish);
modal.addEventListener("click", e => { if (e.target === modal) closeWish(); });

$("wishForm").addEventListener("submit", async e => {
  e.preventDefault();
  const wish = text.value.trim();
  if (!wish) return;
  const btn = $("sendBtn"); btn.disabled = true; btn.textContent = "Sending…"; err.textContent = "";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "🌙 " + NAME + " made a birthday wish",
        from_name: NAME + "'s Birthday Page",
        message: wish,
        botcheck: $("botcheck").checked
      })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "failed");
    $("wishFormBody").hidden = true; $("wishDone").hidden = false;
    text.value = ""; sparkle($("wishDone"), 20);
  } catch (ex) {
    err.textContent = "Couldn't send just now. Please try again in a moment 🌙";
  } finally { btn.disabled = false; btn.textContent = "Send my wish ✨"; }
});

/* ---------- Starfield ---------- */
const cv = $("sky"), cx = cv.getContext("2d");
let stars = [], shoot = null;
function resize() {
  cv.width = innerWidth; cv.height = innerHeight;
  stars = Array.from({ length: 150 }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.4 + .2, s: Math.random() * 2 + .5, o: Math.random() * 6 }));
}
resize(); addEventListener("resize", resize);
setInterval(() => { shoot = { x: Math.random() * cv.width * .8, y: Math.random() * cv.height * .4, l: 0 }; }, 5000);
function draw(t) {
  const g = cx.createLinearGradient(0, 0, 0, cv.height);
  g.addColorStop(0, "#05060f"); g.addColorStop(1, "#1a1233");
  cx.globalAlpha = 1; cx.fillStyle = g; cx.fillRect(0, 0, cv.width, cv.height);
  for (const p of stars) {
    cx.globalAlpha = .4 + .6 * Math.abs(Math.sin(t / 1000 * p.s + p.o));
    cx.fillStyle = "#fff"; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill();
  }
  if (shoot) {
    shoot.l += 9; cx.globalAlpha = Math.max(0, 1 - shoot.l / 160); cx.strokeStyle = "#fff";
    cx.beginPath(); cx.moveTo(shoot.x + shoot.l, shoot.y + shoot.l * .5); cx.lineTo(shoot.x + shoot.l - 50, shoot.y + shoot.l * .5 - 25); cx.stroke();
    if (shoot.l > 160) shoot = null;
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

go(0);   // start LAST, after everything above is defined
