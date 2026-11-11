# Calculus Companion

A free, interactive calculus textbook website aligned to the Texas Common Course Numbering System course **MATH 2413 — Calculus I**, with extra chapters that preview Calculus II and III.

- **13 chapters, 67 lessons**, from a precalculus review up to Taylor series, polar curves, and multivariable calculus
- **235 multiple-choice questions**. A wrong answer gets its own explanation of the likely mistake, followed by the full solution.
- **Interactive graphs** you can drag: limits, secant to tangent, f and f′, Riemann sums, the Fundamental Theorem of Calculus, Newton's method, Taylor polynomials, slope fields, and polar curves
- **Chapter tests and a Practice Center** that builds custom quizzes, including a "only questions I missed" mode
- **Graphing tool**: type any f(x) to see its graph, f′, a sliding tangent line, and a definite integral (Simpson's rule)
- **Syllabus page** that maps the official MATH 2413 learning outcomes to lessons, with a 16-week schedule
- **Formula sheet** (print-friendly), full-text search (`/` or Ctrl/⌘+K), dark mode, saved progress, and a mobile layout

## Running it

It's a static site with no build step and no dependencies to install. KaTeX is vendored in `vendor/katex`, so it also works offline.

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

You can also host the folder on any static host, such as GitHub Pages.

## Project structure

```
index.html              App shell
css/style.css           Design system: light/dark tokens and responsive layout
js/core.js              Content registry and authoring helpers (BOX, EX, Q, WIDGET, MORE)
js/widgets.js           Safe expression parser, canvas plotter, interactive widgets
js/app.js               Router, views, quiz engine, test runner, search, progress
js/content/NN-*.js      One file per chapter
js/content/pages.js     Syllabus and formula sheet
tests/audit.js          Checks every route (desktop and mobile) for JS errors, KaTeX errors, stray $, overflow, broken links
tests/student.js        End-to-end "student" walkthrough: lessons, quizzes, tests, practice, search, grapher, theme, mobile drawer
```

## Authoring content

Each chapter calls `CALC.addChapter({...})`. Write lesson HTML inside `` R`...` `` (that is, `String.raw`) so that LaTeX backslashes survive. Use `$...$` for inline math and `$$...$$` for display math.

```js
Q(R`question`, [R`choice A`, R`choice B`, ...], correctIndex,
  R`full explanation`,
  [R`why A is wrong`, null /* correct */, ...],   // optional, one entry per choice
  R`hint`)                                         // optional
```

Inside math, write `\lt` instead of `<` when the `<` is followed by a letter. Otherwise the browser reads it as an HTML tag, for example in `0<b<1`.

## Testing

Both test files use Playwright and expect the site to be running on port 8765. Set `BASE_URL` to test a different address.

```bash
node tests/audit.js     # every page, at 1400px and 390px wide
node tests/student.js   # interaction walkthrough; screenshots go to tests/screenshots/
```

## Sources

The content was synthesized from open educational resources:

- [OpenStax *Calculus* Vols. 1–3](https://openstax.org/details/books/calculus-volume-1) (CC BY-NC-SA 4.0)
- [Paul's Online Math Notes](https://tutorial.math.lamar.edu/)
- 3Blue1Brown's [*Essence of Calculus*](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr)
- [Khan Academy](https://www.khanacademy.org/math/calculus-1)
- [MIT OCW 18.01SC](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- The THECB *Lower-Division Academic Course Guide Manual* entry for MATH 2413

KaTeX is © Khan Academy and contributors (MIT License).
