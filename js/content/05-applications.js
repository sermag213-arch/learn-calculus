CALC.addChapter({
  id: 'applications', num: 5, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'Applications of Derivatives',
  blurb: 'Related rates, linear approximation, extreme values, curve sketching, optimization, L\'Hôpital\'s Rule, Newton\'s method, and antiderivatives.',
  intro: R`<p class="lead">Now the payoff: derivatives let us find the best design, the fastest-changing moment, the shape of a graph, and approximate solutions to equations we can't solve exactly. These are the problems that make calculus indispensable in science, engineering, and economics.</p>`,
  objectives: ['Solve related-rates problems.', 'Use linearization and differentials to approximate values and errors.', 'Find absolute and local extrema using critical points.', 'State and apply Rolle\'s Theorem and the Mean Value Theorem.', 'Use the first and second derivative tests; determine concavity and inflection points; sketch curves.', 'Set up and solve optimization problems.', 'Evaluate indeterminate forms using L\'Hôpital\'s Rule.', 'Approximate roots using Newton\'s method.', 'Find general and particular antiderivatives.'],
  sections: [
    {
      id: 'related-rates', title: 'Related Rates',
      html: R`
<p>When two quantities are linked by an equation and both change over time, their <b>rates</b> are linked too. Differentiate the equation with respect to $t$ (implicitly!) to connect the rates.</p>
<h2>The strategy</h2>
<ol class="steps"><li><b>Draw a picture</b> and label quantities that change with variables (not numbers!).</li><li><b>Write down</b> the given rates and the rate you want, as derivatives with respect to $t$.</li><li><b>Find an equation</b> relating the variables (geometry: Pythagoras, similar triangles, area/volume formulas).</li><li><b>Differentiate</b> both sides with respect to $t$.</li><li><b>Only now substitute</b> the numbers for the specific instant and solve.</li></ol>
${BOX('warn', 'Most common mistake', R`<p>Substituting a changing quantity's value <b>before</b> differentiating. If you plug in $x=6$ first, $x$ becomes a constant and its derivative becomes $0$ — wrong!</p>`)}
${EX('Example 1 — The sliding ladder', R`<p>A 10-ft ladder leans against a wall. Its base slides away from the wall at $1$ ft/s. How fast is the top sliding down when the base is $6$ ft from the wall?</p>`, R`
<p>Let $x$ = distance of base from wall, $y$ = height of top. Given $\frac{dx}{dt}=1$; want $\frac{dy}{dt}$ when $x=6$.</p>
<p>Equation: $x^2+y^2=100$. Differentiate: $2x\frac{dx}{dt}+2y\frac{dy}{dt}=0$.</p>
<p>When $x=6$, $y=8$. So $2(6)(1)+2(8)\frac{dy}{dt}=0\Rightarrow\frac{dy}{dt}=-\frac34$.</p>
<p>The top slides down at <span class="ans">$\tfrac34$ ft/s</span> (negative means $y$ decreases).</p>`)}
${EX('Example 2 — The expanding balloon', R`<p>Air is pumped into a spherical balloon at $100\ \text{cm}^3/\text{s}$. How fast is the radius increasing when the diameter is $50$ cm?</p>`, R`<p>$V=\frac43\pi r^3\Rightarrow \frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$. With $r=25$: $100=4\pi(625)\frac{dr}{dt}$, so <span class="ans">$\frac{dr}{dt}=\frac{1}{25\pi}\approx0.0127$ cm/s</span>.</p>`)}
${EX('Example 3 — The conical tank', R`<p>Water drains from a cone (vertex down) with height $12$ m and top radius $4$ m at $2\ \text{m}^3/\text{min}$. How fast is the water level falling when the water is $6$ m deep?</p>`, R`<p>Similar triangles: $\frac rh=\frac4{12}$, so $r=\frac h3$. Then $V=\frac13\pi r^2h=\frac{\pi h^3}{27}$, and $\frac{dV}{dt}=\frac{\pi h^2}{9}\frac{dh}{dt}$.</p><p>At $h=6$: $-2=\frac{36\pi}{9}\frac{dh}{dt}=4\pi\frac{dh}{dt}$, so $\frac{dh}{dt}=-\frac1{2\pi}$. The level falls at <span class="ans">$\frac1{2\pi}\approx0.159$ m/min</span>.</p><p><b>Key idea:</b> eliminate $r$ using similar triangles <em>before</em> differentiating so only one variable remains.</p>`)}
${EX('Example 4 — Two cars', R`<p>Car A drives north at $60$ mph and car B drives east at $25$ mph, both leaving the same intersection. How fast is the distance between them changing after 2 hours?</p>`, R`<p>$z^2=x^2+y^2$, $2zz'=2xx'+2yy'$. At $t=2$: $x=50$, $y=120$, $z=130$. $130z'=50(25)+120(60)=8450$, so <span class="ans">$z'=65$ mph</span>.</p>`)}
${MORE([["Paul's Notes — Related Rates", 'https://tutorial.math.lamar.edu/Classes/CalcI/RelatedRates.aspx', '10+ worked problems'], ['OpenStax §4.1 Related Rates', 'https://openstax.org/books/calculus-volume-1/pages/4-1-related-rates', 'Reading'], ['Khan Academy — Related rates', 'https://www.khanacademy.org/math/ap-calculus-ab/ab-diff-contextual-applications-new', 'Videos & practice']])}`,
      quiz: [
        Q(R`A circle's radius grows at $3$ cm/s. How fast is the area growing when $r=10$ cm?`, [R`$60\pi\ \text{cm}^2/\text{s}$`, R`$20\pi\ \text{cm}^2/\text{s}$`, R`$300\pi\ \text{cm}^2/\text{s}$`, R`$6\pi\ \text{cm}^2/\text{s}$`], 0,
          R`$A=\pi r^2\Rightarrow \frac{dA}{dt}=2\pi r\frac{dr}{dt}=2\pi(10)(3)=60\pi$.`,
          [null, R`Forgot to multiply by $\frac{dr}{dt}=3$.`, R`$\pi r^2\cdot3$ doesn't differentiate $r^2$.`, R`Use $r=10$ in $2\pi r$.`]),
        Q(R`In a related-rates problem, when should you substitute the specific values of changing quantities?`, [R`At the very beginning`, R`After differentiating with respect to $t$`, R`Before writing the equation`, R`Never`], 1,
          R`Differentiate first, then substitute. Substituting first freezes a variable into a constant and loses its rate.`,
          [R`This turns variables into constants, so their derivatives incorrectly become 0.`, null, R`You need the equation in terms of variables.`, R`You need numbers eventually to get a numeric rate.`]),
        Q(R`A 13-ft ladder slides with base moving away at $2$ ft/s. When the base is $5$ ft from the wall, the top moves at:`, [R`$-\tfrac56$ ft/s`, R`$-\tfrac{12}{5}$ ft/s`, R`$-2$ ft/s`, R`$-\tfrac{5}{12}$ ft/s`], 0,
          R`$y=12$. $2(5)(2)+2(12)y'=0\Rightarrow y'=-\frac{20}{24}=-\frac56$.`,
          [null, R`Check: $xx'+yy'=0$ gives $y'=-\frac{x x'}{y}=-\frac{10}{12}$.`, R`The rates aren't equal; they depend on the geometry.`, R`Don't forget $\frac{dx}{dt}=2$.`]),
        Q(R`A cube's volume increases at $12\ \text{in}^3/\text{s}$. How fast is the side length increasing when $s=2$ in?`, [R`$1$ in/s`, R`$3$ in/s`, R`$\tfrac14$ in/s`, R`$12$ in/s`], 0,
          R`$V=s^3\Rightarrow V'=3s^2s'$. $12=3(4)s'\Rightarrow s'=1$.`,
          [null, R`$3s^2=12$ at $s=2$, so $s'=12/12$.`, R`Recheck: $3\cdot2^2=12$.`, R`Divide by $3s^2$.`])
      ]
    },
    {
      id: 'linearization', title: 'Linear Approximation and Differentials',
      html: R`
<p>Near a point, a differentiable function is almost indistinguishable from its tangent line. This lets us approximate hard-to-compute values with easy ones.</p>
${BOX('def', 'Linearization', R`<p>The <b>linearization</b> of $f$ at $a$ is the tangent line function $$L(x)=f(a)+f'(a)(x-a).$$ For $x$ near $a$: $f(x)\approx L(x)$.</p>`)}
${EX('Example 1 — Square root', R`<p>Approximate $\sqrt{4.1}$.</p>`, R`<p>Use $f(x)=\sqrt x$, $a=4$: $f(4)=2$, $f'(4)=\frac1{2\sqrt4}=\frac14$. $L(x)=2+\frac14(x-4)$, so $\sqrt{4.1}\approx2+\frac14(0.1)=$ <span class="ans">$2.025$</span>. (True: $2.02485\ldots$)</p>`)}
${EX('Example 2 — Sine of a small angle', R`<p>Find the linearization of $\sin x$ at $0$.</p>`, R`<p>$L(x)=\sin0+\cos0\cdot x=x$. So $\sin x\approx x$ for small $x$ — the famous "small-angle approximation" used for pendulums in physics.</p>`)}
${BOX('tip', 'Over- or under-estimate?', R`<p>If $f$ is <b>concave up</b> near $a$ ($f''>0$), the tangent line lies below the curve, so $L(x)$ <b>underestimates</b>. If concave down, it <b>overestimates</b>. In Example 1, $\sqrt x$ is concave down, so $2.025$ is slightly too big. ✔</p>`)}
<h2>Differentials</h2>
<p>If $y=f(x)$, the <b>differential</b> $dy=f'(x)\,dx$ estimates the actual change $\Delta y$ when $x$ changes by $dx=\Delta x$.</p>
${EX('Example 3 — Error propagation', R`<p>A sphere's radius is measured as $10$ cm with possible error $\pm0.1$ cm. Estimate the maximum error in the computed volume.</p>`, R`<p>$V=\frac43\pi r^3$, $dV=4\pi r^2dr=4\pi(100)(0.1)=40\pi\approx125.7\ \text{cm}^3$.</p><p>Relative error: $\frac{dV}{V}=\frac{40\pi}{\frac43\pi(1000)}=0.03=3\%$ — three times the $1\%$ relative error in $r$, because $V\propto r^3$.</p>`)}`,
      quiz: [
        Q(R`Using linearization at $a=8$, $\sqrt[3]{8.3}\approx$`, [R`$2.025$`, R`$2.1$`, R`$2.0125$`, R`$2.3$`], 0,
          R`$f'(x)=\frac13x^{-2/3}$, $f'(8)=\frac1{12}$. $L=2+\frac{0.3}{12}=2.025$.`,
          [null, R`$f'(8)=\frac{1}{3\cdot4}=\frac1{12}$, not $\frac13$.`, R`$0.3/12=0.025$.`, R`The change in the cube root is much less than the change in $x$.`]),
        Q(R`The linearization of $f(x)=e^x$ at $x=0$ is:`, [R`$L(x)=x$`, R`$L(x)=1+x$`, R`$L(x)=e^x$`, R`$L(x)=1$`], 1, R`$f(0)=1,f'(0)=1$, so $L(x)=1+x$.`,
          [R`Forgot $f(0)=1$.`, null, R`The linearization must be a linear function.`, R`Forgot the slope term.`]),
        Q(R`If $f''(x)>0$ near $a$, the linear approximation $L(x)$ near $a$:`, [R`overestimates $f(x)$`, R`underestimates $f(x)$`, R`is exact`, R`can't be determined`], 1, R`Concave up ⇒ tangent line lies below the graph ⇒ underestimate.`,
          [R`That happens when concave down.`, null, R`Only exact for linear $f$.`, R`Concavity determines it.`])
      ]
    },
    {
      id: 'extrema', title: 'Maximum and Minimum Values',
      html: R`
${BOX('def', 'Absolute and local extrema', R`<p>$f(c)$ is an <b>absolute maximum</b> on $D$ if $f(c)\ge f(x)$ for all $x\in D$ (absolute minimum: $\le$). It's a <b>local maximum</b> if $f(c)\ge f(x)$ for all $x$ near $c$.</p>`)}
${BOX('thm', 'Extreme Value Theorem (EVT)', R`<p>If $f$ is <b>continuous on a closed interval $[a,b]$</b>, then $f$ attains both an absolute maximum and an absolute minimum on $[a,b]$.</p>`)}
${BOX('def', 'Critical number', R`<p>$c$ is a <b>critical number</b> of $f$ if $c$ is in the domain of $f$ and either $f'(c)=0$ or $f'(c)$ does not exist.</p>`)}
${BOX('thm', "Fermat's Theorem", R`<p>If $f$ has a local extremum at $c$ and $f'(c)$ exists, then $f'(c)=0$. So <b>local extrema occur only at critical numbers</b>. (The converse is false: $x^3$ has $f'(0)=0$ but no extremum.)</p>`)}
<h2>The Closed Interval Method</h2>
<p>To find the absolute max and min of a continuous $f$ on $[a,b]$:</p>
<ol class="steps"><li>Find the critical numbers of $f$ in $(a,b)$.</li><li>Evaluate $f$ at each critical number <b>and</b> at both endpoints.</li><li>The largest value is the absolute max; the smallest is the absolute min.</li></ol>
${EX('Example 1', R`<p>Find the absolute extrema of $f(x)=x^3-3x^2+1$ on $[-\tfrac12,4]$.</p>`, R`<p>$f'(x)=3x^2-6x=3x(x-2)=0\Rightarrow x=0,2$.</p>
<table><thead><tr><th>$x$</th><th class="c">$-\frac12$</th><th class="c">$0$</th><th class="c">$2$</th><th class="c">$4$</th></tr></thead><tbody><tr><td>$f(x)$</td><td class="c">$\frac18$</td><td class="c">$1$</td><td class="c">$-3$</td><td class="c">$17$</td></tr></tbody></table>
<p>Absolute max <span class="ans">$17$ at $x=4$</span>; absolute min <span class="ans">$-3$ at $x=2$</span>.</p>`)}
${EX('Example 2 — Derivative undefined', R`<p>Find the critical numbers of $f(x)=x^{2/3}(x-5)$.</p>`, R`<p>$f=x^{5/3}-5x^{2/3}$, $f'=\frac53x^{2/3}-\frac{10}3x^{-1/3}=\frac{5(x-2)}{3x^{1/3}}$. Zero at $x=2$; undefined at $x=0$ (which is in the domain). Critical numbers: <span class="ans">$0$ and $2$</span>.</p>`)}`,
      quiz: [
        Q(R`The critical numbers of $f(x)=x^3-12x$ are:`, [R`$x=0$`, R`$x=\pm2$`, R`$x=\pm2\sqrt3$`, R`$x=12$`], 1, R`$f'=3x^2-12=0\Rightarrow x=\pm2$.`,
          [R`$f'(0)=-12\ne0$.`, null, R`Those are the zeros of $f$, not $f'$.`, R`Set $f'=0$.`]),
        Q(R`On $[0,3]$, the absolute maximum of $f(x)=x^2-2x$ is:`, [R`$-1$`, R`$0$`, R`$3$`, R`$9$`], 2, R`Critical point $x=1$: $f(1)=-1$. Endpoints: $f(0)=0,\ f(3)=3$. Max is $3$.`,
          [R`That's the minimum.`, R`$f(3)=3>0$.`, null, R`$f(3)=9-6=3$.`]),
        Q(R`The Extreme Value Theorem requires:`, [R`$f$ differentiable on $(a,b)$`, R`$f$ continuous on $[a,b]$`, R`$f(a)=f(b)$`, R`$f'(c)=0$ somewhere`], 1, R`Continuity on a closed, bounded interval guarantees absolute extrema exist.`,
          [R`Differentiability isn't needed (e.g. $|x|$ on $[-1,1]$).`, null, R`That's a hypothesis of Rolle's Theorem.`, R`That's a conclusion of other theorems, not a hypothesis.`]),
        Q(R`If $f'(c)=0$, then $f$ must have:`, [R`a local max at $c$`, R`a local min at $c$`, R`either a local max or min at $c$`, R`a horizontal tangent at $c$, but not necessarily an extremum`], 3, R`$f(x)=x^3$ has $f'(0)=0$ but no extremum at $0$.`,
          [R`Could be a min or neither.`, R`Could be a max or neither.`, R`$x^3$ at $0$ is a counterexample.`, null])
      ]
    },
    {
      id: 'mvt', title: 'The Mean Value Theorem',
      html: R`
${BOX('thm', "Rolle's Theorem", R`<p>If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then there is a $c\in(a,b)$ with $f'(c)=0$.</p>`)}
${BOX('thm', 'Mean Value Theorem (MVT)', R`<p>If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there is a $c\in(a,b)$ with $$f'(c)=\frac{f(b)-f(a)}{b-a}.$$</p>`)}
<p><b>In words:</b> somewhere, the instantaneous rate equals the average rate. Geometrically, some tangent line is parallel to the secant line joining the endpoints.</p>
${BOX('intuition', 'The speeding ticket', R`<p>You drive 150 miles in 2 hours. Your average speed is 75 mph. The MVT says that at some instant your speedometer read exactly 75 mph. Some toll roads actually use this to issue speeding tickets!</p>`)}
${EX('Example 1', R`<p>Find all $c$ satisfying the MVT for $f(x)=x^3-x$ on $[0,2]$.</p>`, R`<p>Average rate: $\frac{6-0}{2}=3$. $f'(c)=3c^2-1=3\Rightarrow c^2=\frac43\Rightarrow c=\frac{2}{\sqrt3}\approx1.155$ (the negative root is outside $(0,2)$).</p>`)}
<h2>Consequences</h2>
${BOX('thm', 'Corollaries', R`<ol><li>If $f'(x)=0$ for all $x$ in an interval, then $f$ is <b>constant</b> there.</li><li>If $f'(x)=g'(x)$ on an interval, then $f(x)=g(x)+C$. (This is why antiderivatives have "$+C$".)</li><li>If $f'>0$ on an interval, $f$ is increasing there; if $f'<0$, decreasing.</li></ol>`)}
${EX('Example 2 — Bounding with the MVT', R`<p>If $f(0)=-3$ and $f'(x)\le5$ for all $x$, how large can $f(2)$ be?</p>`, R`<p>By the MVT, $\frac{f(2)-f(0)}{2}=f'(c)\le5$, so $f(2)\le-3+10=$ <span class="ans">$7$</span>.</p>`)}`,
      quiz: [
        Q(R`For $f(x)=x^2$ on $[1,3]$, the value of $c$ guaranteed by the MVT is:`, [R`$c=2$`, R`$c=4$`, R`$c=\sqrt5$`, R`$c=1.5$`], 0, R`Average rate $\frac{9-1}{2}=4$; $f'(c)=2c=4\Rightarrow c=2$.`,
          [null, R`$4$ is the slope; solve $2c=4$.`, R`Check: $2\sqrt5\ne4$.`, R`Check: $2(1.5)=3\ne4$.`]),
        Q(R`Why does Rolle's Theorem NOT apply to $f(x)=|x|$ on $[-1,1]$?`, [R`$f(-1)\ne f(1)$`, R`$f$ is not continuous`, R`$f$ is not differentiable at $0$`, R`It does apply`], 2, R`$|x|$ has a corner at $0$; indeed no point has $f'(c)=0$.`,
          [R`$f(-1)=f(1)=1$.`, R`$|x|$ is continuous.`, null, R`The differentiability hypothesis fails.`]),
        Q(R`If $f'(x)=g'(x)$ for all $x$, then:`, [R`$f=g$`, R`$f(x)=g(x)+C$`, R`$f=Cg$`, R`$f'=0$`], 1, R`Their difference has derivative $0$, so it's a constant.`,
          [R`They can differ by a constant: $x^2$ and $x^2+5$.`, null, R`A constant multiple would change the derivative too.`, R`No reason for that.`]),
        Q(R`A car's odometer shows 0 at 1:00 PM and 120 miles at 3:00 PM. The MVT guarantees:`, [R`the car went 60 mph at 2:00 PM`, R`the car went exactly 60 mph at some moment`, R`the car never exceeded 60 mph`, R`the car averaged 120 mph`], 1, R`Average speed $=60$ mph, so at some instant the speed was exactly 60.`,
          [R`The MVT doesn't say when.`, null, R`It could have gone faster at times.`, R`$120$ miles over 2 hours is 60 mph.`])
      ]
    },
    {
      id: 'shape', title: 'Derivatives and the Shape of a Graph',
      html: R`
${BOX('thm', 'Increasing/Decreasing Test', R`<p>If $f'>0$ on an interval, $f$ is increasing there. If $f'<0$, $f$ is decreasing.</p>`)}
${BOX('thm', 'First Derivative Test', R`<p>At a critical number $c$ (with $f$ continuous at $c$):</p><ul><li>$f'$ changes from $+$ to $-$ ⇒ local <b>max</b>.</li><li>$f'$ changes from $-$ to $+$ ⇒ local <b>min</b>.</li><li>No sign change ⇒ no extremum.</li></ul>`)}
${BOX('def', 'Concavity and inflection points', R`<p>$f$ is <b>concave up</b> where $f''>0$ (slopes increasing, $\cup$) and <b>concave down</b> where $f''<0$ ($\cap$). An <b>inflection point</b> is a point on the graph where the concavity changes.</p>`)}
${BOX('thm', 'Second Derivative Test', R`<p>Suppose $f'(c)=0$. If $f''(c)>0$, local <b>min</b>. If $f''(c)<0$, local <b>max</b>. If $f''(c)=0$, the test is <b>inconclusive</b> — use the First Derivative Test.</p>`)}
${WIDGET('derivative')}
${EX('Example — Full analysis', R`<p>Analyze $f(x)=x^4-4x^3$.</p>`, R`
<p>$f'(x)=4x^3-12x^2=4x^2(x-3)$; critical numbers $0,3$.</p>
<table><thead><tr><th>Interval</th><th class="c">$(-\infty,0)$</th><th class="c">$(0,3)$</th><th class="c">$(3,\infty)$</th></tr></thead><tbody><tr><td>$f'$</td><td class="c">−</td><td class="c">−</td><td class="c">+</td></tr><tr><td>$f$</td><td class="c">↘</td><td class="c">↘</td><td class="c">↗</td></tr></tbody></table>
<p>Local min at $x=3$: $f(3)=-27$. No extremum at $0$ (no sign change).</p>
<p>$f''(x)=12x^2-24x=12x(x-2)$; zero at $0,2$.</p>
<table><thead><tr><th>Interval</th><th class="c">$(-\infty,0)$</th><th class="c">$(0,2)$</th><th class="c">$(2,\infty)$</th></tr></thead><tbody><tr><td>$f''$</td><td class="c">+</td><td class="c">−</td><td class="c">+</td></tr><tr><td>concavity</td><td class="c">∪</td><td class="c">∩</td><td class="c">∪</td></tr></tbody></table>
<p>Inflection points at <span class="ans">$(0,0)$ and $(2,-16)$</span>.</p>`)}
<h2>Curve sketching checklist</h2>
<ol><li><b>Domain</b>, intercepts, symmetry.</li><li><b>Asymptotes</b> (vertical: where $f\to\pm\infty$; horizontal: limits at $\pm\infty$).</li><li><b>$f'$</b>: intervals of increase/decrease, local extrema.</li><li><b>$f''$</b>: concavity, inflection points.</li><li>Plot key points and connect with the right shape.</li></ol>
${BOX('warn', 'Inflection point pitfalls', R`<p>$f''(c)=0$ does not guarantee an inflection point: $x^4$ has $f''(0)=0$ but is concave up on both sides. Always check for a sign change. Also, an inflection point must be on the graph (so $f(c)$ must be defined).</p>`)}`,
      quiz: [
        Q(R`$f'(x)=(x-1)(x+2)^2$. Where does $f$ have a local minimum?`, [R`$x=1$`, R`$x=-2$`, R`$x=1$ and $x=-2$`, R`Nowhere`], 0, R`$f'$ changes $-\to+$ at $x=1$. At $x=-2$ the squared factor keeps $f'$ negative on both sides — no extremum.`,
          [null, R`$(x+2)^2\ge0$, so $f'$ doesn't change sign at $-2$.`, R`$x=-2$ has no sign change.`, R`There is a sign change at $x=1$.`]),
        Q(R`$f(x)=x^3-6x^2$ is concave up on:`, [R`$(-\infty,2)$`, R`$(2,\infty)$`, R`$(0,4)$`, R`$(-\infty,0)\cup(4,\infty)$`], 1, R`$f''=6x-12>0$ when $x>2$.`,
          [R`That's where $f''<0$ (concave down).`, null, R`That's where $f'<0$.`, R`That's where $f'>0$ (increasing), not concavity.`]),
        Q(R`If $f'(2)=0$ and $f''(2)=-5$, then at $x=2$, $f$ has:`, [R`a local min`, R`a local max`, R`an inflection point`, R`not enough information`], 1, R`Second Derivative Test: $f''<0$ (concave down) at a critical point ⇒ local max.`,
          [R`Concave down means a peak, not a valley.`, null, R`Inflection needs a concavity change.`, R`The Second Derivative Test is conclusive here.`]),
        Q(R`Which function has $f''(0)=0$ but NO inflection point at $0$?`, [R`$x^3$`, R`$x^4$`, R`$\sin x$`, R`$x^3+x$`], 1, R`$f''=12x^2\ge0$ on both sides of $0$: concave up throughout.`,
          [R`$f''=6x$ changes sign at $0$.`, null, R`$f''=-\sin x$ changes sign at $0$.`, R`$f''=6x$ changes sign at $0$.`])
      ]
    },
    {
      id: 'optimization', title: 'Optimization Problems',
      html: R`
<p>Optimization is the art of finding the <b>best</b>: largest area, least cost, shortest time. It combines modeling (writing a function) with the extreme-value techniques you just learned.</p>
<h2>The strategy</h2>
<ol class="steps"><li><b>Understand</b> the problem; draw a diagram.</li><li><b>Name</b> the quantity to optimize ($Q$) and the variables.</li><li><b>Write</b> $Q$ as a function of the variables.</li><li><b>Use a constraint</b> to reduce $Q$ to a function of one variable; find its <b>domain</b>.</li><li><b>Find</b> critical numbers; check endpoints, or use the first/second derivative test.</li><li><b>Answer</b> the actual question asked, with units.</li></ol>
${EX('Example 1 — The fence', R`<p>A farmer has $2400$ ft of fencing and wants to fence a rectangular field along a straight river (no fence on the river side). What dimensions maximize the area?</p>`, R`<p>Let $x$ = sides perpendicular to the river, $y$ = side parallel. Constraint: $2x+y=2400$. Area $A=xy=x(2400-2x)=2400x-2x^2$ on $[0,1200]$.</p><p>$A'=2400-4x=0\Rightarrow x=600$. $A(0)=A(1200)=0$, $A(600)=720{,}000$.</p><p><span class="ans">600 ft × 1200 ft</span> (the side along the river is 1200 ft).</p>`)}
${EX('Example 2 — The can', R`<p>A cylindrical can must hold $1$ liter ($1000\ \text{cm}^3$). Find the dimensions that minimize the material (surface area).</p>`, R`<p>$S=2\pi r^2+2\pi rh$, constraint $\pi r^2h=1000\Rightarrow h=\frac{1000}{\pi r^2}$. So $S(r)=2\pi r^2+\frac{2000}{r}$, $r>0$.</p><p>$S'=4\pi r-\frac{2000}{r^2}=0\Rightarrow r^3=\frac{500}{\pi}\Rightarrow r=\sqrt[3]{500/\pi}\approx5.42$ cm. Then $h=\frac{1000}{\pi r^2}=2r\approx10.84$ cm.</p><p>$S''=4\pi+\frac{4000}{r^3}>0$, so it's a minimum. Optimal can: <span class="ans">height = diameter ≈ 10.84 cm</span>.</p>`)}
${EX('Example 3 — Closest point', R`<p>Find the point on $y=\sqrt x$ closest to $(3,0)$.</p>`, R`<p>Minimize the <b>squared</b> distance (same minimizer, easier algebra): $D=(x-3)^2+(\sqrt x)^2=x^2-5x+9$. $D'=2x-5=0\Rightarrow x=\frac52$. Point: <span class="ans">$\left(\frac52,\sqrt{\frac52}\right)$</span>.</p>`)}
${EX('Example 4 — Business', R`<p>A store sells 200 TVs a month at 350 dollars each. Each 10-dollar discount sells 20 more per month. What price maximizes revenue?</p>`, R`<p>With $x$ discounts of 10 dollars: price $p=350-10x$, quantity $q=200+20x$. $R=(350-10x)(200+20x)$. $R'=-10(200+20x)+20(350-10x)=3000-400x=0\Rightarrow x=7.5$. Price: <span class="ans">275 dollars</span>.</p>`)}
${BOX('tip', 'Justify that you found a max or min', R`<p>On a closed interval, compare endpoint values. On an open interval with only one critical point, the first or second derivative test at that point justifies an absolute extremum.</p>`)}
${MORE([["Paul's Notes — Optimization", 'https://tutorial.math.lamar.edu/Classes/CalcI/Optimization.aspx', 'Lots of examples'], ['OpenStax §4.7 Applied Optimization', 'https://openstax.org/books/calculus-volume-1/pages/4-7-applied-optimization-problems', 'Reading']])}`,
      quiz: [
        Q(R`Two positive numbers sum to $20$. What is the largest possible product?`, [R`$100$`, R`$96$`, R`$200$`, R`$400$`], 0, R`$P=x(20-x)$, $P'=20-2x=0\Rightarrow x=10$, $P=100$.`,
          [null, R`$96=8\cdot12$; try $10\cdot10$.`, R`$200=10\cdot 20$ doesn't satisfy the sum.`, R`$20^2$ isn't a valid product of two numbers summing to 20.`]),
        Q(R`A rectangle has perimeter $40$. The maximum area is:`, [R`$100$`, R`$400$`, R`$96$`, R`$75$`], 0, R`$2x+2y=40\Rightarrow y=20-x$, $A=x(20-x)$, max at $x=10$: a $10\times10$ square with area $100$.`,
          [null, R`That's $20\times 20$, perimeter $80$.`, R`$8\times12$ is not optimal.`, R`$5\times 15$ is not optimal.`]),
        Q(R`To minimize the distance from a point to a curve, it's valid to minimize the distance squared because:`, [R`squaring removes negatives`, R`$\sqrt{u}$ is increasing, so $u$ and $\sqrt u$ have the same minimizer`, R`the derivative of a square root is zero`, R`it's not valid`], 1, R`Since $\sqrt{u}$ is an increasing function, whatever makes $u$ smallest also makes $\sqrt u$ smallest.`,
          [R`Distances are already non-negative.`, null, R`False.`, R`It is valid for exactly this reason.`]),
        Q(R`An open-top box is made from a $12\times12$ sheet by cutting $x\times x$ squares from corners. Which $x$ maximizes volume?`, [R`$x=2$`, R`$x=3$`, R`$x=6$`, R`$x=4$`], 0, R`$V=x(12-2x)^2$. $V'=(12-2x)(12-6x)=0\Rightarrow x=2$ (since $x=6$ gives $V=0$).`,
          [null, R`$V(3)=108\lt V(2)=128$.`, R`$x=6$ leaves no base: $V=0$.`, R`$V(4)=64$.`])
      ]
    },
    {
      id: 'lhopital', title: "L'Hôpital's Rule and Indeterminate Forms",
      html: R`
${BOX('thm', "L'Hôpital's Rule", R`<p>Suppose $f$ and $g$ are differentiable near $a$ (except possibly at $a$), $g'(x)\neq0$ near $a$, and $$\lim_{x\to a}\frac{f(x)}{g(x)}\ \text{ is of the form }\ \frac00\ \text{ or }\ \frac{\pm\infty}{\pm\infty}.$$ Then $$\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}$$ provided the right side exists (or is $\pm\infty$). Also valid for $x\to\pm\infty$ and one-sided limits.</p>`)}
${BOX('warn', 'Two rules for using it correctly', R`<ol><li><b>Verify</b> the form is $\frac00$ or $\frac\infty\infty$ first. Applying it to $\frac{1}{2}$ or $\frac{5}{0}$ gives wrong answers.</li><li>Differentiate top and bottom <b>separately</b> — this is NOT the quotient rule.</li></ol>`)}
${EX('Example 1', R`<p>$\displaystyle\lim_{x\to0}\frac{e^x-1-x}{x^2}$</p>`, R`<p>$\frac00$: L'H gives $\lim\frac{e^x-1}{2x}$, still $\frac00$; again: $\lim\frac{e^x}{2}=\frac12$.</p>`)}
${EX('Example 2 — Growth rates', R`<p>$\displaystyle\lim_{x\to\infty}\frac{x^3}{e^x}$ and $\displaystyle\lim_{x\to\infty}\frac{\ln x}{\sqrt x}$</p>`, R`<p>$\frac{x^3}{e^x}\to\frac{3x^2}{e^x}\to\frac{6x}{e^x}\to\frac6{e^x}\to0$. And $\frac{\ln x}{\sqrt x}\to\frac{1/x}{1/(2\sqrt x)}=\frac{2}{\sqrt x}\to0$. Exponentials beat powers; powers beat logs.</p>`)}
<h2>Other indeterminate forms</h2>
<table><thead><tr><th>Form</th><th>Strategy</th></tr></thead><tbody>
<tr><td>$0\cdot\infty$</td><td>Rewrite $fg$ as $\frac{f}{1/g}$ or $\frac{g}{1/f}$</td></tr>
<tr><td>$\infty-\infty$</td><td>Combine into one fraction (common denominator / conjugate)</td></tr>
<tr><td>$1^\infty,\ 0^0,\ \infty^0$</td><td>Let $y=f^g$, find $\lim\ln y=\lim g\ln f$, then exponentiate</td></tr></tbody></table>
${EX(R`Example 3 — $0\cdot\infty$`, R`<p>$\displaystyle\lim_{x\to0^+}x\ln x$</p>`, R`<p>$=\lim\frac{\ln x}{1/x}$ ($\frac{-\infty}{\infty}$) $=\lim\frac{1/x}{-1/x^2}=\lim(-x)=0$.</p>`)}
${EX(R`Example 4 — $1^\infty$`, R`<p>$\displaystyle\lim_{x\to\infty}\left(1+\frac1x\right)^x$</p>`, R`<p>$\ln y=x\ln(1+\frac1x)=\frac{\ln(1+1/x)}{1/x}$, form $\frac00$. L'H: $\frac{\frac{1}{1+1/x}\cdot(-1/x^2)}{-1/x^2}=\frac1{1+1/x}\to1$. So $y\to e^1=$ <span class="ans">$e$</span>. This is the definition of $e$!</p>`)}
${EX(R`Example 5 — $\infty-\infty$`, R`<p>$\displaystyle\lim_{x\to0^+}\left(\frac1x-\frac1{\sin x}\right)$</p>`, R`<p>$=\lim\frac{\sin x-x}{x\sin x}$ ($\frac00$) $\to\frac{\cos x-1}{\sin x+x\cos x}$ ($\frac00$) $\to\frac{-\sin x}{2\cos x-x\sin x}\to\frac{0}{2}=0$.</p>`)}`,
      quiz: [
        Q(R`$\displaystyle\lim_{x\to0}\frac{\sin 3x}{x}$ via L'Hôpital's Rule is:`, [R`$3$`, R`$1$`, R`$0$`, R`$\tfrac13$`], 0, R`$\frac00$ form: $\lim\frac{3\cos3x}{1}=3$.`,
          [null, R`Don't forget the chain-rule factor 3.`, R`$\frac00$ is not $0$.`, R`You inverted it.`]),
        Q(R`Can L'Hôpital's Rule be applied to $\displaystyle\lim_{x\to0}\frac{x+1}{x+2}$?`, [R`Yes, giving $1$`, R`No — the form isn't indeterminate; the limit is $\tfrac12$`, R`Yes, giving $\tfrac12$`, R`No — the limit doesn't exist`], 1, R`Direct substitution gives $\frac12$. L'Hôpital requires $\frac00$ or $\frac\infty\infty$; misusing it here gives the wrong answer $1$.`,
          [R`This misuse produces the wrong answer.`, null, R`The answer $\frac12$ is right, but not via L'Hôpital.`, R`It exists: $\frac12$.`]),
        Q(R`$\displaystyle\lim_{x\to\infty}\frac{\ln x}{x}=$`, [R`$\infty$`, R`$1$`, R`$0$`, R`DNE`], 2, R`$\frac\infty\infty$: $\lim\frac{1/x}{1}=0$. Logs grow slower than $x$.`,
          [R`$x$ outgrows $\ln x$.`, R`The ratio shrinks.`, null, R`It exists and is $0$.`]),
        Q(R`$\displaystyle\lim_{x\to0^+}x^x=$`, [R`$0$`, R`$1$`, R`$e$`, R`DNE`], 1, R`$\ln y=x\ln x\to0$ (Example 3), so $y\to e^0=1$.`,
          [R`$0^0$ is indeterminate — it isn't automatically $0$.`, null, R`$\ln y\to0$, so $y\to e^0$, not $e^1$.`, R`The limit exists.`]),
        Q(R`$\displaystyle\lim_{x\to\infty}\left(1+\frac{3}{x}\right)^x=$`, [R`$1$`, R`$e^3$`, R`$3e$`, R`$\infty$`], 1, R`$\ln y=x\ln(1+3/x)\to3$, so $y\to e^3$. In general $(1+\frac ax)^x\to e^a$.`,
          [R`$1^\infty$ is indeterminate, not $1$.`, null, R`It's $e$ to the third power.`, R`The limit is finite.`])
      ]
    },
    {
      id: 'newton', title: "Newton's Method",
      html: R`
<p>Most equations — like $\cos x=x$ or $x^5-3x+1=0$ — can't be solved with algebra. <b>Newton's method</b> uses tangent lines to zoom in on a root with astonishing speed.</p>
<p><b>Idea:</b> Start with a guess $x_0$. Follow the tangent line at $(x_0,f(x_0))$ down to the $x$-axis. Its intercept $x_1$ is usually a much better guess. Repeat.</p>
${BOX('thm', "Newton's iteration", R`$$x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}$$`)}
<p>Derivation: the tangent line $y=f(x_n)+f'(x_n)(x-x_n)$ crosses $y=0$ at $x=x_n-\frac{f(x_n)}{f'(x_n)}$.</p>
${WIDGET('newton')}
${EX('Example — Computing √2', R`<p>Use $f(x)=x^2-2$ with $x_0=1$ to approximate $\sqrt2$.</p>`, R`<p>$x_{n+1}=x_n-\frac{x_n^2-2}{2x_n}=\frac{x_n}{2}+\frac1{x_n}$.</p><p>$x_1=1.5$, $x_2=1.41\overline{6}$, $x_3=1.414215686$, $x_4=1.414213562$ — correct to 9 decimal places in four steps. The number of correct digits roughly <b>doubles</b> each step.</p>`)}
${BOX('warn', 'When Newton fails', R`<ul><li>If $f'(x_n)=0$, the tangent is horizontal and never hits the axis.</li><li>A bad starting guess can jump to a different root or oscillate (try $f(x)=x^{1/3}$ — it diverges from any $x_0\ne0$).</li><li>Choose $x_0$ near the root, e.g. using the IVT to bracket it first.</li></ul>`)}`,
      quiz: [
        Q(R`For $f(x)=x^2-5$ with $x_0=2$, Newton's method gives $x_1=$`, [R`$2.25$`, R`$2.5$`, R`$1.75$`, R`$2.2$`], 0, R`$x_1=2-\frac{-1}{4}=2.25$.`,
          [null, R`$f(2)=-1$ and $f'(2)=4$; $2-(-1/4)$.`, R`Sign error: subtracting a negative adds.`, R`Recheck: $f'(2)=2\cdot2=4$.`]),
        Q(R`Newton's method fails at a step if:`, [R`$f(x_n)=0$`, R`$f'(x_n)=0$`, R`$x_n<0$`, R`$f''(x_n)=0$`], 1, R`We'd divide by $f'(x_n)=0$; the tangent is horizontal.`,
          [R`Then $x_n$ is already a root — success!`, null, R`Negative values are fine.`, R`$f''$ doesn't appear in the formula.`]),
        Q(R`Geometrically, $x_{n+1}$ in Newton's method is:`, [R`the midpoint of $x_n$ and the root`, R`the $x$-intercept of the tangent line at $x_n$`, R`the $y$-intercept of the tangent line`, R`where $f'=0$`], 1, R`Each step follows the tangent line to where it crosses the $x$-axis.`,
          [R`That's the bisection method idea.`, null, R`We need where $y=0$, not $x=0$.`, R`That finds critical points, not roots.`])
      ]
    },
    {
      id: 'antiderivatives', title: 'Antiderivatives',
      html: R`
<p>So far we've gone from a function to its derivative. Now reverse it: given $f$, find a function $F$ with $F'=f$.</p>
${BOX('def', 'Antiderivative', R`<p>$F$ is an <b>antiderivative</b> of $f$ on an interval if $F'(x)=f(x)$ there. By the MVT corollary, the <b>most general antiderivative</b> is $F(x)+C$ for an arbitrary constant $C$. We write it as the <b>indefinite integral</b> $$\int f(x)\,dx=F(x)+C.$$</p>`)}
${BOX('thm', 'Basic antiderivatives', R`
<table><thead><tr><th>$f(x)$</th><th>$\int f(x)\,dx$</th><th>$f(x)$</th><th>$\int f(x)\,dx$</th></tr></thead><tbody>
<tr><td>$x^n\ (n\ne-1)$</td><td>$\dfrac{x^{n+1}}{n+1}+C$</td><td>$\dfrac1x$</td><td>$\ln|x|+C$</td></tr>
<tr><td>$e^x$</td><td>$e^x+C$</td><td>$a^x$</td><td>$\dfrac{a^x}{\ln a}+C$</td></tr>
<tr><td>$\cos x$</td><td>$\sin x+C$</td><td>$\sin x$</td><td>$-\cos x+C$</td></tr>
<tr><td>$\sec^2x$</td><td>$\tan x+C$</td><td>$\sec x\tan x$</td><td>$\sec x+C$</td></tr>
<tr><td>$\dfrac{1}{1+x^2}$</td><td>$\arctan x+C$</td><td>$\dfrac1{\sqrt{1-x^2}}$</td><td>$\arcsin x+C$</td></tr></tbody></table>`)}
${EX('Example 1', R`<p>Find $\displaystyle\int\left(3x^2-\frac{4}{x}+\frac{1}{\sqrt x}+5\cos x\right)dx$.</p>`, R`<p>$x^3-4\ln|x|+2\sqrt x+5\sin x+C$. (Note $\int x^{-1/2}dx=\frac{x^{1/2}}{1/2}=2\sqrt x$.)</p>`)}
<h2>Initial value problems</h2>
<p>A <b>differential equation</b> like $f'(x)=g(x)$ plus an <b>initial condition</b> pins down $C$.</p>
${EX('Example 2', R`<p>Find $f$ if $f'(x)=6x^2-2x$ and $f(1)=4$.</p>`, R`<p>$f(x)=2x^3-x^2+C$. $f(1)=2-1+C=4\Rightarrow C=3$. <span class="ans">$f(x)=2x^3-x^2+3$</span></p>`)}
${EX('Example 3 — Falling object', R`<p>A ball is thrown upward at $48$ ft/s from a 64-ft cliff. With $a(t)=-32$ ft/s², find $s(t)$ and when it hits the ground.</p>`, R`<p>$v(t)=-32t+48$ (since $v(0)=48$). $s(t)=-16t^2+48t+64$ (since $s(0)=64$). Ground: $-16(t^2-3t-4)=0\Rightarrow(t-4)(t+1)=0\Rightarrow$ <span class="ans">$t=4$ s</span>.</p>`)}
${BOX('warn', 'Check by differentiating', R`<p>You can always verify an antiderivative: differentiate your answer and you should get the integrand back. And never forget $+C$!</p>`)}`,
      quiz: [
        Q(R`$\displaystyle\int x^4\,dx=$`, [R`$4x^3+C$`, R`$\dfrac{x^5}{5}+C$`, R`$\dfrac{x^5}{4}+C$`, R`$x^5+C$`], 1, R`Raise the power by one and divide by the new power.`,
          [R`That's the derivative.`, null, R`Divide by the <em>new</em> exponent, 5.`, R`Differentiating $x^5$ gives $5x^4$, not $x^4$.`]),
        Q(R`$\displaystyle\int\frac{1}{x}\,dx=$`, [R`$\dfrac{x^0}{0}+C$`, R`$-\dfrac1{x^2}+C$`, R`$\ln|x|+C$`, R`$e^x+C$`], 2, R`The power rule fails for $n=-1$; the antiderivative is $\ln|x|+C$.`,
          [R`Division by zero — this is the exceptional case.`, R`That's the derivative of $1/x$.`, null, R`$e^x$ is its own derivative.`]),
        Q(R`$\displaystyle\int\sin x\,dx=$`, [R`$\cos x+C$`, R`$-\cos x+C$`, R`$-\sin x+C$`, R`$\sin^2x/2+C$`], 1, R`$\frac{d}{dx}(-\cos x)=\sin x$.`,
          [R`$\frac{d}{dx}\cos x=-\sin x$ — sign error.`, null, R`Check by differentiating.`, R`That's not right; differentiate to check.`]),
        Q(R`If $f'(x)=2x$ and $f(0)=5$, then $f(3)=$`, [R`$9$`, R`$14$`, R`$11$`, R`$6$`], 1, R`$f=x^2+5$, so $f(3)=14$.`,
          [R`Forgot the $+C=5$.`, null, R`$f(3)=9+5$.`, R`That's $f'(3)$.`])
      ]
    }
  ],
  review: [
    Q(R`$f(x)=xe^{-x}$ has a local maximum at:`, [R`$x=0$`, R`$x=1$`, R`$x=-1$`, R`$x=e$`], 1, R`$f'=e^{-x}(1-x)$, positive for $x<1$, negative for $x>1$.`,
      [R`$f'(0)=1\ne0$.`, null, R`$f'(-1)=2e\neq0$.`, R`Solve $1-x=0$.`]),
    Q(R`$\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}=$`, [R`$0$`, R`$1$`, R`$\tfrac12$`, R`$\infty$`], 2, R`L'H twice: $\frac{\sin x}{2x}\to\frac12$.`,
      [R`That's $\lim\frac{1-\cos x}{x}$.`, R`After L'H, $\frac{\sin x}{2x}\to\frac12$.`, null, R`The numerator is also of order $x^2$.`]),
    Q(R`The number of inflection points of $f(x)=x^5-5x$ is:`, [R`$0$`, R`$1$`, R`$2$`, R`$3$`], 1, R`$f''=20x^3$ changes sign only at $x=0$.`,
      [R`$f''$ changes sign at $0$.`, null, R`$f''=20x^3$ has only one zero.`, R`Only one sign change.`])
  ]
});
