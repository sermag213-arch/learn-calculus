CALC.addChapter({
  id: 'limits', num: 1, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'Limits',
  blurb: 'What value does a function approach? The single idea every other part of calculus is built on.',
  intro: R`<p class="lead">Calculus answers two ancient questions: <em>how steep is a curve at a single point?</em> (the tangent problem) and <em>how much area lies under a curve?</em> (the area problem). Both answers require us to make sense of an infinite process — and the tool for that is the <b>limit</b>.</p>`,
  objectives: [
    'Estimate limits numerically and graphically, including one-sided limits.',
    'Identify infinite limits and vertical asymptotes.',
    'Evaluate limits algebraically using limit laws, factoring, rationalizing, and simplification.',
    'Apply the Squeeze Theorem and the special limit $\\lim_{x\\to0}\\frac{\\sin x}{x}=1$.',
    'Compute limits at infinity and find horizontal asymptotes.',
    'Interpret and use the precise ε–δ definition of a limit.'
  ],
  sections: [
    {
      id: 'idea', title: 'The Idea of a Limit',
      html: R`
<p>Consider $f(x)=\dfrac{x^2-1}{x-1}$. Plugging in $x=1$ gives $\frac00$ — undefined. But we can ask a different, better question: <b>as $x$ gets closer and closer to $1$, what value does $f(x)$ get closer and closer to?</b></p>
<table><thead><tr><th>$x$</th><th class="c">$0.9$</th><th class="c">$0.99$</th><th class="c">$0.999$</th><th class="c">$1$</th><th class="c">$1.001$</th><th class="c">$1.01$</th><th class="c">$1.1$</th></tr></thead>
<tbody><tr><td>$f(x)$</td><td class="c">$1.9$</td><td class="c">$1.99$</td><td class="c">$1.999$</td><td class="c">undef.</td><td class="c">$2.001$</td><td class="c">$2.01$</td><td class="c">$2.1$</td></tr></tbody></table>
<p>The outputs close in on $2$ from both sides. We write $\displaystyle\lim_{x\to1}\frac{x^2-1}{x-1}=2$. Drag the slider below to see it happen.</p>
${WIDGET('limit')}
${BOX('def', 'Definition (informal) — Limit', R`<p>We write $$\lim_{x\to a}f(x)=L$$ and say "the limit of $f(x)$ as $x$ approaches $a$ equals $L$" if we can make $f(x)$ as close to $L$ as we like by taking $x$ sufficiently close to $a$ (on either side), <b>but not equal to $a$</b>.</p>`)}
${BOX('intuition', 'The most important point', R`<p>A limit describes what happens <b>near</b> $a$, never <b>at</b> $a$. The value $f(a)$ might be different from the limit, or might not exist at all — the limit doesn't care.</p>`)}
<h2>Reading limits from a graph</h2>
<p>To find $\lim_{x\to a}f(x)$ from a graph, trace the curve toward $x=a$ from the left and from the right and see what height you're heading toward. An open circle (a "hole") at that height doesn't matter; a filled dot somewhere else doesn't matter either.</p>
${EX('Example 1 — A piecewise function', R`<p>Let $g(x)=\begin{cases}x+1, & x\neq 2\\ 7, & x=2\end{cases}$. Find $\lim_{x\to2}g(x)$ and $g(2)$.</p>`, R`<p>Near $x=2$ (but not at it), $g(x)=x+1\approx3$. So $\lim_{x\to2}g(x)=3$, while $g(2)=7$. The limit and the function value are different — and that's fine.</p>`)}
<h2>When limits fail to exist</h2>
<p>A limit does not exist (DNE) when:</p>
<ol><li><b>The two sides disagree</b> (a jump) — see §1.2.</li><li><b>The function grows without bound</b> — e.g. $\frac1{x^2}$ near $0$ (§1.2).</li><li><b>The function oscillates</b> — e.g. $\sin(1/x)$ near $0$ wiggles between $-1$ and $1$ infinitely often, never settling.</li></ol>
${BOX('warn', 'Calculators can lie', R`<p>Numerical tables suggest limits but don't prove them. For example, $\sin(\pi/x)$ equals $0$ at $x=1,0.1,0.01,\dots$, which would suggest a limit of $0$ — yet the limit as $x\to0$ does not exist. The algebraic techniques in §1.3 give certainty.</p>`)}
${BOX('key', 'Key takeaways', R`<ul><li>$\lim_{x\to a}f(x)=L$ means $f(x)$ approaches $L$ as $x$ approaches $a$.</li><li>The value at $a$ is irrelevant.</li><li>Limits can fail via jumps, blow-ups, or oscillation.</li></ul>`)}
${MORE([
  ['3Blue1Brown — Limits, L\'Hôpital, and epsilon–delta', 'https://www.youtube.com/watch?v=kfF40MiS7zA', 'Essence of Calculus, ch. 7'],
  ['OpenStax §2.2 The Limit of a Function', 'https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function', 'Textbook reading'],
  ["Paul's Notes — The Limit", 'https://tutorial.math.lamar.edu/Classes/CalcI/TheLimit.aspx', 'Extra examples']
])}`,
      quiz: [
        Q(R`If $f(3)=5$, which statement about $\lim_{x\to3}f(x)$ must be true?`,
          [R`It equals $5$.`, R`It does not exist.`, R`Nothing — the limit can't be determined from $f(3)$ alone.`, R`It equals $3$.`], 2,
          R`The limit depends only on values <b>near</b> $3$, not at $3$. Knowing $f(3)$ tells you nothing about the limit unless you also know $f$ is continuous there.`,
          [R`That's only guaranteed if $f$ is continuous at 3 (Chapter 2).`, R`We have no reason to think the limit fails.`, null, R`$3$ is the input, not an output.`]),
        Q(R`Using the table, estimate $\lim_{x\to0}\dfrac{e^x-1}{x}$. <br>$x$: $-0.01,\ -0.001,\ 0.001,\ 0.01$ → values: $0.99502,\ 0.99950,\ 1.00050,\ 1.00502$`,
          [R`$0$`, R`$1$`, R`Does not exist`, R`$0.995$`], 1,
          R`Both sides approach $1$. (We'll prove this exactly in Chapter 4 — it's the slope of $e^x$ at $0$.)`,
          [R`Plugging in $0$ gives $0/0$, which is not the answer — it's a signal to investigate.`, null, R`Both sides agree, so the limit exists.`, R`That's just one value in the table; follow the trend as $x\to0$.`]),
        Q(R`Which limit does <b>not</b> exist?`,
          [R`$\displaystyle\lim_{x\to0}\sin\!\left(\tfrac1x\right)$`, R`$\displaystyle\lim_{x\to0}x\sin\!\left(\tfrac1x\right)$`, R`$\displaystyle\lim_{x\to2}\frac{x^2-4}{x-2}$`, R`$\displaystyle\lim_{x\to0}\cos x$`], 0,
          R`$\sin(1/x)$ oscillates between $-1$ and $1$ infinitely often as $x\to0$ and never settles.`,
          [null, R`Multiplying by $x$ squeezes the oscillation down to $0$ (Squeeze Theorem, §1.4); the limit is $0$.`, R`Factor: $\frac{(x-2)(x+2)}{x-2}=x+2\to4$.`, R`$\cos x\to\cos0=1$.`]),
        Q(R`$h(x)=\begin{cases}x^2, & x\ne1\\ 4, & x=1\end{cases}$. What is $\lim_{x\to1}h(x)$?`,
          [R`$4$`, R`$1$`, R`$5$`, R`Does not exist`], 1,
          R`Near $x=1$ (but not at it) $h(x)=x^2\to1$. The value $h(1)=4$ is irrelevant to the limit.`,
          [R`That's $h(1)$ — the limit ignores the value at the point itself.`, null, R`There's no reason to add the values.`, R`Both sides approach $1$, so it exists.`])
      ]
    },
    {
      id: 'one-sided', title: 'One-Sided and Infinite Limits',
      html: R`
<p>Sometimes a function approaches different values from the left and from the right. We capture this with <b>one-sided limits</b>.</p>
${BOX('def', 'One-sided limits', R`<p>$\displaystyle\lim_{x\to a^-}f(x)=L$ — the <b>left-hand limit</b>: $x$ approaches $a$ through values <em>less</em> than $a$.<br>$\displaystyle\lim_{x\to a^+}f(x)=L$ — the <b>right-hand limit</b>: $x$ approaches $a$ through values <em>greater</em> than $a$.</p>`)}
${BOX('thm', 'Theorem — Two-sided vs. one-sided', R`<p>$$\lim_{x\to a}f(x)=L \iff \lim_{x\to a^-}f(x)=L \text{ and } \lim_{x\to a^+}f(x)=L.$$</p>`)}
${EX('Example 1 — A jump', R`<p>Let $f(x)=\dfrac{|x|}{x}$. Find the one-sided limits at $0$.</p>`, R`<p>For $x>0$, $|x|=x$ so $f(x)=1$. For $x<0$, $|x|=-x$ so $f(x)=-1$. Thus $\lim_{x\to0^+}f(x)=1$ and $\lim_{x\to0^-}f(x)=-1$. Since they differ, <span class="ans">$\lim_{x\to0}f(x)$ DNE</span>.</p>`)}
${EX('Example 2 — Piecewise', R`<p>$g(x)=\begin{cases}3-x, & x<2\\ x^2-3, & x\ge2\end{cases}$. Does $\lim_{x\to2}g(x)$ exist?</p>`, R`<p>Left: $3-2=1$. Right: $2^2-3=1$. Both equal $1$, so <span class="ans">$\lim_{x\to2}g(x)=1$</span>.</p>`)}
<h2>Infinite limits and vertical asymptotes</h2>
<p>If $f(x)$ grows without bound as $x\to a$, we write $\lim_{x\to a}f(x)=\infty$. This is a precise way of saying the limit <b>does not exist</b> because the values blow up — but it tells us <em>how</em> it fails.</p>
${BOX('def', 'Vertical asymptote', R`<p>The line $x=a$ is a <b>vertical asymptote</b> of $f$ if at least one of $\lim_{x\to a^\pm}f(x)$ is $\infty$ or $-\infty$.</p>`)}
<p><b>How to find them:</b> For a rational function, simplify first. Any remaining zero of the denominator gives a vertical asymptote. To find the sign, test a value just to the left or right.</p>
${EX('Example 3 — Sign analysis', R`<p>Find $\displaystyle\lim_{x\to3^-}\frac{x+1}{x-3}$ and $\displaystyle\lim_{x\to3^+}\frac{x+1}{x-3}$.</p>`, R`<p>The numerator $\to4>0$. For $x$ slightly less than $3$, $x-3$ is a tiny negative number, so the fraction $\to-\infty$. For $x$ slightly greater than $3$, $x-3$ is tiny positive, so $\to+\infty$.</p><p><span class="ans">$-\infty$ and $+\infty$</span>; $x=3$ is a vertical asymptote.</p>`)}
${EX('Example 4 — Hole vs. asymptote', R`<p>$f(x)=\dfrac{x^2-x-6}{x^2-9}$. Where are the vertical asymptotes?</p>`, R`<p>Factor: $\frac{(x-3)(x+2)}{(x-3)(x+3)}=\frac{x+2}{x+3}$ for $x\ne3$. The factor $x-3$ canceled, so $x=3$ is a <b>hole</b> (limit $\frac56$). Only <span class="ans">$x=-3$</span> is a vertical asymptote.</p>`)}
${BOX('tip', 'Quick rule for "nonzero over zero"', R`<p>If direct substitution gives $\dfrac{\text{nonzero}}{0}$, the one-sided limits are $\pm\infty$ — check signs. If it gives $\dfrac00$, the limit could be anything: simplify (next section).</p>`)}
<p>Important trig/log examples: $\lim_{x\to0^+}\ln x=-\infty$, $\lim_{x\to(\pi/2)^-}\tan x=\infty$, $\lim_{x\to(\pi/2)^+}\tan x=-\infty$.</p>`,
      quiz: [
        Q(R`$\displaystyle\lim_{x\to-2^+}\frac{1}{x+2}=$`, [R`$+\infty$`, R`$-\infty$`, R`$0$`, R`$\tfrac12$`], 0,
          R`For $x$ slightly greater than $-2$, $x+2$ is a small positive number, so $\frac1{x+2}$ is large and positive.`,
          [null, R`That's the left-hand limit; approaching from the right makes $x+2>0$.`, R`The denominator goes to $0$, so the fraction blows up rather than vanishing.`, R`Substituting gives $\frac10$, which isn't $\frac12$.`]),
        Q(R`For $f(x)=\begin{cases}x^2, & x<1\\ 2x+1, & x\ge1\end{cases}$, what is $\lim_{x\to1}f(x)$?`, [R`$1$`, R`$3$`, R`$2$`, R`Does not exist`], 3,
          R`Left limit $=1^2=1$; right limit $=2(1)+1=3$. They differ, so the two-sided limit does not exist.`,
          [R`That's only the left-hand limit.`, R`That's only the right-hand limit.`, R`Averaging the one-sided limits is not how limits work.`, null]),
        Q(R`Which function has a vertical asymptote at $x=2$?`, [R`$\dfrac{x-2}{x^2-4}$`, R`$\dfrac{x+2}{x^2-4}$`, R`$\dfrac{x^2-4}{x-2}$`, R`$\dfrac{1}{x+2}$`], 1,
          R`$\frac{x+2}{(x-2)(x+2)}=\frac1{x-2}$ for $x\neq-2$. The factor $x-2$ remains in the denominator, giving an asymptote at $x=2$.`,
          [R`The $x-2$ cancels, leaving $\frac1{x+2}$: a hole at $x=2$, asymptote at $x=-2$.`, null, R`This simplifies to $x+2$ (with a hole at 2), no asymptote.`, R`This has its asymptote at $x=-2$.`]),
        Q(R`$\displaystyle\lim_{x\to0^+}\ln x=$`, [R`$0$`, R`$1$`, R`$-\infty$`, R`$+\infty$`], 2,
          R`As $x\to0^+$, $\ln x$ decreases without bound (e.g. $\ln(0.001)\approx-6.9$, $\ln(10^{-9})\approx-20.7$).`,
          [R`$\ln 1=0$, but we're approaching $0$, not $1$.`, R`$\ln e=1$; not relevant here.`, null, R`$\ln x<0$ for $0\lt x<1$; it heads down, not up.`])
      ]
    },
    {
      id: 'laws', title: 'Limit Laws and Algebraic Techniques',
      html: R`
<p>Tables and graphs give estimates. The <b>limit laws</b> let us compute limits exactly.</p>
${BOX('thm', 'Limit Laws', R`<p>Suppose $\lim_{x\to a}f(x)=L$ and $\lim_{x\to a}g(x)=M$ both exist, and $c$ is a constant. Then</p>
<ol><li>$\lim [f(x)\pm g(x)]=L\pm M$</li><li>$\lim cf(x)=cL$</li><li>$\lim f(x)g(x)=LM$</li><li>$\lim \frac{f(x)}{g(x)}=\frac LM$ provided $M\ne0$</li><li>$\lim [f(x)]^n=L^n$, and $\lim\sqrt[n]{f(x)}=\sqrt[n]L$ (with $L\ge0$ if $n$ even)</li></ol>`)}
${BOX('thm', 'Direct Substitution Property', R`<p>If $f$ is a polynomial, rational, root, trig, exponential, or log function (or a combination) and $a$ is in its domain, then $$\lim_{x\to a}f(x)=f(a).$$</p>`)}
<p><b>Strategy:</b> Always try plugging in first. If you get a real number, you're done. If you get $\frac{\text{nonzero}}0$, think asymptote (§1.2). If you get the <b>indeterminate form</b> $\frac00$, use algebra to cancel the troublemaker:</p>
<h2>Technique 1: Factor and cancel</h2>
${EX('Example 1', R`<p>$\displaystyle\lim_{x\to-3}\frac{x^2+x-6}{x^2-9}$</p>`, R`<p>Substituting: $\frac{9-3-6}{9-9}=\frac00$. Factor: $$\frac{(x+3)(x-2)}{(x+3)(x-3)}=\frac{x-2}{x-3}\ (x\ne-3)\ \longrightarrow\ \frac{-5}{-6}=\frac56.$$ <span class="ans">$\tfrac56$</span></p>`)}
<h2>Technique 2: Multiply by the conjugate</h2>
${EX('Example 2', R`<p>$\displaystyle\lim_{x\to0}\frac{\sqrt{x+9}-3}{x}$</p>`, R`<p>Multiply top and bottom by $\sqrt{x+9}+3$:</p>$$\frac{(x+9)-9}{x(\sqrt{x+9}+3)}=\frac{x}{x(\sqrt{x+9}+3)}=\frac1{\sqrt{x+9}+3}\to\frac16.$$<p><span class="ans">$\tfrac16$</span></p>`)}
<h2>Technique 3: Simplify complex fractions</h2>
${EX('Example 3', R`<p>$\displaystyle\lim_{h\to0}\frac{\frac1{2+h}-\frac12}{h}$</p>`, R`<p>Common denominator in the numerator: $\frac{2-(2+h)}{2(2+h)}=\frac{-h}{2(2+h)}$. Dividing by $h$: $\frac{-1}{2(2+h)}\to-\frac14$. <span class="ans">$-\tfrac14$</span>. (This is the derivative of $1/x$ at $x=2$ — preview of Chapter 3!)</p>`)}
<h2>Technique 4: Expand</h2>
${EX('Example 4', R`<p>$\displaystyle\lim_{h\to0}\frac{(3+h)^2-9}{h}$</p>`, R`<p>$\frac{9+6h+h^2-9}{h}=\frac{h(6+h)}h=6+h\to6$. <span class="ans">$6$</span></p>`)}
<h2>Technique 5: Absolute values → one-sided limits</h2>
${EX('Example 5', R`<p>$\displaystyle\lim_{x\to4}\frac{|x-4|}{x-4}$</p>`, R`<p>Right: $|x-4|=x-4$, ratio $=1$. Left: $|x-4|=-(x-4)$, ratio $=-1$. <span class="ans">DNE</span>.</p>`)}
${BOX('warn', 'Writing it correctly', R`<p>Keep writing "$\lim$" on every line until you actually substitute. Writing $\frac{x-2}{x-3}=\frac56$ is false; $\lim_{x\to-3}\frac{x-2}{x-3}=\frac56$ is true. Instructors deduct for this!</p>`)}
${BOX('key', 'Key takeaways', R`<ul><li>Try direct substitution first.</li><li>$\frac00$ is a signal to simplify: factor, conjugate, combine fractions, or expand.</li><li>Why canceling is legal: the limit ignores $x=a$, where the canceled factor is zero.</li></ul>`)}
${MORE([['OpenStax §2.3 The Limit Laws', 'https://openstax.org/books/calculus-volume-1/pages/2-3-the-limit-laws', 'More examples'], ["Paul's Notes — Computing Limits", 'https://tutorial.math.lamar.edu/Classes/CalcI/ComputingLimits.aspx', 'Practice problems'], ['Khan Academy — Limits by factoring', 'https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity', 'Videos']])}`,
      quiz: [
        Q(R`$\displaystyle\lim_{x\to5}\frac{x^2-25}{x-5}=$`, [R`$0$`, R`$10$`, R`$5$`, R`Does not exist`], 1,
          R`$\frac{(x-5)(x+5)}{x-5}=x+5\to10$.`,
          [R`$\frac00$ is indeterminate — it is not $0$.`, null, R`After canceling you get $x+5$, which approaches $10$.`, R`The $\frac00$ form can be resolved by factoring.`]),
        Q(R`$\displaystyle\lim_{x\to4}\frac{\sqrt x-2}{x-4}=$`, [R`$\tfrac14$`, R`$\tfrac12$`, R`$4$`, R`$0$`], 0,
          R`Multiply by the conjugate $\sqrt x+2$: $\frac{x-4}{(x-4)(\sqrt x+2)}=\frac{1}{\sqrt x+2}\to\frac1{4}$.`,
          [null, R`You may have forgotten that $\sqrt4+2=4$, not $2$.`, R`That is the reciprocal of the right answer.`, R`The $\frac00$ form must be simplified, not read as $0$.`],
          R`Multiply numerator and denominator by $\sqrt x+2$. Alternatively, notice $x-4=(\sqrt x-2)(\sqrt x+2)$.`),
        Q(R`Substituting $x=a$ into $\frac{f(x)}{g(x)}$ gives $\frac{7}{0}$. What can you conclude?`, [R`The limit is $0$.`, R`The limit is $7$.`, R`The limit is infinite (or DNE); one-sided limits are $\pm\infty$.`, R`Factor and cancel to find the limit.`], 2,
          R`A nonzero number over something approaching $0$ blows up. Check signs on each side to determine $+\infty$ vs. $-\infty$.`,
          [R`Dividing by a tiny number makes things large, not small.`, R`The denominator matters — it's going to zero.`, null, R`Factoring helps with $\frac00$, not $\frac{\text{nonzero}}{0}$.`]),
        Q(R`If $\lim_{x\to2}f(x)=3$ and $\lim_{x\to2}g(x)=-1$, find $\displaystyle\lim_{x\to2}\frac{f(x)^2+g(x)}{x}$.`, [R`$4$`, R`$2$`, R`$5$`, R`$8$`], 0,
          R`By the limit laws: $\frac{3^2+(-1)}{2}=\frac82=4$.`,
          [null, R`You may have computed $\frac{3+(-1)}{2}$, forgetting to square $f$.`, R`Remember to divide by $x\to2$.`, R`$8$ is the numerator; divide by $2$.`]),
        Q(R`$\displaystyle\lim_{h\to0}\frac{(2+h)^3-8}{h}=$`, [R`$12$`, R`$8$`, R`$6$`, R`$0$`], 0,
          R`$(2+h)^3=8+12h+6h^2+h^3$, so the quotient is $12+6h+h^2\to12$.`,
          [null, R`$8$ is $2^3$, but we want the rate of change.`, R`Check the expansion: the $h$ coefficient is $3\cdot2^2=12$.`, R`$\frac00$ is indeterminate, not $0$.`])
      ]
    },
    {
      id: 'squeeze', title: 'The Squeeze Theorem and Trig Limits',
      html: R`
<p>Some limits can't be simplified algebraically. If we can trap a function between two others that share the same limit, it has no choice but to share that limit too.</p>
${BOX('thm', 'The Squeeze (Sandwich) Theorem', R`<p>If $g(x)\le f(x)\le h(x)$ for all $x$ near $a$ (except possibly at $a$), and $$\lim_{x\to a}g(x)=\lim_{x\to a}h(x)=L,$$ then $\lim_{x\to a}f(x)=L$.</p>`)}
${EX('Example 1', R`<p>Show $\displaystyle\lim_{x\to0}x^2\sin\!\left(\frac1x\right)=0$.</p>`, R`<p>Since $-1\le\sin(1/x)\le1$, multiplying by $x^2\ge0$: $$-x^2\le x^2\sin(1/x)\le x^2.$$ Both $-x^2$ and $x^2\to0$, so by the Squeeze Theorem the limit is <span class="ans">$0$</span>.</p>`)}
<h2>The two fundamental trig limits</h2>
${BOX('thm', 'Special trig limits (x in radians)', R`$$\lim_{x\to0}\frac{\sin x}{x}=1\qquad\qquad \lim_{x\to0}\frac{1-\cos x}{x}=0$$`)}
<p><b>Why is the first true?</b> A geometric argument on the unit circle shows $\cos x\le\frac{\sin x}{x}\le1$ for small $x\ne0$. Both bounds go to $1$, so the Squeeze Theorem gives the result. Intuitively, for tiny angles the arc length $x$ and the vertical height $\sin x$ are nearly identical. Try graphing <code>sin(x)/x</code> in the <a href="#/tools">Graphing Tool</a>.</p>
<p>The second follows by multiplying by the conjugate: $\frac{1-\cos x}x\cdot\frac{1+\cos x}{1+\cos x}=\frac{\sin x}{x}\cdot\frac{\sin x}{1+\cos x}\to1\cdot0=0$.</p>
<h2>Using the special limits</h2>
<p>The trick is to make the argument of sine match the denominator.</p>
${EX('Example 2', R`<p>$\displaystyle\lim_{x\to0}\frac{\sin 5x}{x}$</p>`, R`<p>Multiply and divide by $5$: $\displaystyle 5\cdot\frac{\sin5x}{5x}$. As $x\to0$, $u=5x\to0$ so $\frac{\sin u}{u}\to1$. <span class="ans">$5$</span></p>`)}
${EX('Example 3', R`<p>$\displaystyle\lim_{x\to0}\frac{\sin 3x}{\sin 7x}$</p>`, R`<p>$\displaystyle\frac{\sin3x}{\sin7x}=\frac{3x\cdot\frac{\sin3x}{3x}}{7x\cdot\frac{\sin7x}{7x}}\to\frac{3\cdot1}{7\cdot1}$. <span class="ans">$\tfrac37$</span></p>`)}
${EX('Example 4', R`<p>$\displaystyle\lim_{x\to0}\frac{\tan x}{x}$</p>`, R`<p>$\frac{\tan x}{x}=\frac{\sin x}{x}\cdot\frac1{\cos x}\to1\cdot1=1$. <span class="ans">$1$</span></p>`)}
${BOX('tip', 'Pattern', R`<p>$\displaystyle\lim_{x\to0}\frac{\sin(ax)}{bx}=\frac ab$ and $\displaystyle\lim_{x\to0}\frac{\sin(ax)}{\sin(bx)}=\frac ab$.</p>`)}`,
      quiz: [
        Q(R`$\displaystyle\lim_{x\to0}\frac{\sin(4x)}{2x}=$`, [R`$2$`, R`$\tfrac12$`, R`$1$`, R`$4$`], 0,
          R`$\frac{\sin4x}{2x}=2\cdot\frac{\sin4x}{4x}\to2\cdot1=2$.`,
          [null, R`You flipped the ratio: it's $\frac42$, not $\frac24$.`, R`The arguments don't match: $4x$ vs. $2x$. Adjust with constants.`, R`Don't forget the $2$ in the denominator.`]),
        Q(R`Suppose $1-x^2\le f(x)\le \cos x$ for $x$ near $0$. Then $\lim_{x\to0}f(x)=$`, [R`$0$`, R`$1$`, R`$-1$`, R`Cannot be determined`], 1,
          R`Both bounds approach $1$ as $x\to0$ ($1-0=1$, $\cos0=1$), so by the Squeeze Theorem $f(x)\to1$.`,
          [R`Evaluate the bounding functions at $x=0$: both give $1$.`, null, R`Check: $\cos0=1$, not $-1$.`, R`The Squeeze Theorem applies because both bounds share a limit.`]),
        Q(R`$\displaystyle\lim_{x\to0}\frac{1-\cos x}{x}=$`, [R`$1$`, R`$0$`, R`$\infty$`, R`$\tfrac12$`], 1,
          R`This is the second special trig limit; it equals $0$. (Note: $\lim\frac{1-\cos x}{x^2}=\frac12$, a different limit.)`,
          [R`That's the value of $\lim\frac{\sin x}{x}$.`, null, R`The numerator also goes to $0$ (faster than $x$), so it doesn't blow up.`, R`$\frac12$ is the limit with $x^2$ in the denominator.`]),
        Q(R`Why is $\lim_{x\to0}x\cos(1/x)=0$?`, [R`Because $\cos(1/x)\to1$.`, R`Because $-|x|\le x\cos(1/x)\le|x|$ and $\pm|x|\to0$.`, R`Because $\cos(1/x)$ is undefined at $0$.`, R`Direct substitution gives $0\cdot\cos(\infty)=0$.`], 1,
          R`Cosine is bounded by $\pm1$, so the product is trapped between $-|x|$ and $|x|$, which both approach $0$.`,
          [R`$\cos(1/x)$ oscillates and has no limit at $0$.`, null, R`Being undefined at $0$ doesn't determine the limit.`, R`$\cos(\infty)$ is meaningless; you need the Squeeze Theorem.`])
      ]
    },
    {
      id: 'infinity', title: 'Limits at Infinity and Horizontal Asymptotes',
      html: R`
<p>Now we ask about <b>end behavior</b>: what happens to $f(x)$ as $x$ becomes huge, positive or negative?</p>
${BOX('def', 'Horizontal asymptote', R`<p>If $\lim_{x\to\infty}f(x)=L$ or $\lim_{x\to-\infty}f(x)=L$, the line $y=L$ is a <b>horizontal asymptote</b> of $f$.</p>`)}
<p>The building block is $\displaystyle\lim_{x\to\pm\infty}\frac{1}{x^r}=0$ for any $r>0$.</p>
<h2>Rational functions: divide by the highest power</h2>
${EX('Example 1', R`<p>$\displaystyle\lim_{x\to\infty}\frac{3x^2-x+2}{5x^2+4}$</p>`, R`<p>Divide every term by $x^2$: $$\frac{3-\frac1x+\frac2{x^2}}{5+\frac4{x^2}}\to\frac{3}{5}.$$ <span class="ans">$\tfrac35$</span></p>`)}
${BOX('tip', R`The degree shortcut for $p(x)/q(x)$ as $x\to\pm\infty$`, R`<ul><li><b>deg top &lt; deg bottom</b>: limit is $0$.</li><li><b>deg top = deg bottom</b>: limit is the ratio of leading coefficients.</li><li><b>deg top &gt; deg bottom</b>: limit is $\pm\infty$ (no horizontal asymptote; if exactly one more, there's a slant asymptote).</li></ul>`)}
<h2>Square roots: watch the sign for $x\to-\infty$</h2>
${EX('Example 2', R`<p>Find $\displaystyle\lim_{x\to\infty}\frac{\sqrt{4x^2+1}}{x+3}$ and $\displaystyle\lim_{x\to-\infty}\frac{\sqrt{4x^2+1}}{x+3}$.</p>`, R`<p>Key fact: $\sqrt{x^2}=|x|$. For $x>0$, $|x|=x$; for $x<0$, $|x|=-x$.</p>
<p>As $x\to\infty$: $\frac{\sqrt{4x^2+1}}{x+3}=\frac{x\sqrt{4+1/x^2}}{x(1+3/x)}\to\frac{2}{1}=2$.</p>
<p>As $x\to-\infty$: $\sqrt{4x^2+1}=|x|\sqrt{4+1/x^2}=-x\sqrt{\cdots}$, so the ratio $\to\frac{-2}{1}=-2$.</p><p>Two different horizontal asymptotes: <span class="ans">$y=2$ and $y=-2$</span>.</p>`)}
<h2>∞ − ∞: use a conjugate</h2>
${EX('Example 3', R`<p>$\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+6x}-x\right)$</p>`, R`<p>Multiply by $\frac{\sqrt{x^2+6x}+x}{\sqrt{x^2+6x}+x}$: $$\frac{6x}{\sqrt{x^2+6x}+x}=\frac{6}{\sqrt{1+6/x}+1}\to\frac62=3.$$ <span class="ans">$3$</span></p>`)}
<h2>Exponentials and other functions</h2>
<ul><li>$\lim_{x\to\infty}e^x=\infty$, $\lim_{x\to-\infty}e^x=0$, so $y=0$ is a horizontal asymptote of $e^x$.</li>
<li>$\lim_{x\to\pm\infty}\arctan x=\pm\frac\pi2$.</li>
<li>$\lim_{x\to\infty}\frac{\sin x}{x}=0$ by the Squeeze Theorem, since $|\sin x/x|\le1/x$.</li>
<li><b>Growth hierarchy</b>: as $x\to\infty$, $\ln x\ll x^p\ll e^x$. (We'll prove this with L'Hôpital's Rule in §5.7.)</li></ul>`,
      quiz: [
        Q(R`$\displaystyle\lim_{x\to\infty}\frac{7x^3-2x}{1-2x^3}=$`, [R`$7$`, R`$-\tfrac72$`, R`$\tfrac72$`, R`$\infty$`], 1,
          R`Equal degrees: ratio of leading coefficients $\frac{7}{-2}=-\frac72$.`,
          [R`Divide by the leading coefficient of the denominator too.`, null, R`The leading coefficient of the bottom is $-2$; keep the sign.`, R`Degrees are equal (3 and 3), so the limit is finite.`]),
        Q(R`$\displaystyle\lim_{x\to-\infty}\frac{5x+1}{x^2+4}=$`, [R`$5$`, R`$-\infty$`, R`$0$`, R`$-5$`], 2,
          R`Degree of top (1) is less than degree of bottom (2), so the limit is $0$.`,
          [R`The denominator's $x^2$ dominates.`, R`The denominator grows faster than the numerator.`, null, R`Leading-coefficient ratio applies only when degrees match.`]),
        Q(R`How many horizontal asymptotes does $f(x)=\dfrac{3x}{\sqrt{x^2+1}}$ have?`, [R`None`, R`One: $y=3$`, R`Two: $y=3$ and $y=-3$`, R`One: $y=0$`], 2,
          R`$\sqrt{x^2+1}\approx|x|$. As $x\to\infty$, $f\to3$; as $x\to-\infty$, $\frac{3x}{|x|}\to-3$.`,
          [R`The limits at $\pm\infty$ are finite.`, R`Check $x\to-\infty$ separately: $\sqrt{x^2}=|x|=-x$ there.`, null, R`The degrees effectively match (1 and 1), so the limit isn't $0$.`]),
        Q(R`$\displaystyle\lim_{x\to\infty}e^{-x}\cos x=$`, [R`$1$`, R`Does not exist`, R`$0$`, R`$\infty$`], 2,
          R`$-e^{-x}\le e^{-x}\cos x\le e^{-x}$ and $e^{-x}\to0$, so by the Squeeze Theorem the limit is $0$.`,
          [R`$\cos x$ oscillates, but it's being multiplied by something going to $0$.`, R`The oscillation is damped to $0$.`, null, R`$e^{-x}$ decays; it doesn't grow.`])
      ]
    },
    {
      id: 'epsilon-delta', title: 'The Precise Definition of a Limit',
      html: R`
<p>"Arbitrarily close" and "sufficiently close" are intuitive but vague. In the 1800s, Cauchy and Weierstrass made the limit concept airtight. This definition is the foundation of all of analysis.</p>
${BOX('def', 'Definition — ε–δ limit', R`<p>$\displaystyle\lim_{x\to a}f(x)=L$ means: for every $\varepsilon>0$ there is a $\delta>0$ such that $$0<|x-a|<\delta\ \Longrightarrow\ |f(x)-L|<\varepsilon.$$</p>`)}
<h2>Reading the definition as a game</h2>
<ol><li>Your opponent picks a tolerance $\varepsilon$ — a horizontal band of half-width $\varepsilon$ around $y=L$.</li>
<li>You must respond with a $\delta$ — a vertical band of half-width $\delta$ around $x=a$.</li>
<li>You win if every $x$ in your band (except possibly $a$ itself) has $f(x)$ inside their band.</li></ol>
<p>The limit equals $L$ exactly when you can win <b>no matter how small</b> $\varepsilon$ is.</p>
${EX('Example 1 — A linear function', R`<p>Prove $\lim_{x\to3}(4x-5)=7$.</p>`, R`<p><b>Scratch work:</b> we want $|(4x-5)-7|<\varepsilon$, i.e. $|4x-12|<\varepsilon$, i.e. $4|x-3|<\varepsilon$, i.e. $|x-3|<\varepsilon/4$. So choose $\delta=\varepsilon/4$.</p>
<p><b>Proof:</b> Given $\varepsilon>0$, let $\delta=\varepsilon/4$. If $0<|x-3|<\delta$, then $|(4x-5)-7|=4|x-3|<4\delta=\varepsilon$. ∎</p>`)}
${EX('Example 2 — A quadratic', R`<p>Prove $\lim_{x\to2}x^2=4$.</p>`, R`<p><b>Scratch:</b> $|x^2-4|=|x-2||x+2|$. We need to control $|x+2|$. If we insist $\delta\le1$, then $|x-2|<1$ means $1\lt x<3$, so $|x+2|<5$. Then $|x^2-4|<5|x-2|$, which is $<\varepsilon$ if $|x-2|<\varepsilon/5$.</p>
<p><b>Proof:</b> Given $\varepsilon>0$, let $\delta=\min\{1,\varepsilon/5\}$. If $0<|x-2|<\delta$, then $|x+2|<5$ and $|x^2-4|=|x-2||x+2|<\frac\varepsilon5\cdot5=\varepsilon$. ∎</p>`)}
${BOX('tip', 'Pattern for linear functions', R`<p>For $\lim_{x\to a}(mx+b)$ with $m\ne0$, the choice $\delta=\varepsilon/|m|$ always works.</p>`)}
<h2>Infinite limits, precisely</h2>
<p>$\lim_{x\to a}f(x)=\infty$ means: for every $M>0$ there exists $\delta>0$ such that $0<|x-a|<\delta\Rightarrow f(x)>M$. And $\lim_{x\to\infty}f(x)=L$ means: for every $\varepsilon>0$ there is an $N$ such that $x>N\Rightarrow|f(x)-L|<\varepsilon$.</p>
${BOX('key', 'Why bother?', R`<p>Most Calculus I courses only ask you to understand and use this definition on simple functions. But it's what makes every theorem in this book (limit laws, continuity, the derivative, the integral) rigorous.</p>`)}`,
      quiz: [
        Q(R`To prove $\lim_{x\to1}(6x+2)=8$, which $\delta$ works for a given $\varepsilon$?`, [R`$\delta=6\varepsilon$`, R`$\delta=\varepsilon/6$`, R`$\delta=\varepsilon+6$`, R`$\delta=\varepsilon/2$`], 1,
          R`$|(6x+2)-8|=6|x-1|<\varepsilon$ whenever $|x-1|<\varepsilon/6$.`,
          [R`A bigger $\delta$ allows $x$ too far from $1$; $f$ changes 6 times faster than $x$.`, null, R`$\delta$ must shrink as $\varepsilon$ shrinks.`, R`The slope is $6$, not $2$.`]),
        Q(R`In the ε–δ definition, which quantity is chosen <b>first</b>?`, [R`$\delta$`, R`$\varepsilon$`, R`$x$`, R`$L$`], 1,
          R`"For every $\varepsilon>0$ there exists $\delta>0$…" — $\varepsilon$ is given first (by the challenger); $\delta$ is found in response and may depend on $\varepsilon$.`,
          [R`$\delta$ is the response to the challenge.`, null, R`$x$ ranges over all values within $\delta$ of $a$.`, R`$L$ is the claimed limit, fixed in advance — but the game begins with $\varepsilon$.`]),
        Q(R`What does $0<|x-a|$ in the definition accomplish?`, [R`It makes $\delta$ positive.`, R`It excludes $x=a$, so $f(a)$ doesn't affect the limit.`, R`It forces $x>a$.`, R`It ensures $f(x)>L$.`], 1,
          R`The condition $0<|x-a|$ means $x\ne a$. This is the formal version of "the limit ignores the value at $a$."`,
          [R`$\delta>0$ is stated separately.`, null, R`$|x-a|>0$ allows both $x\lt a$ and $x>a$.`, R`It concerns $x$, not $f(x)$.`])
      ]
    }
  ],
  review: [
    Q(R`$\displaystyle\lim_{x\to2}\frac{x^2-3x+2}{x^2-4}=$`, [R`$\tfrac14$`, R`$0$`, R`$-\tfrac14$`, R`DNE`], 0, R`$\frac{(x-1)(x-2)}{(x-2)(x+2)}=\frac{x-1}{x+2}\to\frac14$.`,
      [null, R`$\frac00$ is indeterminate; factor first.`, R`Check the signs: $\frac{2-1}{2+2}=+\frac14$.`, R`The common factor cancels, so the limit exists.`]),
    Q(R`$\displaystyle\lim_{x\to0}\frac{\sin^2 x}{x}=$`, [R`$1$`, R`$0$`, R`$\infty$`, R`DNE`], 1, R`$\frac{\sin^2x}{x}=\sin x\cdot\frac{\sin x}{x}\to0\cdot1=0$.`,
      [R`Only one factor of $\frac{\sin x}{x}$ is there; the extra $\sin x\to0$.`, null, R`The numerator shrinks faster than $x$.`, R`It exists and equals $0$.`]),
    Q(R`$\displaystyle\lim_{x\to\infty}\frac{2^x}{2^x+1}=$`, [R`$0$`, R`$\tfrac12$`, R`$1$`, R`$\infty$`], 2, R`Divide by $2^x$: $\frac{1}{1+2^{-x}}\to\frac{1}{1+0}=1$.`,
      [R`That's the limit as $x\to-\infty$.`, R`$\frac12$ is the value at $x=0$.`, null, R`It's a ratio of nearly equal large numbers.`]),
    Q(R`$\displaystyle\lim_{x\to3^-}\frac{x}{x-3}=$`, [R`$+\infty$`, R`$-\infty$`, R`$0$`, R`$1$`], 1, R`Numerator $\to3>0$; denominator $\to0^-$. Positive over tiny negative is $-\infty$.`,
      [R`From the left, $x-3<0$.`, null, R`Nonzero over zero blows up.`, R`Substitution gives $\frac30$, not $1$.`])
  ]
});
