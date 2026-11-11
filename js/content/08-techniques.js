CALC.addChapter({
  id: 'techniques', num: 8, part: 'Part III · Beyond Calculus I (Calc II & III)', tag: 'Calc II',
  title: 'Techniques of Integration',
  blurb: 'Integration by parts, trigonometric integrals, trig substitution, partial fractions, and improper integrals.',
  intro: R`<p class="lead">Substitution handles many integrals, but not $\int xe^x\,dx$, $\int\sqrt{1-x^2}\,dx$, or $\int\frac{dx}{x^2-1}$. This chapter (the core of Calculus II, MATH 2414) builds a complete toolkit.</p>`,
  objectives: ['Integrate by parts, including repeated and "cyclic" cases.', 'Integrate powers of sine, cosine, tangent, and secant.', 'Use trigonometric substitution for integrals with $\\sqrt{a^2\\pm x^2}$ and $\\sqrt{x^2-a^2}$.', 'Decompose rational functions into partial fractions.', 'Evaluate improper integrals and determine convergence.'],
  sections: [
    {
      id: 'parts', title: 'Integration by Parts',
      html: R`
${BOX('thm', 'Integration by parts', R`$$\int u\,dv=uv-\int v\,du\qquad\qquad \int_a^bu\,dv=\Big[uv\Big]_a^b-\int_a^bv\,du$$`)}
<p>This is the product rule in reverse: integrate $(uv)'=u'v+uv'$ and rearrange.</p>
${BOX('tip', 'Choosing $u$: LIATE', R`<p>Pick $u$ as whichever comes first in this list (it gets simpler when differentiated): <b>L</b>ogarithmic, <b>I</b>nverse trig, <b>A</b>lgebraic (polynomials), <b>T</b>rigonometric, <b>E</b>xponential. Everything else is $dv$.</p>`)}
${EX('Example 1', R`<p>$\displaystyle\int xe^x\,dx$</p>`, R`<p>$u=x$, $dv=e^xdx$ ⇒ $du=dx$, $v=e^x$. $$\int xe^xdx=xe^x-\int e^xdx=xe^x-e^x+C.$$</p>`)}
${EX('Example 2 — Hidden dv = dx', R`<p>$\displaystyle\int\ln x\,dx$</p>`, R`<p>$u=\ln x$, $dv=dx$ ⇒ $du=\frac1xdx$, $v=x$. $\int\ln x\,dx=x\ln x-\int1\,dx=x\ln x-x+C$.</p>`)}
${EX('Example 3 — Repeated', R`<p>$\displaystyle\int x^2\sin x\,dx$</p>`, R`<p>Parts twice: $=-x^2\cos x+\int2x\cos x\,dx=-x^2\cos x+2x\sin x-2\int\sin x\,dx$ $=-x^2\cos x+2x\sin x+2\cos x+C$.</p><p><b>Tabular shortcut:</b> differentiate $x^2\to2x\to2\to0$, integrate $\sin x\to-\cos x\to-\sin x\to\cos x$, multiply diagonally with alternating signs $+,-,+$.</p>`)}
${EX('Example 4 — Cyclic', R`<p>$\displaystyle\int e^x\cos x\,dx$</p>`, R`<p>Parts twice returns the original integral $I$: $I=e^x\sin x+e^x\cos x-I$. Solve: $I=\frac{e^x(\sin x+\cos x)}{2}+C$.</p>`)}`,
      quiz: [
        Q(R`For $\int x\ln x\,dx$, the best choice is:`, [R`$u=x,\ dv=\ln x\,dx$`, R`$u=\ln x,\ dv=x\,dx$`, R`$u=x\ln x,\ dv=dx$`, R`Substitution $u=\ln x$`], 1, R`LIATE: logs first. Then $\int x\ln x\,dx=\frac{x^2}2\ln x-\frac{x^2}4+C$.`,
          [R`Then $v=\int\ln x\,dx$ is harder.`, null, R`$du$ would be messier.`, R`$du=\frac{1}{x}dx$ doesn't match the remaining $x\,dx$.`]),
        Q(R`$\displaystyle\int xe^{2x}dx=$`, [R`$\tfrac12xe^{2x}-\tfrac14e^{2x}+C$`, R`$xe^{2x}-e^{2x}+C$`, R`$\tfrac12x^2e^{2x}+C$`, R`$2xe^{2x}-4e^{2x}+C$`], 0, R`$u=x$, $v=\frac12e^{2x}$: $\frac12xe^{2x}-\frac12\int e^{2x}dx$.`,
          [null, R`$v=\frac12e^{2x}$, not $e^{2x}$.`, R`Can't integrate factors separately.`, R`Divide by 2 when integrating $e^{2x}$.`]),
        Q(R`$\displaystyle\int\arctan x\,dx=$`, [R`$x\arctan x-\tfrac12\ln(1+x^2)+C$`, R`$\dfrac{1}{1+x^2}+C$`, R`$x\arctan x+C$`, R`$\tfrac12(\arctan x)^2+C$`], 0, R`$u=\arctan x$, $dv=dx$: $x\arctan x-\int\frac{x}{1+x^2}dx=x\arctan x-\frac12\ln(1+x^2)+C$.`,
          [null, R`That's the derivative of $\arctan x$.`, R`You still need to subtract $\int v\,du=\int\frac{x}{1+x^2}dx$.`, R`That would be $\int\frac{\arctan x}{1+x^2}dx$.`])
      ]
    },
    {
      id: 'trig-integrals', title: 'Trigonometric Integrals',
      html: R`
<h2>Powers of sine and cosine: $\int\sin^mx\cos^nx\,dx$</h2>
<ul><li><b>If $n$ (cosine power) is odd:</b> save one $\cos x$, convert the rest with $\cos^2x=1-\sin^2x$, and let $u=\sin x$.</li>
<li><b>If $m$ (sine power) is odd:</b> save one $\sin x$, convert with $\sin^2x=1-\cos^2x$, let $u=\cos x$.</li>
<li><b>If both even:</b> use $\sin^2x=\frac{1-\cos2x}2$, $\cos^2x=\frac{1+\cos2x}2$.</li></ul>
${EX('Example 1', R`<p>$\displaystyle\int\sin^3x\cos^2x\,dx$</p>`, R`<p>Odd sine: $\int(1-\cos^2x)\cos^2x\sin x\,dx$. With $u=\cos x$: $-\int(u^2-u^4)du=-\frac{\cos^3x}3+\frac{\cos^5x}5+C$.</p>`)}
${EX('Example 2', R`<p>$\displaystyle\int\cos^2x\,dx$</p>`, R`<p>$\int\frac{1+\cos2x}2dx=\frac x2+\frac{\sin2x}4+C$.</p>`)}
<h2>Powers of tangent and secant</h2>
<ul><li>Even power of $\sec$: save $\sec^2x$, convert the rest with $\sec^2=1+\tan^2$, $u=\tan x$.</li><li>Odd power of $\tan$: save $\sec x\tan x$, convert with $\tan^2=\sec^2-1$, $u=\sec x$.</li></ul>
${BOX('thm', 'Useful results', R`$$\int\tan x\,dx=\ln|\sec x|+C\qquad \int\sec x\,dx=\ln|\sec x+\tan x|+C$$`)}`,
      quiz: [
        Q(R`For $\int\sin^2x\cos^3x\,dx$, the best substitution is:`, [R`$u=\sin x$`, R`$u=\cos x$`, R`half-angle formulas`, R`$u=\tan x$`], 0, R`The cosine power is odd: save one $\cos x$ and use $u=\sin x$.`,
          [null, R`The sine power is even, so $u=\cos x$ leaves $\sin$ terms.`, R`Only needed when both powers are even.`, R`No tangent here.`]),
        Q(R`$\displaystyle\int_0^{\pi}\sin^2x\,dx=$`, [R`$\tfrac\pi2$`, R`$\pi$`, R`$0$`, R`$1$`], 0, R`$\int_0^\pi\frac{1-\cos2x}2dx=\frac\pi2$.`,
          [null, R`Divide by 2 from the half-angle formula.`, R`$\sin^2x\ge0$.`, R`Recompute.`])
      ]
    },
    {
      id: 'trig-sub', title: 'Trigonometric Substitution',
      html: R`
<p>Radicals like $\sqrt{a^2-x^2}$ simplify when $x$ is replaced by a trig function, using a Pythagorean identity.</p>
<table><thead><tr><th>Expression</th><th>Substitution</th><th>Identity used</th></tr></thead><tbody>
<tr><td>$\sqrt{a^2-x^2}$</td><td>$x=a\sin\theta$</td><td>$1-\sin^2\theta=\cos^2\theta$</td></tr>
<tr><td>$\sqrt{a^2+x^2}$</td><td>$x=a\tan\theta$</td><td>$1+\tan^2\theta=\sec^2\theta$</td></tr>
<tr><td>$\sqrt{x^2-a^2}$</td><td>$x=a\sec\theta$</td><td>$\sec^2\theta-1=\tan^2\theta$</td></tr></tbody></table>
${EX('Example 1 — Area of a circle', R`<p>$\displaystyle\int_{-r}^{r}\sqrt{r^2-x^2}\,dx$</p>`, R`<p>$x=r\sin\theta$, $dx=r\cos\theta\,d\theta$, limits $\theta=\pm\frac\pi2$. $$\int_{-\pi/2}^{\pi/2}r^2\cos^2\theta\,d\theta=r^2\cdot\frac\pi2.$$ So a full circle has area $\pi r^2$. ✔</p>`)}
${EX('Example 2', R`<p>$\displaystyle\int\frac{dx}{x^2\sqrt{4+x^2}}$</p>`, R`<p>$x=2\tan\theta$, $dx=2\sec^2\theta\,d\theta$, $\sqrt{4+x^2}=2\sec\theta$. $$\int\frac{2\sec^2\theta}{4\tan^2\theta\cdot2\sec\theta}d\theta=\frac14\int\frac{\cos\theta}{\sin^2\theta}d\theta=-\frac{1}{4\sin\theta}+C.$$ From a triangle (opp $x$, adj $2$, hyp $\sqrt{4+x^2}$): $=-\frac{\sqrt{4+x^2}}{4x}+C$.</p>`)}`,
      quiz: [
        Q(R`For $\int\sqrt{9-x^2}\,dx$, use:`, [R`$x=3\sin\theta$`, R`$x=3\tan\theta$`, R`$x=3\sec\theta$`, R`$u=9-x^2$`], 0, R`$a^2-x^2$ pattern ⇒ $x=a\sin\theta$.`,
          [null, R`That's for $a^2+x^2$.`, R`That's for $x^2-a^2$.`, R`$du=-2x\,dx$ doesn't appear.`]),
        Q(R`For $\int\frac{dx}{\sqrt{x^2-16}}$, use:`, [R`$x=4\sin\theta$`, R`$x=4\tan\theta$`, R`$x=4\sec\theta$`, R`$x=16\sec\theta$`], 2, R`$x^2-a^2$ pattern ⇒ $x=a\sec\theta$ with $a=4$.`,
          [R`That's for $a^2-x^2$.`, R`That's for $a^2+x^2$.`, null, R`$a=\sqrt{16}=4$.`])
      ]
    },
    {
      id: 'partial-fractions', title: 'Partial Fractions',
      html: R`
<p>To integrate a rational function $\frac{P(x)}{Q(x)}$, break it into simpler fractions. (If $\deg P\ge\deg Q$, do long division first.)</p>
<table><thead><tr><th>Factor of $Q(x)$</th><th>Term(s) in decomposition</th></tr></thead><tbody>
<tr><td>Distinct linear $(x-a)$</td><td>$\dfrac{A}{x-a}$</td></tr>
<tr><td>Repeated linear $(x-a)^k$</td><td>$\dfrac{A_1}{x-a}+\dfrac{A_2}{(x-a)^2}+\cdots+\dfrac{A_k}{(x-a)^k}$</td></tr>
<tr><td>Irreducible quadratic $(x^2+bx+c)$</td><td>$\dfrac{Ax+B}{x^2+bx+c}$</td></tr></tbody></table>
${EX('Example 1', R`<p>$\displaystyle\int\frac{5x-1}{x^2-1}\,dx$</p>`, R`<p>$\frac{5x-1}{(x-1)(x+1)}=\frac A{x-1}+\frac B{x+1}$, so $5x-1=A(x+1)+B(x-1)$. Plug $x=1$: $4=2A\Rightarrow A=2$. Plug $x=-1$: $-6=-2B\Rightarrow B=3$. $$\int\left(\frac2{x-1}+\frac3{x+1}\right)dx=2\ln|x-1|+3\ln|x+1|+C.$$</p>`)}
${EX('Example 2 — Repeated factor', R`<p>$\displaystyle\int\frac{x+3}{x(x-1)^2}\,dx$</p>`, R`<p>$\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^2}$: $x+3=A(x-1)^2+Bx(x-1)+Cx$. $x=0$: $A=3$. $x=1$: $C=4$. Compare $x^2$: $0=A+B\Rightarrow B=-3$. Result: $3\ln|x|-3\ln|x-1|-\frac4{x-1}+C$.</p>`)}`,
      quiz: [
        Q(R`The partial fraction form of $\dfrac{1}{x(x+2)}$ is $\dfrac Ax+\dfrac B{x+2}$ with:`, [R`$A=\tfrac12,\ B=-\tfrac12$`, R`$A=1,\ B=1$`, R`$A=\tfrac12,\ B=\tfrac12$`, R`$A=2,\ B=-2$`], 0, R`$1=A(x+2)+Bx$. $x=0$: $A=\frac12$. $x=-2$: $B=-\frac12$.`,
          [null, R`Check: $\frac1x+\frac1{x+2}=\frac{2x+2}{x(x+2)}$.`, R`Sign of $B$ is wrong.`, R`Check $x=0$: $1=2A$.`]),
        Q(R`Before using partial fractions on $\dfrac{x^3}{x^2-1}$, you must:`, [R`Factor the numerator`, R`Do polynomial long division`, R`Complete the square`, R`Nothing`], 1, R`The numerator's degree (3) ≥ denominator's (2): divide first to get $x+\frac{x}{x^2-1}$.`,
          [R`Not needed.`, null, R`The denominator factors already.`, R`Improper rational functions must be divided first.`])
      ]
    },
    {
      id: 'improper', title: 'Improper Integrals',
      html: R`
<p>An integral is <b>improper</b> if an endpoint is infinite or the integrand blows up somewhere on the interval. We define it as a limit.</p>
${BOX('def', 'Improper integrals', R`<p><b>Type 1 (infinite interval):</b> $\displaystyle\int_a^\infty f(x)\,dx=\lim_{t\to\infty}\int_a^tf(x)\,dx$.</p><p><b>Type 2 (discontinuous integrand at $b$):</b> $\displaystyle\int_a^bf(x)\,dx=\lim_{t\to b^-}\int_a^tf(x)\,dx$.</p><p>If the limit exists (finite), the integral <b>converges</b>; otherwise it <b>diverges</b>.</p>`)}
${EX('Example 1', R`<p>$\displaystyle\int_1^\infty\frac{1}{x^2}\,dx$ and $\displaystyle\int_1^\infty\frac1x\,dx$</p>`, R`<p>$\lim_{t\to\infty}\left[-\frac1x\right]_1^t=\lim(1-\frac1t)=1$: <b>converges</b>. But $\lim_{t\to\infty}\ln t=\infty$: <b>diverges</b>. The region under $1/x$ has infinite area; under $1/x^2$, finite area.</p>`)}
${BOX('thm', 'The p-test for integrals', R`$$\int_1^\infty\frac{dx}{x^p}\ \text{converges if } p>1,\ \text{diverges if } p\le1.$$ $$\int_0^1\frac{dx}{x^p}\ \text{converges if } p<1,\ \text{diverges if } p\ge1.$$`)}
${EX('Example 2 — Type 2', R`<p>$\displaystyle\int_0^1\frac{dx}{\sqrt x}$</p>`, R`<p>$\lim_{t\to0^+}[2\sqrt x]_t^1=2$. Converges (p = 1/2 < 1).</p>`)}
${BOX('thm', 'Comparison Test', R`<p>If $0\le g(x)\le f(x)$ for $x\ge a$: if $\int_a^\infty f$ converges, so does $\int_a^\infty g$; if $\int_a^\infty g$ diverges, so does $\int_a^\infty f$. Example: $\int_1^\infty e^{-x^2}dx$ converges since $e^{-x^2}\le e^{-x}$ for $x\geq1$.</p>`)}`,
      quiz: [
        Q(R`$\displaystyle\int_1^\infty\frac{dx}{x^3}=$`, [R`$\tfrac12$`, R`$\tfrac13$`, R`diverges`, R`$1$`], 0, R`$\lim[-\frac1{2x^2}]_1^t=\frac12$.`,
          [null, R`Antiderivative is $-\frac{1}{2x^2}$.`, R`$p=3>1$ converges.`, R`Recompute.`]),
        Q(R`Which integral diverges?`, [R`$\int_1^\infty x^{-1.01}dx$`, R`$\int_1^\infty x^{-1/2}dx$`, R`$\int_0^\infty e^{-x}dx$`, R`$\int_0^1x^{-1/2}dx$`], 1, R`$p=\frac12\le1$ on $[1,\infty)$ diverges.`,
          [R`$p=1.01>1$ converges.`, null, R`Converges to 1.`, R`$p=\frac12<1$ on $[0,1]$ converges.`])
      ]
    }
  ],
  review: [
    Q(R`$\displaystyle\int x\cos x\,dx=$`, [R`$x\sin x+\cos x+C$`, R`$x\sin x-\cos x+C$`, R`$\tfrac{x^2}2\sin x+C$`, R`$-x\sin x+\cos x+C$`], 0, R`$u=x$, $v=\sin x$: $x\sin x-\int\sin x\,dx=x\sin x+\cos x$.`,
      [null, R`$-\int\sin x\,dx=+\cos x$.`, R`Can't integrate factors separately.`, R`$v=\int\cos x\,dx=+\sin x$.`])
  ]
});
