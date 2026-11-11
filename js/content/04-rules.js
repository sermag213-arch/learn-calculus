CALC.addChapter({
  id: 'rules', num: 4, part: 'Part II · Calculus I (MATH 2413)', tag: 'Core',
  title: 'Differentiation Rules',
  blurb: 'Power, product, quotient, and chain rules; trig, exponential, log, implicit and inverse-function derivatives.',
  intro: R`<p class="lead">Computing every derivative from the limit definition would be exhausting. In this chapter we prove a handful of rules once, then use them to differentiate almost any function in seconds.</p>`,
  objectives: ['Apply the constant, power, sum, and constant-multiple rules.', 'Apply the product and quotient rules.', 'Differentiate the six trig functions.', 'Use the chain rule for compositions, including nested ones.', 'Find $dy/dx$ by implicit differentiation.', 'Differentiate exponential and logarithmic functions of any base; use logarithmic differentiation.', 'Differentiate inverse functions and inverse trigonometric functions.'],
  sections: [
    {
      id: 'power', title: 'Basic Rules and the Power Rule',
      html: R`
${BOX('thm', 'Basic rules', R`
$$\frac{d}{dx}[c]=0\qquad \frac{d}{dx}[x]=1\qquad \frac{d}{dx}[cf(x)]=cf'(x)\qquad \frac{d}{dx}[f(x)\pm g(x)]=f'(x)\pm g'(x)$$`)}
${BOX('thm', 'The Power Rule', R`<p>For any real number $n$: $$\frac{d}{dx}\left[x^n\right]=nx^{n-1}.$$ "Bring the exponent down, then subtract one."</p>`)}
<p><b>Why it works (for positive integers):</b> By the binomial theorem, $(x+h)^n=x^n+nx^{n-1}h+(\text{terms with }h^2)$. So $\frac{(x+h)^n-x^n}{h}=nx^{n-1}+(\text{terms with }h)\to nx^{n-1}$.</p>
${BOX('tip', 'Rewrite before differentiating', R`<p>Turn roots and reciprocals into powers: $\sqrt x=x^{1/2}$, $\sqrt[3]{x^2}=x^{2/3}$, $\dfrac1{x^3}=x^{-3}$, $\dfrac{5}{\sqrt x}=5x^{-1/2}$.</p>`)}
${EX('Example 1', R`<p>Differentiate $f(x)=4x^5-3x^2+7x-9$.</p>`, R`<p><span class="ans">$f'(x)=20x^4-6x+7$</span></p>`)}
${EX('Example 2', R`<p>Differentiate $g(x)=\dfrac{2}{x^3}+6\sqrt[3]{x}-\dfrac{x^2+1}{x}$.</p>`, R`<p>Rewrite: $g=2x^{-3}+6x^{1/3}-x-x^{-1}$. Then $$g'(x)=-6x^{-4}+2x^{-2/3}-1+x^{-2}=-\frac6{x^4}+\frac{2}{\sqrt[3]{x^2}}-1+\frac1{x^2}.$$</p>`)}
<h2>The natural exponential</h2>
${BOX('thm', 'Derivative of $e^x$', R`$$\frac{d}{dx}e^x=e^x$$<p>This follows from the definition of $e$: $\lim_{h\to0}\frac{e^h-1}{h}=1$, so $\frac{e^{x+h}-e^x}{h}=e^x\cdot\frac{e^h-1}{h}\to e^x$.</p>`)}
${EX('Example 3 — Horizontal tangents', R`<p>Where does $y=x^3-12x+1$ have horizontal tangent lines?</p>`, R`<p>$y'=3x^2-12=0\Rightarrow x=\pm2$. Points: <span class="ans">$(2,-15)$ and $(-2,17)$</span>.</p>`)}
${BOX('warn', 'Common mistakes', R`<ul><li>$\frac{d}{dx}e^x\ne xe^{x-1}$ — the power rule needs a <b>variable base</b> and <b>constant exponent</b>.</li><li>$\frac{d}{dx}\pi^2=0$, not $2\pi$ — it's a constant.</li><li>$\frac{d}{dx}x^{-2}=-2x^{-3}$, not $-2x^{-1}$: subtract 1 from $-2$ to get $-3$.</li></ul>`)}`,
      quiz: [
        Q(R`$\dfrac{d}{dx}\left(\dfrac{3}{x^2}\right)=$`, [R`$-\dfrac{6}{x^3}$`, R`$\dfrac{6}{x}$`, R`$-\dfrac{3}{2x}$`, R`$-\dfrac{6}{x}$`], 0,
          R`$3x^{-2}\to3(-2)x^{-3}=-6x^{-3}$.`,
          [null, R`Rewrite as $3x^{-2}$ first; you can't differentiate the denominator alone.`, R`You can't differentiate a quotient by differentiating the bottom.`, R`$-2-1=-3$, so the power should be $x^{-3}$.`]),
        Q(R`$\dfrac{d}{dx}\left(\sqrt{x}\,(x+2)\right)=$`, [R`$\tfrac32x^{1/2}+x^{-1/2}$`, R`$\dfrac{1}{2\sqrt x}$`, R`$\tfrac32x^{1/2}+2$`, R`$x^{3/2}+2x^{1/2}$`], 0,
          R`Expand: $x^{3/2}+2x^{1/2}$. Differentiate: $\frac32x^{1/2}+x^{-1/2}$.`,
          [null, R`The derivative of a product isn't the product of derivatives.`, R`$\frac{d}{dx}2x^{1/2}=x^{-1/2}$, not $2$.`, R`That's the expanded function, not its derivative.`]),
        Q(R`$\dfrac{d}{dx}\left(e^x+x^e\right)=$`, [R`$e^x+ex^{e-1}$`, R`$xe^{x-1}+ex^{e-1}$`, R`$e^x+x^e$`, R`$2e^x$`], 0,
          R`$e^x$ is its own derivative. $x^e$ is a power function (constant exponent $e$), so power rule: $ex^{e-1}$.`,
          [null, R`The power rule doesn't apply to $e^x$ (variable exponent).`, R`$x^e$ is not its own derivative.`, R`$x^e$ and $e^x$ are different functions.`]),
        Q(R`The slope of $y=x^4-2x$ at $x=1$ is:`, [R`$2$`, R`$-1$`, R`$4$`, R`$0$`], 0, R`$y'=4x^3-2$, so $y'(1)=2$.`,
          [null, R`That's $y(1)$.`, R`Don't forget the $-2$.`, R`$4-2=2$.`])
      ]
    },
    {
      id: 'product-quotient', title: 'Product and Quotient Rules',
      html: R`
${BOX('thm', 'Product Rule', R`$$\frac{d}{dx}[f(x)g(x)]=f'(x)g(x)+f(x)g'(x)$$<p>"First-prime times second, plus first times second-prime."</p>`)}
${BOX('thm', 'Quotient Rule', R`$$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right]=\frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}$$<p>Mnemonic: "<b>Lo d-Hi minus Hi d-Lo, over Lo-Lo</b>" (lo = denominator, hi = numerator).</p>`)}
<p><b>Why the product rule?</b> Picture a rectangle with sides $f$ and $g$. When both grow a little, the area grows by $f\,\Delta g+g\,\Delta f+\Delta f\,\Delta g$. The last sliver is negligibly small, leaving $f'g+fg'$.</p>
${BOX('warn', 'The big trap', R`<p>$\dfrac{d}{dx}[fg]\neq f'g'$. Check: $\frac{d}{dx}[x\cdot x]=2x$, but $f'g'=1\cdot1=1$.</p>`)}
${EX('Example 1 — Product', R`<p>Differentiate $y=x^3e^x$.</p>`, R`<p>$y'=3x^2e^x+x^3e^x=$ <span class="ans">$x^2e^x(3+x)$</span></p>`)}
${EX('Example 2 — Quotient', R`<p>Differentiate $y=\dfrac{x^2+1}{x-3}$.</p>`, R`<p>$$y'=\frac{(2x)(x-3)-(x^2+1)(1)}{(x-3)^2}=\frac{x^2-6x-1}{(x-3)^2}.$$</p>`)}
${EX('Example 3 — Using values', R`<p>If $f(2)=3$, $f'(2)=-1$, $g(2)=4$, $g'(2)=5$, find $(fg)'(2)$ and $(f/g)'(2)$.</p>`, R`<p>$(fg)'(2)=(-1)(4)+(3)(5)=11$. $(f/g)'(2)=\frac{(-1)(4)-(3)(5)}{4^2}=-\frac{19}{16}$.</p>`)}
${BOX('tip', 'Simplify first when possible', R`<p>$\dfrac{x^3+2x}{x}=x^2+2$ (for $x\ne0$) — don't use the quotient rule when division is easy. Likewise, $\frac{5}{x^2}=5x^{-2}$ is quicker with the power rule.</p>`)}`,
      quiz: [
        Q(R`$\dfrac{d}{dx}\left[x^2e^x\right]=$`, [R`$2xe^x$`, R`$e^x(x^2+2x)$`, R`$x^2e^x$`, R`$2xe^x+e^x$`], 1,
          R`Product rule: $2x\cdot e^x+x^2\cdot e^x=e^x(x^2+2x)$.`,
          [R`That's $f'g'$ — you need $f'g+fg'$.`, null, R`Missing the $f'g$ term.`, R`The second term should be $x^2e^x$.`]),
        Q(R`$\dfrac{d}{dx}\left[\dfrac{x}{x+1}\right]=$`, [R`$\dfrac{1}{(x+1)^2}$`, R`$\dfrac{-1}{(x+1)^2}$`, R`$1$`, R`$\dfrac{2x+1}{(x+1)^2}$`], 0,
          R`$\frac{1\cdot(x+1)-x\cdot1}{(x+1)^2}=\frac{1}{(x+1)^2}$.`,
          [null, R`Order matters in the numerator: $f'g-fg'$, not $fg'-f'g$.`, R`$\frac{f'}{g'}=\frac11$ is not the quotient rule.`, R`It's a <em>minus</em> in the quotient rule numerator.`]),
        Q(R`If $h(x)=f(x)g(x)$ with $f(1)=2,f'(1)=3,g(1)=-1,g'(1)=4$, then $h'(1)=$`, [R`$12$`, R`$5$`, R`$-11$`, R`$11$`], 1,
          R`$h'(1)=f'(1)g(1)+f(1)g'(1)=3(-1)+2(4)=5$.`,
          [R`That's $f'(1)g'(1)$.`, null, R`Check signs: $-3+8=5$.`, R`Recheck: $3\cdot(-1)=-3$, not $+3$.`]),
        Q(R`Which derivative should NOT use the quotient rule (simplify instead)?`, [R`$\dfrac{x^4-3x}{x}$`, R`$\dfrac{x}{x^2+1}$`, R`$\dfrac{e^x}{x}$`, R`$\dfrac{x+1}{x-1}$`], 0,
          R`$\frac{x^4-3x}{x}=x^3-3$ for $x\ne0$; its derivative is simply $3x^2$.`,
          [null, R`The denominator doesn't divide evenly — the quotient rule is appropriate.`, R`No simplification is available.`, R`No simplification is available.`])
      ]
    },
    {
      id: 'trig', title: 'Derivatives of Trigonometric Functions',
      html: R`
${BOX('thm', 'Trig derivatives', R`
$$\begin{aligned}\frac{d}{dx}\sin x&=\cos x &\qquad \frac{d}{dx}\cos x&=-\sin x\\ \frac{d}{dx}\tan x&=\sec^2x & \frac{d}{dx}\cot x&=-\csc^2x\\ \frac{d}{dx}\sec x&=\sec x\tan x & \frac{d}{dx}\csc x&=-\csc x\cot x\end{aligned}$$`)}
<p><b>Proof for sine:</b> Using $\sin(x+h)=\sin x\cos h+\cos x\sin h$,
$$\frac{\sin(x+h)-\sin x}{h}=\sin x\cdot\frac{\cos h-1}{h}+\cos x\cdot\frac{\sin h}{h}\to\sin x\cdot0+\cos x\cdot1.$$ The two special limits from §1.4 do all the work. The others follow from the quotient rule, e.g. $\tan x=\frac{\sin x}{\cos x}$ gives $\frac{\cos^2x+\sin^2x}{\cos^2x}=\sec^2x$.</p>
${BOX('tip', 'Memory trick', R`<p>Every "co-" function (cos, cot, csc) has a <b>negative</b> derivative. And the pairs match up: $\tan\leftrightarrow\sec^2$, $\cot\leftrightarrow-\csc^2$, $\sec\leftrightarrow\sec\tan$, $\csc\leftrightarrow-\csc\cot$.</p>`)}
${EX('Example 1', R`<p>Differentiate $y=x^2\sin x$.</p>`, R`<p><span class="ans">$y'=2x\sin x+x^2\cos x$</span></p>`)}
${EX('Example 2', R`<p>Differentiate $y=\dfrac{\sec x}{1+\tan x}$.</p>`, R`<p>$$y'=\frac{\sec x\tan x(1+\tan x)-\sec x\sec^2x}{(1+\tan x)^2}=\frac{\sec x(\tan x+\tan^2x-\sec^2x)}{(1+\tan x)^2}=\frac{\sec x(\tan x-1)}{(1+\tan x)^2}$$ using $\tan^2x-\sec^2x=-1$.</p>`)}
${EX('Example 3 — Cycles', R`<p>Find $\dfrac{d^{99}}{dx^{99}}\sin x$.</p>`, R`<p>The derivatives of $\sin x$ cycle with period 4: $\cos x,-\sin x,-\cos x,\sin x,\dots$. Since $99=4\cdot24+3$, the 99th derivative equals the 3rd: <span class="ans">$-\cos x$</span>.</p>`)}`,
      quiz: [
        Q(R`$\dfrac{d}{dx}\cos x=$`, [R`$\sin x$`, R`$-\sin x$`, R`$-\cos x$`, R`$\sec x\tan x$`], 1, R`$\frac{d}{dx}\cos x=-\sin x$ (co-functions get a minus).`,
          [R`Missing the negative sign.`, null, R`That's the second derivative of $\cos x$.`, R`That's the derivative of $\sec x$.`]),
        Q(R`$\dfrac{d}{dx}\left[\tan x\right]$ at $x=\pi/4$ equals:`, [R`$1$`, R`$2$`, R`$\sqrt2$`, R`$\tfrac12$`], 1, R`$\sec^2(\pi/4)=\left(\frac{1}{\sqrt2/2}\right)^2=(\sqrt2)^2=2$.`,
          [R`$\tan(\pi/4)=1$, but we need $\sec^2(\pi/4)$.`, null, R`That's $\sec(\pi/4)$; square it.`, R`That's $\cos^2(\pi/4)$; $\sec$ is its reciprocal.`]),
        Q(R`$\dfrac{d}{dx}\left[x\cos x\right]=$`, [R`$-\sin x$`, R`$\cos x-x\sin x$`, R`$\cos x+x\sin x$`, R`$-x\sin x$`], 1, R`Product rule: $1\cdot\cos x+x\cdot(-\sin x)$.`,
          [R`That's $f'g'$.`, null, R`The derivative of cosine is $-\sin x$.`, R`Missing the $f'g=\cos x$ term.`]),
        Q(R`$\dfrac{d}{dx}\csc x=$`, [R`$\csc x\cot x$`, R`$-\csc x\cot x$`, R`$-\csc^2x$`, R`$\sec x\tan x$`], 1, R`$\frac{d}{dx}\csc x=-\csc x\cot x$.`,
          [R`Co-function: needs a negative sign.`, null, R`That's the derivative of $\cot x$.`, R`That's the derivative of $\sec x$.`])
      ]
    },
    {
      id: 'chain', title: 'The Chain Rule',
      html: R`
<p>How do we differentiate $\sin(x^2)$ or $(3x+1)^{10}$ or $e^{\cos x}$? These are <b>compositions</b>, and the chain rule handles them.</p>
${BOX('thm', 'The Chain Rule', R`<p>If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then $$\frac{d}{dx}f(g(x))=f'(g(x))\cdot g'(x).$$ In Leibniz notation, with $y=f(u)$ and $u=g(x)$: $$\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}.$$</p>`)}
<p>"<b>Derivative of the outside (leave the inside alone), times derivative of the inside.</b>"</p>
${BOX('intuition', 'Gears', R`<p>If gear A turns 3 times for each turn of gear B, and B turns 4 times for each turn of C, then A turns $3\times4=12$ times per turn of C. Rates of change multiply through a chain.</p>`)}
${EX('Example 1', R`<p>Differentiate $y=(3x^2+1)^{10}$.</p>`, R`<p>Outside: $u^{10}$, inside $u=3x^2+1$. $$y'=10(3x^2+1)^9\cdot6x=60x(3x^2+1)^9.$$</p>`)}
${EX('Example 2', R`<p>Differentiate $y=\sin(x^2)$ and $y=\sin^2x$.</p>`, R`<p>$\sin(x^2)$: outside $\sin$, inside $x^2$: $y'=\cos(x^2)\cdot2x$.</p><p>$\sin^2x=(\sin x)^2$: outside $u^2$, inside $\sin x$: $y'=2\sin x\cos x=\sin2x$.</p>`)}
${EX('Example 3', R`<p>Differentiate $y=e^{5x}$, $y=e^{x^2}$, and $y=\sqrt{1+\cos x}$.</p>`, R`<p>$\frac{d}{dx}e^{5x}=5e^{5x}$. $\frac{d}{dx}e^{x^2}=2xe^{x^2}$. $\frac{d}{dx}(1+\cos x)^{1/2}=\frac12(1+\cos x)^{-1/2}(-\sin x)=\dfrac{-\sin x}{2\sqrt{1+\cos x}}$.</p>`)}
<h2>Nested chains</h2>
${EX('Example 4 — Three layers', R`<p>Differentiate $y=\cos^3(4x)=[\cos(4x)]^3$.</p>`, R`<p>Peel from the outside in: $$y'=3\cos^2(4x)\cdot(-\sin(4x))\cdot4=-12\cos^2(4x)\sin(4x).$$</p>`)}
<h2>Combining rules</h2>
${EX('Example 5 — Product + chain', R`<p>Differentiate $y=x^2\sqrt{1-x^2}$.</p>`, R`<p>$$y'=2x\sqrt{1-x^2}+x^2\cdot\frac{-2x}{2\sqrt{1-x^2}}=\frac{2x(1-x^2)-x^3}{\sqrt{1-x^2}}=\frac{2x-3x^3}{\sqrt{1-x^2}}.$$</p>`)}
${BOX('tip', 'General power rule', R`<p>$\dfrac{d}{dx}[g(x)]^n=n[g(x)]^{n-1}g'(x)$, and $\dfrac{d}{dx}e^{g(x)}=e^{g(x)}g'(x)$.</p>`)}
${BOX('warn', 'The #1 error in Calculus I', R`<p>Forgetting to multiply by the inside derivative. $\frac{d}{dx}\sin(3x)$ is $3\cos(3x)$, not $\cos(3x)$.</p>`)}
${MORE([['3Blue1Brown — Chain rule and product rule visualized', 'https://www.youtube.com/watch?v=YG15m2VwSjA', 'Essence of Calculus, ch. 4'], ["Paul's Notes — Chain Rule", 'https://tutorial.math.lamar.edu/Classes/CalcI/ChainRule.aspx', 'Many examples'], ['OpenStax §3.6 The Chain Rule', 'https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule', 'Reading']])}`,
      quiz: [
        Q(R`$\dfrac{d}{dx}(5x-2)^4=$`, [R`$4(5x-2)^3$`, R`$20(5x-2)^3$`, R`$5(5x-2)^4$`, R`$4(5)^3$`], 1, R`$4(5x-2)^3\cdot5=20(5x-2)^3$.`,
          [R`Forgot to multiply by the inside derivative, $5$.`, null, R`The exponent must drop by one.`, R`Differentiate the whole composition, not just the inner coefficient.`]),
        Q(R`$\dfrac{d}{dx}\cos(x^3)=$`, [R`$-\sin(x^3)$`, R`$-3x^2\sin(x^3)$`, R`$-\sin(3x^2)$`, R`$3x^2\sin(x^3)$`], 1, R`Outside derivative $-\sin(x^3)$, times inside derivative $3x^2$.`,
          [R`Forgot the inside derivative $3x^2$.`, null, R`Keep the inside unchanged in the outside derivative, then multiply by $3x^2$.`, R`$\frac{d}{dx}\cos u=-\sin u$; the sign is negative.`]),
        Q(R`$\dfrac{d}{dx}e^{\sin x}=$`, [R`$e^{\sin x}$`, R`$e^{\cos x}$`, R`$\cos x\,e^{\sin x}$`, R`$\sin x\,e^{\sin x-1}$`], 2, R`$e^u$ with $u=\sin x$: $e^{\sin x}\cdot\cos x$.`,
          [R`Forgot to multiply by $\frac{d}{dx}\sin x=\cos x$.`, R`Don't differentiate inside the exponent and leave it there.`, null, R`The power rule doesn't apply to exponentials.`]),
        Q(R`If $h(x)=f(g(x))$, $g(1)=3$, $g'(1)=2$, $f'(3)=5$, $f'(1)=7$, then $h'(1)=$`, [R`$10$`, R`$14$`, R`$15$`, R`$35$`], 0, R`$h'(1)=f'(g(1))\,g'(1)=f'(3)\cdot2=10$.`,
          [null, R`Evaluate $f'$ at $g(1)=3$, not at $1$.`, R`Multiply by $g'(1)=2$, not $g(1)=3$.`, R`$f'(1)\cdot f'(3)$ isn't the chain rule.`]),
        Q(R`$\dfrac{d}{dx}\sqrt{x^2+9}$ at $x=4$ is:`, [R`$\tfrac45$`, R`$\tfrac1{10}$`, R`$\tfrac{8}{5}$`, R`$5$`], 0, R`$\frac{2x}{2\sqrt{x^2+9}}=\frac{x}{\sqrt{x^2+9}}$; at $x=4$: $\frac45$.`,
          [null, R`Forgot the inside derivative $2x$.`, R`The $2$ from $2x$ cancels with the $2$ in $2\sqrt{\cdot}$.`, R`That's the function value $\sqrt{25}$.`])
      ]
    },
    {
      id: 'implicit', title: 'Implicit Differentiation',
      html: R`
<p>Some curves, like the circle $x^2+y^2=25$, aren't given as $y=f(x)$. We can still find slopes by differentiating both sides with respect to $x$, treating $y$ as an unknown function of $x$.</p>
${BOX('key', 'The one rule', R`<p>Whenever you differentiate an expression involving $y$, apply the chain rule: $\dfrac{d}{dx}[y^n]=ny^{n-1}\dfrac{dy}{dx}$, $\dfrac{d}{dx}[\sin y]=\cos y\dfrac{dy}{dx}$, etc.</p>`)}
<h2>Procedure</h2>
<ol class="steps"><li>Differentiate both sides with respect to $x$ (chain rule on every $y$-term; product rule on terms like $xy$).</li><li>Collect all $\frac{dy}{dx}$ terms on one side.</li><li>Factor out $\frac{dy}{dx}$ and solve.</li></ol>
${EX('Example 1 — Circle', R`<p>Find $\frac{dy}{dx}$ for $x^2+y^2=25$ and the tangent line at $(3,4)$.</p>`, R`<p>$2x+2y\,y'=0\Rightarrow y'=-\dfrac xy$. At $(3,4)$: slope $-\frac34$, so $y-4=-\frac34(x-3)$.</p><p>Check: the radius to $(3,4)$ has slope $\frac43$, and the tangent is perpendicular. ✔</p>`)}
${EX('Example 2 — Product inside', R`<p>Find $y'$ if $x^3+y^3=6xy$ (folium of Descartes).</p>`, R`<p>$3x^2+3y^2y'=6y+6xy'$. Collect: $y'(3y^2-6x)=6y-3x^2$. <span class="ans">$y'=\dfrac{2y-x^2}{y^2-2x}$</span></p>`)}
${EX('Example 3 — Trig', R`<p>Find $y'$ if $\sin(x+y)=y^2\cos x$.</p>`, R`<p>$\cos(x+y)(1+y')=2yy'\cos x-y^2\sin x$. Collect: $y'[\cos(x+y)-2y\cos x]=-y^2\sin x-\cos(x+y)$, so $$y'=\frac{-y^2\sin x-\cos(x+y)}{\cos(x+y)-2y\cos x}.$$</p>`)}
<h2>Second derivatives implicitly</h2>
${EX('Example 4', R`<p>Find $y''$ for $x^2+y^2=25$.</p>`, R`<p>$y'=-\frac xy$. Quotient rule: $y''=-\frac{y-xy'}{y^2}=-\frac{y+x^2/y}{y^2}=-\frac{y^2+x^2}{y^3}=-\frac{25}{y^3}$.</p>`)}`,
      quiz: [
        Q(R`If $x^2+y^2=10$, then $\dfrac{dy}{dx}=$`, [R`$-\dfrac{x}{y}$`, R`$\dfrac xy$`, R`$-\dfrac yx$`, R`$-2x$`], 0, R`$2x+2yy'=0\Rightarrow y'=-x/y$.`,
          [null, R`Sign error: move $2x$ to the other side.`, R`You inverted the ratio.`, R`You forgot that $y^2$ also depends on $x$.`]),
        Q(R`$\dfrac{d}{dx}\left[xy\right]=$`, [R`$y'$`, R`$y+xy'$`, R`$x+yy'$`, R`$1\cdot y'$`], 1, R`Product rule: $(1)y+x(y')$.`,
          [R`Use the product rule: both $x$ and $y$ vary.`, null, R`The derivative of $x$ is 1, multiplying $y$.`, R`Use the product rule.`]),
        Q(R`The slope of $x^2+xy+y^2=7$ at $(1,2)$ is:`, [R`$-\tfrac45$`, R`$-\tfrac54$`, R`$\tfrac45$`, R`$-1$`], 0, R`$2x+y+xy'+2yy'=0\Rightarrow y'=-\frac{2x+y}{x+2y}=-\frac{4}{5}$.`,
          [null, R`You inverted the fraction.`, R`Sign error when solving for $y'$.`, R`Recompute: $2(1)+2=4$ over $1+2(2)=5$.`]),
        Q(R`$\dfrac{d}{dx}\left[e^y\right]=$`, [R`$e^y$`, R`$e^y\dfrac{dy}{dx}$`, R`$ye^{y-1}$`, R`$e^x$`], 1, R`Chain rule: $e^y\cdot y'$.`,
          [R`$y$ depends on $x$, so the chain rule adds $y'$.`, null, R`Power rule doesn't apply to exponentials.`, R`The exponent is $y$, not $x$.`])
      ]
    },
    {
      id: 'explog', title: 'Exponential and Logarithmic Derivatives',
      html: R`
${BOX('thm', 'Derivatives of exponentials and logarithms', R`
$$\frac{d}{dx}e^x=e^x\qquad \frac{d}{dx}a^x=a^x\ln a$$
$$\frac{d}{dx}\ln x=\frac1x\ (x>0)\qquad \frac{d}{dx}\ln|x|=\frac1x\ (x\neq0)\qquad \frac{d}{dx}\log_a x=\frac{1}{x\ln a}$$`)}
<p><b>Proof of $\frac{d}{dx}\ln x=\frac1x$:</b> If $y=\ln x$ then $e^y=x$. Implicitly: $e^y y'=1$, so $y'=\frac1{e^y}=\frac1x$.</p>
<p><b>Proof of $\frac{d}{dx}a^x$:</b> $a^x=e^{x\ln a}$, so by the chain rule its derivative is $e^{x\ln a}\ln a=a^x\ln a$.</p>
${BOX('tip', 'Chain rule versions', R`<p>$\dfrac{d}{dx}\ln g(x)=\dfrac{g'(x)}{g(x)}$ and $\dfrac{d}{dx}e^{g(x)}=e^{g(x)}g'(x)$.</p>`)}
${EX('Example 1', R`<p>Differentiate $y=\ln(x^2+1)$, $y=\ln(\cos x)$, and $y=2^{3x}$.</p>`, R`<p>$\frac{2x}{x^2+1}$; $\ \frac{-\sin x}{\cos x}=-\tan x$; $\ 2^{3x}\ln2\cdot3$.</p>`)}
${EX('Example 2 — Expand logs first', R`<p>Differentiate $y=\ln\dfrac{x^2\sqrt{x+1}}{(2x-3)^5}$.</p>`, R`<p>Expand: $y=2\ln x+\frac12\ln(x+1)-5\ln(2x-3)$. Then $$y'=\frac2x+\frac1{2(x+1)}-\frac{10}{2x-3}.$$ Much easier than the quotient rule!</p>`)}
<h2>Logarithmic differentiation</h2>
<p>For messy products/quotients, or for <b>variable bases with variable exponents</b> like $x^x$, take $\ln$ of both sides first.</p>
${EX('Example 3 — $x^x$', R`<p>Differentiate $y=x^{x}$ for $x>0$.</p>`, R`<ol class="steps"><li>$\ln y=x\ln x$.</li><li>Differentiate: $\frac{y'}{y}=\ln x+x\cdot\frac1x=\ln x+1$.</li><li>$y'=y(\ln x+1)=$ <span class="ans">$x^x(\ln x+1)$</span>.</li></ol>`)}
${EX(R`Example 4 — $x^{\sin x}$`, R`<p>Differentiate $y=x^{\sin x}$.</p>`, R`<p>$\ln y=\sin x\ln x\Rightarrow \frac{y'}{y}=\cos x\ln x+\frac{\sin x}{x}$, so $y'=x^{\sin x}\left(\cos x\ln x+\frac{\sin x}x\right)$.</p>`)}
${BOX('warn', 'Know which rule applies', R`<table><thead><tr><th>Form</th><th>Rule</th></tr></thead><tbody><tr><td>$x^{n}$ (variable base, constant exponent)</td><td>Power rule</td></tr><tr><td>$a^x$ (constant base, variable exponent)</td><td>$a^x\ln a$</td></tr><tr><td>$x^x$, $f(x)^{g(x)}$</td><td>Logarithmic differentiation</td></tr><tr><td>$a^b$ (both constant)</td><td>derivative is $0$</td></tr></tbody></table>`)}`,
      quiz: [
        Q(R`$\dfrac{d}{dx}\ln(5x)=$`, [R`$\dfrac{1}{5x}$`, R`$\dfrac{5}{x}$`, R`$\dfrac{1}{x}$`, R`$5\ln x$`], 2, R`$\frac{5}{5x}=\frac1x$. (Also: $\ln5x=\ln5+\ln x$, and $\ln 5$ is constant.)`,
          [R`Forgot the chain-rule factor $5$.`, R`$\frac{g'}{g}=\frac{5}{5x}$, which simplifies.`, null, R`That's not a derivative.`]),
        Q(R`$\dfrac{d}{dx}3^x=$`, [R`$x3^{x-1}$`, R`$3^x$`, R`$3^x\ln3$`, R`$\dfrac{3^x}{\ln3}$`], 2, R`$\frac{d}{dx}a^x=a^x\ln a$.`,
          [R`Power rule requires a constant exponent.`, R`Only base $e$ is its own derivative.`, null, R`Multiply by $\ln3$, don't divide.`]),
        Q(R`$\dfrac{d}{dx}\ln(\sin x)=$`, [R`$\dfrac1{\sin x}$`, R`$\cot x$`, R`$\tan x$`, R`$\cos x\ln x$`], 1, R`$\frac{\cos x}{\sin x}=\cot x$.`,
          [R`Forgot the chain-rule factor $\cos x$.`, null, R`It's $\frac{\cos}{\sin}$, not $\frac{\sin}{\cos}$.`, R`$\ln(\sin x)$ is a composition, not a product.`]),
        Q(R`Using logarithmic differentiation, $\dfrac{d}{dx}x^{2x}=$`, [R`$2x\cdot x^{2x-1}$`, R`$x^{2x}(2\ln x+2)$`, R`$x^{2x}\ln x$`, R`$2x^{2x}$`], 1, R`$\ln y=2x\ln x\Rightarrow \frac{y'}{y}=2\ln x+2$.`,
          [R`The power rule doesn't apply: the exponent varies.`, null, R`Use the product rule on $2x\ln x$.`, R`Missing the $\ln x$ term.`])
      ]
    },
    {
      id: 'inverse', title: 'Derivatives of Inverse Functions',
      html: R`
${BOX('thm', 'Inverse Function Theorem', R`<p>If $f$ is differentiable and one-to-one with $f'(f^{-1}(x))\ne0$, then $$\left(f^{-1}\right)'(x)=\frac{1}{f'\!\left(f^{-1}(x)\right)}.$$</p>`)}
<p><b>Geometric meaning:</b> the graph of $f^{-1}$ is the reflection of $f$ over $y=x$. Reflection swaps rise and run, so slopes become reciprocals: if $f$ has slope $m$ at $(a,b)$, then $f^{-1}$ has slope $\frac1m$ at $(b,a)$.</p>
${EX('Example 1 — Without finding the inverse', R`<p>Let $f(x)=x^3+x+1$. Find $(f^{-1})'(3)$.</p>`, R`<ol class="steps"><li>Find $f^{-1}(3)$: solve $x^3+x+1=3$. By inspection $x=1$.</li><li>$f'(x)=3x^2+1$, so $f'(1)=4$.</li><li>$(f^{-1})'(3)=\frac1{f'(1)}=$ <span class="ans">$\tfrac14$</span>.</li></ol>`)}
<h2>Inverse trigonometric derivatives</h2>
${BOX('thm', 'Inverse trig derivatives', R`
$$\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1-x^2}}\qquad \frac{d}{dx}\arccos x=-\frac{1}{\sqrt{1-x^2}}$$
$$\frac{d}{dx}\arctan x=\frac{1}{1+x^2}\qquad \frac{d}{dx}\operatorname{arccot}x=-\frac{1}{1+x^2}$$
$$\frac{d}{dx}\operatorname{arcsec}x=\frac{1}{|x|\sqrt{x^2-1}}$$`)}
<p><b>Derivation for arcsin:</b> $y=\arcsin x\Rightarrow\sin y=x\Rightarrow\cos y\cdot y'=1\Rightarrow y'=\frac1{\cos y}=\frac{1}{\sqrt{1-\sin^2y}}=\frac1{\sqrt{1-x^2}}$. (We take the positive root since $y\in[-\frac\pi2,\frac\pi2]$ where $\cos y\ge0$.)</p>
${EX('Example 2', R`<p>Differentiate $y=\arctan(3x)$ and $y=\arcsin(x^2)$.</p>`, R`<p>$\frac{3}{1+9x^2}$ and $\frac{2x}{\sqrt{1-x^4}}$.</p>`)}
${EX('Example 3', R`<p>Differentiate $y=x\arctan x-\tfrac12\ln(1+x^2)$.</p>`, R`<p>$y'=\arctan x+\frac{x}{1+x^2}-\frac{x}{1+x^2}=\arctan x$. (So this $y$ is an antiderivative of $\arctan x$ — we'll derive it with integration by parts in §8.1.)</p>`)}`,
      quiz: [
        Q(R`$\dfrac{d}{dx}\arctan(x^2)=$`, [R`$\dfrac{1}{1+x^4}$`, R`$\dfrac{2x}{1+x^4}$`, R`$\dfrac{2x}{1+x^2}$`, R`$2x\sec^2(x^2)$`], 1, R`$\frac{1}{1+(x^2)^2}\cdot2x$.`,
          [R`Forgot the chain-rule factor $2x$.`, null, R`The input is $x^2$, so the denominator is $1+(x^2)^2$.`, R`That's the derivative of $\tan(x^2)$, not $\arctan$.`]),
        Q(R`$f(2)=5$ and $f'(2)=3$. Then $(f^{-1})'(5)=$`, [R`$\tfrac13$`, R`$3$`, R`$\tfrac15$`, R`$\tfrac12$`], 0, R`$(f^{-1})'(5)=\frac1{f'(f^{-1}(5))}=\frac1{f'(2)}=\frac13$.`,
          [null, R`Slopes of inverses are reciprocals.`, R`$5$ is an output of $f$, not a slope.`, R`$f^{-1}(5)=2$, but the answer is $1/f'(2)$.`]),
        Q(R`$\dfrac{d}{dx}\arcsin x$ at $x=\tfrac12$ equals:`, [R`$\dfrac{2}{\sqrt3}$`, R`$\dfrac{\sqrt3}{2}$`, R`$\dfrac{\pi}{6}$`, R`$2$`], 0, R`$\frac{1}{\sqrt{1-1/4}}=\frac{1}{\sqrt{3}/2}=\frac2{\sqrt3}$.`,
          [null, R`That's $\sqrt{1-x^2}$; take its reciprocal.`, R`That's $\arcsin\frac12$, the value, not the slope.`, R`Compute $1-\frac14=\frac34$ under the root.`])
      ]
    }
  ],
  review: [
    Q(R`$\dfrac{d}{dx}\left[e^{2x}\cos x\right]=$`, [R`$e^{2x}(2\cos x-\sin x)$`, R`$-2e^{2x}\sin x$`, R`$2e^{2x}\cos x$`, R`$e^{2x}(\cos x-2\sin x)$`], 0, R`$2e^{2x}\cos x+e^{2x}(-\sin x)$.`,
      [null, R`That's $f'g'$.`, R`Missing the $-e^{2x}\sin x$ term.`, R`The $2$ belongs with $\cos x$ (from $\frac{d}{dx}e^{2x}$).`]),
    Q(R`$\dfrac{d}{dx}\tan^3(2x)=$`, [R`$3\tan^2(2x)$`, R`$6\tan^2(2x)\sec^2(2x)$`, R`$3\tan^2(2x)\sec^2(2x)$`, R`$6\sec^2(2x)$`], 1, R`$3\tan^2(2x)\cdot\sec^2(2x)\cdot2$.`,
      [R`Missing two chain factors.`, null, R`Missing the innermost factor $2$.`, R`Missing $3\tan^2(2x)$ from the outer power.`]),
    Q(R`If $y=\ln\sqrt{x}$, then $y'=$`, [R`$\dfrac{1}{\sqrt x}$`, R`$\dfrac{1}{2x}$`, R`$\dfrac{1}{2\sqrt x}$`, R`$\dfrac{2}{x}$`], 1, R`$\ln\sqrt x=\frac12\ln x$, derivative $\frac1{2x}$.`,
      [R`Use $\frac{g'}{g}$: $\frac{1/(2\sqrt x)}{\sqrt x}$.`, null, R`That's the derivative of $\sqrt x$, not its log.`, R`The factor is $\frac12$, not $2$.`])
  ]
});
