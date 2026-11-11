CALC.addChapter({
  id: 'parametric', num: 11, part: 'Part III · Beyond Calculus I (Calc II & III)', tag: 'Calc II',
  title: 'Parametric Equations and Polar Coordinates',
  blurb: 'Describing curves with a parameter or with distance and angle — and doing calculus on them.',
  intro: R`<p class="lead">Not every curve is the graph of a function $y=f(x)$. Circles, spirals, roses, and the paths of moving objects are naturally described by <b>parametric equations</b> or in <b>polar coordinates</b>.</p>`,
  objectives: ['Sketch and eliminate the parameter of parametric curves.', 'Find slopes, tangent lines, arc length for parametric curves.', 'Convert between polar and rectangular coordinates and sketch polar curves.', 'Find areas and slopes in polar coordinates.'],
  sections: [
    {
      id: 'parametric', title: 'Parametric Curves and Their Calculus',
      html: R`
<p>A <b>parametric curve</b> is given by $x=f(t)$, $y=g(t)$. Think of $t$ as time and $(x(t),y(t))$ as a moving particle's position.</p>
${EX('Example 1 — Eliminating the parameter', R`<p>Describe $x=3\cos t$, $y=3\sin t$, $0\le t\le2\pi$.</p>`, R`<p>$x^2+y^2=9(\cos^2t+\sin^2t)=9$: a circle of radius 3, traced counterclockwise once.</p>`)}
${BOX('thm', 'Calculus of parametric curves', R`
$$\frac{dy}{dx}=\frac{dy/dt}{dx/dt},\qquad \frac{d^2y}{dx^2}=\frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt},\qquad L=\int_\alpha^\beta\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt$$`)}
${EX('Example 2', R`<p>Find the tangent line to $x=t^2$, $y=t^3-3t$ at $t=2$.</p>`, R`<p>$\frac{dy}{dx}=\frac{3t^2-3}{2t}=\frac{9}{4}$ at $t=2$. Point $(4,2)$. Tangent: $y-2=\frac94(x-4)$.</p>`)}
${EX('Example 3 — Circumference', R`<p>Use arc length to find the circumference of the circle in Example 1.</p>`, R`<p>$\int_0^{2\pi}\sqrt{9\sin^2t+9\cos^2t}\,dt=\int_0^{2\pi}3\,dt=6\pi$. ✔</p>`)}`,
      quiz: [
        Q(R`For $x=t^2$, $y=4t$, $\frac{dy}{dx}$ at $t=1$ is:`, [R`$2$`, R`$\tfrac12$`, R`$4$`, R`$8$`], 0, R`$\frac{4}{2t}=2$.`,
          [null, R`It's $\frac{dy/dt}{dx/dt}$, not the reverse.`, R`Divide by $dx/dt=2$.`, R`Divide, don't multiply.`]),
        Q(R`$x=\cos t$, $y=\sin t$, $0\le t\le\pi$ traces:`, [R`the upper half of the unit circle`, R`the full unit circle`, R`a line segment`, R`the right half of the unit circle`], 0, R`$\sin t\ge0$ on $[0,\pi]$, from $(1,0)$ to $(-1,0)$.`,
          [null, R`That requires $[0,2\pi]$.`, R`$x^2+y^2=1$.`, R`$x=\cos t$ goes from $1$ to $-1$.`])
      ]
    },
    {
      id: 'polar', title: 'Polar Coordinates and Polar Curves',
      html: R`
<p>A point can be located by its distance $r$ from the origin and angle $\theta$ from the positive $x$-axis.</p>
${BOX('thm', 'Conversions', R`$$x=r\cos\theta,\quad y=r\sin\theta,\qquad r^2=x^2+y^2,\quad \tan\theta=\frac yx$$`)}
${EX('Example', R`<p>Convert $(r,\theta)=(4,\frac{2\pi}3)$ to rectangular, and write $x^2+y^2=6y$ in polar form.</p>`, R`<p>$x=4\cos\frac{2\pi}3=-2$, $y=4\sin\frac{2\pi}3=2\sqrt3$. And $r^2=6r\sin\theta\Rightarrow r=6\sin\theta$ (a circle).</p>`)}
<p>Classic polar curves: circles $r=a$, $r=2a\cos\theta$; cardioids $r=a(1+\cos\theta)$; roses $r=\cos(k\theta)$ ($k$ petals if $k$ odd, $2k$ if even); spirals $r=a\theta$. Explore:</p>
${WIDGET('polar')}`,
      quiz: [
        Q(R`The polar point $(2,\pi)$ in rectangular coordinates is:`, [R`$(-2,0)$`, R`$(2,0)$`, R`$(0,2)$`, R`$(0,-2)$`], 0, R`$x=2\cos\pi=-2$, $y=2\sin\pi=0$.`,
          [null, R`$\cos\pi=-1$.`, R`$\sin\pi=0$.`, R`$\sin\pi=0$.`]),
        Q(R`How many petals does $r=\cos(3\theta)$ have?`, [R`$3$`, R`$6$`, R`$9$`, R`$1.5$`], 0, R`$k=3$ is odd ⇒ $k=3$ petals.`,
          [null, R`$2k$ petals only when $k$ is even.`, R`No.`, R`Petals come in whole numbers.`])
      ]
    },
    {
      id: 'polar-area', title: 'Area and Slope in Polar Coordinates',
      html: R`
${BOX('thm', 'Polar area', R`<p>The area of the region swept by $r=f(\theta)$ for $\alpha\le\theta\le\beta$ is $$A=\int_\alpha^\beta\frac12r^2\,d\theta.$$ (Thin sectors of area $\frac12r^2\Delta\theta$.)</p>`)}
${EX('Example 1 — Cardioid', R`<p>Find the area inside $r=1+\cos\theta$.</p>`, R`<p>$A=\frac12\int_0^{2\pi}(1+\cos\theta)^2d\theta=\frac12\int_0^{2\pi}\left(1+2\cos\theta+\frac{1+\cos2\theta}{2}\right)d\theta=\frac12\cdot3\pi=\frac{3\pi}2$.</p>`)}
${EX('Example 2 — One petal', R`<p>Find the area of one petal of $r=\cos 2\theta$.</p>`, R`<p>One petal: $-\frac\pi4\le\theta\le\frac\pi4$. $A=\frac12\int_{-\pi/4}^{\pi/4}\cos^22\theta\,d\theta=\frac\pi8$.</p>`)}
${BOX('thm', 'Slope of a polar curve', R`<p>Treat it as parametric in $\theta$: $x=r\cos\theta$, $y=r\sin\theta$, so $$\frac{dy}{dx}=\frac{r'\sin\theta+r\cos\theta}{r'\cos\theta-r\sin\theta}.$$</p>`)}`,
      quiz: [
        Q(R`The area enclosed by the circle $r=3$ via the polar formula is:`, [R`$9\pi$`, R`$18\pi$`, R`$3\pi$`, R`$6\pi$`], 0, R`$\frac12\int_0^{2\pi}9\,d\theta=9\pi$.`,
          [null, R`Don't forget the $\frac12$.`, R`Square $r$.`, R`That's the circumference.`]),
        Q(R`The polar area formula is:`, [R`$\int r\,d\theta$`, R`$\int\frac12r^2d\theta$`, R`$\int\pi r^2d\theta$`, R`$\int r^2d\theta$`], 1, R`Each thin sector has area $\frac12r^2\,d\theta$.`,
          [R`Need $r^2$.`, null, R`That's a disk.`, R`Missing $\frac12$.`])
      ]
    }
  ],
  review: []
});
