/* Calculus Companion — single-page app: router, views, quizzes, search, progress. */
(function () {
  'use strict';
  const CALC = window.CALC;
  CALC.finalize();
  const chapters = CALC.chapters;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------------- Persistent state ---------------- */
  const KEY = 'calc-companion:v1';
  const store = (() => {
    let data = { done: {}, quiz: {}, tests: {}, last: null, theme: null };
    try { const raw = localStorage.getItem(KEY); if (raw) data = Object.assign(data, JSON.parse(raw)); } catch (e) { /* storage blocked */ }
    return {
      data,
      save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignore */ } },
      reset() { data.done = {}; data.quiz = {}; data.tests = {}; data.last = null; this.save(); }
    };
  })();
  const S = store.data;

  /* ---------------- Lookups ---------------- */
  const findCh = id => chapters.find(c => c.id === id);
  const secKey = (ch, s) => ch.id + '/' + s.id;
  const flatSections = [];
  chapters.forEach(ch => ch.sections.forEach((s, i) => flatSections.push({ ch, s, i })));
  const chProgress = ch => {
    const n = ch.sections.length; if (!n) return 0;
    return ch.sections.filter(s => S.done[secKey(ch, s)]).length / n;
  };
  const parts = [];
  chapters.forEach(ch => { let p = parts.find(x => x.name === ch.part); if (!p) parts.push(p = { name: ch.part, chapters: [] }); p.chapters.push(ch); });

  /* ---------------- Math rendering ---------------- */
  function typeset(node) {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(node, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'input'],
      ignoredClasses: ['no-math']
    });
  }
  function enhance(node) {
    typeset(node);
    window.CalcWidgets && window.CalcWidgets.mount(node);
    // tables scroll on small screens
    $$('table', node).forEach(t => { if (!t.parentElement.classList.contains('table-wrap')) { const w = document.createElement('div'); w.className = 'table-wrap'; t.replaceWith(w); w.appendChild(t); } });
  }

  /* ---------------- Theme ---------------- */
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme');
    const dark = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const btn = $('#themeBtn');
    if (btn) { btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode'); btn.innerHTML = dark ? ICON.sun : ICON.moon; }
    window.dispatchEvent(new Event('calc-theme'));
  }
  const ICON = {
    sun: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
  };

  /* ---------------- Sidebar ---------------- */
  function buildSidebar() {
    const nav = $('#toc');
    let h = `<ul class="toc-top">
      <li><a href="#/" data-route="home">🏠 Home</a></li>
      <li><a href="#/syllabus" data-route="syllabus">📋 Syllabus (MATH 2413)</a></li>
      <li><a href="#/practice" data-route="practice">🎯 Practice Center</a></li>
      <li><a href="#/formulas" data-route="formulas">📐 Formula Sheet</a></li>
      <li><a href="#/tools" data-route="tools">📈 Graphing Tool</a></li>
    </ul>`;
    parts.forEach(p => {
      h += `<div class="toc-part">${esc(p.name)}</div><ul class="toc-chapters">`;
      p.chapters.forEach(ch => {
        h += `<li class="toc-ch" data-ch="${ch.id}">
          <button class="toc-ch-btn" aria-expanded="false" type="button">
            <span class="toc-chev">${ICON.chev}</span>
            <span class="toc-ch-num">${ch.num}</span><span class="toc-ch-title">${esc(ch.title)}</span>
            <span class="toc-ring" style="--p:${Math.round(chProgress(ch) * 100)}"></span>
          </button>
          <ul class="toc-secs">
            <li><a href="#/learn/${ch.id}" class="toc-overview">Chapter overview</a></li>
            ${ch.sections.map((s, i) => `<li><a href="#/learn/${ch.id}/${s.id}" data-key="${secKey(ch, s)}">
              <span class="toc-check">${ICON.check}</span><span>${ch.num}.${i + 1} ${esc(s.title)}</span></a></li>`).join('')}
            <li><a href="#/learn/${ch.id}/test" class="toc-test">📝 Chapter test</a></li>
          </ul></li>`;
      });
      h += '</ul>';
    });
    nav.innerHTML = h;
    $$('.toc-ch-btn', nav).forEach(b => b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
    }));
    typeset(nav);
    refreshSidebar();
  }
  function refreshSidebar(route) {
    $$('#toc a[data-key]').forEach(a => a.classList.toggle('done', !!S.done[a.dataset.key]));
    $$('#toc .toc-ch').forEach(li => {
      const ch = findCh(li.dataset.ch);
      $('.toc-ring', li).style.setProperty('--p', Math.round(chProgress(ch) * 100));
    });
    const hash = location.hash || '#/';
    $$('#toc a').forEach(a => {
      const on = a.getAttribute('href') === hash;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (route && route.ch) {
      const li = $(`#toc .toc-ch[data-ch="${route.ch.id}"] .toc-ch-btn`);
      if (li) li.setAttribute('aria-expanded', 'true');
      const act = $('#toc a.active');
      if (act && window.innerWidth > 960) {
        const nav = $('#sidebar'), r = act.getBoundingClientRect(), nr = nav.getBoundingClientRect();
        if (r.top < nr.top + 60 || r.bottom > nr.bottom - 20) act.scrollIntoView({ block: 'center' });
      }
    }
    const total = flatSections.length, done = flatSections.filter(x => S.done[secKey(x.ch, x.s)]).length;
    $('#progressPill').textContent = Math.round(done / total * 100) + '% complete';
    $('#progressPill').title = `${done} of ${total} sections complete`;
  }
  function closeDrawer() { document.body.classList.remove('drawer-open'); $('#menuBtn').setAttribute('aria-expanded', 'false'); }

  /* ---------------- Quiz engine ---------------- */
  const LETTERS = 'ABCDEFG';
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /**
   * Builds one multiple-choice card.
   * q = { q, c:[choices], a:index, e:explanation, w:[why each wrong choice is wrong], h:hint }
   */
  function questionCard(q, opts) {
    opts = opts || {};
    const order = opts.shuffle ? shuffle(q.c.map((_, i) => i)) : q.c.map((_, i) => i);
    const card = document.createElement('div');
    card.className = 'qcard';
    card.innerHTML = `
      <div class="qhead">${opts.label ? `<span class="qnum">${esc(opts.label)}</span>` : ''}${opts.source ? `<span class="qsrc">${esc(opts.source)}</span>` : ''}</div>
      <div class="qtext">${q.q}</div>
      <div class="choices" role="group" aria-label="Answer choices">
        ${order.map((orig, k) => `<button type="button" class="choice" data-orig="${orig}">
          <span class="letter">${LETTERS[k]}</span><span class="ctext">${q.c[orig]}</span><span class="mark" aria-hidden="true"></span></button>`).join('')}
      </div>
      ${q.h ? `<div class="hint-wrap"><button type="button" class="btn btn-ghost btn-small hint-btn">💡 Show hint</button><div class="hint" hidden>${q.h}</div></div>` : ''}
      <div class="feedback" hidden aria-live="polite"></div>`;
    const fb = $('.feedback', card);
    function answer(orig, silent) {
      const correct = orig === q.a;
      $$('.choice', card).forEach(b => {
        b.disabled = true;
        const o = +b.dataset.orig;
        if (o === q.a) b.classList.add('is-correct');
        if (o === orig && !correct) b.classList.add('is-wrong');
        if (o === orig) b.classList.add('picked');
        $('.mark', b).textContent = o === q.a ? '✓' : (o === orig ? '✗' : '');
      });
      const ansLetter = LETTERS[order.indexOf(q.a)];
      const why = !correct && q.w && q.w[orig] ? `<div class="fb-why"><b>Why “${LETTERS[order.indexOf(orig)]}” isn't right:</b> ${q.w[orig]}</div>` : '';
      fb.innerHTML = `<div class="fb-title">${correct ? '✅ Correct!' : `❌ Not quite — the correct answer is <b>${ansLetter}</b>.`}</div>
        ${why}<div class="fb-explain"><b>Explanation:</b> ${q.e}</div>
        ${opts.retry && !correct ? '<button type="button" class="btn btn-small btn-ghost retry-btn">↺ Try this question again</button>' : ''}`;
      fb.hidden = false; fb.className = 'feedback ' + (correct ? 'good' : 'bad');
      card.classList.add('answered', correct ? 'was-correct' : 'was-wrong');
      typeset(fb);
      const rb = $('.retry-btn', fb);
      if (rb) rb.onclick = () => { const n = questionCard(q, opts); card.replaceWith(n); typeset(n); $('.choice', n).focus(); };
      if (!silent && opts.onAnswer) opts.onAnswer(correct, orig);
    }
    $$('.choice', card).forEach(b => b.addEventListener('click', () => answer(+b.dataset.orig)));
    const hb = $('.hint-btn', card);
    if (hb) hb.onclick = () => { const h = $('.hint', card); h.hidden = !h.hidden; hb.textContent = h.hidden ? '💡 Show hint' : '💡 Hide hint'; };
    card.answer = answer;
    if (opts.preset !== undefined && opts.preset !== null) answer(opts.preset, true);
    return card;
  }

  /** One-question-at-a-time test runner with a results report. */
  function runTest(host, items, cfg) {
    // items: [{q, chId, key}]
    const st = { idx: 0, answers: [] };
    host.innerHTML = '';
    const wrap = document.createElement('div'); wrap.className = 'test-runner'; host.appendChild(wrap);
    function keyHandler(e) {
      if (!document.body.contains(wrap)) { document.removeEventListener('keydown', keyHandler); return; }
      if (e.target.matches('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
      const card = $('.qcard', wrap); if (!card) return;
      const k = e.key.toUpperCase();
      const i = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'ABCD'.indexOf(k);
      if (i >= 0 && !card.classList.contains('answered')) { const b = $$('.choice', card)[i]; if (b) { b.click(); e.preventDefault(); } }
      else if (e.key === 'Enter' && card.classList.contains('answered')) { const n = $('.next-btn', wrap); if (n) { n.click(); e.preventDefault(); } }
    }
    document.addEventListener('keydown', keyHandler);
    function show() {
      const it = items[st.idx];
      const pct = Math.round(st.idx / items.length * 100);
      const correctSoFar = st.answers.filter(a => a.correct).length;
      wrap.innerHTML = `<div class="test-bar">
          <div class="test-meta"><span>Question <b>${st.idx + 1}</b> of ${items.length}</span><span>Score: <b>${correctSoFar}</b> / ${st.answers.length}</span></div>
          <div class="bar"><span style="width:${pct}%"></span></div></div>
        <div class="test-q"></div>
        <div class="test-nav"><span class="kbd-hint">Tip: press 1–4 to answer, Enter to continue</span>
        <button type="button" class="btn btn-primary next-btn" disabled>${st.idx === items.length - 1 ? 'See results →' : 'Next question →'}</button></div>`;
      const card = questionCard(it.q, {
        shuffle: true, label: 'Q' + (st.idx + 1), source: it.src,
        onAnswer: (correct, orig) => {
          st.answers.push({ correct, orig, it });
          if (it.key) { S.quiz[it.key] = correct; store.save(); }
          const nb = $('.next-btn', wrap); nb.disabled = false; nb.focus({ preventScroll: true });
          $('.test-meta', wrap).lastElementChild.innerHTML = `Score: <b>${st.answers.filter(a => a.correct).length}</b> / ${st.answers.length}`;
        }
      });
      $('.test-q', wrap).appendChild(card);
      typeset(wrap);
      $('.next-btn', wrap).onclick = () => { st.idx++; if (st.idx < items.length) { show(); wrap.scrollIntoView({ block: 'start', behavior: 'smooth' }); } else results(); };
    }
    function results() {
      const n = items.length, c = st.answers.filter(a => a.correct).length, pct = Math.round(c / n * 100);
      if (cfg.id) { const prev = S.tests[cfg.id] || 0; S.tests[cfg.id] = Math.max(prev, pct); store.save(); }
      const msg = pct >= 90 ? 'Outstanding — you have mastered this material! 🏆' : pct >= 75 ? 'Great work! Review the few you missed and you\'ll be set. 🎉' : pct >= 50 ? 'Good effort. Re-read the sections tied to your misses, then retry. 💪' : 'Keep going! Revisit the lessons below and try again — every attempt builds skill. 📚';
      const byCh = {};
      st.answers.forEach(a => { const k = a.it.chId; byCh[k] = byCh[k] || { c: 0, n: 0 }; byCh[k].n++; if (a.correct) byCh[k].c++; });
      const missed = st.answers.filter(a => !a.correct);
      wrap.innerHTML = `<div class="results">
        <div class="score-ring" style="--p:${pct}"><div><b>${pct}%</b><span>${c} / ${n}</span></div></div>
        <h2>${esc(cfg.title || 'Results')}</h2><p class="lead">${msg}</p>
        ${Object.keys(byCh).length > 1 ? `<div class="breakdown"><h3>By chapter</h3>${Object.keys(byCh).map(id => { const ch = findCh(id), b = byCh[id]; return `<div class="brow"><a href="#/learn/${id}">${ch.num}. ${esc(ch.title)}</a><div class="bar small"><span style="width:${b.c / b.n * 100}%"></span></div><span>${b.c}/${b.n}</span></div>`; }).join('')}</div>` : ''}
        <div class="result-actions">
          ${missed.length ? '<button type="button" class="btn btn-primary retry-missed">↺ Retry the ' + missed.length + ' I missed</button>' : ''}
          <button type="button" class="btn btn-ghost retry-all">Start a new attempt</button>
          ${cfg.back ? `<a class="btn btn-ghost" href="${cfg.back.href}">${esc(cfg.back.label)}</a>` : ''}
        </div>
        ${missed.length ? '<h3 class="review-h">Review your misses</h3><div class="review-list"></div>' : '<p class="perfect">Perfect score — nothing to review!</p>'}
      </div>`;
      const rl = $('.review-list', wrap);
      missed.forEach((a, i) => {
        const cardEl = questionCard(a.it.q, { label: 'Missed ' + (i + 1), source: a.it.src, preset: a.orig });
        if (a.it.link) { const l = document.createElement('a'); l.className = 'review-link'; l.href = a.it.link; l.textContent = '📖 Re-read this lesson →'; cardEl.appendChild(l); }
        rl.appendChild(cardEl);
      });
      typeset(wrap);
      const rm = $('.retry-missed', wrap); if (rm) rm.onclick = () => runTest(host, shuffle(missed.map(a => a.it)), Object.assign({}, cfg, { id: null, title: 'Retry: missed questions' }));
      $('.retry-all', wrap).onclick = () => runTest(host, shuffle(items), cfg);
      wrap.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    show();
  }

  function itemsForChapter(ch) {
    const items = [];
    ch.sections.forEach((s, si) => (s.quiz || []).forEach((q, qi) => items.push({ q, chId: ch.id, key: `${ch.id}/${s.id}/${qi}`, src: `${ch.num}.${si + 1} ${s.title}`, link: `#/learn/${ch.id}/${s.id}` })));
    ch.review.forEach((q, qi) => items.push({ q, chId: ch.id, key: `${ch.id}/review/${qi}`, src: `Chapter ${ch.num} review`, link: `#/learn/${ch.id}` }));
    return items;
  }

  /* ---------------- Views ---------------- */
  const main = () => $('#main');
  function setTitle(t) { document.title = t ? `${t} · Calculus Companion` : 'Calculus Companion — A Complete Interactive Calculus Textbook'; }

  function viewHome() {
    setTitle('');
    const total = flatSections.length, done = flatSections.filter(x => S.done[secKey(x.ch, x.s)]).length;
    const answered = Object.keys(S.quiz).length, right = Object.values(S.quiz).filter(Boolean).length;
    const qTotal = chapters.reduce((n, ch) => n + itemsForChapter(ch).length, 0);
    const last = S.last && findCh(S.last.ch);
    const lastSec = last && last.sections.find(s => s.id === S.last.s);
    const firstUndone = flatSections.find(x => !S.done[secKey(x.ch, x.s)]);
    const cont = lastSec ? { href: `#/learn/${last.id}/${lastSec.id}`, label: `Continue: ${last.num}.${last.sections.indexOf(lastSec) + 1} ${lastSec.title}` }
      : { href: `#/learn/${flatSections[0].ch.id}/${flatSections[0].s.id}`, label: 'Start Chapter 0 →' };
    main().innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">Free interactive textbook · Aligned to TCCNS MATH 2413 (Calculus I)</p>
          <h1>Learn calculus from the ground up — <span class="grad">one clear idea at a time.</span></h1>
          <p class="lead">${chapters.length} chapters, ${total} lessons, ${qTotal} practice questions with step‑by‑step feedback, and live graphs you can drag. Start with a precalculus refresher and finish with series, polar curves, and multivariable calculus.</p>
          <div class="hero-cta">
            <a class="btn btn-primary btn-lg" href="${cont.href}">${esc(cont.label)}</a>
            <a class="btn btn-ghost btn-lg" href="#/practice">🎯 Practice questions</a>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true"><div data-widget="derivative"></div></div>
      </section>

      <section class="stats">
        <div class="stat"><b>${Math.round(done / total * 100)}%</b><span>lessons complete (${done}/${total})</span></div>
        <div class="stat"><b>${answered}</b><span>questions answered</span></div>
        <div class="stat"><b>${answered ? Math.round(right / answered * 100) + '%' : '—'}</b><span>accuracy</span></div>
        <div class="stat"><b>${firstUndone ? firstUndone.ch.num + '.' + (firstUndone.i + 1) : '🎓'}</b><span>${firstUndone ? 'next unfinished lesson' : 'all done!'}</span></div>
      </section>

      <section class="howto">
        <h2>How to use this book</h2>
        <div class="howto-grid">
          <div class="howto-card"><span class="hi">📖</span><h3>Read a lesson</h3><p>Each lesson explains the idea in plain language first, then the formal math, then worked examples with hidden solutions you can reveal.</p></div>
          <div class="howto-card"><span class="hi">🖱️</span><h3>Play with the graphs</h3><p>Interactive figures let you drag sliders to <em>see</em> limits, tangent lines, and areas form in real time.</p></div>
          <div class="howto-card"><span class="hi">✅</span><h3>Check yourself</h3><p>Every lesson ends with multiple-choice questions. Wrong answers explain the exact mistake you likely made.</p></div>
          <div class="howto-card"><span class="hi">📝</span><h3>Take chapter tests</h3><p>Mixed-question tests and a custom Practice Center track your best scores. Progress saves in your browser.</p></div>
        </div>
      </section>

      ${parts.map(p => `<section class="part-block">
        <h2>${esc(p.name)}</h2>
        <div class="ch-grid">${p.chapters.map(ch => {
          const pr = Math.round(chProgress(ch) * 100), best = S.tests['ch:' + ch.id];
          return `<a class="ch-card" href="#/learn/${ch.id}">
            <div class="ch-card-top"><span class="ch-num">${ch.num}</span>${ch.tag ? `<span class="tag">${esc(ch.tag)}</span>` : ''}</div>
            <h3>${esc(ch.title)}</h3><p>${ch.blurb}</p>
            <div class="ch-card-foot"><div class="bar small"><span style="width:${pr}%"></span></div>
            <span>${pr}% · ${ch.sections.length} lessons${best !== undefined ? ` · best test ${best}%` : ''}</span></div></a>`;
        }).join('')}</div></section>`).join('')}

      <section class="reset-zone"><button type="button" class="btn btn-ghost btn-small" id="resetBtn">Reset my progress</button></section>`;
    $('#resetBtn').onclick = () => { if (confirm('Erase all saved progress, quiz answers, and test scores?')) { store.reset(); buildSidebar(); render(); } };
  }

  function viewSyllabus() {
    setTitle('Syllabus');
    const sy = CALC.syllabus;
    main().innerHTML = `<article class="prose page">${sy.html}</article>`;
    enhance(main());
  }
  function viewFormulas() { setTitle('Formula Sheet'); main().innerHTML = `<article class="prose page">${CALC.formulas}</article>`; enhance(main()); }
  function viewTools() {
    setTitle('Graphing Tool');
    main().innerHTML = String.raw`<article class="prose page"><p class="eyebrow">Tools</p><h1>Graphing tool</h1>
      <p class="lead">Type any function to see its graph, its derivative, a tangent line you can slide, and a numerical definite integral. Use it to check homework answers and build intuition.</p>
      <div data-widget="grapher"></div>
      <h2>Ideas to try</h2><ul>
      <li>Graph <code>x^3 - 3x + 1</code> with f′ shown. Where does the dashed f′ curve cross zero? Those are where f has peaks and valleys.</li>
      <li>Graph <code>sin(x)/x</code> and trace toward x = 0 to see why $\lim_{x\to0} \frac{\sin x}{x}=1$.</li>
      <li>Shade $\int_{-1}^{1}\sqrt{1-x^2}\,dx$ with <code>sqrt(1-x^2)</code>. Compare the answer to $\pi/2 \approx 1.5708$.</li>
      <li>Graph <code>e^(-x^2)</code> from −3 to 3 and shade from −3 to 3. Compare to $\sqrt{\pi}\approx1.7725$.</li>
      </ul></article>`;
    enhance(main());
  }

  function viewChapter(ch) {
    setTitle(`Chapter ${ch.num}: ${ch.title}`);
    const items = itemsForChapter(ch), best = S.tests['ch:' + ch.id];
    main().innerHTML = `<article class="prose page">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> › <span>${esc(ch.part)}</span></nav>
      <p class="eyebrow">Chapter ${ch.num}</p><h1>${esc(ch.title)}</h1>
      <div class="ch-intro">${ch.intro || `<p class="lead">${ch.blurb}</p>`}</div>
      ${ch.objectives ? `<div class="callout objectives"><div class="callout-h">🎯 Learning objectives</div><ul>${ch.objectives.map(o => `<li>${o}</li>`).join('')}</ul></div>` : ''}
      <h2>Lessons</h2>
      <ol class="sec-list">${ch.sections.map((s, i) => `<li><a href="#/learn/${ch.id}/${s.id}" class="${S.done[secKey(ch, s)] ? 'done' : ''}">
        <span class="sl-num">${ch.num}.${i + 1}</span><span class="sl-title">${esc(s.title)}</span>
        <span class="sl-meta">${(s.quiz || []).length} questions</span><span class="toc-check">${ICON.check}</span></a></li>`).join('')}</ol>
      <div class="callout test-cta"><div><b>📝 Chapter ${ch.num} test</b> — ${items.length} questions drawn from every lesson plus chapter review problems.${best !== undefined ? ` Your best: <b>${best}%</b>.` : ''}</div>
      <a class="btn btn-primary" href="#/learn/${ch.id}/test">Take the test</a></div>
    </article>`;
    enhance(main());
  }

  function viewSection(ch, s) {
    const i = ch.sections.indexOf(s), key = secKey(ch, s);
    setTitle(`${ch.num}.${i + 1} ${s.title}`);
    S.last = { ch: ch.id, s: s.id }; store.save();
    const gi = flatSections.findIndex(x => x.s === s && x.ch === ch);
    const prev = flatSections[gi - 1], next = flatSections[gi + 1];
    const words = s.html.replace(/<[^>]+>/g, ' ').split(/\s+/).length;
    main().innerHTML = `<div class="section-layout">
      <article class="prose lesson">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> › <a href="#/learn/${ch.id}">Ch. ${ch.num} ${esc(ch.title)}</a></nav>
        <p class="eyebrow">Section ${ch.num}.${i + 1} · ~${Math.max(3, Math.round(words / 160))} min read</p>
        <h1>${esc(s.title)}</h1>
        <div class="lesson-body">${s.html}</div>
        ${(s.quiz || []).length ? `<section class="quiz-block" id="quiz">
          <h2>✏️ Check your understanding</h2>
          <p class="muted">Pick an answer to get instant feedback. Wrong choices explain the likely mistake.</p>
          <div class="quiz-list"></div><div class="quiz-summary" aria-live="polite"></div></section>` : ''}
        <div class="complete-row"><button type="button" class="btn ${S.done[key] ? 'btn-done' : 'btn-primary'}" id="doneBtn">${S.done[key] ? '✓ Completed' : 'Mark lesson complete'}</button></div>
        <nav class="pager" aria-label="Lesson navigation">
          ${prev ? `<a class="pg prev" href="#/learn/${prev.ch.id}/${prev.s.id}"><span>← Previous</span><b>${prev.ch.num}.${prev.i + 1} ${esc(prev.s.title)}</b></a>` : '<span></span>'}
          ${next ? `<a class="pg next" href="#/learn/${next.ch.id}/${next.s.id}"><span>Next →</span><b>${next.ch.num}.${next.i + 1} ${esc(next.s.title)}</b></a>` : `<a class="pg next" href="#/practice"><span>Finished! →</span><b>Practice Center</b></a>`}
        </nav>
      </article>
      <aside class="otp" aria-label="On this page"><div class="otp-inner"><div class="otp-h">On this page</div><ul></ul></div></aside>
    </div>`;
    const ql = $('.quiz-list');
    const updateSummary = () => {
      const qs = s.quiz || []; let a = 0, c = 0;
      qs.forEach((_, qi) => { const v = S.quiz[`${key}/${qi}`]; if (v !== undefined) { a++; if (v) c++; } });
      const sum = $('.quiz-summary'); if (sum) sum.innerHTML = a ? `<div class="qs-pill">${c} of ${qs.length} correct on first try${a < qs.length ? ` · ${qs.length - a} left` : ''}</div>` : '';
      if (a === qs.length && qs.length && !S.done[key]) { S.done[key] = true; store.save(); markDoneBtn(); refreshSidebar({ ch }); }
    };
    if (ql) (s.quiz || []).forEach((q, qi) => {
      const k = `${key}/${qi}`;
      ql.appendChild(questionCard(q, { label: `Question ${qi + 1}`, retry: true, onAnswer: (correct) => { if (S.quiz[k] === undefined) { S.quiz[k] = correct; store.save(); } updateSummary(); } }));
    });
    function markDoneBtn() { const b = $('#doneBtn'); b.className = 'btn ' + (S.done[key] ? 'btn-done' : 'btn-primary'); b.textContent = S.done[key] ? '✓ Completed' : 'Mark lesson complete'; }
    $('#doneBtn').onclick = () => { S.done[key] = !S.done[key]; if (!S.done[key]) delete S.done[key]; store.save(); markDoneBtn(); refreshSidebar({ ch }); };
    enhance(main());
    updateSummary();
    buildOTP();
  }

  function buildOTP() {
    const hs = $$('.lesson-body h2, .quiz-block > h2');
    const ul = $('.otp ul'); if (!ul) return;
    hs.forEach((h, k) => {
      if (!h.id) h.id = 'h-' + k + '-' + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
      const li = document.createElement('li'); const a = document.createElement('a');
      a.href = '#'; a.innerHTML = h.innerHTML.replace(/^✏️\s*/, ''); $$('.katex-mathml', a).forEach(n => n.parentNode.removeChild(n)); a.dataset.target = h.id;
      a.onclick = e => { e.preventDefault(); h.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
      li.appendChild(a); ul.appendChild(li);
    });
    if (!hs.length) $('.otp').remove();
  }

  function viewTest(ch) {
    setTitle(`Chapter ${ch.num} Test`);
    const items = itemsForChapter(ch);
    main().innerHTML = `<article class="prose page">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> › <a href="#/learn/${ch.id}">Ch. ${ch.num} ${esc(ch.title)}</a></nav>
      <p class="eyebrow">Chapter ${ch.num} test</p><h1>${esc(ch.title)}</h1>
      <div class="test-start callout"><p>${items.length} questions · answer choices are shuffled · instant feedback on each one · your best score is saved.</p>
      <label>Number of questions <select id="tCount">${[10, 15, 20].filter(n => n < items.length).map(n => `<option value="${n}">${n}</option>`).join('')}<option value="${items.length}" selected>All ${items.length}</option></select></label>
      <button type="button" class="btn btn-primary" id="tStart">Begin test</button></div>
      <div id="testHost"></div></article>`;
    $('#tStart').onclick = () => {
      const n = +$('#tCount').value; $('.test-start').remove();
      runTest($('#testHost'), shuffle(items).slice(0, n), { id: n === items.length ? 'ch:' + ch.id : null, title: `Chapter ${ch.num} test results`, back: { href: `#/learn/${ch.id}`, label: 'Back to chapter' } });
    };
    typeset(main());
  }

  function viewPractice() {
    setTitle('Practice Center');
    main().innerHTML = `<article class="prose page">
      <p class="eyebrow">Practice Center</p><h1>Build a custom quiz</h1>
      <p class="lead">Mix questions from any chapters. Great for exam review — choose the chapters your test covers.</p>
      <form id="pForm" class="practice-form">
        ${parts.map(p => `<fieldset><legend>${esc(p.name)} <button type="button" class="linkish" data-all="${esc(p.name)}">select all</button></legend>
          ${p.chapters.map(ch => `<label class="ck"><input type="checkbox" name="ch" value="${ch.id}" ${p.name.indexOf('Calculus I') === 0 || /^Part II\b/.test(p.name) ? 'checked' : ''}>
          <span>${ch.num}. ${esc(ch.title)} <small>(${itemsForChapter(ch).length})</small></span></label>`).join('')}</fieldset>`).join('')}
        <div class="pf-row"><label>Questions <select name="n"><option>10</option><option selected>20</option><option>30</option><option>50</option></select></label>
        <label class="ck"><input type="checkbox" name="missed"> <span>Only questions I've missed before</span></label>
        <button class="btn btn-primary" type="submit">Start practice →</button></div>
        <p class="form-err" role="alert"></p>
      </form>
      <div id="pHost"></div></article>`;
    $$('[data-all]').forEach(b => b.onclick = () => { const fs = b.closest('fieldset'); const boxes = $$('input', fs); const all = boxes.every(x => x.checked); boxes.forEach(x => x.checked = !all); });
    $('#pForm').onsubmit = e => {
      e.preventDefault();
      const fd = new FormData(e.target), ids = fd.getAll('ch'), n = +fd.get('n'), onlyMissed = fd.get('missed');
      let pool = [];
      ids.forEach(id => pool = pool.concat(itemsForChapter(findCh(id))));
      if (onlyMissed) pool = pool.filter(it => S.quiz[it.key] === false);
      if (!pool.length) { $('.form-err').textContent = ids.length ? (onlyMissed ? 'No previously-missed questions in those chapters — nice! Uncheck that option.' : 'No questions found.') : 'Pick at least one chapter.'; return; }
      $('.form-err').textContent = '';
      e.target.hidden = true;
      runTest($('#pHost'), shuffle(pool).slice(0, n), { title: 'Practice results', back: { href: '#/practice', label: 'Build another quiz' } });
    };
  }

  function view404() { setTitle('Not found'); main().innerHTML = `<article class="prose page"><h1>Page not found</h1><p>That page doesn't exist. <a href="#/">Go home</a>.</p></article>`; }

  /* ---------------- Router ---------------- */
  function parse() {
    const parts_ = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean).map(decodeURIComponent);
    if (!parts_.length) return { name: 'home' };
    if (parts_[0] === 'learn') {
      const ch = findCh(parts_[1]); if (!ch) return { name: '404' };
      if (!parts_[2]) return { name: 'chapter', ch };
      if (parts_[2] === 'test') return { name: 'test', ch };
      const s = ch.sections.find(x => x.id === parts_[2]); return s ? { name: 'section', ch, s } : { name: '404' };
    }
    return { name: parts_[0] };
  }
  function render() {
    const r = parse();
    document.body.dataset.view = r.name;
    switch (r.name) {
      case 'home': viewHome(); break;
      case 'syllabus': viewSyllabus(); break;
      case 'formulas': viewFormulas(); break;
      case 'tools': viewTools(); break;
      case 'practice': viewPractice(); break;
      case 'chapter': viewChapter(r.ch); break;
      case 'section': viewSection(r.ch, r.s); break;
      case 'test': viewTest(r.ch); break;
      default: view404();
    }
    if (r.name === 'home') enhance(main());
    refreshSidebar(r);
    closeDrawer();
    window.scrollTo(0, 0);
    const h1 = $('#main h1'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }

  /* ---------------- Search ---------------- */
  let index = null;
  function buildIndex() {
    const tmp = document.createElement('div');
    index = [];
    chapters.forEach(ch => {
      index.push({ title: `Chapter ${ch.num}: ${ch.title}`, text: (ch.blurb || '').replace(/<[^>]+>/g, ''), href: `#/learn/${ch.id}`, kind: 'Chapter' });
      ch.sections.forEach((s, i) => {
        tmp.innerHTML = s.html; $$('[data-widget]', tmp).forEach(n => n.remove());
        index.push({ title: `${ch.num}.${i + 1} ${s.title}`, text: tmp.textContent.replace(/\s+/g, ' '), href: `#/learn/${ch.id}/${s.id}`, kind: `Ch. ${ch.num}` });
      });
    });
    index.push({ title: 'Formula Sheet', text: 'derivatives integrals trig identities series formulas reference', href: '#/formulas', kind: 'Page' });
    index.push({ title: 'Syllabus — TCCNS MATH 2413', text: 'syllabus learning outcomes course description schedule', href: '#/syllabus', kind: 'Page' });
    index.push({ title: 'Graphing Tool', text: 'graph plot function calculator derivative integral', href: '#/tools', kind: 'Page' });
  }
  function doSearch(qs) {
    if (!index) buildIndex();
    const terms = qs.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    if (!terms.length) return [];
    return index.map(it => {
      const t = it.title.toLowerCase(), x = it.text.toLowerCase();
      let score = 0;
      for (const term of terms) {
        const inT = t.includes(term), cnt = x.split(term).length - 1;
        if (!inT && !cnt) return null;
        score += (inT ? 20 : 0) + Math.min(cnt, 10);
      }
      return { it, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12).map(({ it }) => {
      const x = it.text, lx = x.toLowerCase(), p = lx.indexOf(terms[0]);
      let snip = p >= 0 ? (p > 50 ? '…' : '') + x.slice(Math.max(0, p - 50), p + 110) + '…' : x.slice(0, 140);
      snip = esc(snip);
      terms.forEach(tm => { snip = snip.replace(new RegExp('(' + tm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); });
      return { it, snip };
    });
  }
  function openSearch() {
    const ov = $('#searchOverlay'); ov.hidden = false; document.body.classList.add('modal-open');
    const inp = $('#searchInput'); inp.value = ''; $('#searchResults').innerHTML = '<p class="sr-empty">Type to search every lesson — try “chain rule”, “volume”, or “squeeze”.</p>'; inp.focus();
  }
  function closeSearch() { $('#searchOverlay').hidden = true; document.body.classList.remove('modal-open'); }
  function initSearch() {
    const inp = $('#searchInput'), res = $('#searchResults');
    let sel = 0;
    const paint = () => $$('.sr-item', res).forEach((a, i) => a.classList.toggle('sel', i === sel));
    inp.addEventListener('input', () => {
      const r = doSearch(inp.value); sel = 0;
      res.innerHTML = r.length ? r.map(({ it, snip }) => `<a class="sr-item" href="${it.href}"><span class="sr-kind">${esc(it.kind)}</span><b>${esc(it.title)}</b><span class="sr-snip no-math">${snip}</span></a>`).join('')
        : (inp.value.trim().length > 1 ? `<p class="sr-empty">No results for “${esc(inp.value)}”.</p>` : '');
      paint();
    });
    inp.addEventListener('keydown', e => {
      const items = $$('.sr-item', res);
      if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, items.length - 1); paint(); e.preventDefault(); items[sel] && items[sel].scrollIntoView({ block: 'nearest' }); }
      else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); paint(); e.preventDefault(); items[sel] && items[sel].scrollIntoView({ block: 'nearest' }); }
      else if (e.key === 'Enter' && items[sel]) { location.hash = items[sel].getAttribute('href'); closeSearch(); }
    });
    res.addEventListener('click', e => { if (e.target.closest('.sr-item')) closeSearch(); });
    $('#searchOverlay').addEventListener('click', e => { if (e.target.id === 'searchOverlay') closeSearch(); });
    $('#searchClose').onclick = closeSearch;
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    applyTheme(S.theme);
    $('#themeBtn').onclick = () => {
      const dark = document.documentElement.getAttribute('data-theme') ? document.documentElement.getAttribute('data-theme') === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      S.theme = dark ? 'light' : 'dark'; store.save(); applyTheme(S.theme);
    };
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!S.theme) applyTheme(null); });
    $('#menuBtn').onclick = () => { const o = document.body.classList.toggle('drawer-open'); $('#menuBtn').setAttribute('aria-expanded', String(o)); };
    $('#scrim').onclick = closeDrawer;
    $('#searchBtn').onclick = openSearch;
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (!$('#searchOverlay').hidden) closeSearch(); else closeDrawer(); }
      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) && !e.target.matches('input, textarea, select')) { e.preventDefault(); openSearch(); }
    });
    // reading progress
    const rp = $('#readProgress');
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      rp.style.transform = `scaleX(${h > 0 ? Math.min(scrollY / h, 1) : 0})`;
      // on-this-page scrollspy
      const links = $$('.otp a'); if (!links.length) return;
      let cur = links[0];
      links.forEach(a => { const t = document.getElementById(a.dataset.target); if (t && t.getBoundingClientRect().top < 140) cur = a; });
      links.forEach(a => a.classList.toggle('on', a === cur));
    }, { passive: true });
    buildSidebar(); initSearch();
    window.addEventListener('hashchange', render);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
