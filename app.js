/* ============================================================
   AP CHEM ACADEMY — APP
   ============================================================ */
"use strict";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- background particles ---------- */
(() => {
  const cv = $("#bg-particles"), ctx = cv.getContext("2d");
  let W, H, pts = [];
  const N = 70, LINK = 130;
  function resize() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
  }
  function init() {
    pts = Array.from({ length: N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.8 + .6,
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = "rgba(120,160,255,.5)";
      ctx.fill();
    }
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < LINK) {
        ctx.strokeStyle = `rgba(110,140,255,${(1 - d / LINK) * .14})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  }
  addEventListener("resize", () => { resize(); init(); });
  resize(); init(); tick();
})();

/* ---------- scroll progress + active nav + reveal ---------- */
(() => {
  const bar = $("#scroll-progress");
  addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (scrollY / max * 100) + "%";
  }, { passive: true });

  const links = $$("#nav-links a");
  const sections = links.map(a => $(a.getAttribute("href"))).filter(Boolean);
  const secObs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => secObs.observe(s));

  const revObs = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); revObs.unobserve(e.target); } });
  }, { threshold: .12 });
  $$(".reveal").forEach(el => revObs.observe(el));
})();

/* ---------- widgets: sig figs ---------- */
(() => {
  function sigFigs(raw) {
    let s = raw.trim().toLowerCase().replace(/×10\^?/, "e").replace(/\s/g, "");
    if (!s || isNaN(Number(s))) return null;
    s = s.split("e")[0].replace(/^[+-]/, "");
    const hasDot = s.includes(".");
    let digits = s.replace(".", "");
    digits = digits.replace(/^0+/, "");           // leading zeros never count
    if (!hasDot) digits = digits.replace(/0+$/, ""); // trailing zeros without decimal don't count
    if (digits === "") return 1;                  // e.g. "0" → 1 sig fig
    return digits.length;
  }
  const inp = $("#sf-input"), out = $("#sf-out");
  inp.addEventListener("input", () => {
    const n = sigFigs(inp.value);
    out.innerHTML = inp.value.trim() === "" ? "—"
      : n === null ? "hmm, that's not a number 🤔"
      : `<b>${n}</b> significant figure${n === 1 ? "" : "s"}`;
  });
})();

/* ---------- widgets: percent error ---------- */
(() => {
  const e = $("#pe-exp"), a = $("#pe-acc"), out = $("#pe-out");
  function calc() {
    const ev = parseFloat(e.value), av = parseFloat(a.value);
    if (isNaN(ev) || isNaN(av) || av === 0) { out.textContent = "enter two values…"; return; }
    out.innerHTML = `% error = |${ev} − ${av}| / ${av} × 100 = <b>${(Math.abs(ev - av) / Math.abs(av) * 100).toPrecision(3)} %</b>`;
  }
  e.addEventListener("input", calc); a.addEventListener("input", calc);
})();

/* ---------- widgets: temperature ---------- */
(() => {
  const c = $("#tc-c"), k = $("#tc-k");
  c.addEventListener("input", () => { if (c.value !== "") k.value = (parseFloat(c.value) + 273).toFixed(1); });
  k.addEventListener("input", () => { if (k.value !== "") c.value = (parseFloat(k.value) - 273).toFixed(1); });
})();

/* ---------- widgets: molar mass ---------- */
(() => {
  function parse(formula) {
    // recursive descent over symbols / parentheses with multipliers
    let i = 0;
    function group() {
      let mass = 0;
      while (i < formula.length) {
        const ch = formula[i];
        if (ch === "(") { i++; const inner = group(); mass += inner * num(); }
        else if (ch === ")") { i++; return mass; }
        else {
          const m = /^[A-Z][a-z]?/.exec(formula.slice(i));
          if (!m) throw new Error("bad symbol at '" + formula.slice(i) + "'");
          let sym = m[0];
          if (!(sym in MASS_BY_SYMBOL) && sym.length === 2 && sym[0] in MASS_BY_SYMBOL) {
            sym = sym[0]; // e.g. "CO" = C + O, not cobalt typo handling: prefer 2-letter if valid
          }
          if (!(sym in MASS_BY_SYMBOL)) throw new Error("unknown element '" + m[0] + "'");
          i += sym.length;
          mass += MASS_BY_SYMBOL[sym] * num();
        }
      }
      return mass;
    }
    function num() {
      const m = /^\d+/.exec(formula.slice(i));
      if (!m) return 1;
      i += m[0].length;
      return parseInt(m[0], 10);
    }
    return group();
  }
  const inp = $("#mm-input"), out = $("#mm-out");
  inp.addEventListener("input", () => {
    const f = inp.value.trim();
    if (!f) { out.textContent = "—"; return; }
    try { out.innerHTML = `${f} → <b>${parse(f).toFixed(2)} g/mol</b>`; }
    catch (err) { out.textContent = "🤔 " + err.message; }
  });
})();

/* ---------- widgets: molarity solver ---------- */
(() => {
  const m = $("#mo-m"), n = $("#mo-n"), v = $("#mo-v"), out = $("#mo-out");
  function calc() {
    const M = parseFloat(m.value), N = parseFloat(n.value), V = parseFloat(v.value);
    const have = [!isNaN(M), !isNaN(N), !isNaN(V)].filter(Boolean).length;
    if (have < 2) { out.textContent = "—"; return; }
    if (isNaN(M) && V !== 0) out.innerHTML = `M = ${N} mol ÷ ${V} L = <b>${(N / V).toPrecision(3)} M</b>`;
    else if (isNaN(N)) out.innerHTML = `mol = ${M} M × ${V} L = <b>${(M * V).toPrecision(3)} mol</b>`;
    else if (isNaN(V) && M !== 0) out.innerHTML = `V = ${N} mol ÷ ${M} M = <b>${(N / M).toPrecision(3)} L</b>`;
    else out.innerHTML = `all three filled — clear one and I'll solve it`;
  }
  [m, n, v].forEach(el => el.addEventListener("input", calc));
})();

/* ---------- states of matter simulation ---------- */
(() => {
  const cv = $("#states-canvas"), ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;
  let mode = "solid";
  const COLS = 14, ROWS = 4, PAD = 60;
  const parts = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const hx = PAD + c * (W - 2 * PAD) / (COLS - 1);
    const hy = H - 40 - r * 46;
    parts.push({ x: hx, y: hy, hx, hy, vx: 0, vy: 0 });
  }
  const DESCS = {
    solid: "<b>Solid:</b> particles locked in a fixed lattice, only vibrating in place → definite shape <em>and</em> volume.",
    liquid: "<b>Liquid:</b> particles stay close but slide past each other → definite volume, takes the shape of its container.",
    gas: "<b>Gas:</b> particles fly free at high speed, far apart → expands to fill any container. No fixed shape or volume.",
  };
  $$(".state-btn").forEach(b => b.addEventListener("click", () => {
    $$(".state-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    mode = b.dataset.state;
    $("#state-desc").innerHTML = DESCS[mode];
    if (mode === "gas") parts.forEach(p => { p.vx = (Math.random() - .5) * 7; p.vy = (Math.random() - .5) * 7; });
    if (mode === "liquid") parts.forEach(p => { p.vx = (Math.random() - .5) * 1.6; p.vy = (Math.random() - .5) * 1.6; });
  }));
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      if (mode === "solid") {
        p.x = p.hx + (Math.random() - .5) * 3.2;
        p.y = p.hy + (Math.random() - .5) * 3.2;
      } else if (mode === "liquid") {
        p.vx += (Math.random() - .5) * .5; p.vy += (Math.random() - .5) * .5 + .05;
        p.vx *= .96; p.vy *= .96;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 16) { p.x = 16; p.vx *= -1; } if (p.x > W - 16) { p.x = W - 16; p.vx *= -1; }
        if (p.y > H - 16) { p.y = H - 16; p.vy *= -.5; }
        if (p.y < H * .45) { p.vy += .3; } // gravity keeps liquid pooled
      } else {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 12 || p.x > W - 12) p.vx *= -1;
        if (p.y < 12 || p.y > H - 12) p.vy *= -1;
      }
      const grad = ctx.createRadialGradient(p.x - 3, p.y - 3, 1, p.x, p.y, 11);
      grad.addColorStop(0, mode === "solid" ? "#9fd8ff" : mode === "liquid" ? "#5ec8f0" : "#ff9dd8");
      grad.addColorStop(1, mode === "solid" ? "#2b6db1" : mode === "liquid" ? "#1b6e9e" : "#a13b8a");
      ctx.beginPath(); ctx.arc(p.x, p.y, 11, 0, 7); ctx.fillStyle = grad; ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ---------- wave animation ---------- */
(() => {
  const svg = $("#wave-svg"), path = $("#wave-path");
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `<linearGradient id="waveGrad" x1="0" x2="1"><stop offset="0" stop-color="#4ef0d8"/><stop offset=".5" stop-color="#8b7bff"/><stop offset="1" stop-color="#ff6bc1"/></linearGradient>`;
  svg.prepend(defs);
  let t = 0;
  function tick() {
    t += .045;
    let d = "M 0 60";
    for (let x = 0; x <= 800; x += 8) {
      const decay = x / 800;                        // wavelength shrinks left → right
      const wl = 130 - 95 * decay;
      d += ` L ${x} ${60 + Math.sin(x / wl * 6.283 + t) * 38}`;
    }
    path.setAttribute("d", d);
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ---------- periodic table ---------- */
(() => {
  const table = $("#periodic-table"), detail = $("#pt-detail");
  ELEMENTS.forEach((el, idx) => {
    const [num, sym, name, mass, col, row, cat] = el;
    const d = document.createElement("div");
    d.className = `pt-el cat-${cat}`;
    d.style.gridColumn = col;
    d.style.gridRow = row;
    d.style.animationDelay = (idx * 18) + "ms";
    d.innerHTML = `<span class="num">${num}</span><span class="sym">${sym}</span>`;
    d.title = `${name} (${num})`;
    d.addEventListener("click", () => {
      $$(".pt-el.selected").forEach(x => x.classList.remove("selected"));
      d.classList.add("selected");
      const ion = LIKELY_IONS[col];
      detail.innerHTML = `
        <div class="pt-d-sym">${sym}</div>
        <div class="pt-d-name">${name}</div>
        <div class="pt-d-cat">${CATEGORY_NAMES[cat]}</div>
        <div class="pt-d-row"><span>Atomic #</span><b>${num}</b></div>
        <div class="pt-d-row"><span>Atomic mass</span><b>${mass}</b></div>
        <div class="pt-d-row"><span>Period</span><b>${row > 7 ? 7 : row}</b></div>
        ${ion ? `<div class="pt-d-row"><span>Likely ion</span><b>${sym}${ion === "none (stable)" ? " — none" : "<sup>" + ion + "</sup>"}</b></div>` : ""}
        <div class="pt-d-config">${electronConfig(num)}</div>`;
    });
    table.appendChild(d);
  });
  // legend
  const legend = $("#pt-legend");
  Object.entries(CATEGORY_NAMES).forEach(([key, label]) => {
    const s = document.createElement("span");
    s.className = `cat-${key}`;
    s.textContent = label;
    legend.appendChild(s);
  });
})();

/* ---------- flashcards ---------- */
(() => {
  const DECKS = {
    elements: ELEMENTS.map(e => [e[1], `${e[2]} (#${e[0]})`]),
    poly: POLYATOMICS.map(p => [p[0], p[1]]),
    cations: METAL_CATIONS.map(c => [c[0], c[1]]),
  };
  let deck = "elements", order = [], pos = 0;
  const card = $("#flashcard"), front = $("#fc-front"), back = $("#fc-back"), count = $("#fc-count");

  function setDeck(name, shuffle = false) {
    deck = name; pos = 0;
    order = DECKS[deck].map((_, i) => i);
    if (shuffle) for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    show();
  }
  function show() {
    card.classList.remove("flipped");
    const [f, b] = DECKS[deck][order[pos]];
    // swap content after the unflip transition starts so the answer doesn't flash
    setTimeout(() => { front.innerHTML = f; back.innerHTML = b; }, 160);
    count.textContent = `${pos + 1} / ${order.length}`;
  }
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  $("#fc-next").addEventListener("click", () => { pos = (pos + 1) % order.length; show(); });
  $("#fc-prev").addEventListener("click", () => { pos = (pos - 1 + order.length) % order.length; show(); });
  $("#fc-shuffle").addEventListener("click", () => setDeck(deck, true));
  $$(".deck-tab").forEach(t => t.addEventListener("click", () => {
    $$(".deck-tab").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    setDeck(t.dataset.deck);
  }));
  setDeck("elements");
})();

/* ---------- quiz: symbol sprint ---------- */
(() => {
  const area = $("#quiz-area");
  let qs = [], qi = 0, score = 0;

  function buildQuestions() {
    const pool = [...ELEMENTS].sort(() => Math.random() - .5).slice(0, 10);
    return pool.map(el => {
      const askSymbol = Math.random() < .5;
      const wrong = ELEMENTS.filter(e => e[0] !== el[0]).sort(() => Math.random() - .5).slice(0, 3);
      const opts = [...wrong, el].sort(() => Math.random() - .5);
      return askSymbol
        ? { q: `Which element is <b>${el[1]}</b>?`, opts: opts.map(o => o[2]), right: el[2] }
        : { q: `What is the symbol for <b>${el[2]}</b>?`, opts: opts.map(o => o[1]), right: el[1] };
    });
  }
  function render() {
    if (qi >= qs.length) {
      const emoji = score >= 9 ? "🏆" : score >= 7 ? "🔥" : score >= 5 ? "💪" : "📖";
      area.innerHTML = `<div class="quiz-done"><div class="big">${emoji}</div>
        <h3>${score} / ${qs.length}</h3>
        <p class="muted">${score >= 9 ? "AP-ready. Go flex on your classmates." : score >= 7 ? "Solid! A few more flashcard reps." : "Keep drilling the flashcards above — you'll get there."}</p>
        <br><button id="quiz-again" class="btn btn-primary">Play again</button></div>`;
      $("#quiz-again").addEventListener("click", start);
      return;
    }
    const q = qs[qi];
    area.innerHTML = `<div class="quiz-meta"><span>question ${qi + 1} / ${qs.length}</span><span>score ${score}</span></div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-opts">${q.opts.map(o => `<button class="quiz-opt">${o}</button>`).join("")}</div>`;
    $$(".quiz-opt", area).forEach(btn => btn.addEventListener("click", () => {
      if (area.dataset.locked) return;
      area.dataset.locked = "1";
      const ok = btn.textContent === q.right;
      btn.classList.add(ok ? "right" : "wrong");
      if (!ok) $$(".quiz-opt", area).find(b => b.textContent === q.right).classList.add("right");
      if (ok) score++;
      setTimeout(() => { delete area.dataset.locked; qi++; render(); }, 900);
    }));
  }
  function start() { qs = buildQuestions(); qi = 0; score = 0; render(); }
  $("#quiz-start").addEventListener("click", start);
})();

/* ---------- ion reference tables ---------- */
(() => {
  const poly = $("#poly-table");
  let lastGroup = "";
  POLYATOMICS.forEach(([f, n, g]) => {
    if (g !== lastGroup) { poly.insertAdjacentHTML("beforeend", `<div class="ig">${g}</div>`); lastGroup = g; }
    poly.insertAdjacentHTML("beforeend", `<span class="if">${f}</span><span>${n}</span>`);
  });
  const cat = $("#cation-table");
  METAL_CATIONS.forEach(([f, n]) => {
    cat.insertAdjacentHTML("beforeend", `<span class="if">${f}</span><span>${n}</span>`);
  });
})();

/* ---------- homework reveal buttons ---------- */
(() => {
  $$(".problem").forEach(p => {
    const btn = $(".reveal-btn", p);
    btn.addEventListener("click", () => {
      p.classList.toggle("open");
      btn.textContent = p.classList.contains("open") ? "Hide solution" : "Show solution";
    });
  });
  $("#hw-expand").addEventListener("click", () =>
    $$(".problem").forEach(p => { p.classList.add("open"); $(".reveal-btn", p).textContent = "Hide solution"; }));
  $("#hw-collapse").addEventListener("click", () =>
    $$(".problem").forEach(p => { p.classList.remove("open"); $(".reveal-btn", p).textContent = "Show solution"; }));
})();
