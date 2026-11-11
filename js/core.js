/* Core registry: content files call CALC.addChapter({...}). */
(function () {
  'use strict';
  const CALC = {
    chapters: [],
    addChapter(ch) {
      ch.sections = ch.sections || [];
      ch.review = ch.review || [];
      this.chapters.push(ch);
    },
    /** Stable sort by chapter number once all content is loaded. */
    finalize() {
      this.chapters.sort((a, b) => a.num - b.num);
    }
  };
  window.CALC = CALC;
  /* Tagged template that keeps backslashes (LaTeX) intact. */
  window.R = String.raw;
})();

/* Authoring helpers used by the content files. */
(function () {
  'use strict';
  /** Callout box. type: def | thm | tip | warn | key | intuition */
  window.BOX = (type, title, body) => `<div class="callout ${type}"><h4>${title}</h4>${body}</div>`;
  /** Worked example with a collapsible solution. */
  window.EX = (title, problem, solution) => `<div class="example"><h4>${title}</h4><div class="prob">${problem}</div>` +
    `<details><summary>Show solution</summary><div class="sol">${solution}</div></details></div>`;
  /** Multiple-choice question: text, choices, correct index, explanation, [why-wrong per choice], hint. */
  window.Q = (q, c, a, e, w, h) => ({ q, c, a, e, w: w || null, h: h || null });
  /** Interactive widget placeholder. */
  window.WIDGET = name => `<div data-widget="${name}"></div>`;
  /** Learn-more links. items: [[label, url, note]] */
  window.MORE = items => `<h2>Go deeper</h2><div class="resources">${items.map(([l, u, s]) =>
    `<a href="${u}" target="_blank" rel="noopener">${l}<small>${s || ''}</small></a>`).join('')}</div>`;
})();
