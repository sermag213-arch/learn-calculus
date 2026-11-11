CALC.addChapter({
  id: 'diffeq', num: 9, part: 'Part III · Beyond Calculus I (Calc II & III)', tag: 'Calc II',
  title: 'Differential Equations',
  blurb: 'Equations involving derivatives: slope fields, separable equations, exponential and logistic growth.',
  intro: R`<p class="lead">Physical laws are usually stated as relationships between quantities and their <em>rates of change</em>: Newton's second law, radioactive decay, population growth, cooling. Such relationships are <b>differential equations</b>, and solving them is one of the most important applications of calculus.</p>`,
  objectives: ['Verify solutions of differential equations and solve initial value problems.', 'Interpret slope fields and use Euler\'s method.', 'Solve separable differential equations.', 'Model with exponential growth/decay, Newton\'s Law of Cooling, and the logistic equation.'],
  sections: [
    {
      id: 'intro', title: 'Slope Fields and Euler\'s Method',
      html: R`
${BOX('def', 'Differential equation', R`<p>A <b>differential equation</b> (DE) relates an unknown function to its derivatives, e.g. $y'=2xy$ or $y''+y=0$. A <b>solution</b> is a function that makes it true. An <b>initial value problem</b> adds a condition like $y(0)=3$.</p>`)}
${EX('Example — Verifying a solution', R`<p>Show $y=Ce^{x^2}$ solves $y'=2xy$.</p>`, R`<p>$y'=Ce^{x^2}\cdot2x=2x\,(Ce^{x^2})=2xy$. ✔</p>`)}
<h2>Slope fields</h2>
<p>For $y'=F(x,y)$, at each point $(x,y)$ draw a short segment with slope $F(x,y)$. Solution curves follow the segments like leaves in a stream. Click the graph to launch solutions:</p>
${WIDGET('slopefield')}
<h2>Euler's method</h2>
<p>Take small steps along the slope field: $$x_{n+1}=x_n+h,\qquad y_{n+1}=y_n+h\,F(x_n,y_n).$$</p>
${EX("Example — Euler's method", R`<p>Use $h=0.5$ to approximate $y(1)$ for $y'=y$, $y(0)=1$.</p>`, R`<p>$y_1=1+0.5(1)=1.5$; $y_2=1.5+0.5(1.5)=2.25$. True value $e\approx2.718$. Smaller $h$ gives better accuracy.</p>`)}`,
      quiz: [
        Q(R`Which function solves $y''=-y$?`, [R`$y=e^x$`, R`$y=\sin x$`, R`$y=x^2$`, R`$y=\ln x$`], 1, R`$(\sin x)''=-\sin x$. ✔`,
          [R`$(e^x)''=e^x\ne-e^x$.`, null, R`$(x^2)''=2$.`, R`$(\ln x)''=-1/x^2$.`]),
        Q(R`In a slope field for $y'=x-y$, the slope at $(2,1)$ is:`, [R`$1$`, R`$-1$`, R`$3$`, R`$2$`], 0, R`$F(2,1)=2-1=1$.`,
          [null, R`Order: $x-y$.`, R`Subtract, don't add.`, R`Evaluate $x-y$.`])
      ]
    },
    {
      id: 'separable', title: 'Separable Equations',
      html: R`
${BOX('def', 'Separable equation', R`<p>A DE is <b>separable</b> if it can be written $\dfrac{dy}{dx}=g(x)h(y)$. Solve by separating: $$\int\frac{dy}{h(y)}=\int g(x)\,dx.$$</p>`)}
${EX('Example 1', R`<p>Solve $\dfrac{dy}{dx}=\dfrac{x^2}{y^2}$, $y(0)=2$.</p>`, R`<p>$\int y^2dy=\int x^2dx\Rightarrow\frac{y^3}{3}=\frac{x^3}{3}+C$. $y(0)=2\Rightarrow C=\frac83$. So $y=\sqrt[3]{x^3+8}$.</p>`)}
${EX('Example 2', R`<p>Solve $y'=xy$.</p>`, R`<p>$\int\frac{dy}{y}=\int x\,dx\Rightarrow\ln|y|=\frac{x^2}2+C\Rightarrow y=Ae^{x^2/2}$.</p>`)}`,
      quiz: [
        Q(R`The general solution of $y'=3y$ is:`, [R`$y=Ce^{3x}$`, R`$y=3x+C$`, R`$y=e^{3x}+C$`, R`$y=Cx^3$`], 0, R`$\int\frac{dy}y=\int3dx\Rightarrow\ln|y|=3x+C$.`,
          [null, R`That solves $y'=3$.`, R`The constant multiplies, not adds.`, R`$(Cx^3)'=3Cx^2\ne3Cx^3$.`]),
        Q(R`Which equation is NOT separable?`, [R`$y'=x^2y$`, R`$y'=e^{x+y}$`, R`$y'=x+y$`, R`$y'=\frac{\sin x}{y}$`], 2, R`$x+y$ can't be written as $g(x)h(y)$.`,
          [R`$g=x^2$, $h=y$.`, R`$e^{x+y}=e^xe^y$.`, null, R`$g=\sin x$, $h=1/y$.`])
      ]
    },
    {
      id: 'models', title: 'Growth, Decay, and Logistic Models',
      html: R`
${BOX('thm', 'Exponential growth/decay', R`<p>$\dfrac{dy}{dt}=ky$ has solution $y=y_0e^{kt}$. Growth if $k>0$, decay if $k<0$.</p>`)}
${BOX('thm', "Newton's Law of Cooling", R`<p>$\dfrac{dT}{dt}=k(T-T_s)$, where $T_s$ is the surrounding temperature. Solution: $T=T_s+(T_0-T_s)e^{kt}$.</p>`)}
${EX('Example — Cooling coffee', R`<p>Coffee at $90^\circ$C sits in a $20^\circ$C room. After 10 min it's $60^\circ$C. When is it $40^\circ$C?</p>`, R`<p>$60=20+70e^{10k}\Rightarrow e^{10k}=\frac47\Rightarrow k=\frac{\ln(4/7)}{10}\approx-0.05596$. $40=20+70e^{kt}\Rightarrow t=\frac{\ln(2/7)}{k}\approx22.4$ min.</p>`)}
${BOX('thm', 'Logistic growth', R`<p>$\dfrac{dP}{dt}=kP\left(1-\dfrac PM\right)$, where $M$ is the <b>carrying capacity</b>. Solution: $$P(t)=\frac{M}{1+Ae^{-kt}},\quad A=\frac{M-P_0}{P_0}.$$ Growth is fastest when $P=M/2$.</p>`)}`,
      quiz: [
        Q(R`In the logistic model $P'=0.3P(1-P/500)$, the population grows fastest when $P=$`, [R`$250$`, R`$500$`, R`$150$`, R`$0$`], 0, R`The rate is a downward parabola in $P$ with max at $P=M/2=250$.`,
          [null, R`At $P=M$ growth stops.`, R`Max is at $M/2$.`, R`At $0$ there's no growth.`]),
        Q(R`A substance decays by $y'=-0.1y$. Its half-life is:`, [R`$10\ln2\approx6.93$`, R`$5$`, R`$0.1\ln 2$`, R`$10$`], 0, R`$\frac12=e^{-0.1t}\Rightarrow t=\frac{\ln2}{0.1}$.`,
          [null, R`Use $\frac{\ln2}{k}$.`, R`Divide by $k$, don't multiply.`, R`$\frac{1}{k}$ is the time constant, not the half-life.`])
      ]
    }
  ],
  review: []
});
