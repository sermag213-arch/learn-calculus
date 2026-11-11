CALC.addChapter({
  id: 'series', num: 10, part: 'Part III · Beyond Calculus I (Calc II & III)', tag: 'Calc II',
  title: 'Sequences and Series',
  blurb: 'Infinite sums, convergence tests, power series, and Taylor series — representing functions as infinite polynomials.',
  intro: R`<p class="lead">Can you add infinitely many numbers and get a finite answer? Sometimes: $\frac12+\frac14+\frac18+\cdots=1$. Sometimes not: $1+\frac12+\frac13+\cdots=\infty$. Deciding which — and using infinite sums to represent functions like $e^x$ and $\sin x$ — is the subject of this chapter.</p>`,
  objectives: ['Determine whether a sequence converges.', 'Evaluate geometric and telescoping series.', 'Apply the divergence, integral, comparison, ratio, root, and alternating series tests.', 'Find the radius and interval of convergence of a power series.', 'Build Taylor and Maclaurin series and use them to approximate functions.'],
  sections: [
    {
      id: 'sequences', title: 'Sequences',
      html: R`
${BOX('def', 'Sequence', R`<p>A <b>sequence</b> is an ordered list $a_1,a_2,a_3,\dots$. It <b>converges</b> to $L$ if $\lim_{n\to\infty}a_n=L$; otherwise it diverges.</p>`)}
<p>Tools from Chapter 1 apply: if $a_n=f(n)$ and $\lim_{x\to\infty}f(x)=L$, then $a_n\to L$. You can use L'Hôpital on $f$, and the Squeeze Theorem.</p>
${EX('Example', R`<p>Determine the limits of $a_n=\frac{3n^2+1}{n^2-5}$, $b_n=\frac{\ln n}{n}$, and $c_n=(-1)^n$.</p>`, R`<p>$a_n\to3$. $b_n\to0$ (L'Hôpital). $c_n$ alternates $-1,1,-1,\dots$ and diverges.</p>`)}
${BOX('thm', 'Useful facts', R`<ul><li>$r^n\to0$ if $|r|<1$; $r^n\to\infty$ if $r>1$; diverges if $r\le-1$.</li><li>A bounded, monotonic sequence converges (Monotone Convergence Theorem).</li><li>$\left(1+\frac{x}{n}\right)^n\to e^x$ and $\sqrt[n]{n}\to1$.</li></ul>`)}`,
      quiz: [
        Q(R`$\displaystyle\lim_{n\to\infty}\frac{2n+5}{7n-1}=$`, [R`$\tfrac27$`, R`$-5$`, R`$\infty$`, R`$0$`], 0, R`Ratio of leading coefficients.`,
          [null, R`Use leading terms.`, R`Equal degrees ⇒ finite limit.`, R`Equal degrees ⇒ not 0.`]),
        Q(R`Does $a_n=(0.9)^n$ converge?`, [R`Yes, to $0$`, R`Yes, to $0.9$`, R`Yes, to $1$`, R`No`], 0, R`$|r|<1$ ⇒ $r^n\to0$.`,
          [null, R`That's $a_1$.`, R`Powers of $0.9$ shrink.`, R`$|0.9|<1$ converges.`])
      ]
    },
    {
      id: 'series-basics', title: 'Infinite Series and the Geometric Series',
      html: R`
${BOX('def', 'Series', R`<p>The series $\sum_{n=1}^\infty a_n$ has <b>partial sums</b> $S_N=a_1+\cdots+a_N$. The series converges to $S$ if $S_N\to S$.</p>`)}
${BOX('thm', 'Geometric series', R`$$\sum_{n=0}^\infty ar^n=a+ar+ar^2+\cdots=\frac{a}{1-r}\ \text{ if } |r|<1;\ \text{ diverges if } |r|\ge1.$$`)}
${EX('Example 1', R`<p>Evaluate $\displaystyle\sum_{n=1}^\infty\frac{2}{3^n}$ and write $0.\overline{36}$ as a fraction.</p>`, R`<p>First term $a=\frac23$, $r=\frac13$: sum $=\frac{2/3}{2/3}=1$. And $0.\overline{36}=\frac{36}{100}+\frac{36}{100^2}+\cdots=\frac{0.36}{0.99}=\frac{4}{11}$.</p>`)}
${EX('Example 2 — Telescoping', R`<p>$\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)}$</p>`, R`<p>$\frac{1}{n(n+1)}=\frac1n-\frac1{n+1}$. Partial sums collapse: $S_N=1-\frac{1}{N+1}\to1$.</p>`)}
${BOX('thm', 'Divergence Test (nth-term test)', R`<p>If $\lim a_n\ne0$ (or doesn't exist), then $\sum a_n$ <b>diverges</b>.</p><p>⚠ If $a_n\to0$, the test says <b>nothing</b>. The harmonic series $\sum\frac1n$ has $a_n\to0$ but diverges!</p>`)}`,
      quiz: [
        Q(R`$\displaystyle\sum_{n=0}^\infty\left(\frac12\right)^n=$`, [R`$2$`, R`$1$`, R`$\tfrac12$`, R`diverges`], 0, R`$\frac{1}{1-1/2}=2$.`,
          [null, R`Starting at $n=0$ includes the term $1$.`, R`Use $\frac{a}{1-r}$.`, R`$|r|<1$ converges.`]),
        Q(R`If $\lim a_n=0$, then $\sum a_n$:`, [R`converges`, R`diverges`, R`may converge or diverge`, R`equals 0`], 2, R`The divergence test is inconclusive: $\sum\frac1{n^2}$ converges, $\sum\frac1n$ diverges.`,
          [R`Harmonic series is a counterexample.`, R`$\sum1/n^2$ converges.`, null, R`Terms going to 0 doesn't make the sum 0.`]),
        Q(R`$\displaystyle\sum_{n=1}^\infty\frac{n}{n+1}$:`, [R`converges to 1`, R`diverges by the divergence test`, R`converges by comparison`, R`is geometric`], 1, R`$a_n\to1\neq0$, so it diverges.`,
          [R`The terms approach 1; the sum grows without bound.`, null, R`Terms don't go to 0.`, R`No common ratio.`])
      ]
    },
    {
      id: 'tests', title: 'Convergence Tests',
      html: R`
${BOX('thm', 'Integral Test & p-series', R`<p>If $f$ is positive, continuous, decreasing and $a_n=f(n)$, then $\sum a_n$ and $\int_1^\infty f(x)\,dx$ both converge or both diverge.</p><p><b>p-series:</b> $\displaystyle\sum\frac1{n^p}$ converges iff $p>1$.</p>`)}
${BOX('thm', 'Comparison tests', R`<p><b>Direct:</b> if $0\le a_n\le b_n$ and $\sum b_n$ converges, so does $\sum a_n$; if $\sum a_n$ diverges, so does $\sum b_n$.</p><p><b>Limit comparison:</b> if $a_n,b_n>0$ and $\lim\frac{a_n}{b_n}=c$ with $0\lt c<\infty$, both converge or both diverge.</p>`)}
${BOX('thm', 'Alternating Series Test', R`<p>$\sum(-1)^{n}b_n$ with $b_n>0$ converges if $b_n$ is decreasing and $b_n\to0$. The error after $N$ terms is at most $b_{N+1}$.</p>`)}
${BOX('thm', 'Ratio Test', R`<p>Let $L=\lim\left|\frac{a_{n+1}}{a_n}\right|$. If $L<1$ the series converges absolutely; if $L>1$ it diverges; $L=1$ is inconclusive.</p>`)}
${EX('Examples', R`<p>Decide: (a) $\sum\frac{1}{n^2+3}$ (b) $\sum\frac{(-1)^n}{n}$ (c) $\sum\frac{n!}{5^n}$ (d) $\sum\frac{2^n}{n!}$</p>`, R`<p>(a) Converges: compare with $\frac1{n^2}$. (b) Converges (alternating harmonic, sum $=-\ln 2$) but not absolutely — <b>conditionally convergent</b>. (c) Ratio: $\frac{n+1}{5}\to\infty$, diverges. (d) Ratio: $\frac{2}{n+1}\to0$, converges (to $e^2-1$).</p>`)}
${BOX('tip', 'Which test?', R`<ol><li>Terms don't go to 0? → Divergence test.</li><li>Geometric or p-series? → Known results.</li><li>Factorials or $n$th powers? → Ratio test.</li><li>Alternating signs? → Alternating series test.</li><li>Looks like a simpler series? → Comparison / limit comparison.</li><li>Easy to integrate? → Integral test.</li></ol>`)}`,
      quiz: [
        Q(R`$\displaystyle\sum_{n=1}^\infty\frac{1}{\sqrt n}$:`, [R`converges (p-series)`, R`diverges (p-series, $p=\tfrac12\le1$)`, R`converges by ratio test`, R`diverges by divergence test`], 1, R`$p=\frac12\le1$: diverges.`,
          [R`$p$ must exceed 1.`, null, R`Ratio test gives $L=1$ — inconclusive.`, R`Terms do go to 0; that test is inconclusive.`]),
        Q(R`The ratio test on $\sum\frac{3^n}{n!}$ gives $L=$`, [R`$0$, converges`, R`$3$, diverges`, R`$1$, inconclusive`, R`$\infty$, diverges`], 0, R`$\frac{3^{n+1}/(n+1)!}{3^n/n!}=\frac{3}{n+1}\to0$.`,
          [null, R`The factorial grows faster.`, R`$\frac{3}{n+1}\to0$, not $1$.`, R`Recheck the ratio.`]),
        Q(R`$\displaystyle\sum\frac{(-1)^n}{\sqrt n}$ is:`, [R`absolutely convergent`, R`conditionally convergent`, R`divergent`, R`geometric`], 1, R`Converges by the alternating series test, but $\sum\frac1{\sqrt n}$ diverges.`,
          [R`$\sum\frac{1}{\sqrt n}$ diverges.`, null, R`Alternating series test applies.`, R`No constant ratio.`])
      ]
    },
    {
      id: 'power', title: 'Power Series',
      html: R`
${BOX('def', 'Power series', R`<p>$\displaystyle\sum_{n=0}^\infty c_n(x-a)^n$ is a power series centered at $a$. It converges for $|x-a|\lt R$ (the <b>radius of convergence</b>) and diverges for $|x-a|>R$. Endpoints must be checked separately.</p>`)}
${EX('Example', R`<p>Find the interval of convergence of $\displaystyle\sum_{n=1}^\infty\frac{(x-3)^n}{n}$.</p>`, R`<p>Ratio: $\left|\frac{(x-3)^{n+1}/(n+1)}{(x-3)^n/n}\right|\to|x-3|<1$, so $2\lt x<4$, $R=1$. At $x=4$: harmonic series, diverges. At $x=2$: alternating harmonic, converges. Interval: <span class="ans">$[2,4)$</span>.</p>`)}
${BOX('thm', 'Calculus with power series', R`<p>Inside the radius of convergence, you may differentiate and integrate term by term. Starting from $\frac{1}{1-x}=\sum x^n$ ($|x|<1$):</p>$$\frac{1}{1+x^2}=\sum(-1)^nx^{2n}\ \Rightarrow\ \arctan x=\sum\frac{(-1)^nx^{2n+1}}{2n+1},\qquad \ln(1+x)=\sum_{n=1}^\infty\frac{(-1)^{n+1}x^n}{n}.$$`)}`,
      quiz: [
        Q(R`The radius of convergence of $\sum\frac{x^n}{2^n}$ is:`, [R`$2$`, R`$\tfrac12$`, R`$1$`, R`$\infty$`], 0, R`It's geometric with $r=\frac x2$; need $|x/2|<1$.`,
          [null, R`$|x|<2$.`, R`Account for $2^n$.`, R`It's geometric, so finite.`]),
        Q(R`$\sum\frac{x^n}{n!}$ converges for:`, [R`all $x$`, R`$|x|<1$`, R`$x=0$ only`, R`$|x|\lt e$`], 0, R`Ratio $\frac{|x|}{n+1}\to0$ for every $x$: $R=\infty$. (It's $e^x$!)`,
          [null, R`The factorial makes it converge everywhere.`, R`That would be $\sum n!x^n$.`, R`$R=\infty$.`])
      ]
    },
    {
      id: 'taylor', title: 'Taylor and Maclaurin Series',
      html: R`
${BOX('def', 'Taylor series', R`<p>If $f$ has a power series at $a$, it must be $$f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n=f(a)+f'(a)(x-a)+\frac{f''(a)}{2!}(x-a)^2+\cdots$$ With $a=0$ it's called a <b>Maclaurin series</b>. Partial sums are <b>Taylor polynomials</b> $T_n(x)$.</p>`)}
<p>$T_1$ is the linearization from §5.2; higher-degree $T_n$ match more derivatives and hug the curve longer:</p>
${WIDGET('taylor')}
${BOX('thm', 'Essential Maclaurin series', R`
$$e^x=\sum_{n=0}^\infty\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots\quad(\text{all }x)$$
$$\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots\qquad \cos x=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots\quad(\text{all }x)$$
$$\frac1{1-x}=1+x+x^2+\cdots\ (|x|<1)\qquad \ln(1+x)=x-\frac{x^2}2+\frac{x^3}3-\cdots\ (-1\lt x\le1)$$`)}
${EX('Example 1 — New series from old', R`<p>Find the Maclaurin series for $x^2e^{-x}$ and evaluate $\lim_{x\to0}\frac{\sin x-x}{x^3}$.</p>`, R`<p>$e^{-x}=1-x+\frac{x^2}{2}-\cdots$, so $x^2e^{-x}=x^2-x^3+\frac{x^4}2-\cdots$.</p><p>$\frac{\sin x-x}{x^3}=\frac{-x^3/6+x^5/120-\cdots}{x^3}\to-\frac16$.</p>`)}
${BOX('intuition', "Euler's formula", R`<p>Plugging $ix$ into the series for $e^x$ and sorting real and imaginary parts gives $e^{ix}=\cos x+i\sin x$, and so $e^{i\pi}+1=0$ — linking five fundamental constants.</p>`)}
${MORE([['3Blue1Brown — Taylor series', 'https://www.youtube.com/watch?v=3d6DsjIBzJ4', 'Essence of Calculus, ch. 11'], ['OpenStax Vol. 2 §6.3 Taylor and Maclaurin Series', 'https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series', 'Reading']])}`,
      quiz: [
        Q(R`The coefficient of $x^3$ in the Maclaurin series of $e^x$ is:`, [R`$\tfrac16$`, R`$\tfrac13$`, R`$1$`, R`$3$`], 0, R`$\frac{1}{3!}=\frac16$.`,
          [null, R`$3!=6$, not 3.`, R`Divide by $n!$.`, R`Divide by $n!$.`]),
        Q(R`The Maclaurin series of $\cos x$ contains:`, [R`only even powers`, R`only odd powers`, R`all powers`, R`no constant term`], 0, R`$\cos x$ is even: $1-\frac{x^2}{2}+\frac{x^4}{24}-\cdots$.`,
          [null, R`That's $\sin x$.`, R`Odd-power coefficients vanish.`, R`Constant term is $\cos0=1$.`]),
        Q(R`Using $T_2$ for $e^x$ at 0, $e^{0.1}\approx$`, [R`$1.105$`, R`$1.1$`, R`$1.01$`, R`$1.11$`], 0, R`$1+0.1+\frac{0.01}2=1.105$ (true: $1.10517$).`,
          [null, R`That's $T_1$.`, R`Recompute.`, R`$\frac{0.01}{2}=0.005$.`])
      ]
    }
  ],
  review: []
});
