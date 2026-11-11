CALC.addChapter({
  id: 'integration', num: 6, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'Integration',
  blurb: 'Area under curves, Riemann sums, the definite integral, the Fundamental Theorem of Calculus, and substitution.',
  intro: R`<p class="lead">The second great problem of calculus: how much area lies under a curve? The answer — the <b>definite integral</b> — turns out to be intimately connected to the derivative through the <b>Fundamental Theorem of Calculus</b>, one of the most important results in all of mathematics.</p>`,
  objectives: ['Use sigma notation and approximate area with left, right, and midpoint Riemann sums.', 'Define the definite integral as a limit of Riemann sums and interpret it as net signed area.', 'Apply properties of definite integrals.', 'State and apply both parts of the Fundamental Theorem of Calculus.', 'Use the Net Change Theorem in applications.', 'Evaluate integrals by $u$-substitution, including definite integrals.', 'Approximate integrals with the Trapezoidal and Simpson\'s Rules.'],
  sections: [
    {
      id: 'area', title: 'Area and Riemann Sums',
      html: R`
<p>We know areas of rectangles and triangles. But what's the area under $y=x^2$ from $0$ to $2$? Archimedes' idea: approximate with shapes we understand, then refine.</p>
<h2>Sigma notation</h2>
<p>$\displaystyle\sum_{i=1}^{n}a_i=a_1+a_2+\cdots+a_n$. Useful formulas:</p>
$$\sum_{i=1}^n c=cn,\qquad \sum_{i=1}^n i=\frac{n(n+1)}2,\qquad \sum_{i=1}^n i^2=\frac{n(n+1)(2n+1)}6,\qquad \sum_{i=1}^n i^3=\left[\frac{n(n+1)}2\right]^2$$
<h2>Riemann sums</h2>
<p>Divide $[a,b]$ into $n$ equal subintervals of width $\Delta x=\frac{b-a}{n}$, with endpoints $x_i=a+i\Delta x$. On each, build a rectangle whose height is $f$ at some sample point $x_i^*$:</p>
$$\text{Area}\approx\sum_{i=1}^n f(x_i^*)\,\Delta x.$$
<ul><li><b>Left sum</b> $L_n$: $x_i^*=x_{i-1}$ (left endpoints).</li><li><b>Right sum</b> $R_n$: $x_i^*=x_i$.</li><li><b>Midpoint sum</b> $M_n$: $x_i^*=\frac{x_{i-1}+x_i}{2}$.</li></ul>
${WIDGET('riemann')}
${EX('Example 1 — Computing a right sum', R`<p>Estimate the area under $f(x)=x^2$ on $[0,2]$ with $R_4$.</p>`, R`<p>$\Delta x=0.5$; right endpoints $0.5,1,1.5,2$. $$R_4=0.5\,(0.25+1+2.25+4)=0.5(7.5)=3.75.$$ (The true area is $\frac83\approx2.667$; $R_4$ overestimates because $x^2$ is increasing.)</p>`)}
${EX('Example 2 — The exact area as a limit', R`<p>Find the exact area under $y=x^2$ on $[0,2]$ using $\lim_{n\to\infty}R_n$.</p>`, R`<p>$\Delta x=\frac2n$, $x_i=\frac{2i}n$. $$R_n=\sum_{i=1}^n\left(\frac{2i}{n}\right)^2\frac2n=\frac8{n^3}\sum i^2=\frac8{n^3}\cdot\frac{n(n+1)(2n+1)}6.$$ As $n\to\infty$, this approaches $\frac{8\cdot2}{6}=$ <span class="ans">$\frac83$</span>.</p>`)}
${BOX('tip', 'Over or under?', R`<p>For an <b>increasing</b> function, left sums underestimate and right sums overestimate. For a <b>decreasing</b> function, it's the reverse.</p>`)}
${MORE([['3Blue1Brown — Integration and the fundamental theorem', 'https://www.youtube.com/watch?v=rfG8ce4nNh0', 'Essence of Calculus, ch. 8'], ['OpenStax §5.1 Approximating Areas', 'https://openstax.org/books/calculus-volume-1/pages/5-1-approximating-areas', 'Reading']])}`,
      quiz: [
        Q(R`$\displaystyle\sum_{i=1}^{4}(2i+1)=$`, [R`$24$`, R`$20$`, R`$9$`, R`$25$`], 0, R`$3+5+7+9=24$.`,
          [null, R`$2\sum i=20$; add $\sum1=4$.`, R`That's only the last term.`, R`Recheck the arithmetic.`]),
        Q(R`For $f(x)=x$ on $[0,4]$ with $n=4$, the left Riemann sum $L_4$ is:`, [R`$6$`, R`$10$`, R`$8$`, R`$4$`], 0, R`$\Delta x=1$, left endpoints $0,1,2,3$: sum $=6$.`,
          [null, R`That's $R_4=1+2+3+4$.`, R`$8$ is the exact area; $L_4$ underestimates.`, R`Add all four heights.`]),
        Q(R`For a decreasing function on $[a,b]$, the right Riemann sum:`, [R`overestimates the area`, R`underestimates the area`, R`is exact`, R`can't be compared`], 1, R`For a decreasing function, the right endpoint is the lowest point in each subinterval, so rectangles fit under the curve.`,
          [R`That's the left sum for a decreasing function.`, null, R`Only for constant functions.`, R`Monotonicity determines the comparison.`])
      ]
    },
    {
      id: 'definite', title: 'The Definite Integral',
      html: R`
${BOX('def', 'Definition — Definite integral', R`<p>If $f$ is defined on $[a,b]$, the <b>definite integral</b> of $f$ from $a$ to $b$ is $$\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\,\Delta x,$$ provided this limit exists and is the same for all choices of sample points. Then $f$ is <b>integrable</b> on $[a,b]$. Every continuous function (and every bounded function with finitely many jumps) is integrable.</p>`)}
<p>The symbol $\int$ is an elongated S for "sum"; $dx$ recalls $\Delta x$. The numbers $a$ and $b$ are the <b>limits of integration</b>; $f(x)$ is the <b>integrand</b>.</p>
<h2>Net signed area</h2>
<p>Where $f<0$, the rectangles have negative height, so the integral counts area <b>below</b> the axis as <b>negative</b>: $$\int_a^b f(x)\,dx=(\text{area above})-(\text{area below}).$$</p>
${EX('Example 1 — Using geometry', R`<p>Evaluate $\displaystyle\int_0^3(x-1)\,dx$ and $\displaystyle\int_{-2}^2\sqrt{4-x^2}\,dx$.</p>`, R`<p>First: a triangle below the axis on $[0,1]$ with area $\frac12$ and a triangle above on $[1,3]$ with area $2$. Net: $2-\frac12=$ <span class="ans">$\frac32$</span>.</p><p>Second: the upper half of a circle of radius $2$: <span class="ans">$\frac12\pi(2)^2=2\pi$</span>.</p>`)}
${BOX('thm', 'Properties of the definite integral', R`<ol>
<li>$\int_a^a f\,dx=0$ and $\int_b^a f\,dx=-\int_a^b f\,dx$</li>
<li>$\int_a^b c\,dx=c(b-a)$</li>
<li>$\int_a^b[f\pm g]\,dx=\int_a^b f\,dx\pm\int_a^b g\,dx$, and $\int_a^b cf\,dx=c\int_a^b f\,dx$</li>
<li>$\int_a^c f\,dx+\int_c^b f\,dx=\int_a^b f\,dx$ (additivity)</li>
<li>If $f\ge g$ on $[a,b]$, then $\int_a^b f\,dx\ge\int_a^b g\,dx$</li>
<li>If $m\le f(x)\le M$ on $[a,b]$, then $m(b-a)\le\int_a^b f\,dx\le M(b-a)$</li></ol>`)}
${EX('Example 2 — Properties', R`<p>Given $\int_0^5 f\,dx=8$ and $\int_0^2 f\,dx=3$, find $\int_2^5 f\,dx$ and $\int_5^2 4f\,dx$.</p>`, R`<p>$\int_2^5f=8-3=5$. $\int_5^24f=-4\cdot5=-20$.</p>`)}
<h2>Symmetry</h2>
<p>If $f$ is <b>even</b>: $\int_{-a}^af\,dx=2\int_0^af\,dx$. If $f$ is <b>odd</b>: $\int_{-a}^af\,dx=0$. For example, $\int_{-\pi}^{\pi}x^3\cos x\,dx=0$ instantly, since $x^3\cos x$ is odd.</p>`,
      quiz: [
        Q(R`$\displaystyle\int_{-3}^{3}x^5\,dx=$`, [R`$0$`, R`$243$`, R`$\tfrac{729}{6}$`, R`$486$`], 0, R`$x^5$ is odd, so the areas cancel.`,
          [null, R`Odd function on a symmetric interval integrates to $0$.`, R`That's $\int_0^3$ only.`, R`Positive and negative parts cancel.`]),
        Q(R`If $\int_1^4 f\,dx=6$, then $\int_4^1 3f(x)\,dx=$`, [R`$18$`, R`$-18$`, R`$-6$`, R`$2$`], 1, R`Swapping limits negates; constant factors out: $3(-6)=-18$.`,
          [R`Reversing limits changes the sign.`, null, R`Don't forget the factor of 3.`, R`Multiply, don't divide.`]),
        Q(R`$\displaystyle\int_0^2|x-1|\,dx=$`, [R`$0$`, R`$1$`, R`$2$`, R`$\tfrac12$`], 1, R`Two triangles each of area $\frac12$ (both above the axis since absolute value $\ge0$).`,
          [R`$|x-1|\ge0$, so nothing cancels.`, null, R`Each triangle has base 1 and height 1.`, R`That's only one triangle.`]),
        Q(R`$\displaystyle\int_0^{4}\sqrt{16-x^2}\,dx$ represents:`, [R`a quarter circle of radius 4, area $4\pi$`, R`a semicircle, area $8\pi$`, R`a full circle, area $16\pi$`, R`a triangle, area $8$`], 0, R`$y=\sqrt{16-x^2}$ is the upper semicircle; from $0$ to $4$ it's a quarter: $\frac14\pi(16)=4\pi$.`,
          [null, R`The interval $[0,4]$ covers only half the semicircle.`, R`Only the upper half, from $0$ to $4$.`, R`The graph is circular.`])
      ]
    },
    {
      id: 'ftc', title: 'The Fundamental Theorem of Calculus',
      html: R`
<p>Computing integrals as limits of sums is painful. Newton and Leibniz discovered a stunning shortcut: <b>integration and differentiation are inverse processes</b>.</p>
<p>Define the <b>accumulation function</b> $A(x)=\int_a^x f(t)\,dt$ — the area under $f$ from $a$ up to a moving endpoint $x$. Explore it:</p>
${WIDGET('ftc')}
${BOX('thm', 'FTC Part 1', R`<p>If $f$ is continuous on $[a,b]$, then $g(x)=\displaystyle\int_a^x f(t)\,dt$ is differentiable on $(a,b)$ and $$g'(x)=f(x).$$</p>`)}
<p><b>Why?</b> $g(x+h)-g(x)$ is the area of a thin strip of width $h$ and height ≈ $f(x)$. So $\frac{g(x+h)-g(x)}h\approx f(x)$, with equality in the limit.</p>
${BOX('thm', 'FTC Part 2 (Evaluation Theorem)', R`<p>If $f$ is continuous on $[a,b]$ and $F$ is <b>any</b> antiderivative of $f$, then $$\int_a^b f(x)\,dx=F(b)-F(a)=\Big[F(x)\Big]_a^b.$$</p>`)}
${EX('Example 1 — Evaluating', R`<p>Evaluate $\displaystyle\int_0^2x^2\,dx$ and $\displaystyle\int_0^{\pi}\sin x\,dx$.</p>`, R`<p>$\left[\frac{x^3}3\right]_0^2=\frac83$ — matching our Riemann-sum limit with no effort! And $[-\cos x]_0^\pi=-(-1)-(-1)=$ <span class="ans">$2$</span>.</p>`)}
${EX('Example 2', R`<p>$\displaystyle\int_1^4\left(\sqrt x-\frac{2}{x}\right)dx$</p>`, R`<p>$\left[\frac23x^{3/2}-2\ln x\right]_1^4=\left(\frac{16}3-2\ln4\right)-\frac23=\frac{14}3-4\ln2\approx1.894$.</p>`)}
<h2>FTC Part 1 with the chain rule</h2>
${BOX('tip', 'General form', R`$$\frac{d}{dx}\int_{a}^{u(x)}f(t)\,dt=f(u(x))\,u'(x)\qquad \frac{d}{dx}\int_{v(x)}^{u(x)}f(t)\,dt=f(u(x))u'(x)-f(v(x))v'(x)$$`)}
${EX('Example 3', R`<p>Find $\dfrac{d}{dx}\displaystyle\int_1^{x}\sqrt{1+t^3}\,dt$ and $\dfrac{d}{dx}\displaystyle\int_0^{x^2}\cos t\,dt$ and $\dfrac{d}{dx}\displaystyle\int_x^{5}e^{t^2}\,dt$.</p>`, R`<p>$\sqrt{1+x^3}$; $\ \cos(x^2)\cdot2x$; $\ -e^{x^2}$ (flip the limits first).</p>`)}
${BOX('warn', 'Common errors', R`<ul><li>$\int_{-1}^1\frac1{x^2}dx\ne\left[-\frac1x\right]_{-1}^1=-2$. The integrand is discontinuous at $0$, so FTC doesn't apply (this is an improper integral, §8.5, and it diverges).</li><li>Don't add $+C$ in definite integrals — it cancels.</li></ul>`)}
${MORE([['Khan Academy — FTC', 'https://www.khanacademy.org/math/ap-calculus-ab/ab-integration-new/ab-6-4/v/fundamental-theorem-of-calculus', 'Video'], ['OpenStax §5.3 The Fundamental Theorem', 'https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus', 'Reading'], ["Paul's Notes — Computing Definite Integrals", 'https://tutorial.math.lamar.edu/Classes/CalcI/ComputingDefiniteIntegrals.aspx', 'Practice']])}`,
      quiz: [
        Q(R`$\displaystyle\int_1^3 2x\,dx=$`, [R`$8$`, R`$9$`, R`$4$`, R`$6$`], 0, R`$[x^2]_1^3=9-1=8$.`,
          [null, R`Don't forget to subtract $F(1)=1$.`, R`That's $b-a$ times... recheck.`, R`$F(3)-F(1)=9-1$.`]),
        Q(R`$\dfrac{d}{dx}\displaystyle\int_2^{x}\frac{1}{1+t^4}\,dt=$`, [R`$\dfrac{1}{1+x^4}$`, R`$\dfrac{1}{1+x^4}-\dfrac1{17}$`, R`$\dfrac{-4x^3}{(1+x^4)^2}$`, R`$0$`], 0, R`FTC Part 1: replace $t$ by $x$.`,
          [null, R`The constant lower limit contributes nothing after differentiating.`, R`That's the derivative of the integrand, not of the integral.`, R`The integral depends on $x$.`]),
        Q(R`$\dfrac{d}{dx}\displaystyle\int_0^{\sin x}t^2\,dt=$`, [R`$\sin^2x$`, R`$\sin^2x\cos x$`, R`$x^2$`, R`$\cos^3 x$`], 1, R`$f(u)u'=(\sin x)^2\cdot\cos x$.`,
          [R`Forgot the chain rule factor $\cos x$.`, null, R`Plug in the upper limit $\sin x$, not $x$.`, R`Evaluate $t^2$ at $\sin x$.`]),
        Q(R`$\displaystyle\int_0^{\pi/2}\cos x\,dx=$`, [R`$0$`, R`$1$`, R`$-1$`, R`$\tfrac\pi2$`], 1, R`$[\sin x]_0^{\pi/2}=1-0$.`,
          [R`$\sin(\pi/2)=1$.`, null, R`The antiderivative of $\cos$ is $+\sin$.`, R`Evaluate the antiderivative.`]),
        Q(R`If $g(x)=\int_0^x f(t)\,dt$ and $f$ is positive, then $g$ is:`, [R`increasing`, R`decreasing`, R`constant`, R`concave up`], 0, R`$g'(x)=f(x)>0$, so $g$ increases.`,
          [null, R`$g'=f>0$.`, R`$g'\ne0$.`, R`Concavity depends on $g''=f'$, which isn't given.`])
      ]
    },
    {
      id: 'net-change', title: 'Indefinite Integrals and the Net Change Theorem',
      html: R`
<p>Because of the FTC, the notation $\int f(x)\,dx$ (no limits) means the family of antiderivatives — see §5.9. A <b>definite</b> integral is a number; an <b>indefinite</b> integral is a family of functions.</p>
${BOX('thm', 'Net Change Theorem', R`<p>The integral of a rate of change is the net change: $$\int_a^bF'(x)\,dx=F(b)-F(a).$$</p>`)}
<p>Applications:</p>
<ul><li>If $v(t)$ is velocity, $\int_a^b v(t)\,dt$ = <b>displacement</b> (net change in position).</li>
<li>$\int_a^b |v(t)|\,dt$ = <b>total distance traveled</b>.</li>
<li>If $r(t)$ is the rate water flows into a tank, $\int_a^b r(t)\,dt$ is the net amount added.</li>
<li>If $C'(x)$ is marginal cost, $\int_{100}^{200}C'(x)\,dx$ is the cost of increasing production from 100 to 200 units.</li></ul>
${EX('Example — Displacement vs. distance', R`<p>A particle moves with $v(t)=t^2-2t-3$ m/s on $0\le t\le4$. Find its displacement and total distance traveled.</p>`, R`<p><b>Displacement:</b> $\int_0^4(t^2-2t-3)\,dt=\left[\frac{t^3}3-t^2-3t\right]_0^4=\frac{64}3-16-12=-\frac{20}3$ m.</p>
<p><b>Distance:</b> $v=(t-3)(t+1)$ is negative on $[0,3)$ and positive on $(3,4]$. $$\int_0^3-(t^2-2t-3)\,dt+\int_3^4(t^2-2t-3)\,dt=9+\frac73=\frac{34}3\text{ m}.$$</p>`)}`,
      quiz: [
        Q(R`Water flows into a tank at $r(t)=4t$ L/min. How much water enters from $t=1$ to $t=3$?`, [R`$16$ L`, R`$8$ L`, R`$12$ L`, R`$36$ L`], 0, R`$\int_1^34t\,dt=[2t^2]_1^3=18-2=16$.`,
          [null, R`That's $r(3)-r(1)$, not the integral.`, R`Recompute: $2(9)-2(1)$.`, R`Don't forget to subtract the lower limit and use the antiderivative $2t^2$.`]),
        Q(R`$\int_a^b|v(t)|\,dt$ represents:`, [R`displacement`, R`total distance traveled`, R`average velocity`, R`acceleration`], 1, R`Taking absolute value counts backward motion as positive distance.`,
          [R`Displacement is $\int v\,dt$ without absolute value.`, null, R`Average velocity divides displacement by $b-a$.`, R`Acceleration is $v'$.`]),
        Q(R`If $v(t)=\cos t$, the displacement on $[0,\pi]$ is:`, [R`$0$`, R`$2$`, R`$1$`, R`$\pi$`], 0, R`$[\sin t]_0^\pi=0$. (The total distance is 2.)`,
          [null, R`That's the total distance.`, R`$\sin\pi-\sin0=0$.`, R`Integrate the velocity.`])
      ]
    },
    {
      id: 'substitution', title: 'The Substitution Rule',
      html: R`
<p>Substitution is the chain rule run backward. If the integrand contains a function <em>and its derivative</em>, substitution simplifies it.</p>
${BOX('thm', 'Substitution Rule', R`<p>If $u=g(x)$ is differentiable and $f$ is continuous, then $$\int f(g(x))\,g'(x)\,dx=\int f(u)\,du.$$</p>`)}
<h2>Procedure</h2>
<ol class="steps"><li>Choose $u$ — usually the "inside" of a composition, whose derivative also appears (up to a constant).</li><li>Compute $du=g'(x)\,dx$.</li><li>Rewrite the entire integral in terms of $u$ (no $x$ may remain).</li><li>Integrate, then substitute back $u=g(x)$.</li></ol>
${EX('Example 1', R`<p>$\displaystyle\int 2x(x^2+1)^5\,dx$</p>`, R`<p>$u=x^2+1$, $du=2x\,dx$. $\int u^5du=\frac{u^6}6+C=$ <span class="ans">$\frac{(x^2+1)^6}{6}+C$</span></p>`)}
${EX('Example 2 — Adjusting a constant', R`<p>$\displaystyle\int x^2\cos(x^3)\,dx$</p>`, R`<p>$u=x^3$, $du=3x^2dx\Rightarrow x^2dx=\frac13du$. $\frac13\int\cos u\,du=$ <span class="ans">$\frac13\sin(x^3)+C$</span></p>`)}
${EX('Example 3 — Logs and exponentials', R`<p>$\displaystyle\int\frac{x}{x^2+4}\,dx$, $\displaystyle\int\tan x\,dx$, $\displaystyle\int e^{5x}dx$</p>`, R`<p>$\frac12\ln(x^2+4)+C$. For $\tan x=\frac{\sin x}{\cos x}$, let $u=\cos x$: $-\ln|\cos x|+C=\ln|\sec x|+C$. And $\frac15e^{5x}+C$.</p>`)}
${EX('Example 4 — Inverse trig forms', R`<p>$\displaystyle\int\frac{dx}{9+x^2}$ and $\displaystyle\int\frac{dx}{\sqrt{4-x^2}}$</p>`, R`<p>General forms: $\int\frac{dx}{a^2+x^2}=\frac1a\arctan\frac xa+C$, $\int\frac{dx}{\sqrt{a^2-x^2}}=\arcsin\frac xa+C$. So: $\frac13\arctan\frac x3+C$ and $\arcsin\frac x2+C$.</p>`)}
<h2>Definite integrals: change the limits</h2>
${EX('Example 5', R`<p>$\displaystyle\int_0^{2}x\sqrt{x^2+5}\,dx$</p>`, R`<p>$u=x^2+5$: when $x=0$, $u=5$; when $x=2$, $u=9$. $du=2x\,dx$. $$\frac12\int_5^9u^{1/2}du=\frac12\cdot\frac23\left[u^{3/2}\right]_5^9=\frac13(27-5\sqrt5)\approx5.27.$$ No need to switch back to $x$!</p>`)}
${EX('Example 6 — Back-substitution', R`<p>$\displaystyle\int x\sqrt{x-1}\,dx$</p>`, R`<p>$u=x-1$, so $x=u+1$. $\int(u+1)u^{1/2}du=\int(u^{3/2}+u^{1/2})du=\frac25(x-1)^{5/2}+\frac23(x-1)^{3/2}+C$.</p>`)}
${BOX('warn', 'Mistakes to avoid', R`<ul><li>Leaving a stray $x$ in a $u$-integral.</li><li>Forgetting to change the limits (or to change back) in definite integrals.</li><li>Forgetting $dx$ → $du$ conversion factors.</li></ul>`)}`,
      quiz: [
        Q(R`$\displaystyle\int 3x^2(x^3+2)^4\,dx=$`, [R`$\dfrac{(x^3+2)^5}{5}+C$`, R`$(x^3+2)^5+C$`, R`$\dfrac{3x^2(x^3+2)^5}{5}+C$`, R`$4(x^3+2)^3+C$`], 0, R`$u=x^3+2$, $du=3x^2dx$: $\int u^4du=\frac{u^5}5$.`,
          [null, R`Divide by 5 when raising the power.`, R`$3x^2dx$ is absorbed into $du$.`, R`That's differentiation, not integration.`]),
        Q(R`$\displaystyle\int\frac{\ln x}{x}\,dx=$`, [R`$\ln(\ln x)+C$`, R`$\dfrac{(\ln x)^2}{2}+C$`, R`$\dfrac{1}{x^2}+C$`, R`$x\ln x+C$`], 1, R`$u=\ln x$, $du=\frac1xdx$: $\int u\,du=\frac{u^2}2$.`,
          [R`That would be $\int\frac{1}{x\ln x}dx$.`, null, R`Check by differentiating.`, R`Differentiate to check: you'd get $\ln x+1$.`]),
        Q(R`$\displaystyle\int_0^{\pi/2}\sin x\cos x\,dx=$`, [R`$\tfrac12$`, R`$1$`, R`$0$`, R`$-\tfrac12$`], 0, R`$u=\sin x$ ($0\to1$): $\int_0^1u\,du=\frac12$.`,
          [null, R`$\int_0^1u\,du=\frac12$.`, R`The integrand is positive on this interval.`, R`Sign error.`]),
        Q(R`$\displaystyle\int e^{-3x}\,dx=$`, [R`$-3e^{-3x}+C$`, R`$-\tfrac13e^{-3x}+C$`, R`$e^{-3x}+C$`, R`$\tfrac13e^{-3x}+C$`], 1, R`$u=-3x$, $dx=-\frac13du$.`,
          [R`That's the derivative.`, null, R`Differentiate to check — you'd get $-3e^{-3x}$.`, R`Lost the negative sign.`]),
        Q(R`$\displaystyle\int\frac{dx}{1+4x^2}=$`, [R`$\arctan(2x)+C$`, R`$\tfrac12\arctan(2x)+C$`, R`$\ln(1+4x^2)+C$`, R`$2\arctan(2x)+C$`], 1, R`$u=2x$, $du=2dx$: $\frac12\int\frac{du}{1+u^2}=\frac12\arctan u$.`,
          [R`Missing the factor $\frac12$.`, null, R`The numerator isn't the derivative of $1+4x^2$.`, R`Divide by 2, don't multiply.`])
      ]
    },
    {
      id: 'numerical', title: 'Numerical Integration',
      html: R`
<p>Many functions, like $e^{-x^2}$ or $\frac{\sin x}{x}$, have no elementary antiderivative. To evaluate their definite integrals we approximate. With $\Delta x=\frac{b-a}{n}$ and $x_i=a+i\Delta x$:</p>
${BOX('thm', 'Approximation rules', R`
<p><b>Midpoint</b> ($\bar x_i$ = midpoints):</p>$$M_n=\Delta x\left[f(\bar x_1)+f(\bar x_2)+\cdots+f(\bar x_n)\right]$$
<p><b>Trapezoidal:</b></p>$$T_n=\frac{\Delta x}{2}\Big[f(x_0)+2f(x_1)+\cdots+2f(x_{n-1})+f(x_n)\Big]$$
<p><b>Simpson's</b> ($n$ even):</p>$$S_n=\frac{\Delta x}{3}\Big[f(x_0)+4f(x_1)+2f(x_2)+4f(x_3)+\cdots+4f(x_{n-1})+f(x_n)\Big]$$`)}
<p>The trapezoidal rule is the average of the left and right sums. Simpson's rule fits parabolas through triples of points and is dramatically more accurate.</p>
${EX('Example', R`<p>Approximate $\displaystyle\int_1^2\frac1x\,dx=\ln2\approx0.693147$ with $n=4$.</p>`, R`<p>$\Delta x=0.25$; $f$ at $1,1.25,1.5,1.75,2$: $1,0.8,0.6667,0.5714,0.5$.</p>
<p>$T_4=0.125[1+1.6+1.3333+1.1429+0.5]\approx0.697024$ (error $\approx0.0039$).</p>
<p>$S_4=\frac{0.25}3[1+3.2+1.3333+2.2857+0.5]\approx0.693254$ (error $\approx0.0001$).</p>`)}
${BOX('thm', 'Error bounds', R`<p>If $|f''|\le K$ on $[a,b]$: $|E_T|\le\dfrac{K(b-a)^3}{12n^2}$, $|E_M|\le\dfrac{K(b-a)^3}{24n^2}$. If $|f^{(4)}|\le K$: $|E_S|\le\dfrac{K(b-a)^5}{180n^4}$.</p><p>Doubling $n$ cuts trapezoid error by about 4 and Simpson error by about 16.</p>`)}
<p>Try it: the <a href="#/learn/integration/area">Riemann sums widget</a> has a trapezoid mode, and the <a href="#/tools">Graphing Tool</a> computes integrals with Simpson's rule.</p>`,
      quiz: [
        Q(R`The Trapezoidal Rule $T_n$ equals:`, [R`the average of $L_n$ and $R_n$`, R`$M_n$`, R`the average of $L_n$ and $M_n$`, R`$2M_n-L_n$`], 0, R`Each trapezoid's area is the average of the left and right rectangles.`,
          [null, R`Midpoint is a different rule.`, R`It's left and right.`, R`No such identity.`]),
        Q(R`Simpson's Rule requires $n$ to be:`, [R`odd`, R`even`, R`prime`, R`a power of 2`], 1, R`It pairs up subintervals to fit parabolas, so $n$ must be even.`,
          [R`Pairs of subintervals need even $n$.`, null, R`No such requirement.`, R`Any even $n$ works.`]),
        Q(R`If $f$ is concave up on $[a,b]$, the Trapezoidal Rule:`, [R`overestimates`, R`underestimates`, R`is exact`, R`can't tell`], 0, R`Chords of a concave-up curve lie above it, so trapezoids include extra area.`,
          [null, R`That's for concave down.`, R`Only for linear $f$.`, R`Concavity decides.`])
      ]
    }
  ],
  review: [
    Q(R`$\displaystyle\int_0^1(3x^2+2x)\,dx=$`, [R`$2$`, R`$5$`, R`$1$`, R`$3$`], 0, R`$[x^3+x^2]_0^1=2$.`, [null, R`That's the integrand at $x=1$.`, R`Add both antiderivatives.`, R`Recompute.`]),
    Q(R`$\dfrac{d}{dx}\displaystyle\int_{x}^{x^2}\ln t\,dt=$`, [R`$2x\ln(x^2)-\ln x$`, R`$\ln(x^2)-\ln x$`, R`$\ln x$`, R`$2x\ln x$`], 0, R`$f(x^2)\cdot2x-f(x)\cdot1$.`,
      [null, R`Forgot the chain factor $2x$.`, R`Both limits depend on $x$.`, R`Subtract the lower-limit contribution.`]),
    Q(R`$\displaystyle\int_1^e\frac{dx}{x}=$`, [R`$1$`, R`$e-1$`, R`$0$`, R`$\tfrac1e$`], 0, R`$[\ln x]_1^e=1-0$.`, [null, R`The antiderivative is $\ln x$, not $x$.`, R`$\ln e=1$.`, R`Evaluate $\ln$.`])
  ]
});
