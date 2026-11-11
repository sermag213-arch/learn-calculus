CALC.addChapter({
  id: 'multivariable', num: 12, part: 'Part III · Beyond Calculus I (Calc II & III)', tag: 'Calc III',
  title: 'A Tour of Multivariable Calculus',
  blurb: 'Vectors, functions of several variables, partial derivatives, gradients, optimization, and double integrals.',
  intro: R`<p class="lead">The real world has more than one input. Temperature depends on latitude, longitude, and altitude; profit depends on price and advertising. Calculus III (MATH 2415) extends every idea in this book to higher dimensions. This chapter is a guided preview of the most important ideas.</p>`,
  objectives: ['Work with vectors, dot products, and cross products.', 'Compute partial derivatives and interpret them.', 'Find gradients and directional derivatives.', 'Locate and classify critical points of functions of two variables.', 'Evaluate double integrals over rectangles and simple regions.'],
  sections: [
    {
      id: 'vectors', title: 'Vectors in Space',
      html: R`
<p>A <b>vector</b> $\mathbf v=\langle v_1,v_2,v_3\rangle$ has magnitude $|\mathbf v|=\sqrt{v_1^2+v_2^2+v_3^2}$ and direction.</p>
${BOX('thm', 'Dot and cross products', R`
<p><b>Dot product</b> (a scalar): $\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3=|\mathbf a||\mathbf b|\cos\theta$. Vectors are perpendicular iff $\mathbf a\cdot\mathbf b=0$.</p>
<p><b>Cross product</b> (a vector perpendicular to both): $$\mathbf a\times\mathbf b=\langle a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1\rangle,$$ with $|\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta$ = area of the parallelogram.</p>`)}
${EX('Example', R`<p>Let $\mathbf a=\langle1,2,2\rangle$, $\mathbf b=\langle3,0,-4\rangle$. Find $|\mathbf a|$, $\mathbf a\cdot\mathbf b$, and the angle between them.</p>`, R`<p>$|\mathbf a|=3$, $|\mathbf b|=5$, $\mathbf a\cdot\mathbf b=3+0-8=-5$. $\cos\theta=\frac{-5}{15}=-\frac13$, $\theta\approx109.5^\circ$.</p>`)}`,
      quiz: [
        Q(R`$\langle1,2,3\rangle\cdot\langle4,-5,6\rangle=$`, [R`$12$`, R`$32$`, R`$0$`, R`$\langle4,-10,18\rangle$`], 0, R`$4-10+18=12$.`,
          [null, R`$2\cdot(-5)=-10$.`, R`Not perpendicular.`, R`The dot product is a scalar (sum the products).`]),
        Q(R`Two nonzero vectors are perpendicular exactly when:`, [R`their dot product is 0`, R`their cross product is 0`, R`they have equal length`, R`their sum is 0`], 0, R`$\cos90^\circ=0$.`,
          [null, R`Zero cross product means parallel.`, R`Length is irrelevant.`, R`That means opposite and equal.`])
      ]
    },
    {
      id: 'partials', title: 'Partial Derivatives',
      html: R`
<p>For $z=f(x,y)$, the <b>partial derivative</b> $f_x=\frac{\partial f}{\partial x}$ is the rate of change in the $x$-direction with $y$ held constant. Similarly for $f_y$.</p>
${BOX('tip', 'How to compute', R`<p>To find $f_x$, treat $y$ as a constant and differentiate as usual. All single-variable rules apply.</p>`)}
${EX('Example 1', R`<p>$f(x,y)=x^3y^2+\sin(xy)$. Find $f_x$, $f_y$, $f_{xy}$.</p>`, R`<p>$f_x=3x^2y^2+y\cos(xy)$. $f_y=2x^3y+x\cos(xy)$. $f_{xy}=6x^2y+\cos(xy)-xy\sin(xy)$, which equals $f_{yx}$ (Clairaut's Theorem).</p>`)}
${BOX('thm', 'Gradient and directional derivative', R`<p>$\nabla f=\langle f_x,f_y\rangle$. The rate of change in the direction of a unit vector $\mathbf u$ is $D_{\mathbf u}f=\nabla f\cdot\mathbf u$. The gradient points in the direction of <b>steepest ascent</b>, with maximum rate $|\nabla f|$, and is perpendicular to level curves.</p>`)}
${EX('Example 2', R`<p>For $f(x,y)=x^2+3y^2$ at $(1,1)$: find $\nabla f$ and the rate of change toward $\langle3,4\rangle$.</p>`, R`<p>$\nabla f=\langle2,6\rangle$. Unit vector $\mathbf u=\langle\frac35,\frac45\rangle$. $D_{\mathbf u}f=\frac65+\frac{24}5=6$.</p>`)}`,
      quiz: [
        Q(R`If $f(x,y)=x^2y+y^3$, then $f_x=$`, [R`$2xy$`, R`$x^2+3y^2$`, R`$2xy+3y^2$`, R`$2x$`], 0, R`Treat $y$ as constant: $\frac{\partial}{\partial x}(x^2y)=2xy$; $y^3$ is constant.`,
          [null, R`That's $f_y$.`, R`$y^3$ doesn't depend on $x$.`, R`Keep the factor $y$.`]),
        Q(R`The gradient $\nabla f$ points in the direction of:`, [R`steepest increase`, R`steepest decrease`, R`a level curve`, R`the $x$-axis`], 0, R`$D_{\mathbf u}f=|\nabla f|\cos\theta$ is largest when $\mathbf u$ aligns with $\nabla f$.`,
          [null, R`That's $-\nabla f$.`, R`It's perpendicular to level curves.`, R`Only if $f_y=0$.`])
      ]
    },
    {
      id: 'optimization', title: 'Optimization in Two Variables',
      html: R`
<p>Critical points occur where $\nabla f=\mathbf 0$ (both $f_x=0$ and $f_y=0$) or where a partial doesn't exist.</p>
${BOX('thm', 'Second Derivatives Test', R`<p>At a critical point, let $D=f_{xx}f_{yy}-(f_{xy})^2$.</p><ul><li>$D>0,\ f_{xx}>0$: local min.</li><li>$D>0,\ f_{xx}<0$: local max.</li><li>$D<0$: saddle point.</li><li>$D=0$: inconclusive.</li></ul>`)}
${EX('Example', R`<p>Classify the critical points of $f(x,y)=x^3-3x+y^2$.</p>`, R`<p>$f_x=3x^2-3=0\Rightarrow x=\pm1$; $f_y=2y=0\Rightarrow y=0$. $f_{xx}=6x$, $f_{yy}=2$, $f_{xy}=0$, so $D=12x$. At $(1,0)$: $D=12>0$, $f_{xx}>0$ ⇒ local min. At $(-1,0)$: $D<0$ ⇒ saddle point.</p>`)}
${BOX('thm', 'Lagrange multipliers', R`<p>To optimize $f$ subject to $g(x,y)=k$, solve $\nabla f=\lambda\nabla g$ together with $g=k$. At the optimum, the level curve of $f$ is tangent to the constraint curve.</p>`)}`,
      quiz: [
        Q(R`At a critical point $D=-4$. The point is:`, [R`a saddle point`, R`a local max`, R`a local min`, R`inconclusive`], 0, R`$D<0$ means a saddle.`,
          [null, R`Needs $D>0$.`, R`Needs $D>0$.`, R`Only $D=0$ is inconclusive.`])
      ]
    },
    {
      id: 'double', title: 'Double Integrals',
      html: R`
<p>The double integral $\iint_R f(x,y)\,dA$ is the volume under the surface $z=f(x,y)$ over the region $R$, defined as a limit of sums of boxes — exactly like Riemann sums, but in two dimensions.</p>
${BOX('thm', "Fubini's Theorem", R`<p>Over a rectangle $R=[a,b]\times[c,d]$: $$\iint_Rf\,dA=\int_a^b\!\!\int_c^df(x,y)\,dy\,dx=\int_c^d\!\!\int_a^bf(x,y)\,dx\,dy.$$ Integrate one variable at a time, treating the other as a constant.</p>`)}
${EX('Example 1', R`<p>$\displaystyle\int_0^2\!\!\int_1^3(x+2y)\,dy\,dx$</p>`, R`<p>Inner: $\left[xy+y^2\right]_{y=1}^{3}=2x+8$. Outer: $\int_0^2(2x+8)dx=4+16=20$.</p>`)}
${EX('Example 2 — Non-rectangular region', R`<p>Find $\iint_D xy\,dA$ where $D$ is bounded by $y=x$ and $y=x^2$.</p>`, R`<p>$\int_0^1\int_{x^2}^{x}xy\,dy\,dx=\int_0^1\frac x2(x^2-x^4)dx=\frac12\left(\frac14-\frac16\right)=\frac1{24}$.</p>`)}
${BOX('key', 'Where to go next', R`<p>Calculus III continues with triple integrals, polar/cylindrical/spherical coordinates, vector fields, line and surface integrals, and the great theorems of Green, Stokes, and Gauss — all of which generalize the Fundamental Theorem of Calculus you learned in Chapter 6.</p>`)}
${MORE([['OpenStax Calculus Volume 3', 'https://openstax.org/details/books/calculus-volume-3', 'Free Calc III textbook'], ['MIT 18.02SC Multivariable Calculus', 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/', 'Full lecture course'], ['Khan Academy — Multivariable calculus', 'https://www.khanacademy.org/math/multivariable-calculus', 'Videos']])}`,
      quiz: [
        Q(R`$\displaystyle\int_0^1\!\!\int_0^2 xy\,dy\,dx=$`, [R`$1$`, R`$2$`, R`$\tfrac12$`, R`$4$`], 0, R`Inner: $\frac{xy^2}{2}\Big|_0^2=2x$. Outer: $\int_0^12x\,dx=1$.`,
          [null, R`Recompute the outer integral.`, R`Inner integral gives $2x$, not $x$.`, R`Recompute.`]),
        Q(R`Fubini's Theorem says that over a rectangle:`, [R`the order of integration can be swapped`, R`double integrals are always zero`, R`$\iint f\,dA=f(a,b)$`, R`you must integrate $x$ first`], 0, R`For continuous $f$ on a rectangle, either order gives the same value.`,
          [null, R`No.`, R`No.`, R`Either order works.`])
      ]
    }
  ],
  review: []
});
