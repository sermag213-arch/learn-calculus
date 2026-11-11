CALC.addChapter({
  id: 'precalc', num: 0, part: 'Part I · Foundations', tag: 'Review',
  title: 'Precalculus Toolkit',
  blurb: 'Functions, graphs, trigonometry, exponentials and logarithms — the language calculus is written in.',
  intro: R`<p class="lead">Calculus is the mathematics of <em>change</em>. Before we can measure how things change, we need a fluent language for describing the things themselves: <b>functions</b>. This chapter is a fast, focused review of the precalculus ideas (MATH 2412) that Calculus I uses constantly.</p>
  <p>If you are confident with this material, skim the examples and take the chapter test. If any question trips you up, the explanations will point you to exactly what to review.</p>`,
  objectives: [
    'Find domains and ranges, evaluate and compose functions.',
    'Recognize the graphs of the basic "parent" functions and apply transformations.',
    'Use the unit circle, radians, and core trig identities.',
    'Apply the laws of exponents and logarithms and solve exponential equations.',
    'Find and graph inverse functions, including inverse trig functions.'
  ],
  sections: [
    {
      id: 'functions', title: 'Functions, Domain, and Composition',
      html: R`
<p>A <b>function</b> is a rule that takes an input and produces <em>exactly one</em> output. Think of it as a machine: you drop in $x$, and it hands back $f(x)$.</p>
${BOX('def', 'Definition — Function', R`<p>A function $f$ from a set $D$ to a set $R$ assigns to each element $x$ in $D$ exactly one element $f(x)$ in $R$. The set $D$ is the <b>domain</b> (allowed inputs) and the set of all outputs is the <b>range</b>.</p>`)}
<h2>Vertical line test</h2>
<p>A curve in the $xy$-plane is the graph of a function if and only if every vertical line crosses it <b>at most once</b>. The circle $x^2+y^2=1$ fails (the line $x=0$ hits it at $y=\pm1$), so it is not a function of $x$.</p>

<h2>Finding the domain</h2>
<p>Unless told otherwise, the domain is every real number for which the formula makes sense. In practice, you only have to watch for three things:</p>
<ol>
  <li><b>Division by zero</b> — denominators cannot equal $0$.</li>
  <li><b>Even roots of negatives</b> — the expression under $\sqrt{\;\;}$ (or $\sqrt[4]{\;\;}$, etc.) must be $\ge 0$.</li>
  <li><b>Logarithms of non-positives</b> — the input of $\ln$ or $\log$ must be $> 0$.</li>
</ol>
${EX('Example 1 — Domain', R`<p>Find the domain of $f(x)=\dfrac{\sqrt{x+3}}{x-2}$.</p>`, R`
<ul class="steps"><li>The square root needs $x+3\ge0$, so $x\ge-3$.</li>
<li>The denominator needs $x-2\ne0$, so $x\ne2$.</li>
<li>Combine both conditions: $[-3,2)\cup(2,\infty)$.</li></ul>
<p>Answer: <span class="ans">$[-3,2)\cup(2,\infty)$</span></p>`)}

<h2>Piecewise functions</h2>
<p>Some functions use different formulas on different intervals. The absolute value is the classic example:</p>
$$|x| = \begin{cases} x, & x\ge 0\\ -x, & x<0\end{cases}$$
<p>Piecewise functions appear constantly in calculus because they are the easiest way to build examples where limits or derivatives behave strangely.</p>

<h2>Combining and composing functions</h2>
<p>Functions can be added, subtracted, multiplied, and divided pointwise. More importantly for calculus, they can be <b>composed</b>: feed the output of one into the other.</p>
${BOX('def', 'Composition', R`<p>$(f\circ g)(x) = f(g(x))$. Evaluate the <b>inside</b> function $g$ first, then apply $f$ to the result. The domain of $f\circ g$ is all $x$ in the domain of $g$ for which $g(x)$ is in the domain of $f$.</p>`)}
${EX('Example 2 — Composition', R`<p>Let $f(x)=x^2+1$ and $g(x)=\sqrt{x}$. Find $(f\circ g)(x)$ and $(g\circ f)(x)$.</p>`, R`
<p>$(f\circ g)(x)=f(\sqrt x)=(\sqrt x)^2+1=x+1$, with domain $x\ge0$ (because $g$ requires it).</p>
<p>$(g\circ f)(x)=g(x^2+1)=\sqrt{x^2+1}$, domain all reals.</p>
<p>Notice $f\circ g \ne g\circ f$ — <b>order matters</b>. Recognizing compositions is exactly what you'll need for the <b>chain rule</b> in Chapter 4.</p>`)}
${EX('Example 3 — Decomposing', R`<p>Write $h(x)=(3x-5)^7$ as a composition $f(g(x))$.</p>`, R`<p>The "inside" is $g(x)=3x-5$ and the "outside" is $f(u)=u^7$. Then $f(g(x))=(3x-5)^7$. ✔</p>`)}

<h2>Even and odd functions</h2>
<p>A function is <b>even</b> if $f(-x)=f(x)$ (symmetric about the $y$-axis, like $x^2$, $\cos x$) and <b>odd</b> if $f(-x)=-f(x)$ (symmetric about the origin, like $x^3$, $\sin x$). Symmetry will save you work with integrals later: $\int_{-a}^{a} f(x)\,dx = 0$ for odd $f$.</p>
${BOX('key', 'Key takeaways', R`<ul><li>Each input gives exactly one output.</li><li>Domain restrictions come from denominators, even roots, and logs.</li><li>$f(g(x))$: inside first, then outside. Order matters.</li></ul>`)}
${MORE([
  ['OpenStax Calculus Vol. 1 §1.1', 'https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions', 'Review of functions'],
  ["Paul's Notes: Functions review", 'https://tutorial.math.lamar.edu/Classes/CalcI/Functions.aspx', 'Extra worked problems'],
  ['Khan Academy: Composite functions', 'https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:composite', 'Videos + exercises']
])}`,
      quiz: [
        Q(R`What is the domain of $f(x)=\dfrac{1}{\sqrt{5-x}}$?`,
          [R`$(-\infty,5)$`, R`$(-\infty,5]$`, R`$(5,\infty)$`, R`All reals except $5$`], 0,
          R`We need $5-x\ge0$ for the root <em>and</em> $\sqrt{5-x}\ne0$ for the denominator, so $5-x>0$, i.e. $x<5$.`,
          [null, R`At $x=5$ the denominator is $\sqrt0=0$, so $x=5$ must be excluded.`, R`For $x>5$, $5-x$ is negative and the square root is undefined.`, R`Values greater than $5$ make the radicand negative, so they are also excluded.`]),
        Q(R`If $f(x)=2x+1$ and $g(x)=x^2$, what is $f(g(3))$?`,
          [R`$49$`, R`$19$`, R`$7$`, R`$36$`], 1,
          R`Inside first: $g(3)=9$. Then $f(9)=2(9)+1=19$.`,
          [R`$49=g(f(3))=g(7)$. You applied the functions in the wrong order.`, null, R`$7=f(3)$; you forgot to apply $g$ first.`, R`$36=(2\cdot3)^2$ — this mixes the two rules incorrectly.`]),
        Q(R`Which function is <b>odd</b>?`,
          [R`$f(x)=x^4-x^2$`, R`$f(x)=x^3+x$`, R`$f(x)=x^3+1$`, R`$f(x)=|x|$`], 1,
          R`$f(-x)=(-x)^3+(-x)=-x^3-x=-(x^3+x)=-f(x)$, so it is odd.`,
          [R`Only even powers appear, so $f(-x)=f(x)$: this is <em>even</em>.`, null, R`$f(-x)=-x^3+1$, which is neither $f(x)$ nor $-f(x)$. The constant $+1$ breaks the symmetry.`, R`$|-x|=|x|$, so absolute value is even.`]),
        Q(R`Which choice writes $h(x)=\sin(x^2)$ as $f(g(x))$?`,
          [R`$f(x)=x^2,\ g(x)=\sin x$`, R`$f(x)=\sin x,\ g(x)=x^2$`, R`$f(x)=\sin x,\ g(x)=\sin x$`, R`$f(x)=x,\ g(x)=\sin(x^2)$ is the only way`], 1,
          R`The inside operation (done first) is squaring: $g(x)=x^2$. Then sine is applied: $f(u)=\sin u$.`,
          [R`That gives $f(g(x))=(\sin x)^2=\sin^2 x$, a different function.`, null, R`That gives $\sin(\sin x)$.`, R`That's technically a composition, but it's trivial; the useful decomposition is $\sin$ of $x^2$.`])
      ]
    },
    {
      id: 'graphs', title: 'Parent Functions and Transformations',
      html: R`
<p>Most functions you'll meet in Calculus I are built from a small library of <b>parent functions</b>. Knowing their shapes by heart makes limits, derivatives and integrals far easier to visualize.</p>
<table><thead><tr><th>Function</th><th>Shape &amp; key features</th><th>Domain / Range</th></tr></thead><tbody>
<tr><td>$y=x^2$</td><td>U-shaped parabola, vertex at origin</td><td>$\mathbb R$ / $[0,\infty)$</td></tr>
<tr><td>$y=x^3$</td><td>S-shaped, passes through origin, odd</td><td>$\mathbb R$ / $\mathbb R$</td></tr>
<tr><td>$y=\sqrt x$</td><td>Half a sideways parabola, starts at $(0,0)$</td><td>$[0,\infty)$ / $[0,\infty)$</td></tr>
<tr><td>$y=1/x$</td><td>Hyperbola; vertical asymptote $x=0$, horizontal asymptote $y=0$</td><td>$x\ne0$ / $y\ne0$</td></tr>
<tr><td>$y=|x|$</td><td>V-shape with a sharp corner at $0$</td><td>$\mathbb R$ / $[0,\infty)$</td></tr>
<tr><td>$y=e^x$</td><td>Exponential growth through $(0,1)$; $y\to0$ as $x\to-\infty$</td><td>$\mathbb R$ / $(0,\infty)$</td></tr>
<tr><td>$y=\ln x$</td><td>Slow growth through $(1,0)$; vertical asymptote $x=0$</td><td>$(0,\infty)$ / $\mathbb R$</td></tr>
<tr><td>$y=\sin x$, $\cos x$</td><td>Waves of period $2\pi$, amplitude $1$</td><td>$\mathbb R$ / $[-1,1]$</td></tr>
</tbody></table>
<h2>Transformations</h2>
<p>Starting from $y=f(x)$, with $c>0$:</p>
<table><thead><tr><th>New function</th><th>Effect on the graph</th></tr></thead><tbody>
<tr><td>$f(x)+c$ / $f(x)-c$</td><td>shift <b>up</b> / <b>down</b> by $c$</td></tr>
<tr><td>$f(x-c)$ / $f(x+c)$</td><td>shift <b>right</b> / <b>left</b> by $c$ (opposite of the sign!)</td></tr>
<tr><td>$-f(x)$</td><td>reflect across the $x$-axis</td></tr>
<tr><td>$f(-x)$</td><td>reflect across the $y$-axis</td></tr>
<tr><td>$c\,f(x)$</td><td>vertical stretch ($c>1$) or compression ($0\lt c<1$)</td></tr>
<tr><td>$f(cx)$</td><td>horizontal compression ($c>1$) or stretch ($0\lt c<1$)</td></tr>
</tbody></table>
${BOX('warn', 'Common mistake', R`<p>$f(x-3)$ moves the graph to the <b>right</b>, not left. Reason: the output that $f$ used to produce at $x=0$ is now produced when $x-3=0$, i.e. at $x=3$.</p>`)}
${EX('Example — Describe the transformation', R`<p>Describe how to get the graph of $y=-2\sqrt{x+1}+3$ from $y=\sqrt x$.</p>`, R`
<ol class="steps"><li>$\sqrt{x+1}$: shift left $1$.</li><li>$2\sqrt{x+1}$: stretch vertically by $2$.</li><li>$-2\sqrt{x+1}$: reflect across the $x$-axis.</li><li>$+3$: shift up $3$.</li></ol>
<p>The graph starts at $(-1,3)$ and heads downward to the right.</p>`)}
<h2>Polynomials and rational functions</h2>
<p>A <b>polynomial</b> $a_nx^n+\dots+a_1x+a_0$ is defined for all $x$ and its end behavior is controlled by the leading term $a_nx^n$. A <b>rational function</b> is a ratio of polynomials $p(x)/q(x)$; it can have vertical asymptotes where $q(x)=0$ (and $p(x)\neq0$) and holes where a common factor cancels. Limits (Chapter 1) will make these ideas precise.</p>
<p>Try the <a href="#/tools">Graphing Tool</a> to experiment: graph <code>sqrt(x)</code>, then <code>-2sqrt(x+1)+3</code>.</p>
${BOX('key', 'Key takeaways', R`<ul><li>Memorize the parent graphs — you'll sketch them constantly.</li><li>Inside changes ($x$) move horizontally and act "backwards"; outside changes move vertically.</li></ul>`)}`,
      quiz: [
        Q(R`The graph of $y=(x+4)^2-1$ is the graph of $y=x^2$ shifted…`,
          [R`right 4 and down 1`, R`left 4 and down 1`, R`left 4 and up 1`, R`right 4 and up 1`], 1,
          R`$x+4 = x-(-4)$ shifts <b>left</b> 4; the $-1$ outside shifts <b>down</b> 1. The vertex moves to $(-4,-1)$.`,
          [R`Horizontal shifts work opposite to the sign: $+4$ inside means left.`, null, R`The $-1$ is outside the square, so the graph moves down, not up.`, R`Both directions are reversed here.`]),
        Q(R`Which parent function has a vertical asymptote at $x=0$ and passes through $(1,0)$?`,
          [R`$y=e^x$`, R`$y=1/x$`, R`$y=\ln x$`, R`$y=\sqrt x$`], 2,
          R`$\ln 1=0$ and $\ln x\to-\infty$ as $x\to0^+$, so $x=0$ is a vertical asymptote.`,
          [R`$e^x$ passes through $(0,1)$ and has a <em>horizontal</em> asymptote $y=0$.`, R`$1/x$ has an asymptote at $x=0$ but passes through $(1,1)$, not $(1,0)$.`, null, R`$\sqrt x$ starts at the origin and has no asymptote.`]),
        Q(R`If $f$ has domain $[0,4]$, what is the domain of $g(x)=f(2x)$?`,
          [R`$[0,8]$`, R`$[0,2]$`, R`$[0,4]$`, R`$[-2,2]$`], 1,
          R`We need $0\le 2x\le 4$, so $0\le x\le 2$. Multiplying the input by $2$ compresses the graph horizontally by a factor of $2$.`,
          [R`That would be the domain of $f(x/2)$, a horizontal <em>stretch</em>.`, null, R`The domain changes because the input is scaled.`, R`There is no reflection or shift; solve $0\le2x\le4$.`])
      ]
    },
    {
      id: 'trig', title: 'Trigonometry Review',
      html: R`
<p>Calculus always measures angles in <b>radians</b>. One radian is the angle that cuts off an arc equal in length to the radius. Since a full circle has circumference $2\pi r$:</p>
$$360^\circ = 2\pi \text{ rad},\qquad 180^\circ=\pi\text{ rad},\qquad \text{degrees}\times\frac{\pi}{180}=\text{radians}.$$
${BOX('warn', 'Why radians matter', R`<p>The beautiful formula $\dfrac{d}{dx}\sin x=\cos x$ is true <em>only</em> in radians. In degrees, an ugly factor of $\pi/180$ appears. Set your calculator to radian mode for this course!</p>`)}
<h2>The unit circle</h2>
<p>For an angle $\theta$ in standard position, the point where its terminal side meets the unit circle is $(\cos\theta,\sin\theta)$. Then $\tan\theta=\dfrac{\sin\theta}{\cos\theta}$, and the reciprocal functions are $\sec\theta=\frac1{\cos\theta}$, $\csc\theta=\frac1{\sin\theta}$, $\cot\theta=\frac{\cos\theta}{\sin\theta}$.</p>
<table><thead><tr><th>$\theta$</th><th class="c">$0$</th><th class="c">$\pi/6$</th><th class="c">$\pi/4$</th><th class="c">$\pi/3$</th><th class="c">$\pi/2$</th><th class="c">$\pi$</th></tr></thead><tbody>
<tr><td>$\sin\theta$</td><td class="c">$0$</td><td class="c">$\tfrac12$</td><td class="c">$\tfrac{\sqrt2}{2}$</td><td class="c">$\tfrac{\sqrt3}{2}$</td><td class="c">$1$</td><td class="c">$0$</td></tr>
<tr><td>$\cos\theta$</td><td class="c">$1$</td><td class="c">$\tfrac{\sqrt3}{2}$</td><td class="c">$\tfrac{\sqrt2}{2}$</td><td class="c">$\tfrac12$</td><td class="c">$0$</td><td class="c">$-1$</td></tr>
<tr><td>$\tan\theta$</td><td class="c">$0$</td><td class="c">$\tfrac{\sqrt3}{3}$</td><td class="c">$1$</td><td class="c">$\sqrt3$</td><td class="c">undef.</td><td class="c">$0$</td></tr>
</tbody></table>
<p>Use the "<b>All Students Take Calculus</b>" mnemonic for signs: in quadrant I all are positive; QII only sine; QIII only tangent; QIV only cosine.</p>
<h2>Identities you must know</h2>
${BOX('thm', 'Core identities', R`
$$\sin^2\theta+\cos^2\theta=1,\qquad 1+\tan^2\theta=\sec^2\theta,\qquad 1+\cot^2\theta=\csc^2\theta$$
$$\sin 2\theta = 2\sin\theta\cos\theta,\qquad \cos2\theta=\cos^2\theta-\sin^2\theta = 2\cos^2\theta-1 = 1-2\sin^2\theta$$
$$\sin^2\theta=\frac{1-\cos2\theta}{2},\qquad \cos^2\theta=\frac{1+\cos2\theta}{2}$$
$$\sin(-\theta)=-\sin\theta,\qquad \cos(-\theta)=\cos\theta$$`)}
<p>The half-angle (power-reducing) formulas in the third line are essential for integrating $\sin^2x$ and $\cos^2x$ in Chapter 8.</p>
${EX('Example — Solve a trig equation', R`<p>Solve $2\sin x - 1 = 0$ on $[0,2\pi)$.</p>`, R`<p>$\sin x=\tfrac12$. Sine is positive in quadrants I and II with reference angle $\pi/6$, so <span class="ans">$x=\pi/6,\ 5\pi/6$</span>.</p>`)}
${EX('Example — Using an identity', R`<p>If $\sin\theta=\tfrac35$ and $\theta$ is in quadrant II, find $\cos\theta$ and $\tan\theta$.</p>`, R`<p>$\cos^2\theta=1-\tfrac9{25}=\tfrac{16}{25}$, so $\cos\theta=\pm\tfrac45$. In QII cosine is negative: $\cos\theta=-\tfrac45$. Then $\tan\theta=\frac{3/5}{-4/5}=-\tfrac34$.</p>`)}
${BOX('key', 'Key takeaways', R`<ul><li>Always use radians.</li><li>Know the unit-circle values at $0,\pi/6,\pi/4,\pi/3,\pi/2$ cold.</li><li>Pythagorean and double-angle identities are used throughout calculus.</li></ul>`)}`,
      quiz: [
        Q(R`Convert $135^\circ$ to radians.`, [R`$\dfrac{3\pi}{4}$`, R`$\dfrac{2\pi}{3}$`, R`$\dfrac{5\pi}{6}$`, R`$\dfrac{3\pi}{2}$`], 0,
          R`$135\cdot\frac{\pi}{180}=\frac{135\pi}{180}=\frac{3\pi}{4}$.`,
          [null, R`$\frac{2\pi}{3}=120^\circ$.`, R`$\frac{5\pi}{6}=150^\circ$.`, R`$\frac{3\pi}{2}=270^\circ$.`]),
        Q(R`What is $\cos\left(\dfrac{2\pi}{3}\right)$?`, [R`$\dfrac12$`, R`$-\dfrac12$`, R`$-\dfrac{\sqrt3}{2}$`, R`$\dfrac{\sqrt3}{2}$`], 1,
          R`$2\pi/3$ is in quadrant II with reference angle $\pi/3$. $\cos(\pi/3)=\tfrac12$ and cosine is negative in QII, so the value is $-\tfrac12$.`,
          [R`Right size, wrong sign: cosine is negative in quadrant II.`, null, R`That's $\cos(5\pi/6)$; the reference angle here is $\pi/3$, not $\pi/6$.`, R`That's $\sin(2\pi/3)$, not cosine.`]),
        Q(R`Which expression is equal to $\sin^2 x$?`, [R`$\dfrac{1+\cos 2x}{2}$`, R`$1+\cos^2x$`, R`$\dfrac{1-\cos2x}{2}$`, R`$2\sin x$`], 2,
          R`From $\cos2x=1-2\sin^2x$, solve: $\sin^2x=\frac{1-\cos2x}{2}$.`,
          [R`That's the formula for $\cos^2 x$.`, R`From $\sin^2x+\cos^2x=1$, $\sin^2x=1-\cos^2x$ (minus, not plus).`, null, R`Squaring is not doubling: $\sin^2x=(\sin x)^2$.`]),
        Q(R`$1+\tan^2\theta$ equals:`, [R`$\sec^2\theta$`, R`$\csc^2\theta$`, R`$\cos^2\theta$`, R`$1$`], 0,
          R`Divide $\sin^2\theta+\cos^2\theta=1$ by $\cos^2\theta$: $\tan^2\theta+1=\sec^2\theta$.`,
          [null, R`$\csc^2\theta=1+\cot^2\theta$.`, R`Divide the Pythagorean identity by $\cos^2\theta$ to see the correct result.`, R`$\tan^2\theta$ is generally not zero.`])
      ]
    },
    {
      id: 'explog', title: 'Exponential and Logarithmic Functions',
      html: R`
<p>An <b>exponential function</b> has the form $f(x)=b^x$ with base $b>0,\ b\ne1$. If $b>1$ it grows; if $0\lt b\lt 1$ it decays. The most important base in calculus is <b>Euler's number</b></p>
$$e=\lim_{n\to\infty}\left(1+\frac1n\right)^n\approx 2.718281828\ldots$$
<p>Why $e$? It is the unique base for which the slope of $y=b^x$ at $x=0$ is exactly $1$. As a result, $\frac{d}{dx}e^x=e^x$ — the function is its own derivative (Chapter 4).</p>
${BOX('thm', 'Laws of exponents', R`$$b^xb^y=b^{x+y},\quad \frac{b^x}{b^y}=b^{x-y},\quad (b^x)^y=b^{xy},\quad b^{-x}=\frac1{b^x},\quad b^0=1$$`)}
<h2>Logarithms</h2>
<p>The logarithm undoes the exponential: $\log_b x=y$ means $b^y=x$. The natural log is $\ln x=\log_e x$.</p>
${BOX('thm', 'Laws of logarithms', R`
$$\ln(xy)=\ln x+\ln y,\qquad \ln\frac xy=\ln x-\ln y,\qquad \ln(x^r)=r\ln x$$
$$\ln e=1,\quad \ln1=0,\quad e^{\ln x}=x\ (x>0),\quad \ln(e^x)=x,\quad \log_b x=\frac{\ln x}{\ln b}$$`)}
${BOX('warn', 'Things that are NOT laws', R`<p>$\ln(x+y)\ne\ln x+\ln y$ and $(\ln x)^2\neq 2\ln x$ and $\dfrac{\ln x}{\ln y}\ne\ln\dfrac xy$.</p>`)}
${EX('Example 1 — Solve an exponential equation', R`<p>Solve $5e^{2x}-3=12$.</p>`, R`
<ol class="steps"><li>Isolate the exponential: $e^{2x}=3$.</li><li>Take $\ln$ of both sides: $2x=\ln3$.</li><li><span class="ans">$x=\tfrac12\ln3\approx0.549$</span>.</li></ol>`)}
${EX('Example 2 — Expand a logarithm', R`<p>Expand $\ln\!\left(\dfrac{x^3\sqrt{y}}{z^2}\right)$.</p>`, R`<p>$=3\ln x+\tfrac12\ln y-2\ln z$. This "log-expanding" skill powers <b>logarithmic differentiation</b> (§4.8).</p>`)}
<h2>Exponential growth models</h2>
<p>Many quantities satisfy $A(t)=A_0e^{kt}$: populations ($k>0$), radioactive decay ($k<0$), continuously compounded interest $A=Pe^{rt}$. The doubling time is $\frac{\ln2}{k}$; the half-life is $\frac{\ln 2}{|k|}$. In Chapter 9 you'll see <em>why</em> this model arises: it is the solution to $\frac{dy}{dt}=ky$.</p>
${EX('Example 3 — Half-life', R`<p>Carbon-14 has a half-life of about 5730 years. What fraction remains after 10,000 years?</p>`, R`<p>$k=-\frac{\ln2}{5730}\approx-1.2097\times10^{-4}$. Then $\frac{A}{A_0}=e^{k\cdot10000}\approx e^{-1.2097}\approx0.298$. About <span class="ans">29.8%</span> remains.</p>`)}`,
      quiz: [
        Q(R`Simplify $\ln(e^5)+e^{\ln 2}$.`, [R`$7$`, R`$10$`, R`$5+\ln 2$`, R`$e^5+2$`], 0,
          R`$\ln$ and $e^{(\cdot)}$ undo each other: $\ln(e^5)=5$ and $e^{\ln2}=2$. Sum: $7$.`,
          [null, R`The terms are added, not multiplied.`, R`$e^{\ln 2}$ simplifies all the way to $2$.`, R`$\ln(e^5)$ simplifies to $5$.`]),
        Q(R`Solve $3^{x}=20$.`, [R`$x=\dfrac{20}{3}$`, R`$x=\ln\dfrac{20}{3}$`, R`$x=\dfrac{\ln20}{\ln3}$`, R`$x=\ln20-\ln3$`], 2,
          R`Take $\ln$: $x\ln3=\ln20$, so $x=\frac{\ln20}{\ln3}\approx2.727$.`,
          [R`Exponents can't be "divided away"; use logarithms.`, R`$\ln(20/3)=\ln20-\ln3$, which is not the same as $\frac{\ln20}{\ln3}$.`, null, R`$\ln 20-\ln3=\ln(20/3)$; the correct answer is a quotient of logs, not a difference.`]),
        Q(R`Which is a correct law of logarithms?`, [R`$\ln(a+b)=\ln a\cdot\ln b$`, R`$\ln(a^3)=3\ln a$`, R`$\ln(a)/\ln(b)=\ln(a-b)$`, R`$\ln(ab)=\ln a\cdot\ln b$`], 1,
          R`The power rule: $\ln(a^r)=r\ln a$.`,
          [R`There is no law for the log of a sum.`, null, R`$\ln a-\ln b=\ln(a/b)$, a different statement.`, R`The log of a product is a <em>sum</em>: $\ln a+\ln b$.`]),
        Q(R`A population grows as $P(t)=200e^{0.05t}$. Its doubling time is:`, [R`$\dfrac{2}{0.05}=40$`, R`$\dfrac{\ln 2}{0.05}\approx13.9$`, R`$0.05\ln2\approx0.035$`, R`$\ln(400)\approx6$`], 1,
          R`Set $200e^{0.05t}=400$: $e^{0.05t}=2$, $t=\frac{\ln2}{0.05}\approx13.86$.`,
          [R`You need $\ln 2$, not $2$, in the numerator.`, null, R`You multiplied instead of divided.`, R`Divide by $200$ first, then take $\ln$ and divide by $0.05$.`])
      ]
    },
    {
      id: 'inverse', title: 'Inverse Functions and Inverse Trig',
      html: R`
<p>If $f$ sends $a$ to $b$, its <b>inverse</b> $f^{-1}$ sends $b$ back to $a$. An inverse exists only if $f$ is <b>one-to-one</b>: no two inputs share an output (graphically, the <b>horizontal line test</b>).</p>
${BOX('def', 'Inverse function', R`<p>$f^{-1}(y)=x \iff f(x)=y$. Equivalently $f^{-1}(f(x))=x$ and $f(f^{-1}(y))=y$. The graph of $f^{-1}$ is the reflection of the graph of $f$ across the line $y=x$.</p>`)}
${BOX('warn', 'Notation', R`<p>$f^{-1}(x)$ means the inverse function, <b>not</b> $\dfrac{1}{f(x)}$.</p>`)}
<h2>Finding an inverse</h2>
${EX('Example 1', R`<p>Find $f^{-1}$ for $f(x)=\dfrac{2x+1}{x-3}$.</p>`, R`
<ol class="steps"><li>Write $y=\frac{2x+1}{x-3}$ and swap: $x=\frac{2y+1}{y-3}$.</li><li>Solve: $x(y-3)=2y+1\Rightarrow xy-2y=3x+1\Rightarrow y(x-2)=3x+1$.</li><li><span class="ans">$f^{-1}(x)=\dfrac{3x+1}{x-2}$</span>.</li></ol>`)}
<h2>Inverse trigonometric functions</h2>
<p>Trig functions are not one-to-one, so we restrict their domains to make them invertible:</p>
<table><thead><tr><th>Function</th><th>Domain</th><th>Range (output angles)</th></tr></thead><tbody>
<tr><td>$\arcsin x=\sin^{-1}x$</td><td>$[-1,1]$</td><td>$[-\pi/2,\pi/2]$</td></tr>
<tr><td>$\arccos x=\cos^{-1}x$</td><td>$[-1,1]$</td><td>$[0,\pi]$</td></tr>
<tr><td>$\arctan x=\tan^{-1}x$</td><td>$\mathbb R$</td><td>$(-\pi/2,\pi/2)$</td></tr>
</tbody></table>
${EX('Example 2', R`<p>Evaluate $\arcsin(-\tfrac12)$, $\arccos(-\tfrac12)$, and $\arctan(1)$.</p>`, R`<p>$\arcsin(-\tfrac12)=-\pi/6$ (must lie in $[-\pi/2,\pi/2]$). $\arccos(-\tfrac12)=2\pi/3$ (must lie in $[0,\pi]$). $\arctan1=\pi/4$.</p>`)}
${EX('Example 3 — A triangle trick', R`<p>Simplify $\cos(\arctan x)$.</p>`, R`<p>Let $\theta=\arctan x$, so $\tan\theta=x=\frac x1$. Draw a right triangle with opposite $x$, adjacent $1$, hypotenuse $\sqrt{1+x^2}$. Then $\cos\theta=\dfrac{1}{\sqrt{1+x^2}}$. This trick is the heart of <b>trig substitution</b> (§8.3).</p>`)}
${BOX('key', 'Key takeaways', R`<ul><li>Inverses exist only for one-to-one functions; reflect across $y=x$.</li><li>$\ln x$ is the inverse of $e^x$; $\arcsin,\arccos,\arctan$ are inverses of restricted trig functions.</li><li>Know the output ranges of inverse trig functions.</li></ul>`)}`,
      quiz: [
        Q(R`What is $\arccos(0)$?`, [R`$0$`, R`$\pi$`, R`$\pi/2$`, R`$-\pi/2$`], 2,
          R`We need the angle in $[0,\pi]$ whose cosine is $0$: that's $\pi/2$.`,
          [R`$\cos0=1$, not $0$.`, R`$\cos\pi=-1$.`, null, R`$-\pi/2$ is outside the range $[0,\pi]$ of arccos.`]),
        Q(R`If $f(x)=x^3+2$, then $f^{-1}(10)=$`, [R`$2$`, R`$1002$`, R`$\dfrac1{1002}$`, R`$\sqrt[3]{12}$`], 0,
          R`$f^{-1}(10)$ is the $x$ with $f(x)=10$: $x^3+2=10\Rightarrow x^3=8\Rightarrow x=2$.`,
          [null, R`That is $f(10)$, not $f^{-1}(10)$.`, R`$f^{-1}$ is not the reciprocal $1/f$.`, R`You should subtract $2$, not add: $x^3=10-2$.`]),
        Q(R`Which function does <b>not</b> have an inverse on all of $\mathbb{R}$?`, [R`$f(x)=x^3$`, R`$f(x)=e^x$`, R`$f(x)=x^2$`, R`$f(x)=2x-7$`], 2,
          R`$x^2$ fails the horizontal line test: $f(2)=f(-2)=4$.`,
          [R`$x^3$ is strictly increasing, so one-to-one.`, R`$e^x$ is strictly increasing; its inverse is $\ln x$.`, null, R`Non-horizontal lines are one-to-one.`]),
        Q(R`$\sin(\arccos x)$ simplifies to (for $-1\le x\le1$):`, [R`$\sqrt{1-x^2}$`, R`$\dfrac1x$`, R`$x$`, R`$\sqrt{1+x^2}$`], 0,
          R`Let $\theta=\arccos x\in[0,\pi]$ so $\cos\theta=x$; then $\sin\theta=\sqrt{1-x^2}$ (non-negative on $[0,\pi]$).`,
          [null, R`Guessing the reciprocal ignores the right-triangle relationship.`, R`$\cos(\arccos x)=x$, but we want sine.`, R`The Pythagorean relation gives $1-x^2$ under the root, not $1+x^2$.`])
      ]
    }
  ],
  review: [
    Q(R`Domain of $g(x)=\ln(x^2-9)$?`, [R`$x>3$`, R`$(-\infty,-3)\cup(3,\infty)$`, R`$[-3,3]$`, R`All reals`], 1,
      R`Need $x^2-9>0$, i.e. $|x|>3$.`,
      [R`You forgot that negative $x$ with $|x|>3$ also works, e.g. $x=-4$.`, null, R`Inside $[-3,3]$, $x^2-9\le0$ — exactly where $\ln$ is undefined.`, R`$\ln$ needs a positive input.`]),
    Q(R`$\tan(\pi/4)+\sin(\pi/2)=$`, [R`$1$`, R`$2$`, R`$\sqrt2$`, R`$0$`], 1, R`$\tan(\pi/4)=1$ and $\sin(\pi/2)=1$, so the sum is $2$.`,
      [R`Both terms equal 1.`, null, R`$\sqrt2$ doesn't appear; check the unit circle values.`, R`Neither term is zero.`]),
    Q(R`If $e^{x}=4$, then $e^{2x}=$`, [R`$8$`, R`$16$`, R`$2$`, R`$e^8$`], 1, R`$e^{2x}=(e^x)^2=4^2=16$.`,
      [R`$e^{2x}$ squares $e^x$; it doesn't double it.`, null, R`That would be $e^{x/2}$.`, R`Use $(e^x)^2$, not $e^{2\cdot 4}$.`])
  ]
});
