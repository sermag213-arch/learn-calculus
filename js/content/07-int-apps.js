CALC.addChapter({
  id: 'int-apps', num: 7, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'Applications of Integration',
  blurb: 'Average value, area between curves, volumes of solids, arc length, and work.',
  intro: R`<p class="lead">The definite integral is a universal "adding machine": slice a quantity into tiny pieces, approximate each piece, add them up, and take a limit. This chapter applies that one idea to areas, volumes, lengths, and physical work.</p>
  ${BOX('key', 'The universal recipe', R`<ol><li>Slice the object into thin pieces of thickness $\Delta x$.</li><li>Approximate one piece: $\Delta Q\approx(\text{something})\cdot\Delta x$.</li><li>Add and take the limit: $Q=\int_a^b(\text{something})\,dx$.</li></ol>`)}`,
  objectives: ['Compute the average value of a function and apply the Mean Value Theorem for Integrals.', 'Find areas between curves, integrating with respect to $x$ or $y$.', 'Find volumes using cross-sections, disks, washers, and cylindrical shells.', 'Find arc lengths of curves.', 'Compute work done by variable forces.'],
  sections: [
    {
      id: 'average', title: 'Average Value of a Function',
      html: R`
<p>The average of finitely many numbers is their sum divided by how many there are. For a continuous function, the integral plays the role of the sum:</p>
${BOX('def', 'Average value', R`$$f_{\text{avg}}=\frac1{b-a}\int_a^bf(x)\,dx$$`)}
${BOX('thm', 'Mean Value Theorem for Integrals', R`<p>If $f$ is continuous on $[a,b]$, there is a $c\in[a,b]$ with $f(c)=f_{\text{avg}}$, i.e. $\int_a^bf(x)\,dx=f(c)(b-a)$.</p><p>Geometrically: there's a rectangle of height $f(c)$ with the same area as the region under the curve.</p>`)}
${EX('Example', R`<p>Find the average value of $f(x)=x^2$ on $[0,3]$ and a $c$ where it's attained.</p>`, R`<p>$f_{avg}=\frac13\int_0^3x^2dx=\frac13\cdot9=3$. Solve $c^2=3$: $c=\sqrt3\approx1.73\in[0,3]$.</p>`)}
${BOX('warn', 'Average value vs. average rate of change', R`<p>Average <b>value</b> of $f$: $\frac{1}{b-a}\int_a^b f\,dx$. Average <b>rate of change</b> of $f$: $\frac{f(b)-f(a)}{b-a}$. They are different! (The average rate of change of $f$ equals the average value of $f'$.)</p>`)}`,
      quiz: [
        Q(R`The average value of $f(x)=2x$ on $[0,4]$ is:`, [R`$4$`, R`$8$`, R`$16$`, R`$2$`], 0, R`$\frac14\int_0^42x\,dx=\frac14\cdot16=4$.`,
          [null, R`That's $f(4)$.`, R`Divide the integral by $b-a=4$.`, R`That's the average rate of change of $f$.`]),
        Q(R`The average value of $\sin x$ on $[0,\pi]$ is:`, [R`$\tfrac2\pi$`, R`$0$`, R`$\tfrac12$`, R`$1$`], 0, R`$\frac1\pi\int_0^\pi\sin x\,dx=\frac{2}{\pi}\approx0.637$.`,
          [null, R`$\sin x\ge0$ on $[0,\pi]$.`, R`$\frac12$ is a guess; compute $\frac2\pi$.`, R`That's the maximum, not the average.`])
      ]
    },
    {
      id: 'area-between', title: 'Area Between Curves',
      html: R`
${BOX('thm', 'Area between curves', R`<p>If $f(x)\ge g(x)$ on $[a,b]$, the area between them is $$A=\int_a^b\left[f(x)-g(x)\right]dx=\int_a^b(\text{top}-\text{bottom})\,dx.$$</p>`)}
<p>A vertical slice at $x$ is a thin rectangle of height $f(x)-g(x)$ and width $dx$. Adding them up gives the integral. Note this works even if a curve dips below the $x$-axis — only top-minus-bottom matters.</p>
<h2>Procedure</h2>
<ol class="steps"><li>Sketch the curves.</li><li>Find intersection points (set them equal) — these are often the limits.</li><li>Determine which curve is on top on each interval.</li><li>Integrate top − bottom (split the integral where they cross).</li></ol>
${EX('Example 1', R`<p>Find the area between $y=x^2$ and $y=2x$.</p>`, R`<p>Intersect: $x^2=2x\Rightarrow x=0,2$. On $(0,2)$, $2x>x^2$ (test $x=1$). $$A=\int_0^2(2x-x^2)\,dx=\left[x^2-\frac{x^3}3\right]_0^2=4-\frac83=\frac43.$$</p>`)}
${EX('Example 2 — Curves that cross', R`<p>Find the area between $y=\sin x$ and $y=\cos x$ on $[0,\pi/2]$.</p>`, R`<p>They cross at $\pi/4$. $\cos x$ is on top on $[0,\pi/4]$, $\sin x$ on $[\pi/4,\pi/2]$. $$A=\int_0^{\pi/4}(\cos x-\sin x)dx+\int_{\pi/4}^{\pi/2}(\sin x-\cos x)dx=(\sqrt2-1)+(\sqrt2-1)=2\sqrt2-2.$$</p>`)}
<h2>Integrating with respect to $y$</h2>
<p>If the region is bounded by curves $x=f(y)$ and $x=g(y)$, use horizontal slices: $A=\int_c^d(\text{right}-\text{left})\,dy$.</p>
${EX('Example 3', R`<p>Find the area between $x=y^2$ and $y=x-2$.</p>`, R`<p>Write the line as $x=y+2$. Intersect: $y^2=y+2\Rightarrow y=-1,2$. Right curve is the line. $$A=\int_{-1}^2(y+2-y^2)\,dy=\left[\frac{y^2}2+2y-\frac{y^3}3\right]_{-1}^2=\frac{10}3+\frac76=\frac92.$$ With vertical slices this would need two integrals!</p>`)}`,
      quiz: [
        Q(R`The area between $y=x$ and $y=x^2$ on $[0,1]$ is:`, [R`$\tfrac16$`, R`$\tfrac12$`, R`$\tfrac13$`, R`$-\tfrac16$`], 0, R`$\int_0^1(x-x^2)dx=\frac12-\frac13=\frac16$.`,
          [null, R`That's only $\int x\,dx$.`, R`That's $\int x^2dx$.`, R`Area is positive: top is $x$ on $[0,1]$.`]),
        Q(R`To find the area between two curves, the integrand should be:`, [R`$f(x)\cdot g(x)$`, R`top curve minus bottom curve`, R`$|f(x)|+|g(x)|$`, R`$(f(x)-g(x))^2$`], 1, R`Each vertical slice has height top − bottom.`,
          [R`Products don't give heights.`, null, R`That double-counts.`, R`Squaring changes the units.`]),
        Q(R`The curves $y=4-x^2$ and $y=0$ enclose an area of:`, [R`$\tfrac{32}3$`, R`$\tfrac{16}3$`, R`$8$`, R`$16$`], 0, R`$\int_{-2}^2(4-x^2)dx=16-\frac{16}{3}=\frac{32}{3}$.`,
          [null, R`That's only half ($0$ to $2$).`, R`Recompute the integral.`, R`Subtract $\int x^2dx$.`])
      ]
    },
    {
      id: 'volumes', title: 'Volumes: Slicing, Disks, and Washers',
      html: R`
${BOX('thm', 'Volume by slicing', R`<p>If a solid lies between $x=a$ and $x=b$ and its cross-section at $x$ has area $A(x)$, then $$V=\int_a^bA(x)\,dx.$$</p>`)}
<h2>Solids of revolution: the disk method</h2>
<p>Rotate the region under $y=f(x)$ about the $x$-axis. Each cross-section is a disk of radius $f(x)$:</p>
$$V=\int_a^b\pi[f(x)]^2\,dx.$$
${EX('Example 1 — Cone', R`<p>Derive the volume of a cone of radius $r$ and height $h$.</p>`, R`<p>Rotate $y=\frac rhx$, $0\le x\le h$, about the $x$-axis: $$V=\int_0^h\pi\frac{r^2}{h^2}x^2dx=\pi\frac{r^2}{h^2}\cdot\frac{h^3}3=\frac13\pi r^2h.\ ✔$$</p>`)}
<h2>The washer method</h2>
<p>If the region between an outer curve $R(x)$ and an inner curve $r(x)$ is rotated, cross-sections are washers (disks with holes):</p>
$$V=\int_a^b\pi\left([R(x)]^2-[r(x)]^2\right)dx.$$
${EX('Example 2', R`<p>The region between $y=x$ and $y=x^2$ is rotated about the $x$-axis. Find the volume.</p>`, R`<p>On $[0,1]$, outer radius $x$, inner $x^2$. $V=\pi\int_0^1(x^2-x^4)dx=\pi\left(\frac13-\frac15\right)=\frac{2\pi}{15}$.</p>`)}
${EX('Example 3 — Other axes', R`<p>Rotate the same region about the line $y=2$.</p>`, R`<p>Radii are measured from $y=2$: outer $R=2-x^2$ (distance to the lower curve), inner $r=2-x$. $$V=\pi\int_0^1\left[(2-x^2)^2-(2-x)^2\right]dx=\pi\int_0^1(x^4-5x^2+4x)\,dx=\pi\left(\tfrac15-\tfrac53+2\right)=\frac{8\pi}{15}.$$</p>`)}
${EX('Example 4 — Known cross-sections', R`<p>A solid has a circular base $x^2+y^2\le1$. Cross-sections perpendicular to the $x$-axis are squares. Find its volume.</p>`, R`<p>At $x$, the square's side is $2\sqrt{1-x^2}$, so $A(x)=4(1-x^2)$. $V=\int_{-1}^14(1-x^2)dx=\frac{16}3$.</p>`)}
${BOX('warn', 'Common mistake', R`<p>$\pi(R^2-r^2)\neq\pi(R-r)^2$. Square each radius separately.</p>`)}`,
      quiz: [
        Q(R`The region under $y=\sqrt x$ on $[0,4]$ is rotated about the $x$-axis. The volume is:`, [R`$8\pi$`, R`$16\pi$`, R`$\tfrac{16\pi}3$`, R`$4\pi$`], 0, R`$\pi\int_0^4x\,dx=\pi\cdot8$.`,
          [null, R`$\int_0^4x\,dx=8$, not 16.`, R`You may have integrated $\sqrt x$ instead of $(\sqrt x)^2$.`, R`Recompute $\int_0^4x\,dx$.`]),
        Q(R`The washer method's integrand is:`, [R`$\pi(R-r)^2$`, R`$\pi(R^2-r^2)$`, R`$2\pi(R-r)$`, R`$\pi R^2$`], 1, R`Area of a washer = outer disk minus inner disk.`,
          [R`You must square each radius separately.`, null, R`That's like a circumference, not an area.`, R`That ignores the hole.`]),
        Q(R`Rotating $y=x^2$, $0\le x\le1$, about the $x$-axis gives volume:`, [R`$\tfrac{\pi}{5}$`, R`$\tfrac{\pi}{3}$`, R`$\tfrac{\pi}{2}$`, R`$\pi$`], 0, R`$\pi\int_0^1x^4dx=\frac\pi5$.`,
          [null, R`Square the radius: $(x^2)^2=x^4$.`, R`Recompute.`, R`Recompute.`])
      ]
    },
    {
      id: 'shells', title: 'Volumes by Cylindrical Shells',
      html: R`
<p>Some solids are awkward with washers. The <b>shell method</b> slices parallel to the axis of rotation, producing thin cylindrical shells.</p>
${BOX('thm', 'Shell method (about the $y$-axis)', R`$$V=\int_a^b2\pi x\,f(x)\,dx=\int_a^b2\pi\,(\text{radius})(\text{height})\,dx$$`)}
<p><b>Why:</b> a shell of radius $x$, height $f(x)$, and thickness $dx$, cut open and flattened, is nearly a thin slab of volume $2\pi x\cdot f(x)\cdot dx$ (circumference × height × thickness).</p>
${EX('Example 1', R`<p>Rotate the region under $y=2x^2-x^3$ (on $[0,2]$) about the $y$-axis.</p>`, R`<p>With washers we'd need to solve the cubic for $x$ — hard! With shells: $$V=\int_0^22\pi x(2x^2-x^3)dx=2\pi\left[\frac{x^4}2-\frac{x^5}5\right]_0^2=2\pi\left(8-\frac{32}5\right)=\frac{16\pi}5.$$</p>`)}
${EX('Example 2 — Shifted axis', R`<p>Rotate the region between $y=x$ and $y=x^2$ about the line $x=2$.</p>`, R`<p>Radius $=2-x$, height $=x-x^2$. $V=\int_0^12\pi(2-x)(x-x^2)dx=2\pi\int_0^1(x^3-3x^2+2x)dx=2\pi\left(\frac14-1+1\right)=\frac\pi2$.</p>`)}
${BOX('tip', 'Disks/washers or shells?', R`<table><thead><tr><th></th><th>Slice ⟂ axis</th><th>Slice ∥ axis</th></tr></thead><tbody><tr><td>Method</td><td>Disk / washer</td><td>Shell</td></tr><tr><td>About $x$-axis, integrate in</td><td>$x$</td><td>$y$</td></tr><tr><td>About $y$-axis, integrate in</td><td>$y$</td><td>$x$</td></tr></tbody></table><p>Pick whichever makes the functions and limits easier.</p>`)}`,
      quiz: [
        Q(R`Using shells, rotating $y=x$ on $[0,1]$ (down to the $x$-axis) about the $y$-axis gives:`, [R`$\tfrac{2\pi}3$`, R`$\tfrac{\pi}{3}$`, R`$\pi$`, R`$2\pi$`], 0, R`$\int_0^12\pi x\cdot x\,dx=\frac{2\pi}{3}$.`,
          [null, R`Don't forget the $2\pi$.`, R`Recompute $\int_0^1 2\pi x^2dx$.`, R`$\int_0^1x^2dx=\frac13$.`]),
        Q(R`In the shell method about the $y$-axis, the radius of a shell at position $x$ is:`, [R`$f(x)$`, R`$x$`, R`$2\pi x$`, R`$dx$`], 1, R`The distance from the $y$-axis to the shell is $x$.`,
          [R`$f(x)$ is the height.`, null, R`That's the circumference.`, R`That's the thickness.`]),
        Q(R`When rotating about the line $x=3$ with shells (region to the left, $x<3$), the radius is:`, [R`$x$`, R`$3-x$`, R`$x-3$`, R`$3+x$`], 1, R`Distance from $x$ to the axis $x=3$ is $3-x$ for $x<3$.`,
          [R`That's the distance to $x=0$.`, null, R`That's negative for $x<3$.`, R`Distances subtract.`])
      ]
    },
    {
      id: 'arc-length', title: 'Arc Length and Surface Area',
      html: R`
<p>Approximate a curve by many tiny line segments. A segment spanning $\Delta x$ rises $\Delta y\approx f'(x)\Delta x$, so its length is $\sqrt{\Delta x^2+\Delta y^2}=\sqrt{1+[f'(x)]^2}\,\Delta x$.</p>
${BOX('thm', 'Arc length', R`$$L=\int_a^b\sqrt{1+[f'(x)]^2}\,dx$$`)}
${EX('Example 1', R`<p>Find the length of $y=x^{3/2}$ from $x=0$ to $x=4$.</p>`, R`<p>$y'=\frac32x^{1/2}$, $1+(y')^2=1+\frac94x$. $$L=\int_0^4\sqrt{1+\tfrac94x}\,dx=\frac{8}{27}\left[\left(1+\tfrac94x\right)^{3/2}\right]_0^4=\frac8{27}\left(10\sqrt{10}-1\right)\approx9.07.$$</p>`)}
${EX('Example 2 — Designed to simplify', R`<p>Find the length of $y=\frac{x^3}{6}+\frac1{2x}$ on $[1,2]$.</p>`, R`<p>$y'=\frac{x^2}2-\frac1{2x^2}$. Then $1+(y')^2=\left(\frac{x^2}2+\frac1{2x^2}\right)^2$ — a perfect square! $L=\int_1^2\left(\frac{x^2}2+\frac1{2x^2}\right)dx=\left[\frac{x^3}6-\frac1{2x}\right]_1^2=\frac{17}{12}$.</p>`)}
<p>Most arc-length integrals can't be done by hand (even for $y=x^2$ you'd need trig substitution); numerical methods handle the rest.</p>
${BOX('thm', 'Surface area of revolution (about the $x$-axis)', R`$$S=\int_a^b2\pi f(x)\sqrt{1+[f'(x)]^2}\,dx$$`)}`,
      quiz: [
        Q(R`The arc length formula for $y=f(x)$ on $[a,b]$ is:`, [R`$\int_a^b\sqrt{1+f'(x)}\,dx$`, R`$\int_a^b\sqrt{1+[f'(x)]^2}\,dx$`, R`$\int_a^b(1+[f'(x)]^2)\,dx$`, R`$\int_a^b\sqrt{1+[f(x)]^2}\,dx$`], 1, R`From the Pythagorean theorem on tiny segments.`,
          [R`The derivative must be squared.`, null, R`Need the square root.`, R`Use $f'$, not $f$.`]),
        Q(R`The length of the line $y=2x$ from $x=0$ to $x=3$ is:`, [R`$3\sqrt5$`, R`$6$`, R`$9$`, R`$\sqrt{13}$`], 0, R`$\int_0^3\sqrt{1+4}\,dx=3\sqrt5$. (Check: distance from $(0,0)$ to $(3,6)$ is $\sqrt{45}=3\sqrt5$.)`,
          [null, R`That's the rise only.`, R`Use the arc length formula.`, R`Recheck the endpoints: $(3,6)$.`])
      ]
    },
    {
      id: 'work', title: 'Work',
      html: R`
<p>If a constant force $F$ moves an object a distance $d$, the work is $W=Fd$ (joules = N·m, or ft·lb). For a <b>variable</b> force $F(x)$:</p>
${BOX('thm', 'Work by a variable force', R`$$W=\int_a^bF(x)\,dx$$`)}
<h2>Springs: Hooke's Law</h2>
<p>The force to hold a spring stretched $x$ units beyond natural length is $F(x)=kx$.</p>
${EX('Example 1', R`<p>A force of $40$ N holds a spring stretched $0.2$ m. How much work does it take to stretch it from $0.2$ m to $0.5$ m?</p>`, R`<p>$40=k(0.2)\Rightarrow k=200$. $W=\int_{0.2}^{0.5}200x\,dx=100[x^2]_{0.2}^{0.5}=100(0.25-0.04)=$ <span class="ans">$21$ J</span>.</p>`)}
<h2>Pumping liquids</h2>
<p>Slice the liquid into horizontal layers. Each layer at depth/height $y$ must be lifted a distance $D(y)$: $$W=\int(\text{density})\cdot g\cdot(\text{layer area})\cdot D(y)\,dy.$$</p>
${EX('Example 2 — Emptying a tank', R`<p>A cylindrical tank of radius $3$ m and height $10$ m is full of water ($\rho g=9800$ N/m³). Find the work to pump all the water out over the top.</p>`, R`<p>A layer at height $y$ has volume $9\pi\,dy$, weight $9800\cdot9\pi\,dy$, and must be lifted $10-y$. $$W=\int_0^{10}9800\cdot9\pi(10-y)\,dy=88200\pi\cdot50\approx1.39\times10^7\text{ J}.$$</p>`)}
<h2>Cables and chains</h2>
${EX('Example 3', R`<p>A 50-ft cable weighing 2 lb/ft hangs from a building's roof. How much work to pull it all up?</p>`, R`<p>A piece at distance $y$ below the top weighs $2\,dy$ and is lifted $y$ ft. $W=\int_0^{50}2y\,dy=$ <span class="ans">$2500$ ft·lb</span>.</p>`)}`,
      quiz: [
        Q(R`A spring has $k=10$ N/m. The work to stretch it from natural length to $0.3$ m is:`, [R`$0.45$ J`, R`$3$ J`, R`$0.9$ J`, R`$1.5$ J`], 0, R`$\int_0^{0.3}10x\,dx=5(0.09)=0.45$.`,
          [null, R`That's $F\cdot d$ with $F=kd=3$; force varies, so integrate.`, R`Recompute $5x^2$ at $0.3$.`, R`Recompute.`]),
        Q(R`Why does work for pumping water require an integral?`, [R`Water has variable density`, R`Different layers must be lifted different distances`, R`Gravity varies with height`, R`It doesn't`], 1, R`Each layer travels a different distance to the top.`,
          [R`Water's density is essentially constant.`, null, R`Variation in $g$ is negligible.`, R`It does, because distance varies.`])
      ]
    }
  ],
  review: [
    Q(R`The area enclosed by $y=x^3$ and $y=x$ is:`, [R`$\tfrac12$`, R`$0$`, R`$\tfrac14$`, R`$1$`], 0, R`By symmetry: $2\int_0^1(x-x^3)dx=2\cdot\frac14=\frac12$.`,
      [null, R`Signed areas cancel, but area is positive — split at $x=0$.`, R`That's only half.`, R`Recompute.`]),
    Q(R`Rotating the region between $y=1$ and $y=x^2$ about the $x$-axis ($-1\le x\le1$), the volume is:`, [R`$\tfrac{8\pi}5$`, R`$\tfrac{4\pi}3$`, R`$2\pi$`, R`$\tfrac{2\pi}5$`], 0, R`$\pi\int_{-1}^1(1-x^4)dx=\pi(2-\frac25)=\frac{8\pi}5$.`,
      [null, R`Square each radius: $1^2-(x^2)^2$.`, R`That ignores the hole.`, R`That's the hole's volume.`])
  ]
});
