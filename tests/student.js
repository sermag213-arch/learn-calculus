// Simulates a high-school student using the site end to end.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const OUT = process.argv[2] || path.join(__dirname, 'screenshots'), BASE = process.env.BASE_URL || 'http://localhost:8765/';
fs.mkdirSync(OUT, { recursive: true });
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) process.exitCode = 1; };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1366, height: 860 } });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(BASE); await p.waitForTimeout(500);

  // 1. Every question fragment renders without KaTeX errors, stray $, or accidental HTML tags.
  const frag = await p.evaluate(() => {
    const allowed = new Set('P B I EM STRONG UL OL LI BR SUB SUP SMALL CODE SPAN DIV A TABLE THEAD TBODY TR TH TD'.split(' '));
    const bad = []; let n = 0;
    CALC.chapters.forEach(ch => {
      const qs = []; ch.sections.forEach(s => (s.quiz || []).forEach((q, i) => qs.push([s.id + '#' + i, q]))); ch.review.forEach((q, i) => qs.push(['review#' + i, q]));
      qs.forEach(([id, q]) => {
        [q.q, ...q.c, q.e, ...(q.w || []).filter(Boolean), q.h].filter(Boolean).forEach(str => {
          n++;
          const d = document.createElement('div'); d.innerHTML = str;
          const tags = [...d.querySelectorAll('*')].map(e => e.tagName).filter(t => !allowed.has(t));
          renderMathInElement(d, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
          const err = d.querySelectorAll('.katex-error').length;
          const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT); let t, stray = false;
          while ((t = w.nextNode())) if (!t.parentElement.closest('.katex') && /\$|\\[a-z]+/.test(t.textContent)) stray = true;
          if (tags.length || err || stray) bad.push(ch.id + '/' + id + ' ' + (tags.join(',') || '') + (err ? ' katex-error' : '') + (stray ? ' stray:' + d.textContent.slice(0, 60) : ''));
        });
      });
    });
    return { n, bad };
  });
  ok(frag.bad.length === 0, `all ${frag.n} question fragments render cleanly ${frag.bad.slice(0, 8).join(' | ')}`);

  // 2. Student opens the limits lesson from the home page.
  await p.click('a.ch-card[href="#/learn/limits"]'); await p.waitForTimeout(300);
  ok(await p.locator('#main h1').textContent() === 'Limits', 'chapter page opens from home card');
  await p.click('.sec-list a >> nth=0'); await p.waitForTimeout(400);
  ok((await p.locator('#main h1').textContent()) === 'The Idea of a Limit', 'first lesson opens');
  // widget slider moves and readout changes
  const before = await p.locator('[data-widget="limit"] .widget-readout').textContent();
  await p.locator('[data-widget="limit"] input[type=range]').fill('80'); await p.waitForTimeout(100);
  const after = await p.locator('[data-widget="limit"] .widget-readout').textContent();
  ok(before !== after && after.includes('1.999'), 'limit widget slider updates readout');
  // reveal a worked-example solution
  await p.locator('.example summary >> nth=0').click();
  ok(await p.locator('.example details >> nth=0').evaluate(d => d.open), 'worked example solution expands');
  await p.screenshot({ path: OUT + '/lesson.png', fullPage: false });

  // 3. Answer question 1 WRONG, then retry and answer correctly; answer the rest.
  const cards = p.locator('.quiz-list .qcard');
  const n = await cards.count();
  const q0 = await p.evaluate(() => CALC.chapters.find(c => c.id === 'limits').sections[0].quiz.map(q => q.a));
  const wrong = q0[0] === 0 ? 1 : 0;
  await cards.nth(0).locator('.choice').nth(wrong).click(); await p.waitForTimeout(150);
  const fb = await cards.nth(0).locator('.feedback').textContent();
  ok(fb.includes('Not quite') && fb.includes('Why') && fb.includes('Explanation'), 'wrong answer shows targeted "why" feedback + explanation');
  ok(await cards.nth(0).locator('.choice.is-correct').count() === 1 && await cards.nth(0).locator('.choice.is-wrong').count() === 1, 'correct and wrong choices are highlighted');
  ok(await cards.nth(0).locator('.choice:enabled').count() === 0, 'choices lock after answering');
  await cards.nth(0).locator('.feedback').scrollIntoViewIfNeeded();
  await p.screenshot({ path: OUT + '/feedback-wrong.png' });
  await cards.nth(0).locator('.retry-btn').click(); await p.waitForTimeout(150);
  await cards.nth(0).locator('.choice').nth(q0[0]).click(); await p.waitForTimeout(150);
  ok((await cards.nth(0).locator('.feedback').textContent()).includes('Correct'), 'retry then correct answer shows success');
  for (let i = 1; i < n; i++) await cards.nth(i).locator('.choice').nth(q0[i]).click();
  await p.waitForTimeout(200);
  const summary = await p.locator('.quiz-summary').textContent();
  ok(summary.includes(`${n - 1} of ${n} correct on first try`), 'summary counts first-try results (' + summary.trim() + ')');
  ok(await p.locator('#doneBtn').textContent() === '✓ Completed', 'lesson auto-marked complete after finishing quiz');
  ok(await p.locator('#toc a.done[data-key="limits/idea"]').count() === 1, 'sidebar shows checkmark');
  const pill = await p.locator('#progressPill').textContent();
  ok(pill !== '0% complete', 'progress pill updated: ' + pill);

  // 4. Persistence across reload.
  await p.reload(); await p.waitForTimeout(500);
  ok(await p.locator('#doneBtn').textContent() === '✓ Completed', 'progress persists after reload');
  // Next lesson via pager
  await p.click('.pg.next'); await p.waitForTimeout(300);
  ok((await p.locator('#main h1').textContent()) === 'One-Sided and Infinite Limits', 'Next pager goes to 1.2');

  // 5. Search with keyboard.
  await p.keyboard.press('/'); await p.waitForTimeout(100);
  ok(await p.locator('#searchOverlay').isVisible(), 'search opens with "/"');
  await p.keyboard.type('chain rule'); await p.waitForTimeout(150);
  const firstRes = await p.locator('.sr-item >> nth=0').textContent();
  await p.screenshot({ path: OUT + '/search.png' });
  await p.keyboard.press('Enter'); await p.waitForTimeout(400);
  ok(firstRes.includes('Chain Rule') && (await p.locator('#main h1').textContent()) === 'The Chain Rule', 'search "chain rule" → Enter opens the lesson');
  ok(await p.locator('#searchOverlay').isHidden(), 'search closes after navigating');
  await p.keyboard.press('/'); await p.keyboard.type('zzzxq'); await p.waitForTimeout(100);
  ok((await p.locator('#searchResults').textContent()).includes('No results'), 'empty search shows message');
  await p.keyboard.press('Escape');
  ok(await p.locator('#searchOverlay').isHidden(), 'Escape closes search');

  // 6. Chapter test using the keyboard.
  await p.goto(BASE + '#/learn/derivative/test'); await p.waitForTimeout(300);
  await p.selectOption('#tCount', '10'); await p.click('#tStart'); await p.waitForTimeout(200);
  for (let i = 0; i < 10; i++) {
    const nChoices = await p.locator('.test-q .choice').count();
    await p.keyboard.press(String((i % nChoices) + 1)); await p.waitForTimeout(60);
    if (i === 2) await p.screenshot({ path: OUT + '/test-q.png' });
    await p.keyboard.press('Enter'); await p.waitForTimeout(80);
  }
  await p.waitForTimeout(300);
  const res = await p.locator('.results').count();
  ok(res === 1, 'test reaches results screen via keyboard only');
  const score = await p.locator('.score-ring b').textContent();
  const missed = await p.locator('.review-list .qcard').count();
  ok(/\d+%/.test(score), 'score shown: ' + score + ', ' + missed + ' missed shown for review');
  await p.screenshot({ path: OUT + '/test-results.png', fullPage: true });
  if (missed) { await p.click('.retry-missed'); await p.waitForTimeout(200); ok((await p.locator('.test-meta').textContent()).includes(`of ${missed}`), 'retry-missed builds a quiz of just the misses'); }

  // 7. Practice Center: validation + run.
  await p.goto(BASE + '#/practice'); await p.waitForTimeout(300);
  await p.locator('input[name=ch]').evaluateAll(xs => xs.forEach(x => x.checked = false));
  await p.click('#pForm button[type=submit]');
  ok((await p.locator('.form-err').textContent()).includes('at least one'), 'practice form validates empty selection');
  await p.check('input[value=rules]'); await p.check('input[value=integration]'); await p.selectOption('select[name=n]', '10');
  await p.click('#pForm button[type=submit]'); await p.waitForTimeout(200);
  ok((await p.locator('.test-meta').textContent()).includes('of 10'), 'practice quiz of 10 starts');
  const src = await p.locator('.qsrc').textContent();
  ok(/^([46]\.|Chapter [46] review)/.test(src), 'questions come from selected chapters (' + src + ')');

  // 8. Graphing tool.
  await p.goto(BASE + '#/tools'); await p.waitForTimeout(400);
  await p.fill('.fx', 'sqrt(1-x^2)'); await p.fill('.x1', '-1.5'); await p.fill('.x2', '1.5');
  await p.check('.showi'); await p.fill('.ia', '-1'); await p.fill('.ib', '1'); await p.waitForTimeout(200);
  const ro = await p.locator('.grapher .widget-readout').textContent();
  ok(/1\.570/.test(ro), 'grapher integrates sqrt(1-x^2) on [-1,1] ≈ π/2: ' + (ro.match(/≈ ([\d.]+)/g) || []).join(' '));
  await p.screenshot({ path: OUT + '/grapher.png' });
  await p.fill('.fx', 'sin(x'); await p.waitForTimeout(100);
  ok((await p.locator('.grapher-err').textContent()).includes('Missing'), 'grapher reports syntax errors');
  const parse = await p.evaluate(() => {
    const c = CalcWidgets.compile, t = [['2x^2+3x', 2, 14], ['sin(pi/2)', 0, 1], ['e^(2x)', 1, Math.exp(2)], ['x^(1/3)', -8, -2], ['|x-3|', 1, 2], ['2^-x', 1, 0.5], ['ln(e^x)', 3, 3], ['-x^2', 3, -9], ['xsin(x)', Math.PI / 2, Math.PI / 2], ['sin^2(x)+cos^2(x)', 0.7, 1]];
    return t.filter(([s, x, y]) => Math.abs(c(s)(x) - y) > 1e-9).map(([s]) => s);
  });
  ok(parse.length === 0, 'expression parser evaluates test cases correctly ' + parse.join(','));

  // 9. Theme toggle persists; dark-mode screenshot.
  await p.goto(BASE + '#/learn/integration/ftc'); await p.waitForTimeout(400);
  await p.click('#themeBtn'); await p.waitForTimeout(200);
  const theme = await p.evaluate(() => document.documentElement.dataset.theme);
  await p.reload(); await p.waitForTimeout(400);
  ok(theme && theme === await p.evaluate(() => document.documentElement.dataset.theme), 'theme toggle persists: ' + theme);
  await p.screenshot({ path: OUT + '/dark.png' });
  await p.click('#themeBtn');

  // 10. Mobile: drawer navigation.
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  m.on('pageerror', e => errs.push('mobile ' + e.message));
  await m.goto(BASE + '#/learn/applications/optimization'); await m.waitForTimeout(500);
  await m.screenshot({ path: OUT + '/m-lesson.png' });
  ok(await m.locator('#sidebar').evaluate(s => s.getBoundingClientRect().right <= 0), 'mobile: drawer hidden by default');
  await m.click('#menuBtn'); await m.waitForTimeout(350);
  ok(await m.locator('#sidebar').evaluate(s => s.getBoundingClientRect().left >= 0), 'mobile: menu opens drawer');
  await m.screenshot({ path: OUT + '/m-drawer.png' });
  await m.click('#toc .toc-ch[data-ch=rules] .toc-ch-btn'); await m.waitForTimeout(150);
  await m.click('#toc a[href="#/learn/rules/chain"]'); await m.waitForTimeout(400);
  ok(!(await m.evaluate(() => document.body.classList.contains('drawer-open'))) && (await m.locator('#main h1').textContent()) === 'The Chain Rule', 'mobile: tapping a lesson navigates and closes drawer');
  await m.locator('.quiz-list .qcard >> nth=0').scrollIntoViewIfNeeded();
  await m.locator('.quiz-list .qcard >> nth=0').locator('.choice >> nth=0').click();
  await m.screenshot({ path: OUT + '/m-quiz.png' });
  await m.goto(BASE); await m.waitForTimeout(500); await m.screenshot({ path: OUT + '/m-home.png', fullPage: false });

  ok(errs.length === 0, 'no JS errors during the whole session ' + errs.slice(0, 5).join(' | '));
  await b.close();
})();
