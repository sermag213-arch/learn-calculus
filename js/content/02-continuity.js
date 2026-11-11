CALC.addChapter({
  id: 'continuity', num: 2, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'Continuity',
  blurb: 'Functions you can draw without lifting your pencil — and the powerful theorems that follow.',
  intro: R`<p class="lead">Intuitively, a function is continuous if its graph has no breaks, holes, or jumps. Using limits we can make this precise, classify the ways continuity can fail, and prove the <b>Intermediate Value Theorem</b> — a guarantee that solutions to equations exist.</p>`,
  objectives: ['State the three-part definition of continuity at a point.', 'Classify discontinuities as removable, jump, or infinite.', 'Determine where combinations of functions are continuous; choose constants to make a piecewise function continuous.', 'Apply the Intermediate Value Theorem to show that equations have solutions.'],
  sections: [
    {
      id: 'definition', title: 'Continuity at a Point',
      html: R`
${BOX('def', 'Definition — Continuity', R`<p>A function $f$ is <b>continuous at $a$</b> if all three conditions hold:</p><ol><li>$f(a)$ is defined;</li><li>$\displaystyle\lim_{x\to a}f(x)$ exists;</li><li>$\displaystyle\lim_{x\to a}f(x)=f(a)$.</li></ol>`)}
<p>In words: the value the function is <em>heading toward</em> equals the value it <em>actually takes</em>. Condition 3 is the heart of it; conditions 1 and 2 just make sure both sides of that equation make sense.</p>
<h2>Types of discontinuity</h2>
<table><thead><tr><th>Type</th><th>What fails</th><th>Picture</th><th>Example</th></tr></thead><tbody>
<tr><td><b>Removable</b></td><td>Limit exists but $\ne f(a)$ or $f(a)$ undefined</td><td>a hole</td><td>$\dfrac{x^2-1}{x-1}$ at $x=1$</td></tr>
<tr><td><b>Jump</b></td><td>One-sided limits exist but differ</td><td>a step</td><td>$\dfrac{|x|}{x}$ at $0$; floor function at integers</td></tr>
<tr><td><b>Infinite</b></td><td>A one-sided limit is $\pm\infty$</td><td>vertical asymptote</td><td>$\dfrac1{x}$ at $0$</td></tr>
<tr><td><b>Oscillating</b></td><td>No limit due to oscillation</td><td>infinite wiggle</td><td>$\sin(1/x)$ at $0$</td></tr>
</tbody></table>
<p>A removable discontinuity is called that because redefining a single value "plugs the hole": defining $f(1)=2$ for $\frac{x^2-1}{x-1}$ makes it continuous.</p>
${EX('Example 1 — Checking all three conditions', R`<p>Is $f(x)=\begin{cases}\dfrac{x^2-9}{x-3}, & x\neq3\\ 6, & x=3\end{cases}$ continuous at $3$?</p>`, R`<ol class="steps"><li>$f(3)=6$ is defined. ✔</li><li>$\lim_{x\to3}\frac{(x-3)(x+3)}{x-3}=\lim_{x\to3}(x+3)=6$ exists. ✔</li><li>$\lim=6=f(3)$. ✔</li></ol><p><span class="ans">Yes, continuous at 3.</span></p>`)}
<h2>One-sided continuity and intervals</h2>
<p>$f$ is <b>continuous from the right</b> at $a$ if $\lim_{x\to a^+}f(x)=f(a)$, and <b>from the left</b> if $\lim_{x\to a^-}f(x)=f(a)$. A function is continuous on an interval if it is continuous at every interior point and one-sided continuous at any included endpoints. For example, $\sqrt x$ is continuous on $[0,\infty)$.</p>
${BOX('key', 'Key takeaways', R`<ul><li>Continuity at $a$: $\lim_{x\to a}f(x)=f(a)$.</li><li>Removable (hole), jump (step), infinite (asymptote).</li></ul>`)}
${MORE([['OpenStax §2.4 Continuity', 'https://openstax.org/books/calculus-volume-1/pages/2-4-continuity', 'Reading'], ["Paul's Notes — Continuity", 'https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx', 'Examples'], ['Khan Academy — Continuity', 'https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new/ab-1-10a/v/types-of-discontinuities', 'Video: types of discontinuities']])}`,
      quiz: [
        Q(R`$f(x)=\dfrac{x^2-4}{x-2}$ has what kind of discontinuity at $x=2$?`, [R`Removable`, R`Jump`, R`Infinite`, R`None — it's continuous`], 0,
          R`The limit is $\lim(x+2)=4$, but $f(2)$ is undefined. A finite limit with a missing/wrong value is a removable discontinuity (a hole).`,
          [null, R`A jump needs different one-sided limits; here both sides approach $4$.`, R`The $(x-2)$ factor cancels, so there's no asymptote.`, R`$f(2)$ is undefined, so condition 1 fails.`]),
        Q(R`Which condition fails for $g(x)=\begin{cases}x+1,&x<0\\ x-1,&x\ge0\end{cases}$ at $x=0$?`, [R`$g(0)$ is undefined`, R`$\lim_{x\to0}g(x)$ does not exist`, R`The limit exists but differs from $g(0)$`, R`Nothing fails`], 1,
          R`Left limit $=1$, right limit $=-1$. They differ, so the limit doesn't exist — a jump discontinuity.`,
          [R`$g(0)=0-1=-1$ is defined.`, null, R`The two-sided limit doesn't exist at all.`, R`The graph jumps from height $1$ to $-1$.`]),
        Q(R`$h(x)=\dfrac{1}{(x-5)^2}$ has what kind of discontinuity at $x=5$?`, [R`Removable`, R`Jump`, R`Infinite`, R`Oscillating`], 2,
          R`$h(x)\to+\infty$ from both sides: a vertical asymptote, i.e. an infinite discontinuity.`,
          [R`No factor cancels; the function blows up.`, R`One-sided limits are infinite, not finite and unequal.`, null, R`Nothing oscillates here.`])
      ]
    },
    {
      id: 'theorems', title: 'Continuous Functions and Piecewise Matching',
      html: R`
${BOX('thm', 'Theorem — Building continuous functions', R`<p>If $f$ and $g$ are continuous at $a$, then so are $f\pm g$, $fg$, $cf$, and $f/g$ (provided $g(a)\ne0$).</p><p>Polynomials, rational functions, roots, trig, inverse trig, exponential, and logarithmic functions are continuous <b>on their domains</b>.</p>`)}
${BOX('thm', 'Theorem — Composition', R`<p>If $g$ is continuous at $a$ and $f$ is continuous at $g(a)$, then $f\circ g$ is continuous at $a$. In limit form: $$\lim_{x\to a}f(g(x))=f\!\left(\lim_{x\to a}g(x)\right)$$ whenever $f$ is continuous at that inner limit. We say "limits pass inside continuous functions."</p>`)}
${EX('Example 1 — Where is it continuous?', R`<p>Where is $f(x)=\dfrac{\ln x+\arctan x}{x^2-1}$ continuous?</p>`, R`<p>$\ln x$ needs $x>0$. $\arctan x$ is continuous everywhere. The denominator is zero at $x=\pm1$. So $f$ is continuous on <span class="ans">$(0,1)\cup(1,\infty)$</span>.</p>`)}
${EX('Example 2 — A limit through composition', R`<p>$\displaystyle\lim_{x\to\pi}\sin(x+\sin x)$</p>`, R`<p>The inside $x+\sin x\to\pi+0=\pi$, and sine is continuous, so the limit is $\sin\pi=0$.</p>`)}
<h2>Making piecewise functions continuous</h2>
<p>A very common exam problem: choose constants so that the pieces "meet." Set the left limit equal to the right limit (and the function value) at each break point.</p>
${EX('Example 3 — One constant', R`<p>Find $c$ so that $f(x)=\begin{cases}cx^2+2x, & x<2\\ x^3-cx, & x\ge2\end{cases}$ is continuous everywhere.</p>`, R`<p>Each piece is a polynomial, so the only concern is $x=2$. Left: $4c+4$. Right (and $f(2)$): $8-2c$. Set equal: $4c+4=8-2c\Rightarrow6c=4\Rightarrow$ <span class="ans">$c=\tfrac23$</span>.</p>`)}
${EX('Example 4 — Two constants', R`<p>Find $a,b$ so $g(x)=\begin{cases}x+1, & x<1\\ ax+b, & 1\le x<2\\ 3x, & x\ge2\end{cases}$ is continuous.</p>`, R`<p>At $x=1$: $2=a+b$. At $x=2$: $2a+b=6$. Subtract: $a=4$, then $b=-2$. <span class="ans">$a=4,\ b=-2$</span></p>`)}`,
      quiz: [
        Q(R`On which set is $f(x)=\sqrt{x-2}+\dfrac1{x-5}$ continuous?`, [R`$[2,\infty)$`, R`$[2,5)\cup(5,\infty)$`, R`$(2,5)\cup(5,\infty)$`, R`All $x\neq5$`], 1,
          R`$\sqrt{x-2}$ requires $x\ge2$ (right-continuous at $2$); $\frac1{x-5}$ excludes $x=5$.`,
          [R`$x=5$ makes the denominator zero.`, null, R`$x=2$ is included: $\sqrt{x-2}$ is right-continuous there and the second term is fine.`, R`$\sqrt{x-2}$ is undefined for $x<2$.`]),
        Q(R`Find $k$ so that $f(x)=\begin{cases}kx+1, & x\le3\\ x^2-k, & x>3\end{cases}$ is continuous.`, [R`$k=2$`, R`$k=3$`, R`$k=\tfrac{8}{3}$`, R`$k=4$`], 0,
          R`Match at $x=3$: $3k+1=9-k\Rightarrow4k=8\Rightarrow k=2$.`,
          [null, R`Check: $3(3)+1=10$ but $9-3=6$. Not equal.`, R`You may have dropped the $-k$ on the right piece.`, R`Check: $13\neq5$.`]),
        Q(R`$\displaystyle\lim_{x\to0}e^{\cos x}=$`, [R`$1$`, R`$e$`, R`$0$`, R`$e^{-1}$`], 1,
          R`$e^u$ is continuous, so the limit passes inside: $e^{\cos0}=e^1=e$.`,
          [R`That's $e^0$, but $\cos0=1$, not $0$.`, null, R`Exponentials are never $0$.`, R`$\cos 0=1$, not $-1$.`])
      ]
    },
    {
      id: 'ivt', title: 'The Intermediate Value Theorem',
      html: R`
<p>If you hike from an elevation of 1000 m to 3000 m, at some moment you must have been at exactly 2000 m — you can't teleport. That's the Intermediate Value Theorem.</p>
${BOX('thm', 'Intermediate Value Theorem (IVT)', R`<p>Suppose $f$ is <b>continuous on the closed interval $[a,b]$</b> and $N$ is any number strictly between $f(a)$ and $f(b)$. Then there is at least one $c\in(a,b)$ with $f(c)=N$.</p>`)}
<p>The most common use: if $f(a)$ and $f(b)$ have <b>opposite signs</b>, then $f$ has a <b>root</b> in $(a,b)$ (take $N=0$).</p>
${EX('Example 1 — Existence of a root', R`<p>Show that $x^3+x-1=0$ has a solution between $0$ and $1$.</p>`, R`<p>$f(x)=x^3+x-1$ is a polynomial, hence continuous on $[0,1]$. $f(0)=-1<0$ and $f(1)=1>0$. Since $0$ is between $-1$ and $1$, the IVT guarantees some $c\in(0,1)$ with $f(c)=0$. ∎</p>`)}
${EX('Example 2 — Two functions crossing', R`<p>Show that $\cos x=x$ has a solution.</p>`, R`<p>Let $g(x)=\cos x-x$, continuous everywhere. $g(0)=1>0$ and $g(\pi/2)=-\pi/2<0$. By the IVT, $g(c)=0$ for some $c\in(0,\pi/2)$, i.e. $\cos c=c$. (Numerically $c\approx0.739$; Newton's method in §5.8 finds it fast.)</p>`)}
<h2>The bisection method</h2>
<p>The IVT gives a simple algorithm: check the sign at the midpoint, keep the half where the sign changes, repeat. Each step halves the interval. For Example 1: $f(0.5)=-0.375<0$ so the root is in $(0.5,1)$; $f(0.75)\approx0.172>0$ so it's in $(0.5,0.75)$; and so on toward $c\approx0.6823$.</p>
${BOX('warn', 'Hypotheses matter', R`<ul><li>The IVT needs continuity on the <b>whole closed interval</b>. $f(x)=1/x$ has $f(-1)=-1$ and $f(1)=1$ but never equals $0$ — it's not continuous at $0$.</li><li>The IVT says a $c$ <b>exists</b>; it doesn't tell you where, or how many.</li><li>The converse is false: a sign change is sufficient but not necessary for a root ($x^2$ has a root at $0$ without changing sign).</li></ul>`)}`,
      quiz: [
        Q(R`$f$ is continuous on $[1,4]$ with $f(1)=6$ and $f(4)=-2$. Which must be true?`, [R`$f(c)=0$ for some $c$ in $(1,4)$`, R`$f(2.5)=2$`, R`$f$ is decreasing on $[1,4]$`, R`$f$ has exactly one root in $(1,4)$`], 0,
          R`$0$ lies between $-2$ and $6$, so the IVT guarantees at least one $c$ with $f(c)=0$.`,
          [null, R`The IVT guarantees the value $2$ is hit <em>somewhere</em>, not at the midpoint.`, R`$f$ could go up and down; only the endpoint values are known.`, R`The IVT guarantees <em>at least</em> one — there could be several.`]),
        Q(R`Why can't the IVT be used for $f(x)=\tan x$ on $[0,\pi]$ to find a value of $5$?`, [R`$\tan x$ never equals 5`, R`$\tan x$ is not continuous on $[0,\pi]$`, R`$f(0)=f(\pi)$`, R`The interval is too long`], 1,
          R`$\tan x$ has a vertical asymptote at $x=\pi/2$, so the continuity hypothesis fails. (Separately, $f(0)=f(\pi)=0$ means 5 isn't between the endpoint values anyway.)`,
          [R`$\tan x$ does equal 5 at $x=\arctan5\approx1.37$ — but the IVT can't be the justification here.`, null, R`That's a reason too, but the fundamental problem is the discontinuity at $\pi/2$.`, R`Length is irrelevant.`]),
        Q(R`Using the IVT, which interval must contain a root of $f(x)=x^3-4x+1$?`, [R`$(2,3)$`, R`$(-1,0)$`, R`$(0,1)$`, R`$(3,4)$`], 2,
          R`$f(0)=1>0$, $f(1)=-2<0$: sign change, so a root lies in $(0,1)$.`,
          [R`$f(2)=1$ and $f(3)=16$: same sign.`, R`$f(-1)=4$, $f(0)=1$: same sign.`, null, R`$f(3)=16$, $f(4)=49$: same sign.`])
      ]
    }
  ],
  review: [
    Q(R`For which value of $a$ is $f(x)=\begin{cases}\dfrac{\sin(ax)}{x},& x\ne0\\ 3, & x=0\end{cases}$ continuous at $0$?`, [R`$a=1$`, R`$a=3$`, R`$a=\tfrac13$`, R`No value works`], 1,
      R`$\lim_{x\to0}\frac{\sin(ax)}x=a$. Continuity requires $a=f(0)=3$.`,
      [R`Then the limit would be $1\ne3$.`, null, R`$\frac{\sin(x/3)}{x}\to\frac13$, not 3.`, R`$a=3$ works.`]),
    Q(R`The floor function $\lfloor x\rfloor$ at $x=2$ has a:`, [R`removable discontinuity`, R`jump discontinuity`, R`infinite discontinuity`, R`no discontinuity`], 1,
      R`From the left it's $1$, from the right it's $2$: a jump.`,
      [R`The one-sided limits differ, so it's not removable.`, null, R`Values stay bounded.`, R`The graph steps up at every integer.`])
  ]
});
