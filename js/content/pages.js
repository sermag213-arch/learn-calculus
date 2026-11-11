/* Standalone pages: syllabus and formula sheet. */
CALC.syllabus = {
  html: R`
<p class="eyebrow">Course syllabus</p>
<h1>MATH 2413 — Calculus I</h1>
<p class="lead">This book is organized around the Texas Common Course Numbering System (TCCNS) course <b>MATH 2413</b>, as described in the Texas Higher Education Coordinating Board's <i>Lower-Division Academic Course Guide Manual</i> (ACGM). It's taught at community colleges and universities across Texas and transfers as the first semester of the standard calculus sequence.</p>

<table><tbody>
<tr><th>Course</th><td>MATH 2413 · Calculus I · 4 semester credit hours (typically 3 lecture + 1–3 lab/recitation)</td></tr>
<tr><th>Prerequisite</th><td>MATH 2412 Pre-Calculus (or MATH 2312), usually with a grade of C or better, or a qualifying placement score</td></tr>
<tr><th>Next course</th><td>MATH 2414 Calculus II → MATH 2415 Calculus III (Chapters 8–12 of this book preview them)</td></tr>
<tr><th>Common textbooks</th><td>OpenStax <i>Calculus Vol. 1</i> (free), Stewart <i>Calculus: Early Transcendentals</i>, Briggs/Cochran <i>Calculus</i>, Thomas' <i>Calculus</i>, Larson <i>Calculus</i></td></tr>
</tbody></table>

<h2>Course description (ACGM)</h2>
${BOX('def', 'Catalog description', R`<p>Limits and continuity; the Fundamental Theorem of Calculus; definition of the derivative of a function and techniques of differentiation; applications of the derivative to maximizing or minimizing a function; the chain rule, mean value theorem, and rate of change problems; curve sketching; definite and indefinite integration of algebraic, trigonometric, and transcendental functions, with an application to calculation of areas.</p>`)}

<h2>Learning outcomes</h2>
<p>Upon successful completion of the course, students will be able to:</p>
<ol class="outcomes">
<li>Develop solutions for tangent and area problems using the concepts of limits, derivatives, and integrals. <br><small>→ <a href="#/learn/limits">Ch. 1</a>, <a href="#/learn/derivative/rates">§3.1</a>, <a href="#/learn/integration/area">§6.1</a></small></li>
<li>Draw graphs of algebraic and transcendental functions considering limits, continuity, and differentiability at a point. <br><small>→ <a href="#/learn/continuity">Ch. 2</a>, <a href="#/learn/applications/shape">§5.5</a></small></li>
<li>Determine whether a function is continuous and/or differentiable at a point using limits. <br><small>→ <a href="#/learn/continuity/definition">§2.1</a>, <a href="#/learn/derivative/differentiability">§3.4</a></small></li>
<li>Use differentiation rules to differentiate algebraic and transcendental functions. <br><small>→ <a href="#/learn/rules">Ch. 4</a></small></li>
<li>Identify appropriate calculus concepts and techniques to provide mathematical models of real-world situations and determine solutions to applied problems. <br><small>→ <a href="#/learn/applications">Ch. 5</a>, <a href="#/learn/int-apps">Ch. 7</a></small></li>
<li>Evaluate definite integrals using the Fundamental Theorem of Calculus. <br><small>→ <a href="#/learn/integration/ftc">§6.3</a>, <a href="#/learn/integration/substitution">§6.5</a></small></li>
<li>Articulate the relationship between derivatives and integrals using the Fundamental Theorem of Calculus. <br><small>→ <a href="#/learn/integration/ftc">§6.3</a></small></li>
</ol>

<h2>Suggested 16-week schedule</h2>
<p>A typical long-semester pacing. Every row links straight to the lessons.</p>
<table><thead><tr><th>Week</th><th>Topics</th><th>Lessons</th></tr></thead><tbody>
<tr><td>1</td><td>Precalculus review: functions, trig, exponentials, inverses</td><td><a href="#/learn/precalc">Ch. 0</a></td></tr>
<tr><td>2</td><td>Limits: numerical/graphical, one-sided, infinite</td><td><a href="#/learn/limits/idea">1.1</a>–<a href="#/learn/limits/one-sided">1.2</a></td></tr>
<tr><td>3</td><td>Limit laws, algebraic techniques, Squeeze Theorem</td><td><a href="#/learn/limits/laws">1.3</a>–<a href="#/learn/limits/squeeze">1.4</a></td></tr>
<tr><td>4</td><td>Limits at infinity, ε–δ, continuity, IVT</td><td><a href="#/learn/limits/infinity">1.5</a>–<a href="#/learn/limits/epsilon-delta">1.6</a>, <a href="#/learn/continuity">Ch. 2</a></td></tr>
<tr><td>5</td><td>The derivative: definition, graphs, differentiability · <b>Exam 1</b></td><td><a href="#/learn/derivative">Ch. 3</a></td></tr>
<tr><td>6</td><td>Power, product, quotient, trig rules</td><td><a href="#/learn/rules/power">4.1</a>–<a href="#/learn/rules/trig">4.3</a></td></tr>
<tr><td>7</td><td>Chain rule, implicit differentiation</td><td><a href="#/learn/rules/chain">4.4</a>–<a href="#/learn/rules/implicit">4.5</a></td></tr>
<tr><td>8</td><td>Exponential, log, inverse trig derivatives</td><td><a href="#/learn/rules/explog">4.6</a>–<a href="#/learn/rules/inverse">4.7</a></td></tr>
<tr><td>9</td><td>Related rates, linear approximation · <b>Exam 2</b></td><td><a href="#/learn/applications/related-rates">5.1</a>–<a href="#/learn/applications/linearization">5.2</a></td></tr>
<tr><td>10</td><td>Extreme values, Mean Value Theorem</td><td><a href="#/learn/applications/extrema">5.3</a>–<a href="#/learn/applications/mvt">5.4</a></td></tr>
<tr><td>11</td><td>Curve sketching, optimization</td><td><a href="#/learn/applications/shape">5.5</a>–<a href="#/learn/applications/optimization">5.6</a></td></tr>
<tr><td>12</td><td>L'Hôpital's Rule, Newton's method, antiderivatives · <b>Exam 3</b></td><td><a href="#/learn/applications/lhopital">5.7</a>–<a href="#/learn/applications/antiderivatives">5.9</a></td></tr>
<tr><td>13</td><td>Riemann sums, the definite integral</td><td><a href="#/learn/integration/area">6.1</a>–<a href="#/learn/integration/definite">6.2</a></td></tr>
<tr><td>14</td><td>Fundamental Theorem, net change</td><td><a href="#/learn/integration/ftc">6.3</a>–<a href="#/learn/integration/net-change">6.4</a></td></tr>
<tr><td>15</td><td>Substitution, numerical integration, area between curves</td><td><a href="#/learn/integration/substitution">6.5</a>–<a href="#/learn/integration/numerical">6.6</a>, <a href="#/learn/int-apps/area-between">7.2</a></td></tr>
<tr><td>16</td><td>Review · <b>Comprehensive final exam</b></td><td><a href="#/practice">Practice Center</a></td></tr>
</tbody></table>
${BOX('tip', 'Instructors vary', R`<p>Some colleges also include volumes (§7.3–7.4), average value (§7.1), or work (§7.6) in Calculus I; others leave them to Calculus II. Check your own instructor's syllabus and use the Practice Center to build quizzes from exactly the chapters on your exam.</p>`)}

<h2>How to study calculus effectively</h2>
<ul>
<li><b>Read actively.</b> Try each example before opening the solution.</li>
<li><b>Practice daily.</b> Calculus is a skill: short, frequent sessions beat cramming.</li>
<li><b>Learn from mistakes.</b> When a quiz explains why your choice was wrong, write that mistake down. Use "Only questions I've missed" in the Practice Center to drill them.</li>
<li><b>Know the "why".</b> Exams test whether you can choose the right tool, not just execute it.</li>
<li><b>Shore up algebra and trig.</b> Most errors in Calculus I are algebra errors. Chapter 0 is there for you.</li>
</ul>

<h2>Sources and further reading</h2>
<p>This book synthesizes and re-explains material from these freely available resources. All are excellent companions:</p>
<div class="resources">
<a href="https://openstax.org/details/books/calculus-volume-1" target="_blank" rel="noopener">OpenStax Calculus Vols. 1–3<small>Strang, Herman et al. Free, peer-reviewed textbook (CC BY-NC-SA)</small></a>
<a href="https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx" target="_blank" rel="noopener">Paul's Online Math Notes<small>Paul Dawkins, Lamar University (Texas)</small></a>
<a href="https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" target="_blank" rel="noopener">Essence of Calculus<small>3Blue1Brown video series — visual intuition</small></a>
<a href="https://www.khanacademy.org/math/calculus-1" target="_blank" rel="noopener">Khan Academy Calculus 1<small>Videos and mastery practice</small></a>
<a href="https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/" target="_blank" rel="noopener">MIT OCW 18.01SC<small>Single Variable Calculus — full lectures</small></a>
<a href="https://ocw.mit.edu/courses/res-18-001-calculus-fall-2023/" target="_blank" rel="noopener">Strang, <i>Calculus</i><small>Gilbert Strang's free textbook (MIT)</small></a>
<a href="https://www.highered.texas.gov/institutional-resources-programs/academic-course-guide-manual/" target="_blank" rel="noopener">THECB ACGM<small>Official Texas course descriptions & outcomes</small></a>
<a href="https://apcentral.collegeboard.org/courses/ap-calculus-ab" target="_blank" rel="noopener">AP Calculus AB/BC CED<small>College Board — aligned content for high school</small></a>
</div>`
};

CALC.formulas = R`
<p class="eyebrow">Reference</p>
<h1>Formula sheet</h1>
<p class="lead">Every key formula in one place. Print it (Ctrl/Cmd + P) for a study sheet.</p>
<div class="formula-grid">
${BOX('def', 'Limits', R`<ul>
<li>$\displaystyle\lim_{x\to0}\frac{\sin x}{x}=1$</li>
<li>$\displaystyle\lim_{x\to0}\frac{1-\cos x}{x}=0$</li>
<li>$\displaystyle\lim_{x\to0}\frac{e^x-1}{x}=1$</li>
<li>$\displaystyle\lim_{n\to\infty}\left(1+\frac1n\right)^n=e$</li>
<li>$\displaystyle\lim_{x\to\infty}\frac{1}{x^p}=0\ (p>0)$</li></ul>`)}
${BOX('def', 'Definition of the derivative', R`<ul>
<li>$\displaystyle f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$</li>
<li>$\displaystyle f'(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}$</li>
<li>Tangent line: $y=f(a)+f'(a)(x-a)$</li></ul>`)}
${BOX('thm', 'Differentiation rules', R`<ul>
<li>$(x^n)'=nx^{n-1}$</li>
<li>$(fg)'=f'g+fg'$</li>
<li>$\left(\dfrac fg\right)'=\dfrac{f'g-fg'}{g^2}$</li>
<li>$[f(g(x))]'=f'(g(x))\,g'(x)$</li>
<li>$(f^{-1})'(x)=\dfrac{1}{f'(f^{-1}(x))}$</li></ul>`)}
${BOX('thm', 'Exponential & log derivatives', R`<ul>
<li>$(e^x)'=e^x$, $\ (a^x)'=a^x\ln a$</li>
<li>$(\ln x)'=\dfrac1x$, $\ (\log_ax)'=\dfrac{1}{x\ln a}$</li>
<li>$(\ln|g|)'=\dfrac{g'}{g}$</li></ul>`)}
${BOX('thm', 'Trig derivatives', R`<ul>
<li>$(\sin x)'=\cos x$, $\ (\cos x)'=-\sin x$</li>
<li>$(\tan x)'=\sec^2x$, $\ (\cot x)'=-\csc^2x$</li>
<li>$(\sec x)'=\sec x\tan x$, $\ (\csc x)'=-\csc x\cot x$</li></ul>`)}
${BOX('thm', 'Inverse trig derivatives', R`<ul>
<li>$(\arcsin x)'=\dfrac1{\sqrt{1-x^2}}$</li>
<li>$(\arccos x)'=-\dfrac1{\sqrt{1-x^2}}$</li>
<li>$(\arctan x)'=\dfrac1{1+x^2}$</li>
<li>$(\operatorname{arcsec} x)'=\dfrac1{|x|\sqrt{x^2-1}}$</li></ul>`)}
${BOX('key', 'Basic integrals', R`<ul>
<li>$\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C\ (n\ne-1)$</li>
<li>$\int\frac1x\,dx=\ln|x|+C$</li>
<li>$\int e^x\,dx=e^x+C$, $\ \int a^x\,dx=\dfrac{a^x}{\ln a}+C$</li>
<li>$\int\sin x\,dx=-\cos x+C$, $\ \int\cos x\,dx=\sin x+C$</li>
<li>$\int\sec^2x\,dx=\tan x+C$, $\ \int\sec x\tan x\,dx=\sec x+C$</li>
<li>$\int\tan x\,dx=\ln|\sec x|+C$</li>
<li>$\int\sec x\,dx=\ln|\sec x+\tan x|+C$</li>
<li>$\int\dfrac{dx}{a^2+x^2}=\dfrac1a\arctan\dfrac xa+C$</li>
<li>$\int\dfrac{dx}{\sqrt{a^2-x^2}}=\arcsin\dfrac xa+C$</li></ul>`)}
${BOX('key', 'Fundamental Theorem of Calculus', R`<ul>
<li>$\dfrac{d}{dx}\displaystyle\int_a^xf(t)\,dt=f(x)$</li>
<li>$\dfrac{d}{dx}\displaystyle\int_a^{u(x)}f(t)\,dt=f(u(x))\,u'(x)$</li>
<li>$\displaystyle\int_a^bf(x)\,dx=F(b)-F(a)$</li>
<li>Average value: $\dfrac1{b-a}\displaystyle\int_a^bf(x)\,dx$</li></ul>`)}
${BOX('key', 'Integration techniques', R`<ul>
<li>Substitution: $\int f(g(x))g'(x)\,dx=\int f(u)\,du$</li>
<li>Parts: $\int u\,dv=uv-\int v\,du$</li>
<li>$\sin^2x=\frac{1-\cos2x}{2}$, $\ \cos^2x=\frac{1+\cos2x}{2}$</li>
<li>Trig sub: $\sqrt{a^2-x^2}\to a\sin\theta$; $\sqrt{a^2+x^2}\to a\tan\theta$; $\sqrt{x^2-a^2}\to a\sec\theta$</li></ul>`)}
${BOX('tip', 'Applications of integrals', R`<ul>
<li>Area: $\int_a^b(\text{top}-\text{bottom})\,dx$</li>
<li>Disk: $\pi\int_a^b[R(x)]^2dx$; Washer: $\pi\int_a^b(R^2-r^2)\,dx$</li>
<li>Shell: $2\pi\int_a^b(\text{radius})(\text{height})\,dx$</li>
<li>Arc length: $\int_a^b\sqrt{1+[f'(x)]^2}\,dx$</li>
<li>Work: $\int_a^bF(x)\,dx$</li></ul>`)}
${BOX('tip', 'Approximations', R`<ul>
<li>Linearization: $L(x)=f(a)+f'(a)(x-a)$</li>
<li>Newton: $x_{n+1}=x_n-\dfrac{f(x_n)}{f'(x_n)}$</li>
<li>Trapezoid: $\frac{\Delta x}{2}[f_0+2f_1+\cdots+2f_{n-1}+f_n]$</li>
<li>Simpson: $\frac{\Delta x}{3}[f_0+4f_1+2f_2+\cdots+4f_{n-1}+f_n]$</li></ul>`)}
${BOX('warn', 'Trig identities', R`<ul>
<li>$\sin^2x+\cos^2x=1$</li>
<li>$1+\tan^2x=\sec^2x$, $\ 1+\cot^2x=\csc^2x$</li>
<li>$\sin2x=2\sin x\cos x$</li>
<li>$\cos2x=\cos^2x-\sin^2x$</li></ul>`)}
${BOX('intuition', 'Series', R`<ul>
<li>$\sum_{n=0}^\infty ar^n=\dfrac{a}{1-r},\ |r|<1$</li>
<li>$\sum\frac1{n^p}$ converges iff $p>1$</li>
<li>$e^x=\sum\dfrac{x^n}{n!}$</li>
<li>$\sin x=\sum\dfrac{(-1)^nx^{2n+1}}{(2n+1)!}$, $\ \cos x=\sum\dfrac{(-1)^nx^{2n}}{(2n)!}$</li>
<li>Taylor: $\sum\dfrac{f^{(n)}(a)}{n!}(x-a)^n$</li></ul>`)}
${BOX('intuition', 'Summation formulas', R`<ul>
<li>$\sum_{i=1}^ni=\frac{n(n+1)}2$</li>
<li>$\sum_{i=1}^ni^2=\frac{n(n+1)(2n+1)}6$</li>
<li>$\sum_{i=1}^ni^3=\left[\frac{n(n+1)}2\right]^2$</li></ul>`)}
</div>`;
