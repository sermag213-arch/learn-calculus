CALC.addChapter({
  id: 'derivative', num: 3, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'The Derivative',
  blurb: 'Instantaneous rate of change: slopes of tangent lines, velocity, and the derivative function.',
  intro: R`<p class="lead">How fast is a car going <em>at this exact instant</em>? Speed is distance over time, but at a single instant no time passes — we get $\frac00$. The derivative resolves this paradox with a limit, and it is the central idea of differential calculus.</p>`,
  objectives: ['Compute average rates of change and interpret them as secant slopes.', 'Define the derivative as a limit of difference quotients and compute it from the definition.', 'Find equations of tangent lines.', 'Sketch $f\'$ from the graph of $f$ and interpret the derivative in context.', 'Identify where a function fails to be differentiable and relate differentiability to continuity.', 'Compute and interpret higher-order derivatives.'],
  sections: [
    {
      id: 'rates', title: 'Tangent Lines and Rates of Change',
      html: R`
<p>Suppose a ball is dropped and has fallen $s(t)=16t^2$ feet after $t$ seconds. What is its speed at $t=2$?</p>
<h2>Average rate of change</h2>
${BOX('def', 'Average rate of change', R`<p>The average rate of change of $f$ on $[a,b]$ is $$\frac{\Delta f}{\Delta x}=\frac{f(b)-f(a)}{b-a},$$ the slope of the <b>secant line</b> through $(a,f(a))$ and $(b,f(b))$.</p>`)}
<table><thead><tr><th>Interval</th><th class="c">$[2,3]$</th><th class="c">$[2,2.1]$</th><th class="c">$[2,2.01]$</th><th class="c">$[2,2.001]$</th></tr></thead>
<tbody><tr><td>Average velocity (ft/s)</td><td class="c">$80$</td><td class="c">$65.6$</td><td class="c">$64.16$</td><td class="c">$64.016$</td></tr></tbody></table>
<p>As the interval shrinks, the average velocity approaches $64$ ft/s. That limiting value is the <b>instantaneous velocity</b>.</p>
<h2>From secant to tangent</h2>
<p>Geometrically, shrinking the interval makes the secant line pivot until it becomes the <b>tangent line</b> — the line that best matches the curve at that point. Use the widget: set a point $a$, then drag $h$ toward $0$.</p>
${WIDGET('secant')}
${BOX('def', 'Slope of the tangent line', R`<p>The tangent line to $y=f(x)$ at $(a,f(a))$ is the line through that point with slope $$m=\lim_{h\to0}\frac{f(a+h)-f(a)}{h},$$ provided the limit exists.</p>`)}
${EX('Example 1', R`<p>Find the slope of the tangent to $y=x^2$ at $x=3$, and the tangent line's equation.</p>`, R`<p>$$m=\lim_{h\to0}\frac{(3+h)^2-9}{h}=\lim_{h\to0}\frac{6h+h^2}{h}=\lim_{h\to0}(6+h)=6.$$ Point-slope form: <span class="ans">$y-9=6(x-3)$, i.e. $y=6x-9$</span>.</p>`)}
${BOX('intuition', 'Zoom in', R`<p>If you zoom in far enough on a smooth curve, it looks like a straight line — the tangent line. The derivative is the slope of what you see under the microscope. This idea is called <b>local linearity</b>.</p>`)}
${MORE([['3Blue1Brown — The paradox of the derivative', 'https://www.youtube.com/watch?v=9vKqVkMQHKk', 'Essence of Calculus, ch. 2'], ['OpenStax §3.1 Defining the Derivative', 'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative', 'Reading'], ['MIT 18.01SC — Derivatives', 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/1.-differentiation/', 'Lecture videos']])}`,
      quiz: [
        Q(R`The average rate of change of $f(x)=x^3$ on $[1,3]$ is:`, [R`$13$`, R`$26$`, R`$27$`, R`$12$`], 0,
          R`$\frac{f(3)-f(1)}{3-1}=\frac{27-1}{2}=13$.`,
          [null, R`You forgot to divide by $\Delta x=2$.`, R`That's $f(3)$ alone.`, R`$12$ would be $f'(2)$ — an instantaneous rate, not the average.`]),
        Q(R`The tangent line to a curve at a point is best described as:`, [R`A line that touches the curve at exactly one point`, R`The limit of secant lines through that point as the second point approaches it`, R`A line perpendicular to the curve`, R`Any line through the point`], 1,
          R`The tangent is the limiting position of secant lines. (It may cross or touch the curve elsewhere; "touches at one point" is not the definition.)`,
          [R`Counterexample: the tangent to $y=x^3$ at $x=1$ crosses the curve again at $x=-2$.`, null, R`That's the normal line.`, R`Only one line has the right slope.`]),
        Q(R`Position $s(t)=t^2+t$ (meters). The instantaneous velocity at $t=1$ is:`, [R`$2$ m/s`, R`$3$ m/s`, R`$1$ m/s`, R`$4$ m/s`], 1,
          R`$\lim_{h\to0}\frac{(1+h)^2+(1+h)-2}{h}=\lim_{h\to0}\frac{3h+h^2}{h}=3$.`,
          [R`That's $s(1)$, the position.`, null, R`Don't forget the derivative of $t^2$ contributes $2t=2$.`, R`Recheck the expansion: $(1+h)^2=1+2h+h^2$.`])
      ]
    },
    {
      id: 'definition', title: 'The Derivative from the Definition',
      html: R`
${BOX('def', 'Definition — The derivative', R`<p>The <b>derivative of $f$ at $a$</b> is $$f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$$ if this limit exists. Equivalently, $$f'(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}.$$</p>`)}
<p>Replacing the fixed number $a$ with a variable $x$ gives a new function, the <b>derivative function</b>:</p>
$$f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}.$$
<p>Notations: $f'(x)=\dfrac{dy}{dx}=\dfrac{df}{dx}=\dfrac{d}{dx}f(x)=y'=Df(x)$. Leibniz's $\frac{dy}{dx}$ reminds us it's a limit of $\frac{\Delta y}{\Delta x}$.</p>
<h2>The four-step recipe</h2>
<ol class="steps"><li>Write $f(x+h)$.</li><li>Compute $f(x+h)-f(x)$ and simplify.</li><li>Divide by $h$ (cancel the $h$!).</li><li>Let $h\to0$.</li></ol>
${EX('Example 1 — Polynomial', R`<p>Find $f'(x)$ for $f(x)=3x^2-5x$.</p>`, R`
$$\begin{aligned}f(x+h)-f(x)&=3(x+h)^2-5(x+h)-3x^2+5x\\&=6xh+3h^2-5h\\ \frac{f(x+h)-f(x)}h&=6x+3h-5\ \xrightarrow{h\to0}\ 6x-5.\end{aligned}$$<p><span class="ans">$f'(x)=6x-5$</span></p>`)}
${EX('Example 2 — Square root', R`<p>Find $f'(x)$ for $f(x)=\sqrt x$.</p>`, R`
$$\frac{\sqrt{x+h}-\sqrt x}{h}\cdot\frac{\sqrt{x+h}+\sqrt x}{\sqrt{x+h}+\sqrt x}=\frac{h}{h(\sqrt{x+h}+\sqrt x)}\to\frac1{2\sqrt x}.$$<p><span class="ans">$f'(x)=\dfrac1{2\sqrt x}$</span>, for $x>0$.</p>`)}
${EX('Example 3 — Reciprocal', R`<p>Find $f'(x)$ for $f(x)=\dfrac1x$.</p>`, R`
$$\frac{\frac1{x+h}-\frac1x}{h}=\frac{x-(x+h)}{hx(x+h)}=\frac{-1}{x(x+h)}\to-\frac1{x^2}.$$<p><span class="ans">$f'(x)=-\dfrac1{x^2}$</span></p>`)}
${BOX('tip', 'Recognizing a derivative in disguise', R`<p>Exam favorite: $\displaystyle\lim_{h\to0}\frac{\sqrt[3]{8+h}-2}{h}$ is $f'(8)$ for $f(x)=\sqrt[3]x$. Once you know the rules in Chapter 4, the answer is $\frac13 8^{-2/3}=\frac1{12}$.</p>`)}
${BOX('key', 'Key takeaways', R`<ul><li>$f'(x)$ = limit of the difference quotient.</li><li>The algebra always aims to cancel the $h$ in the denominator.</li><li>$f'(a)$ is the slope of the tangent line and the instantaneous rate of change at $a$.</li></ul>`)}`,
      quiz: [
        Q(R`Using the definition, the derivative of $f(x)=x^2+4x$ is:`, [R`$2x+4$`, R`$x+4$`, R`$2x$`, R`$2x+4+h$`], 0,
          R`$\frac{(x+h)^2+4(x+h)-x^2-4x}{h}=2x+h+4\to2x+4$.`,
          [null, R`The $x^2$ term gives $2x$, not $x$.`, R`Don't drop the derivative of $4x$, which is $4$.`, R`You must take the limit $h\to0$ to finish.`]),
        Q(R`$\displaystyle\lim_{h\to0}\frac{(2+h)^4-16}{h}$ represents:`, [R`$f'(2)$ for $f(x)=x^4$`, R`$f'(16)$ for $f(x)=x^4$`, R`$f(2)$ for $f(x)=x^4$`, R`$f'(2)$ for $f(x)=4x$`], 0,
          R`It matches $\frac{f(a+h)-f(a)}{h}$ with $f(x)=x^4$, $a=2$ ($f(2)=16$). Its value is $4\cdot2^3=32$.`,
          [null, R`$16=f(2)$; the point is $a=2$.`, R`A limit of difference quotients is a derivative, not a function value.`, R`Then $f(2+h)$ would be $8+4h$, not $(2+h)^4$.`]),
        Q(R`Which limit equals the derivative of $\cos x$ at $x=\pi$?`, [R`$\displaystyle\lim_{h\to0}\frac{\cos(\pi+h)+1}{h}$`, R`$\displaystyle\lim_{h\to0}\frac{\cos(\pi+h)-1}{h}$`, R`$\displaystyle\lim_{h\to0}\frac{\cos(h)-\cos\pi}{h}$`, R`$\displaystyle\lim_{x\to\pi}\frac{\cos x}{x-\pi}$`], 0,
          R`$\frac{f(\pi+h)-f(\pi)}h$ with $f(\pi)=\cos\pi=-1$ gives $\frac{\cos(\pi+h)-(-1)}{h}$.`,
          [null, R`$\cos\pi=-1$, so you should subtract $-1$, i.e. add $1$.`, R`The input should be $\pi+h$, not $h$.`, R`You need $\cos x-\cos\pi$ in the numerator.`]),
        Q(R`If $f(x)=\dfrac{1}{x}$, the tangent line at $x=2$ is:`, [R`$y=-\tfrac14x+1$`, R`$y=-\tfrac14x+\tfrac12$`, R`$y=\tfrac14x$`, R`$y=-4x+\tfrac{17}2$`], 0,
          R`$f'(2)=-\frac1{4}$, point $(2,\frac12)$: $y-\frac12=-\frac14(x-2)\Rightarrow y=-\frac14x+1$.`,
          [null, R`You used the slope but forgot to shift to pass through $(2,\tfrac12)$.`, R`The slope of $1/x$ is negative.`, R`The slope is $-1/x^2=-\frac14$, not $-4$.`])
      ]
    },
    {
      id: 'graphical', title: 'The Derivative as a Function',
      html: R`
<p>The derivative is itself a function, and its graph tells a story about the original function:</p>
<table><thead><tr><th>When $f$ is…</th><th>then $f'$ is…</th></tr></thead><tbody>
<tr><td>increasing</td><td>positive (above the $x$-axis)</td></tr>
<tr><td>decreasing</td><td>negative (below the axis)</td></tr>
<tr><td>at a peak or valley with a smooth (horizontal) tangent</td><td>zero (crosses or touches the axis)</td></tr>
<tr><td>steep</td><td>large in absolute value</td></tr>
<tr><td>a straight line with slope $m$</td><td>constant $m$</td></tr>
</tbody></table>
${WIDGET('derivative')}
<h2>Sketching $f'$ from $f$</h2>
<ol class="steps"><li>Mark every point where the tangent to $f$ is horizontal: $f'=0$ there.</li><li>On each interval between, decide whether $f$ rises (then $f'>0$) or falls ($f'<0$).</li><li>Estimate steepness to judge how far $f'$ is from the axis.</li></ol>
${EX('Example — Reading a graph', R`<p>$f(x)=x^3-3x$ has a local max at $x=-1$ and local min at $x=1$. Describe $f'$.</p>`, R`<p>$f'$ is zero at $x=\pm1$, positive for $|x|>1$ (where $f$ rises), and negative on $(-1,1)$. It's a parabola opening up: indeed $f'(x)=3x^2-3$.</p>`)}
<h2>Units and interpretation</h2>
<p>The derivative's units are <b>(units of output) per (unit of input)</b>. If $C(q)$ is the cost in dollars to produce $q$ items, $C'(100)=4.5$ means "at a production level of 100 items, cost is increasing at about 4.50 dollars per additional item" — the <b>marginal cost</b>. If $T(t)$ is temperature in °F after $t$ hours, $T'(3)=-2$ means "at hour 3 the temperature is dropping 2 °F per hour."</p>
${BOX('warn', 'Common misreading', R`<p>$f'(3)=-2$ does <b>not</b> say the value is $-2$. It says the value is <em>changing</em> at a rate of $-2$ per unit.</p>`)}`,
      quiz: [
        Q(R`On an interval where the graph of $f$ is rising and getting steeper, $f'$ is:`, [R`positive and increasing`, R`positive and decreasing`, R`negative and increasing`, R`zero`], 0,
          R`Rising means $f'>0$; getting steeper means the slope values are growing, so $f'$ is increasing.`,
          [null, R`A decreasing positive $f'$ means the curve is rising but flattening.`, R`Rising means positive slope.`, R`Zero slope means flat.`]),
        Q(R`$P(t)$ is a city's population (people) $t$ years after 2020. What does $P'(5)=1200$ mean?`, [R`The population in 2025 is 1200.`, R`In 2025 the population is growing at about 1200 people per year.`, R`The population grew by 1200 between 2020 and 2025.`, R`The population will be 1200 higher in 5 years.`], 1,
          R`A derivative is an instantaneous rate: in 2025 ($t=5$) the population is increasing at a rate of 1200 people/year.`,
          [R`That would be $P(5)=1200$.`, null, R`That's a total change over 5 years, i.e. $P(5)-P(0)$.`, R`The derivative is a rate at an instant, not a future total.`]),
        Q(R`If $f$ has a horizontal tangent at $x=4$, then:`, [R`$f(4)=0$`, R`$f'(4)=0$`, R`$f'(4)$ is undefined`, R`$f$ is not continuous at 4`], 1,
          R`A horizontal line has slope $0$, so $f'(4)=0$.`,
          [R`The height of $f$ can be anything; it's the slope that's zero.`, null, R`Horizontal tangents have a defined slope of $0$; vertical tangents are undefined.`, R`Having a tangent at all requires continuity.`])
      ]
    },
    {
      id: 'differentiability', title: 'Differentiability',
      html: R`
<p>A function is <b>differentiable at $a$</b> if $f'(a)$ exists. It is differentiable on an open interval if it is differentiable at every point of it.</p>
${BOX('thm', 'Theorem — Differentiable implies continuous', R`<p>If $f$ is differentiable at $a$, then $f$ is continuous at $a$.</p><p><b>Proof:</b> $\displaystyle\lim_{x\to a}[f(x)-f(a)]=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}\cdot(x-a)=f'(a)\cdot0=0.$ ∎</p>`)}
${BOX('warn', 'The converse is FALSE', R`<p>Continuous does <b>not</b> imply differentiable. $f(x)=|x|$ is continuous at $0$ but not differentiable there.</p>`)}
<h2>Three ways differentiability fails</h2>
<ol><li><b>Corner</b>: different left and right slopes. For $|x|$ at $0$: $\lim_{h\to0^+}\frac{|h|}h=1$ and $\lim_{h\to0^-}\frac{|h|}h=-1$.</li>
<li><b>Cusp</b> or <b>vertical tangent</b>: slopes blow up. $f(x)=x^{1/3}$ has a vertical tangent at $0$ since $\frac{h^{1/3}}{h}=h^{-2/3}\to\infty$. $f(x)=x^{2/3}$ has a cusp at $0$.</li>
<li><b>Discontinuity</b>: any jump, hole, or asymptote destroys differentiability (by the theorem above).</li></ol>
${EX('Example — Piecewise differentiability', R`<p>Find $a,b$ so that $f(x)=\begin{cases}x^2, & x\le1\\ ax+b, & x>1\end{cases}$ is differentiable at $x=1$.</p>`, R`<p><b>Continuity:</b> $1=a+b$. <b>Matching slopes:</b> left derivative $2x|_{1}=2$, right derivative $a$. So $a=2$, $b=-1$. <span class="ans">$a=2,\ b=-1$</span> — the line $y=2x-1$ is exactly the tangent line to $x^2$ at $x=1$.</p>`)}`,
      quiz: [
        Q(R`Which function is continuous at $x=0$ but <b>not</b> differentiable there?`, [R`$f(x)=x^2$`, R`$f(x)=|x|$`, R`$f(x)=1/x$`, R`$f(x)=\sin x$`], 1,
          R`$|x|$ has a corner at $0$: left slope $-1$, right slope $1$.`,
          [R`$x^2$ is smooth: $f'(0)=0$.`, null, R`$1/x$ isn't even continuous (or defined) at $0$.`, R`$\sin x$ is differentiable everywhere.`]),
        Q(R`True or false: if $f$ is continuous at $a$, then $f$ is differentiable at $a$.`, [R`True`, R`False`], 1,
          R`False. Differentiable ⇒ continuous, but not conversely. Counterexamples: $|x|$, $x^{1/3}$, $x^{2/3}$ at $0$.`,
          [R`Corners and vertical tangents are continuous but not differentiable.`, null]),
        Q(R`$f(x)=\sqrt[3]{x}$ at $x=0$ has:`, [R`a corner`, R`a vertical tangent`, R`a jump`, R`a horizontal tangent`], 1,
          R`$f'(x)=\frac13x^{-2/3}\to\infty$ as $x\to0$: the curve passes smoothly through the origin but becomes vertical.`,
          [R`At a corner the one-sided slopes are finite but different.`, null, R`$\sqrt[3]x$ is continuous.`, R`The slope blows up; it isn't $0$.`])
      ]
    },
    {
      id: 'higher', title: 'Higher Derivatives and Motion',
      html: R`
<p>The derivative of $f'$ is the <b>second derivative</b> $f''$; its derivative is $f'''$, and so on: $f^{(4)},f^{(5)},\dots$. In Leibniz notation: $\dfrac{d^2y}{dx^2},\ \dfrac{d^3y}{dx^3}$.</p>
<h2>Position, velocity, acceleration</h2>
<p>If $s(t)$ is the position of an object moving along a line:</p>
<ul><li><b>Velocity</b> $v(t)=s'(t)$ — positive means moving forward (right/up).</li>
<li><b>Speed</b> $=|v(t)|$.</li>
<li><b>Acceleration</b> $a(t)=v'(t)=s''(t)$.</li>
<li>The object <b>speeds up</b> when $v$ and $a$ have the same sign, and <b>slows down</b> when they have opposite signs.</li></ul>
${EX('Example — Particle motion', R`<p>$s(t)=t^3-6t^2+9t$ for $t\ge0$. When is the particle at rest? When is it speeding up?</p>`, R`<p>$v(t)=3t^2-12t+9=3(t-1)(t-3)$, so at rest at <b>$t=1$ and $t=3$</b>. $a(t)=6t-12$, zero at $t=2$.</p>
<table><thead><tr><th>Interval</th><th class="c">$(0,1)$</th><th class="c">$(1,2)$</th><th class="c">$(2,3)$</th><th class="c">$(3,\infty)$</th></tr></thead><tbody>
<tr><td>sign of $v$</td><td class="c">+</td><td class="c">−</td><td class="c">−</td><td class="c">+</td></tr>
<tr><td>sign of $a$</td><td class="c">−</td><td class="c">−</td><td class="c">+</td><td class="c">+</td></tr>
<tr><td>motion</td><td class="c">slowing</td><td class="c">speeding up</td><td class="c">slowing</td><td class="c">speeding up</td></tr></tbody></table>
<p>Speeding up on <span class="ans">$(1,2)\cup(3,\infty)$</span>.</p>`)}
<h2>Concavity preview</h2>
<p>Geometrically, $f''>0$ means the slopes are increasing — the graph is <b>concave up</b> (holds water, like $\cup$). $f''<0$ means concave down ($\cap$). Chapter 5 uses this to sketch curves and classify extrema.</p>`,
      quiz: [
        Q(R`If $s(t)=4t^2-t^3$, what is the acceleration at $t=1$?`, [R`$2$`, R`$5$`, R`$3$`, R`$-2$`], 0,
          R`$v=8t-3t^2$, $a=8-6t$, so $a(1)=2$.`,
          [null, R`That's $v(1)$, the velocity.`, R`That's $s(1)$, the position.`, R`Check: $8-6(1)=+2$.`]),
        Q(R`At some instant $v=-3$ m/s and $a=2$ m/s². The object is:`, [R`speeding up`, R`slowing down`, R`at rest`, R`moving forward`], 1,
          R`Velocity and acceleration have opposite signs, so the speed $|v|$ is decreasing.`,
          [R`Speeding up requires matching signs.`, null, R`$v\ne0$.`, R`$v<0$ means moving backward.`]),
        Q(R`The 4th derivative of $f(x)=x^4-2x^3$ is:`, [R`$24$`, R`$24x$`, R`$0$`, R`$24x-12$`], 0,
          R`$f'=4x^3-6x^2$, $f''=12x^2-12x$, $f'''=24x-12$, $f^{(4)}=24$.`,
          [null, R`One more differentiation is needed after $24x$ — or check the constant.`, R`That's the 5th derivative.`, R`That's the 3rd derivative.`])
      ]
    }
  ],
  review: [
    Q(R`Given $f(2)=5$ and $f'(2)=-3$, the tangent line at $x=2$ is:`, [R`$y=-3x+11$`, R`$y=5x-3$`, R`$y=-3x+5$`, R`$y=-3x-1$`], 0, R`$y-5=-3(x-2)\Rightarrow y=-3x+11$.`,
      [null, R`You swapped the slope and the value.`, R`The line must pass through $(2,5)$; plug in to check.`, R`Sign error when distributing $-3(x-2)=-3x+6$.`]),
    Q(R`$\displaystyle\lim_{x\to\pi/3}\frac{\sin x-\frac{\sqrt3}2}{x-\pi/3}=$`, [R`$\tfrac12$`, R`$\tfrac{\sqrt3}2$`, R`$0$`, R`DNE`], 0, R`This is $f'(\pi/3)$ for $f=\sin x$, which is $\cos(\pi/3)=\frac12$.`,
      [null, R`That's $\sin(\pi/3)$, the value — we need the slope.`, R`It's $\frac00$ form, which here equals a derivative.`, R`Sine is differentiable everywhere.`])
  ]
});
