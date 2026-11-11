// Route-by-route audit: errors, KaTeX failures, stray $ signs, widget rendering, overflow.
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://localhost:8765/';
(async () => {
  const b = await chromium.launch();
  for (const vp of [{ width: 1400, height: 900, name: 'desktop' }, { width: 390, height: 844, name: 'mobile' }]) {
    const p = await b.newPage({ viewport: vp });
    const errs = []; p.on('pageerror', e => errs.push('PAGEERR ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
    await p.goto(BASE); await p.waitForTimeout(500);
    // data validation
    const dataIssues = await p.evaluate(() => {
      const out = []; let nq = 0, ns = 0;
      CALC.chapters.forEach(ch => {
        const all = [];
        ch.sections.forEach(s => { ns++; (s.quiz || []).forEach((q, i) => all.push([s.id + '#' + i, q])); });
        ch.review.forEach((q, i) => all.push(['review#' + i, q]));
        all.forEach(([id, q]) => {
          nq++;
          if (!(q.a >= 0 && q.a < q.c.length)) out.push(ch.id + '/' + id + ' bad answer index');
          if (q.w && q.w.length !== q.c.length) out.push(ch.id + '/' + id + ' why-length ' + q.w.length + ' vs ' + q.c.length);
          if (q.w && q.w[q.a]) out.push(ch.id + '/' + id + ' why for correct answer');
          if (!q.e) out.push(ch.id + '/' + id + ' no explanation');
          if (new Set(q.c).size !== q.c.length) out.push(ch.id + '/' + id + ' duplicate choices');
        });
        const ids = ch.sections.map(s => s.id); if (new Set(ids).size !== ids.length) out.push(ch.id + ' dup section ids');
      });
      return { out, nq, ns, nch: CALC.chapters.length };
    });
    console.log(vp.name, 'chapters', dataIssues.nch, 'sections', dataIssues.ns, 'questions', dataIssues.nq, dataIssues.out);
    const routes = await p.evaluate(() => {
      const r = ['#/', '#/syllabus', '#/formulas', '#/tools', '#/practice'];
      CALC.chapters.forEach(ch => { r.push('#/learn/' + ch.id, '#/learn/' + ch.id + '/test'); ch.sections.forEach(s => r.push('#/learn/' + ch.id + '/' + s.id)); });
      return r;
    });
    let problems = 0;
    for (const r of routes) {
      await p.evaluate(h => { location.hash = h; }, r);
      await p.waitForTimeout(r.split('/').length > 3 ? 120 : 80);
      const res = await p.evaluate(() => {
        const main = document.querySelector('#main');
        const kerr = main.querySelectorAll('.katex-error').length;
        // stray dollar signs in rendered text (outside katex, code, inputs)
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        const stray = []; let n;
        while ((n = walker.nextNode())) {
          if (n.parentElement.closest('.katex, code, script, .widget-card')) continue;
          if (/\$|\\\(|\\frac|\\lim|\\int/.test(n.textContent)) stray.push(n.textContent.trim().slice(0, 80));
        }
        const over = document.documentElement.scrollWidth - window.innerWidth;
        // find widest offenders
        const wide = over > 1 ? [...main.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > window.innerWidth + 1 && !e.closest('.table-wrap, .katex-display, .ctext, .formula-grid li')).slice(0, 3).map(e => e.tagName + '.' + e.className) : [];
        const canv = [...main.querySelectorAll('canvas')].map(c => c.width > 0 && c.height > 0);
        const brokenLinks = [...main.querySelectorAll('a[href^="#/learn/"]')].map(a => a.getAttribute('href')).filter(h => { const [, , ch, s] = h.split('/'); const c = CALC.chapters.find(x => x.id === ch); return !c || (s && s !== 'test' && !c.sections.find(x => x.id === s)); });
        return { kerr, stray, over, wide, canv: canv.filter(x => !x).length, h1: (document.querySelector('#main h1') || {}).textContent, brokenLinks };
      });
      if (res.kerr || res.stray.length || res.over > 1 || res.canv || !res.h1 || res.brokenLinks.length) { problems++; console.log(vp.name, r, JSON.stringify(res)); }
    }
    console.log(vp.name, 'routes', routes.length, 'with problems', problems);
    console.log(vp.name, 'errors', errs.length ? errs.slice(0, 10) : 'none');
    await p.close();
  }
  await b.close();
})();
