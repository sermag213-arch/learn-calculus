/* Interactive graphs: a tiny safe expression parser, a canvas plotter,
   and the widgets that chapters embed with <div data-widget="name">. */
(function () {
  'use strict';

  /* ---------------- Expression parser (no eval) ---------------- */
  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    sec: x => 1 / Math.cos(x), csc: x => 1 / Math.sin(x), cot: x => 1 / Math.tan(x),
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
    exp: Math.exp, ln: Math.log, log: Math.log10, sqrt: Math.sqrt,
    abs: Math.abs, floor: Math.floor, ceil: Math.ceil, sign: Math.sign
  };
  const CONSTS = { pi: Math.PI, e: Math.E };

  function tokenize(src) {
    const s = src.replace(/\s+/g, '').replace(/π/g, 'pi').replace(/\*\*/g, '^');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        const num = parseFloat(s.slice(i, j));
        if (isNaN(num)) throw new Error('Bad number near "' + s.slice(i, j) + '"');
        out.push({ t: 'num', v: num }); i = j; continue;
      }
      if (/[a-z]/i.test(c)) {
        let j = i; while (j < s.length && /[a-z]/i.test(s[j])) j++;
        let word = s.slice(i, j).toLowerCase();
        // split words like "xsin" or "pix" into known pieces
        while (word.length) {
          let matched = false;
          const names = Object.keys(FUNCS).concat(Object.keys(CONSTS), ['x']).sort((a, b) => b.length - a.length);
          for (const n of names) {
            if (word.startsWith(n)) {
              if (FUNCS[n]) out.push({ t: 'fn', v: n });
              else if (n === 'x') out.push({ t: 'var' });
              else out.push({ t: 'num', v: CONSTS[n] });
              word = word.slice(n.length); matched = true; break;
            }
          }
          if (!matched) throw new Error('Unknown name "' + word + '"');
        }
        i = j; continue;
      }
      if ('+-*/^(),'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
      if (c === '|') { out.push({ t: 'bar' }); i++; continue; }
      throw new Error('Unexpected character "' + c + '"');
    }
    // insert implicit multiplication: 2x, 2(x), x(x), )(, )x, x sin
    const res = [];
    for (let k = 0; k < out.length; k++) {
      const a = res[res.length - 1], b = out[k];
      const aEnds = a && (a.t === 'num' || a.t === 'var' || (a.t === 'op' && a.v === ')'));
      const bStarts = b.t === 'num' || b.t === 'var' || b.t === 'fn' || (b.t === 'op' && b.v === '(');
      // ...but not in "sin^2(x)", where the "(x)" is the function's argument
      const fnPower = res.length >= 3 && res[res.length - 3].t === 'fn' && res[res.length - 2].t === 'op' && res[res.length - 2].v === '^';
      if (aEnds && bStarts && !fnPower) res.push({ t: 'op', v: '*' });
      res.push(b);
    }
    return res;
  }

  /* Recursive-descent parser -> closure f(x). */
  function compile(src) {
    // convert |a| to abs(a) by alternating bars
    let open = true;
    src = String(src).replace(/\|/g, () => { const r = open ? 'abs(' : ')'; open = !open; return r; });
    const toks = tokenize(src);
    let p = 0;
    const peek = () => toks[p];
    const isOp = (v) => peek() && peek().t === 'op' && peek().v === v;
    function expr() {
      let left = term();
      while (isOp('+') || isOp('-')) {
        const op = toks[p++].v, l = left, r = term();
        left = op === '+' ? x => l(x) + r(x) : x => l(x) - r(x);
      }
      return left;
    }
    function term() {
      let left = unary();
      while (isOp('*') || isOp('/')) {
        const op = toks[p++].v, l = left, r = unary();
        left = op === '*' ? x => l(x) * r(x) : x => l(x) / r(x);
      }
      return left;
    }
    function unary() {
      if (isOp('-')) { p++; const u = unary(); return x => -u(x); }
      if (isOp('+')) { p++; return unary(); }
      return power();
    }
    function power() {
      const base = atom();
      if (isOp('^')) {
        p++;
        const ex = unary(); // right-assoc, allows 2^-x
        return x => {
          const b = base(x), e = ex(x);
          // real odd roots of negatives, e.g. x^(1/3)
          if (b < 0 && !Number.isInteger(e)) {
            const inv = 1 / e;
            if (Math.abs(inv - Math.round(inv)) < 1e-9 && Math.round(inv) % 2 !== 0) return -Math.pow(-b, e);
          }
          return Math.pow(b, e);
        };
      }
      return base;
    }
    function atom() {
      const tk = toks[p++];
      if (!tk) throw new Error('Expression ended unexpectedly');
      if (tk.t === 'num') { const v = tk.v; return () => v; }
      if (tk.t === 'var') return x => x;
      if (tk.t === 'fn') {
        const fn = FUNCS[tk.v];
        // allow sin^2(x)
        let powE = null;
        if (isOp('^')) { p++; powE = atom(); }
        let arg;
        if (isOp('(')) { p++; arg = expr(); if (!isOp(')')) throw new Error('Missing ")"'); p++; }
        else arg = power();
        return powE ? x => Math.pow(fn(arg(x)), powE(x)) : x => fn(arg(x));
      }
      if (tk.t === 'op' && tk.v === '(') {
        const e = expr();
        if (!isOp(')')) throw new Error('Missing ")"');
        p++; return e;
      }
      throw new Error('Unexpected "' + (tk.v || tk.t) + '"');
    }
    const f = expr();
    if (p < toks.length) throw new Error('Unexpected "' + (toks[p].v || toks[p].t) + '"');
    return f;
  }

  /* ---------------- Canvas plotter ---------------- */
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  class Plot {
    constructor(canvas, opts) {
      this.c = canvas; this.ctx = canvas.getContext('2d');
      Object.assign(this, { xmin: -5, xmax: 5, ymin: -5, ymax: 5 }, opts || {});
    }
    resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = this.c.clientWidth || 600;
      const h = this.c.clientHeight || 340;
      this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.w = w; this.h = h;
    }
    X(x) { return (x - this.xmin) / (this.xmax - this.xmin) * this.w; }
    Y(y) { return this.h - (y - this.ymin) / (this.ymax - this.ymin) * this.h; }
    invX(px) { return this.xmin + px / this.w * (this.xmax - this.xmin); }
    clear() {
      this.resize();
      const ctx = this.ctx;
      ctx.fillStyle = cssVar('--plot-bg') || '#fff';
      ctx.fillRect(0, 0, this.w, this.h);
      this.grid();
    }
    niceStep(range) {
      const raw = range / 8, mag = Math.pow(10, Math.floor(Math.log10(raw)));
      const n = raw / mag;
      return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * mag;
    }
    grid() {
      const ctx = this.ctx;
      const sx = this.niceStep(this.xmax - this.xmin), sy = this.niceStep(this.ymax - this.ymin);
      ctx.lineWidth = 1; ctx.strokeStyle = cssVar('--plot-grid');
      ctx.beginPath();
      for (let x = Math.ceil(this.xmin / sx) * sx; x <= this.xmax; x += sx) { ctx.moveTo(this.X(x) + .5, 0); ctx.lineTo(this.X(x) + .5, this.h); }
      for (let y = Math.ceil(this.ymin / sy) * sy; y <= this.ymax; y += sy) { ctx.moveTo(0, this.Y(y) + .5); ctx.lineTo(this.w, this.Y(y) + .5); }
      ctx.stroke();
      ctx.strokeStyle = cssVar('--plot-axis'); ctx.lineWidth = 1.5;
      ctx.beginPath();
      const y0 = Math.min(Math.max(this.Y(0), 0), this.h), x0 = Math.min(Math.max(this.X(0), 0), this.w);
      ctx.moveTo(0, y0); ctx.lineTo(this.w, y0); ctx.moveTo(x0, 0); ctx.lineTo(x0, this.h);
      ctx.stroke();
      ctx.fillStyle = cssVar('--plot-label'); ctx.font = '11px system-ui, sans-serif';
      const fmt = v => Math.abs(v) < 1e-10 ? '0' : +v.toFixed(4) + '';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (let x = Math.ceil(this.xmin / sx) * sx; x <= this.xmax; x += sx) {
        if (Math.abs(x) < sx / 2 || this.X(x) < 14 || this.X(x) > this.w - 14) continue;
        ctx.fillText(fmt(x), this.X(x), Math.min(y0 + 4, this.h - 14));
      }
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      for (let y = Math.ceil(this.ymin / sy) * sy; y <= this.ymax; y += sy) {
        if (Math.abs(y) < sy / 2 || this.Y(y) < 8 || this.Y(y) > this.h - 8) continue;
        ctx.fillText(fmt(y), Math.max(x0 - 4, 24), this.Y(y));
      }
    }
    fn(f, color, width, from, to, dash) {
      const ctx = this.ctx;
      ctx.strokeStyle = color; ctx.lineWidth = width || 2.5; ctx.setLineDash(dash || []);
      ctx.beginPath();
      const a = from === undefined ? this.xmin : from, b = to === undefined ? this.xmax : to;
      const N = Math.max(400, Math.round(this.w * 2));
      let pen = false, prevY = null;
      const span = this.ymax - this.ymin;
      for (let i = 0; i <= N; i++) {
        const x = a + (b - a) * i / N;
        let y;
        try { y = f(x); } catch (e) { y = NaN; }
        if (!isFinite(y) || (prevY !== null && Math.abs(y - prevY) > span * 2)) { pen = false; prevY = isFinite(y) ? y : null; continue; }
        const py = this.Y(Math.max(Math.min(y, this.ymax + span), this.ymin - span));
        if (!pen) { ctx.moveTo(this.X(x), py); pen = true; } else ctx.lineTo(this.X(x), py);
        prevY = y;
      }
      ctx.stroke(); ctx.setLineDash([]);
    }
    line(x1, y1, x2, y2, color, width, dash) {
      const ctx = this.ctx;
      ctx.strokeStyle = color; ctx.lineWidth = width || 2; ctx.setLineDash(dash || []);
      ctx.beginPath(); ctx.moveTo(this.X(x1), this.Y(y1)); ctx.lineTo(this.X(x2), this.Y(y2)); ctx.stroke();
      ctx.setLineDash([]);
    }
    dot(x, y, color, r, hollow) {
      const ctx = this.ctx;
      ctx.beginPath(); ctx.arc(this.X(x), this.Y(y), r || 5, 0, Math.PI * 2);
      if (hollow) { ctx.fillStyle = cssVar('--plot-bg'); ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = color; ctx.stroke(); }
      else { ctx.fillStyle = color; ctx.fill(); }
    }
    rect(x, y0, w, y1, fill, stroke) {
      const ctx = this.ctx;
      const px = this.X(x), pw = this.X(x + w) - px, top = this.Y(Math.max(y0, y1)), bot = this.Y(Math.min(y0, y1));
      ctx.fillStyle = fill; ctx.fillRect(px, top, pw, bot - top);
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.strokeRect(px + .5, top + .5, pw, bot - top); }
    }
    area(f, a, b, fill) {
      const ctx = this.ctx, N = 300;
      ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(this.X(a), this.Y(0));
      for (let i = 0; i <= N; i++) { const x = a + (b - a) * i / N; const y = f(x); ctx.lineTo(this.X(x), this.Y(isFinite(y) ? y : 0)); }
      ctx.lineTo(this.X(b), this.Y(0)); ctx.closePath(); ctx.fill();
    }
    text(str, x, y, color, align) {
      const ctx = this.ctx; ctx.fillStyle = color || cssVar('--plot-label');
      ctx.font = '600 13px system-ui, sans-serif'; ctx.textAlign = align || 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText(str, this.X(x), this.Y(y));
    }
  }

  /* ---------------- Helpers ---------------- */
  const C = {
    f: () => cssVar('--c1'), g: () => cssVar('--c2'), h: () => cssVar('--c3'),
    fill: () => cssVar('--c1-fill'), fill2: () => cssVar('--c2-fill')
  };
  const fmt = (v, d) => {
    if (!isFinite(v)) return v > 0 ? '∞' : v < 0 ? '−∞' : 'undefined';
    const s = (+v.toFixed(d === undefined ? 4 : d)).toString();
    return s.replace('-', '−');
  };
  const deriv = (f, x) => { const h = 1e-5; return (f(x + h) - f(x - h)) / (2 * h); };
  function simpson(f, a, b, n) {
    n = n || 1000; if (n % 2) n++;
    const h = (b - a) / n; let s = f(a) + f(b);
    for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
    return s * h / 3;
  }
  function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

  function shell(title, controlsHTML, readoutHTML) {
    return el(`<figure class="widget-card">
      <figcaption class="widget-head"><span class="widget-badge">Interactive</span> ${title}</figcaption>
      <div class="widget-canvas-wrap"><canvas class="widget-canvas" role="img" aria-label="${title} graph"></canvas></div>
      <div class="widget-controls">${controlsHTML}</div>
      <div class="widget-readout" aria-live="polite">${readoutHTML || ''}</div>
    </figure>`);
  }
  function onResize(node, cb) {
    if ('ResizeObserver' in window) new ResizeObserver(() => cb()).observe(node);
    window.addEventListener('calc-theme', cb);
  }

  const PRESETS = {
    'x^2': { f: x => x * x, d: x => 2 * x, label: 'f(x) = x²' },
    'x^3-3x': { f: x => x ** 3 - 3 * x, d: x => 3 * x * x - 3, label: 'f(x) = x³ − 3x' },
    'sin': { f: Math.sin, d: Math.cos, label: 'f(x) = sin x' },
    'exp': { f: Math.exp, d: Math.exp, label: 'f(x) = eˣ' },
    'sqrt': { f: Math.sqrt, d: x => 0.5 / Math.sqrt(x), label: 'f(x) = √x' }
  };
  const presetOptions = (keys) => keys.map(k => `<option value="${k}">${PRESETS[k].label}</option>`).join('');

  /* ---------------- Widgets ---------------- */
  const W = {};

  /* Limit explorer: f(x) = (x^2-1)/(x-1) has a hole at x = 1. */
  W['limit'] = function (host) {
    const fig = shell('Approaching a limit: f(x) = (x² − 1)/(x − 1)',
      `<label>Distance from 1: <b class="hval">1</b>
        <input type="range" min="0" max="100" value="0" aria-label="How close x is to 1"></label>`,
      '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), r = fig.querySelector('input'), out = fig.querySelector('.widget-readout'), hv = fig.querySelector('.hval');
    const P = new Plot(cv, { xmin: -1, xmax: 3, ymin: -0.5, ymax: 4 });
    const f = x => (x * x - 1) / (x - 1);
    function draw() {
      const h = Math.pow(10, -r.value / 25); // 1 -> 1e-4
      hv.textContent = fmt(h, 5);
      P.clear();
      P.fn(f, C.f());
      P.dot(1, 2, C.f(), 5, true);
      const xl = 1 - h, xr = 1 + h;
      P.line(xl, 0, xl, f(xl), C.g(), 1.5, [4, 4]); P.line(xr, 0, xr, f(xr), C.h(), 1.5, [4, 4]);
      P.dot(xl, f(xl), C.g()); P.dot(xr, f(xr), C.h());
      out.innerHTML = `<div class="readout-grid">
        <div><span class="sw" style="background:${C.g()}"></span>From the left: f(${fmt(xl, 5)}) = <b>${fmt(f(xl), 6)}</b></div>
        <div><span class="sw" style="background:${C.h()}"></span>From the right: f(${fmt(xr, 5)}) = <b>${fmt(f(xr), 6)}</b></div>
        <div>f(1) itself is <b>undefined</b> (0/0) — the open circle — yet both sides close in on <b>2</b>.</div></div>`;
    }
    r.addEventListener('input', draw); onResize(cv, draw); draw();
  };

  /* Secant line -> tangent line. */
  W['secant'] = function (host) {
    const fig = shell('From secant line to tangent line',
      `<label>Function <select class="fsel">${presetOptions(['x^2', 'x^3-3x', 'sin', 'exp'])}</select></label>
       <label>Point a = <b class="aval">1</b><input class="ar" type="range" min="-2" max="2" step="0.1" value="1"></label>
       <label>h = <b class="hval">1.5</b><input class="hr" type="range" min="0.001" max="2" step="0.001" value="1.5"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), sel = fig.querySelector('.fsel'), ar = fig.querySelector('.ar'), hr = fig.querySelector('.hr'), out = fig.querySelector('.widget-readout');
    const P = new Plot(cv, { xmin: -3, xmax: 3.5, ymin: -3, ymax: 6 });
    function draw() {
      const F = PRESETS[sel.value], f = F.f, a = +ar.value, h = +hr.value;
      fig.querySelector('.aval').textContent = fmt(a, 2); fig.querySelector('.hval').textContent = fmt(h, 3);
      P.clear(); P.fn(f, C.f());
      const ms = (f(a + h) - f(a)) / h, mt = F.d(a);
      P.fn(x => f(a) + mt * (x - a), C.h(), 1.5, undefined, undefined, [6, 5]);
      P.fn(x => f(a) + ms * (x - a), C.g(), 2);
      P.dot(a, f(a), C.f()); P.dot(a + h, f(a + h), C.g());
      out.innerHTML = `<div class="readout-grid">
        <div><span class="sw" style="background:${C.g()}"></span>Secant slope <span class="mono">[f(a+h) − f(a)]/h</span> = <b>${fmt(ms)}</b></div>
        <div><span class="sw" style="background:${C.h()}"></span>Tangent slope f′(a) = <b>${fmt(mt)}</b></div>
        <div>Drag <b>h</b> toward 0 and watch the secant slope converge to the tangent slope.</div></div>`;
    }
    [sel, ar, hr].forEach(n => n.addEventListener('input', draw)); onResize(cv, draw); draw();
  };

  /* f and f' side by side with moving tangent. */
  W['derivative'] = function (host) {
    const fig = shell('A function and its derivative',
      `<label>Function <select class="fsel">${presetOptions(['x^3-3x', 'x^2', 'sin', 'exp'])}</select></label>
       <label>x = <b class="xval">0.5</b><input class="xr" type="range" min="-2.5" max="2.5" step="0.01" value="0.5"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), sel = fig.querySelector('.fsel'), xr = fig.querySelector('.xr'), out = fig.querySelector('.widget-readout');
    const P = new Plot(cv, { xmin: -3, xmax: 3, ymin: -4, ymax: 5 });
    function draw() {
      const F = PRESETS[sel.value], a = +xr.value, m = F.d(a), y = F.f(a);
      fig.querySelector('.xval').textContent = fmt(a, 2);
      P.clear(); P.fn(F.d, C.g(), 2, undefined, undefined, [5, 4]); P.fn(F.f, C.f());
      P.fn(x => y + m * (x - a), C.h(), 1.5, a - 1.2, a + 1.2);
      P.dot(a, y, C.f()); P.dot(a, m, C.g());
      P.line(a, y, a, m, cssVar('--plot-label'), 1, [2, 3]);
      const trend = Math.abs(m) < 0.02 ? 'flat (horizontal tangent → possible max/min)' : m > 0 ? 'increasing' : 'decreasing';
      out.innerHTML = `<div class="readout-grid">
        <div><span class="sw" style="background:${C.f()}"></span>${F.label}: f(${fmt(a, 2)}) = <b>${fmt(y, 3)}</b></div>
        <div><span class="sw" style="background:${C.g()}"></span>dashed = f′(x): slope here = <b>${fmt(m, 3)}</b></div>
        <div>At this x the function is <b>${trend}</b>. The height of the dashed curve equals the slope of the solid one.</div></div>`;
    }
    [sel, xr].forEach(n => n.addEventListener('input', draw)); onResize(cv, draw); draw();
  };

  /* Riemann sums. */
  W['riemann'] = function (host) {
    const fns = {
      'x^2': { f: x => x * x, F: x => x ** 3 / 3, a: 0, b: 2, label: 'f(x) = x² on [0, 2]', yr: [-0.5, 4.5] },
      'sin': { f: Math.sin, F: x => -Math.cos(x), a: 0, b: Math.PI, label: 'f(x) = sin x on [0, π]', yr: [-0.3, 1.3] },
      'sqrt': { f: Math.sqrt, F: x => 2 / 3 * x ** 1.5, a: 0, b: 4, label: 'f(x) = √x on [0, 4]', yr: [-0.3, 2.4] },
      'cubic': { f: x => x ** 3 - 2 * x, F: x => x ** 4 / 4 - x * x, a: -1, b: 2, label: 'f(x) = x³ − 2x on [−1, 2]', yr: [-2, 4.5] }
    };
    const fig = shell('Riemann sums: approximating area with rectangles',
      `<label>Function <select class="fsel">${Object.keys(fns).map(k => `<option value="${k}">${fns[k].label}</option>`).join('')}</select></label>
       <label>Method <select class="msel"><option value="left">Left endpoints</option><option value="right">Right endpoints</option><option value="mid">Midpoints</option><option value="trap">Trapezoids</option></select></label>
       <label>n = <b class="nval">4</b><input class="nr" type="range" min="1" max="100" value="4"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), sel = fig.querySelector('.fsel'), ms = fig.querySelector('.msel'), nr = fig.querySelector('.nr'), out = fig.querySelector('.widget-readout');
    const P = new Plot(cv);
    function draw() {
      const F = fns[sel.value], f = F.f, n = +nr.value, a = F.a, b = F.b, dx = (b - a) / n, m = ms.value;
      fig.querySelector('.nval').textContent = n;
      const pad = (b - a) * 0.12;
      Object.assign(P, { xmin: a - pad, xmax: b + pad, ymin: F.yr[0], ymax: F.yr[1] });
      P.clear();
      let S = 0;
      for (let i = 0; i < n; i++) {
        const xl = a + i * dx, xr = xl + dx;
        if (m === 'trap') {
          const yl = f(xl), yr = f(xr); S += (yl + yr) / 2 * dx;
          const ctx = P.ctx; ctx.beginPath(); ctx.moveTo(P.X(xl), P.Y(0)); ctx.lineTo(P.X(xl), P.Y(yl)); ctx.lineTo(P.X(xr), P.Y(yr)); ctx.lineTo(P.X(xr), P.Y(0)); ctx.closePath();
          ctx.fillStyle = C.fill(); ctx.fill(); ctx.strokeStyle = C.f(); ctx.lineWidth = 1; ctx.stroke();
        } else {
          const xs = m === 'left' ? xl : m === 'right' ? xr : (xl + xr) / 2, y = f(xs); S += y * dx;
          P.rect(xl, 0, dx, y, y >= 0 ? C.fill() : C.fill2(), n <= 60 ? C.f() : null);
          if (n <= 30) P.dot(xs, y, C.g(), 3);
        }
      }
      P.fn(f, C.f(), 2.5);
      const exact = F.F(b) - F.F(a);
      out.innerHTML = `<div class="readout-grid">
        <div>Approximation with n = ${n}: <b>${fmt(S, 5)}</b></div>
        <div>Exact value of the integral: <b>${fmt(exact, 5)}</b></div>
        <div>Error: <b>${fmt(Math.abs(S - exact), 5)}</b> — increase n and the error shrinks toward 0.</div></div>`;
    }
    [sel, ms, nr].forEach(n => n.addEventListener('input', draw)); onResize(cv, draw); draw();
  };

  /* Area accumulation function A(x) = ∫_0^x f(t) dt (FTC). */
  W['ftc'] = function (host) {
    const fig = shell('The accumulation function A(x) = ∫₀ˣ f(t) dt',
      `<label>x = <b class="xval">2</b><input class="xr" type="range" min="0" max="6" step="0.01" value="2"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), xr = fig.querySelector('.xr'), out = fig.querySelector('.widget-readout');
    const f = t => Math.sin(t) + 0.5, A = x => 1 - Math.cos(x) + 0.5 * x;
    const P = new Plot(cv, { xmin: -0.5, xmax: 6.5, ymin: -1, ymax: 5 });
    function draw() {
      const x = +xr.value; fig.querySelector('.xval').textContent = fmt(x, 2);
      P.clear();
      P.area(t => Math.max(f(t), 0), 0, x, C.fill()); P.area(t => Math.min(f(t), 0), 0, x, C.fill2());
      P.fn(f, C.f()); P.fn(A, C.g(), 2, 0, x); P.fn(A, C.g(), 1, x, 6.5, [3, 4]);
      P.dot(x, A(x), C.g()); P.dot(x, f(x), C.f());
      out.innerHTML = `<div class="readout-grid">
        <div><span class="sw" style="background:${C.f()}"></span>f(t) = sin t + 0.5; f(${fmt(x, 2)}) = <b>${fmt(f(x), 3)}</b></div>
        <div><span class="sw" style="background:${C.g()}"></span>A(${fmt(x, 2)}) = signed shaded area = <b>${fmt(A(x), 3)}</b></div>
        <div>The <b>slope</b> of A at x equals the <b>height</b> of f at x. That is the Fundamental Theorem: A′(x) = f(x).</div></div>`;
    }
    xr.addEventListener('input', draw); onResize(cv, draw); draw();
  };

  /* Taylor polynomials. */
  W['taylor'] = function (host) {
    const fns = {
      sin: { f: Math.sin, c: k => k % 2 === 0 ? 0 : ((k - 1) / 2 % 2 === 0 ? 1 : -1), label: 'sin x' },
      cos: { f: Math.cos, c: k => k % 2 === 1 ? 0 : (k / 2 % 2 === 0 ? 1 : -1), label: 'cos x' },
      exp: { f: Math.exp, c: () => 1, label: 'eˣ' },
      ln: { f: x => Math.log(1 + x), c: k => k === 0 ? 0 : (k % 2 ? 1 : -1) * fact(k - 1), label: 'ln(1 + x)' }
    };
    function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
    const fig = shell('Taylor polynomials centered at 0',
      `<label>Function <select class="fsel">${Object.keys(fns).map(k => `<option value="${k}">${fns[k].label}</option>`).join('')}</select></label>
       <label>Degree n = <b class="nval">3</b><input class="nr" type="range" min="0" max="15" value="3"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), sel = fig.querySelector('.fsel'), nr = fig.querySelector('.nr'), out = fig.querySelector('.widget-readout');
    const P = new Plot(cv, { xmin: -7, xmax: 7, ymin: -3, ymax: 3 });
    function draw() {
      const F = fns[sel.value], n = +nr.value; fig.querySelector('.nval').textContent = n;
      // c(k) is f^(k)(0); term = c(k) x^k / k!
      const T = x => { let s = 0; for (let k = 0; k <= n; k++) s += F.c(k) * Math.pow(x, k) / fact(k); return s; };
      P.clear(); P.fn(F.f, C.f(), 3); P.fn(T, C.g(), 2);
      const x0 = 1.5;
      out.innerHTML = `<div class="readout-grid">
        <div><span class="sw" style="background:${C.f()}"></span>${F.label} at x = 1.5: <b>${fmt(F.f(x0), 6)}</b></div>
        <div><span class="sw" style="background:${C.g()}"></span>T<sub>${n}</sub>(1.5) = <b>${fmt(T(x0), 6)}</b></div>
        <div>Higher degree → the polynomial hugs the function over a wider interval${sel.value === 'ln' ? ' (but for ln(1+x) only inside −1 < x ≤ 1, its interval of convergence)' : ''}.</div></div>`;
    }
    [sel, nr].forEach(n => n.addEventListener('input', draw)); onResize(cv, draw); draw();
  };

  /* Newton's method. */
  W['newton'] = function (host) {
    const fig = shell("Newton's method for f(x) = x² − 2 (finding √2)",
      `<label>Starting guess x₀ = <b class="x0">3</b><input class="x0r" type="range" min="0.3" max="4" step="0.1" value="3"></label>
       <label>Steps = <b class="nval">1</b><input class="nr" type="range" min="0" max="5" value="1"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), x0r = fig.querySelector('.x0r'), nr = fig.querySelector('.nr'), out = fig.querySelector('.widget-readout');
    const f = x => x * x - 2, d = x => 2 * x;
    const P = new Plot(cv, { xmin: -0.5, xmax: 4.5, ymin: -3, ymax: 14 });
    function draw() {
      let x = +x0r.value; const n = +nr.value;
      fig.querySelector('.x0').textContent = fmt(x, 1); fig.querySelector('.nval').textContent = n;
      P.clear(); P.fn(f, C.f());
      const rows = [`x₀ = ${fmt(x, 8)}`];
      for (let i = 0; i < n; i++) {
        const nx = x - f(x) / d(x);
        P.line(x, 0, x, f(x), cssVar('--plot-label'), 1, [3, 3]);
        P.line(x, f(x), nx, 0, C.g(), 2);
        P.dot(x, f(x), C.g(), 4);
        x = nx; rows.push(`x${'₁₂₃₄₅'[i]} = ${fmt(x, 8)}`);
      }
      P.dot(x, 0, C.h(), 5);
      out.innerHTML = `<div class="readout-grid"><div class="mono">${rows.join('<br>')}</div>
        <div>True value √2 ≈ <b>1.41421356</b>. Each tangent line's x-intercept is the next guess; correct digits roughly double each step.</div></div>`;
    }
    [x0r, nr].forEach(n => n.addEventListener('input', draw)); onResize(cv, draw); draw();
  };

  /* Slope field for dy/dx = F(x, y). */
  W['slopefield'] = function (host) {
    const eqs = {
      'y': { F: (x, y) => y, label: "dy/dx = y", sol: (x, c) => c * Math.exp(x) },
      'x': { F: (x, y) => x, label: "dy/dx = x", sol: (x, c) => x * x / 2 + c },
      'logistic': { F: (x, y) => y * (1 - y / 4), label: "dy/dx = y(1 − y/4)", sol: null },
      'x-y': { F: (x, y) => x - y, label: "dy/dx = x − y", sol: null }
    };
    const fig = shell('Slope fields and solution curves',
      `<label>Equation <select class="esel">${Object.keys(eqs).map(k => `<option value="${k}">${eqs[k].label}</option>`).join('')}</select></label>
       <span class="hint-inline">Click/tap the graph to launch a solution curve from that point.</span>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), sel = fig.querySelector('.esel'), out = fig.querySelector('.widget-readout');
    const P = new Plot(cv, { xmin: -4, xmax: 4, ymin: -2, ymax: 6 });
    let starts = [[0, 1]];
    function rk(F, x, y, h) {
      const k1 = F(x, y), k2 = F(x + h / 2, y + h * k1 / 2), k3 = F(x + h / 2, y + h * k2 / 2), k4 = F(x + h, y + h * k3);
      return y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
    }
    function draw() {
      const E = eqs[sel.value]; P.clear();
      const ctx = P.ctx; ctx.strokeStyle = cssVar('--plot-label'); ctx.lineWidth = 1.2;
      for (let x = Math.ceil(P.xmin); x <= P.xmax; x += 0.5) for (let y = Math.ceil(P.ymin); y <= P.ymax; y += 0.5) {
        const m = E.F(x, y), ang = Math.atan(m * (P.h / (P.ymax - P.ymin)) / (P.w / (P.xmax - P.xmin)));
        const L = 8, cx = P.X(x), cy = P.Y(y);
        ctx.beginPath(); ctx.moveTo(cx - L * Math.cos(ang), cy + L * Math.sin(ang)); ctx.lineTo(cx + L * Math.cos(ang), cy - L * Math.sin(ang)); ctx.stroke();
      }
      starts.forEach(([x0, y0]) => {
        ctx.strokeStyle = C.f(); ctx.lineWidth = 2.5;
        [0.01, -0.01].forEach(h => {
          ctx.beginPath(); let x = x0, y = y0; ctx.moveTo(P.X(x), P.Y(y));
          for (let i = 0; i < 1000 && x >= P.xmin && x <= P.xmax && Math.abs(y) < 50; i++) { y = rk(E.F, x, y, h); x += h; ctx.lineTo(P.X(x), P.Y(y)); }
          ctx.stroke();
        });
        P.dot(x0, y0, C.g(), 4);
      });
      out.innerHTML = `<div>Each short segment has slope given by the equation at that point. Solution curves follow the segments. Curves drawn: <b>${starts.length}</b> <button type="button" class="btn btn-small clr">Clear</button></div>`;
      out.querySelector('.clr').onclick = () => { starts = []; draw(); };
    }
    cv.addEventListener('click', e => {
      const r = cv.getBoundingClientRect();
      const x = P.xmin + (e.clientX - r.left) / r.width * (P.xmax - P.xmin);
      const y = P.ymax - (e.clientY - r.top) / r.height * (P.ymax - P.ymin);
      starts.push([x, y]); if (starts.length > 8) starts.shift(); draw();
    });
    sel.addEventListener('input', () => { starts = [[0, 1]]; draw(); }); onResize(cv, draw); draw();
  };

  /* Polar curves. */
  W['polar'] = function (host) {
    const curves = {
      rose: { r: (t, k) => Math.cos(k * t), label: 'r = cos(kθ)  (rose)', range: 2 },
      cardioid: { r: (t, k) => k / 2 * (1 + Math.cos(t)), label: 'r = (k/2)(1 + cos θ)  (cardioid)', range: 6 },
      spiral: { r: (t, k) => 0.08 * k * t, label: 'r = 0.08kθ  (spiral)', range: 6 }
    };
    const fig = shell('Polar curves',
      `<label>Curve <select class="csel">${Object.keys(curves).map(k => `<option value="${k}">${curves[k].label}</option>`).join('')}</select></label>
       <label>k = <b class="kval">3</b><input class="kr" type="range" min="1" max="8" value="3"></label>
       <label>θ up to <b class="tval">2π</b><input class="tr" type="range" min="1" max="100" value="100"></label>`, '');
    host.appendChild(fig);
    const cv = fig.querySelector('canvas'), cs = fig.querySelector('.csel'), kr = fig.querySelector('.kr'), tr = fig.querySelector('.tr'), out = fig.querySelector('.widget-readout');
    const P = new Plot(cv);
    function draw() {
      const Cv = curves[cs.value], k = +kr.value, tmax = 2 * Math.PI * tr.value / 100 * (cs.value === 'spiral' ? 3 : 1);
      fig.querySelector('.kval').textContent = k; fig.querySelector('.tval').textContent = fmt(tmax / Math.PI, 2) + 'π';
      const asp = (cv.clientWidth || 600) / (cv.clientHeight || 340), R = Cv.range * 1.1;
      Object.assign(P, { xmin: -R * asp, xmax: R * asp, ymin: -R, ymax: R });
      P.clear(); const ctx = P.ctx; ctx.strokeStyle = C.f(); ctx.lineWidth = 2.5; ctx.beginPath();
      const N = 1500;
      for (let i = 0; i <= N; i++) { const t = tmax * i / N, r = Cv.r(t, k); const x = r * Math.cos(t), y = r * Math.sin(t); i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)); }
      ctx.stroke();
      const r = Cv.r(tmax, k); P.line(0, 0, r * Math.cos(tmax), r * Math.sin(tmax), C.g(), 1.5, [4, 3]); P.dot(r * Math.cos(tmax), r * Math.sin(tmax), C.g());
      out.innerHTML = `<div>Point at θ = ${fmt(tmax, 3)}: r = <b>${fmt(r, 3)}</b>, (x, y) = (r cos θ, r sin θ) = <b>(${fmt(r * Math.cos(tmax), 3)}, ${fmt(r * Math.sin(tmax), 3)})</b>${r < 0 ? ' — r is negative, so the point is plotted in the opposite direction.' : ''}</div>`;
    }
    [cs, kr, tr].forEach(n => n.addEventListener('input', draw)); onResize(cv, draw); draw();
  };

  /* Free-form grapher (used on the Tools page). */
  W['grapher'] = function (host) {
    const fig = el(`<figure class="widget-card grapher">
      <figcaption class="widget-head"><span class="widget-badge">Tool</span> Function grapher &amp; calculus calculator</figcaption>
      <div class="grapher-inputs">
        <label class="grow">f(x) = <input class="fx" type="text" value="x^3 - 3x + 1" spellcheck="false" autocomplete="off" aria-label="Function of x"></label>
        <label>x from <input class="x1" type="number" value="-4" step="any"></label>
        <label>to <input class="x2" type="number" value="4" step="any"></label>
      </div>
      <div class="grapher-opts">
        <label><input type="checkbox" class="showd" checked> Show f′(x)</label>
        <label><input type="checkbox" class="showi"> Shade ∫ from a to b</label>
        <label>a <input class="ia" type="number" value="-1" step="any"></label>
        <label>b <input class="ib" type="number" value="2" step="any"></label>
      </div>
      <div class="grapher-err" role="alert"></div>
      <div class="widget-canvas-wrap tall"><canvas class="widget-canvas" role="img" aria-label="Graph of f"></canvas></div>
      <div class="widget-controls"><label>Trace x = <b class="tval">0</b><input class="tr" type="range" min="0" max="1000" value="500"></label></div>
      <div class="widget-readout" aria-live="polite"></div>
      <p class="grapher-help">Examples: <code>sin(x)/x</code>, <code>e^(-x^2)</code>, <code>ln(x)</code>, <code>sqrt(4-x^2)</code>, <code>|x|</code>, <code>x^(1/3)</code>, <code>2x sin(x)</code>. Supports + − * / ^, implicit multiplication, sin cos tan sec csc cot, arcsin arccos arctan, sinh cosh tanh, ln log exp sqrt abs, pi, e.</p>
    </figure>`);
    host.appendChild(fig);
    const q = s => fig.querySelector(s);
    const cv = q('canvas'), P = new Plot(cv);
    let f = null;
    function draw() {
      const err = q('.grapher-err');
      try { f = compile(q('.fx').value); f(1); err.textContent = ''; }
      catch (e) { err.textContent = '⚠ ' + e.message; return; }
      let x1 = +q('.x1').value, x2 = +q('.x2').value;
      if (!(x2 > x1)) { err.textContent = '⚠ "to" must be larger than "from".'; return; }
      // auto y-range from sampled values (robust percentiles)
      const ys = [];
      for (let i = 0; i <= 400; i++) { const y = f(x1 + (x2 - x1) * i / 400); if (isFinite(y)) ys.push(y); }
      ys.sort((a, b) => a - b);
      let lo = ys.length ? ys[Math.floor(ys.length * 0.02)] : -5, hi = ys.length ? ys[Math.ceil(ys.length * 0.98) - 1] : 5;
      if (hi - lo < 1e-6) { lo -= 1; hi += 1; }
      const pad = (hi - lo) * 0.15; lo = Math.min(lo - pad, 0 - pad * 0.2); hi = Math.max(hi + pad, pad * 0.2);
      Object.assign(P, { xmin: x1, xmax: x2, ymin: lo, ymax: hi });
      P.clear();
      const a = +q('.ia').value, b = +q('.ib').value;
      let integ = null;
      if (q('.showi').checked && isFinite(a) && isFinite(b) && a !== b) {
        const lo2 = Math.min(a, b), hi2 = Math.max(a, b);
        P.area(t => Math.max(f(t), 0), lo2, hi2, C.fill()); P.area(t => Math.min(f(t), 0), lo2, hi2, C.fill2());
        integ = simpson(f, a, b, 2000);
      }
      if (q('.showd').checked) P.fn(x => deriv(f, x), C.g(), 2, undefined, undefined, [6, 4]);
      P.fn(f, C.f(), 2.5);
      const t = x1 + (x2 - x1) * q('.tr').value / 1000, yt = f(t), mt = deriv(f, t), d2 = (f(t + 1e-3) - 2 * yt + f(t - 1e-3)) / 1e-6;
      q('.tval').textContent = fmt(t, 3);
      if (isFinite(yt)) { P.fn(x => yt + mt * (x - t), C.h(), 1.5, t - (x2 - x1) * 0.15, t + (x2 - x1) * 0.15); P.dot(t, yt, C.h()); }
      q('.widget-readout').innerHTML = `<div class="readout-grid">
        <div><span class="sw" style="background:${C.f()}"></span>f(${fmt(t, 3)}) = <b>${fmt(yt, 5)}</b></div>
        <div><span class="sw" style="background:${C.g()}"></span>f′(${fmt(t, 3)}) ≈ <b>${fmt(mt, 5)}</b> &nbsp; f″ ≈ <b>${fmt(d2, 3)}</b> (${!isFinite(d2) ? '—' : d2 > 0.01 ? 'concave up' : d2 < -0.01 ? 'concave down' : 'near inflection'})</div>
        ${integ !== null ? `<div>∫ from ${fmt(a, 3)} to ${fmt(b, 3)} of f(x) dx ≈ <b>${fmt(integ, 6)}</b> (Simpson's rule)</div>` : ''}
        </div>`;
    }
    fig.querySelectorAll('input').forEach(n => n.addEventListener('input', draw));
    onResize(cv, draw); draw();
  };

  function mountWidgets(root) {
    root.querySelectorAll('[data-widget]').forEach(node => {
      if (node.dataset.mounted) return;
      const fn = W[node.dataset.widget];
      if (fn) { node.dataset.mounted = '1'; try { fn(node); } catch (e) { console.error('Widget failed', node.dataset.widget, e); } }
    });
  }

  window.CalcWidgets = { mount: mountWidgets, compile, Plot };
})();
