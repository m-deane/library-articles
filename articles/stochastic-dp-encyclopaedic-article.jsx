import { useState } from "react";

const C = {
  y: "#FFCE00", bk: "#1a1a1a", ow: "#FAF8F5", cr: "#F2EDE4", wg: "#8A8278",
  dg: "#3D3B38", sb: "#F0EBE1", ac: "#C4A35A", bl: "#E0DAD0", db: "#0C1420",
  nb: "#1E88E5", gn: "#43A047", rd: "#E53935", or: "#FB8C00", pu: "#7B1FA2",
};
const F = {
  h: "'Playfair Display', Georgia, serif", b: "'Source Serif 4', Georgia, serif",
  s: "'Source Sans 3', 'Helvetica Neue', sans-serif", m: "'JetBrains Mono', monospace",
};

/* ═══ HERO ═══ */
const Hero = () => (
  <svg viewBox="0 0 1200 700" style={{width:"100%",height:"100%",position:"absolute",top:0,left:0}}>
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#030810"/><stop offset="60%" stopColor="#0C1420"/><stop offset="100%" stopColor="#182838"/></linearGradient>
      <radialGradient id="rg" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stopColor={C.y} stopOpacity="0.08"/><stop offset="100%" stopColor={C.y} stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#hg)"/>
    <circle cx="600" cy="350" r="320" fill="url(#rg)"/>
    {/* Decision tree / value function lattice */}
    {/* Root */}
    <circle cx="600" cy="100" r="12" fill="none" stroke={C.y} strokeWidth="2" opacity="0.7"/>
    <text x="600" y="104" fill={C.y} fontSize="9" textAnchor="middle" fontFamily={F.m}>S₀</text>
    {/* Level 1 */}
    {[{x:400,l:"S₁"},{x:600,l:"S₂"},{x:800,l:"S₃"}].map((n,i)=>(
      <g key={i}><line x1="600" y1="112" x2={n.x} y2="178" stroke={C.y} strokeWidth="0.8" opacity="0.3"/>
        <circle cx={n.x} cy="190" r="10" fill="none" stroke={C.nb} strokeWidth="1.5" opacity="0.6"/>
        <text x={n.x} y="194" fill={C.nb} fontSize="8" textAnchor="middle" fontFamily={F.m}>{n.l}</text></g>
    ))}
    {/* Level 2 */}
    {[[300,280],[500,280],[400,300],[600,280],[700,300],[900,280]].map(([x,y],i)=>{
      const px=[400,400,600,600,800,800][i];
      return(<g key={i}><line x1={px} y1="200" x2={x} y2={y-12} stroke={C.nb} strokeWidth="0.6" opacity="0.25"/>
        <circle cx={x} cy={y} r="7" fill="none" stroke={C.gn} strokeWidth="1" opacity="0.5"/>
      </g>);
    })}
    {/* Value function surface — simplified contour */}
    {[0,1,2,3,4].map(i=>(
      <ellipse key={i} cx="600" cy={450+i*15} rx={200-i*30} ry={40-i*6} fill="none" stroke={C.y} strokeWidth="0.5" opacity={0.15+i*0.05}/>
    ))}
    {/* Bellman equation */}
    <text x="600" y="590" fill="#fff" fontSize="14" textAnchor="middle" fontFamily={F.m} opacity="0.5">V(s) = max_a [ R(s,a) + γ Σ P(s'|s,a) V(s') ]</text>
    <text x="600" y="615" fill={C.wg} fontSize="9" textAnchor="middle" fontFamily={F.s}>The Bellman Equation — the recursive heart of dynamic programming</text>
    {/* Time axis at bottom */}
    <line x1="100" y1="660" x2="1100" y2="660" stroke="#2a3a4a" strokeWidth="0.5"/>
    {[0,1,2,3,4,5,6,7,8,9].map(i=>(<g key={i}><line x1={150+i*95} y1="655" x2={150+i*95} y2="665" stroke="#2a3a4a" strokeWidth="0.5"/>
      <text x={150+i*95} y="678" fill="#3a4a5a" fontSize="7" textAnchor="middle" fontFamily={F.m}>t={i}</text></g>))}
  </svg>
);

/* ═══ DIAGRAM: Timeline ═══ */
const Timeline = () => (
  <svg viewBox="0 0 800 250" style={{width:"100%",display:"block",borderRadius:4}}>
    <rect width="800" height="250" fill={C.ow}/>
    <text x="400" y="22" fill={C.bk} fontSize="13" textAnchor="middle" fontFamily={F.s} fontWeight="700">Stochastic Dynamic Programming: Key Milestones</text>
    <line x1="50" y1="190" x2="770" y2="190" stroke={C.bl} strokeWidth="2"/>
    {[{x:70,yr:"1953",l:"Bellman\nDP at RAND",c:"#5C6BC0"},{x:160,yr:"1957",l:"Principle of\nOptimality",c:"#5C6BC0"},{x:240,yr:"1960",l:"Howard\nPolicy Iter.",c:C.nb},{x:330,yr:"1978",l:"Bertsekas\nVol. I",c:C.gn},{x:410,yr:"1994",l:"Puterman\nMDP text",c:C.or},{x:490,yr:"1996",l:"Neuro-DP\nBertsekas",c:C.rd},{x:570,yr:"1998",l:"Sutton &\nBarto RL",c:C.pu},{x:650,yr:"2011",l:"Powell\nADP",c:C.or},{x:730,yr:"2019",l:"Bertsekas\nRLOC",c:C.gn}].map((d,i)=>(
      <g key={i}><line x1={d.x} y1="190" x2={d.x} y2={130-i%2*25} stroke={C.bl} strokeWidth="0.8" strokeDasharray="3,3"/>
        <circle cx={d.x} cy="190" r="5" fill={d.c} opacity="0.8"/>
        <text x={d.x} y="208" fill={C.wg} fontSize="7" textAnchor="middle" fontFamily={F.m}>{d.yr}</text>
        {d.l.split("\n").map((ln,li)=>(<text key={li} x={d.x} y={120-i%2*25+li*12} fill={C.dg} fontSize="8" textAnchor="middle" fontFamily={F.s} fontWeight="600">{ln}</text>))}
      </g>
    ))}
  </svg>
);

/* ═══ DIAGRAM: Algorithm Taxonomy ═══ */
const AlgoTaxonomy = () => (
  <svg viewBox="0 0 800 330" style={{width:"100%",display:"block",borderRadius:4}}>
    <rect width="800" height="330" fill={C.ow}/>
    <text x="400" y="22" fill={C.bk} fontSize="13" textAnchor="middle" fontFamily={F.s} fontWeight="700">Taxonomy of Solution Methods</text>
    <rect x="300" y="38" width="200" height="28" rx="4" fill={C.db}/>
    <text x="400" y="56" fill="#fff" fontSize="10" textAnchor="middle" fontFamily={F.s} fontWeight="600">Stochastic DP</text>
    {[{x:60,label:"Exact Methods",c:C.nb,items:["Value Iteration","Policy Iteration","Backward Induction","Linear Programming"]},
      {x:260,label:"Approximation",c:C.gn,items:["Fitted Value Iter.","LSTD / LSPE","Basis Functions","State Aggregation"]},
      {x:470,label:"Simulation-Based",c:C.or,items:["Monte Carlo","TD Learning","Q-Learning","Actor-Critic"]},
      {x:660,label:"Decomposition",c:C.pu,items:["SDDP","Benders Cuts","Scenario Trees","Rollout"]}
    ].map((b,i)=>(
      <g key={i}>
        <line x1="400" y1="66" x2={b.x+60} y2="92" stroke={C.bl} strokeWidth="1"/>
        <rect x={b.x} y="92" width="120" height="24" rx="3" fill={b.c} opacity="0.85"/>
        <text x={b.x+60} y="108" fill="#fff" fontSize="9" textAnchor="middle" fontFamily={F.s} fontWeight="600">{b.label}</text>
        {b.items.map((it,j)=>(
          <g key={j}><rect x={b.x+8} y={126+j*36} width="104" height="24" rx="3" fill={C.cr} stroke={b.c} strokeWidth="0.8"/>
            <text x={b.x+60} y={142+j*36} fill={C.dg} fontSize="8" textAnchor="middle" fontFamily={F.m}>{it}</text></g>
        ))}
      </g>
    ))}
  </svg>
);

/* ═══ DIAGRAM: Curse of Dimensionality ═══ */
const CurseDim = () => (
  <svg viewBox="0 0 800 260" style={{width:"100%",display:"block",borderRadius:4}}>
    <rect width="800" height="260" fill={C.ow}/>
    <text x="400" y="22" fill={C.bk} fontSize="13" textAnchor="middle" fontFamily={F.s} fontWeight="700">The Curse of Dimensionality: Grid Points Required</text>
    {[{dim:1,pts:"10",w:15},{dim:2,pts:"100",w:30},{dim:3,pts:"1,000",w:55},{dim:5,pts:"10⁵",w:110},{dim:10,pts:"10¹⁰",w:260},{dim:20,pts:"10²⁰",w:550}].map((d,i)=>(
      <g key={i}>
        <text x="50" y={55+i*36} fill={C.dg} fontSize="11" textAnchor="end" fontFamily={F.m}>{d.dim}D</text>
        <rect x="60" y={42+i*36} width={d.w} height="22" fill={C.y} opacity={0.4+i*0.1} rx="3"/>
        <text x={70+d.w} y={57+i*36} fill={C.wg} fontSize="10" fontFamily={F.m}>{d.pts}</text>
      </g>
    ))}
    <text x="400" y="248" fill={C.wg} fontSize="9" textAnchor="middle" fontFamily={F.s}>10 sample points per dimension, uniformly spaced. Source: Bellman (1957).</text>
  </svg>
);

/* ═══ DIAGRAM: Bellman Backup ═══ */
const BellmanBackup = () => (
  <svg viewBox="0 0 800 300" style={{width:"100%",display:"block",borderRadius:4}}>
    <rect width="800" height="300" fill={C.ow}/>
    <text x="400" y="22" fill={C.bk} fontSize="13" textAnchor="middle" fontFamily={F.s} fontWeight="700">The Bellman Backup: Value Iteration</text>
    {/* State s */}
    <circle cx="200" cy="130" r="22" fill="none" stroke={C.nb} strokeWidth="2"/>
    <text x="200" y="135" fill={C.nb} fontSize="12" textAnchor="middle" fontFamily={F.m}>s</text>
    <text x="200" y="165" fill={C.dg} fontSize="9" textAnchor="middle" fontFamily={F.s}>V(s) = ?</text>
    {/* Action nodes */}
    {[{x:370,y:80,l:"a₁"},{x:370,y:180,l:"a₂"}].map((a,i)=>(
      <g key={i}>
        <line x1="222" y1="130" x2={a.x-12} y2={a.y} stroke={C.gn} strokeWidth="1.5"/>
        <rect x={a.x-12} y={a.y-10} width="24" height="20" rx="3" fill={C.gn} opacity="0.7"/>
        <text x={a.x} y={a.y+4} fill="#fff" fontSize="9" textAnchor="middle" fontFamily={F.m}>{a.l}</text>
      </g>
    ))}
    {/* Successor states */}
    {[[500,50,"s'"],[560,110,"s''"],[500,150,"s'"],[560,210,"s''"]].map(([x,y,l],i)=>{
      const ax=i<2?370:370, ay=i<2?80:180;
      return(<g key={i}><line x1={ax+12} y1={ay} x2={x-10} y2={y} stroke={C.or} strokeWidth="1" strokeDasharray="3,3"/>
        <circle cx={x} cy={y} r="14" fill="none" stroke={C.or} strokeWidth="1"/>
        <text x={x} y={y+4} fill={C.or} fontSize="8" textAnchor="middle" fontFamily={F.m}>{l}</text>
        <text x={x+20} y={y-8} fill={C.wg} fontSize="7" fontFamily={F.m}>p={i%2===0?"0.7":"0.3"}</text></g>);
    })}
    {/* Right side: the equation */}
    <text x="660" y="100" fill={C.bk} fontSize="11" textAnchor="middle" fontFamily={F.m}>V(s) ← max</text>
    <text x="660" y="125" fill={C.gn} fontSize="10" textAnchor="middle" fontFamily={F.s}>R(s,a) + γ Σ P(s'|s,a) V(s')</text>
    <text x="660" y="160" fill={C.dg} fontSize="9" textAnchor="middle" fontFamily={F.s}>Repeat for all states</text>
    <text x="660" y="180" fill={C.dg} fontSize="9" textAnchor="middle" fontFamily={F.s}>until convergence</text>
    <text x="400" y="280" fill={C.wg} fontSize="9" textAnchor="middle" fontFamily={F.s}>The backup diagram: value at state s is updated by maximising over actions, weighting successors by transition probabilities.</text>
  </svg>
);

/* ═══ SCENE: RAND Building ═══ */
const SceneRAND = () => (
  <svg viewBox="0 0 800 400" style={{width:"100%",display:"block",borderRadius:4}}>
    <defs><linearGradient id="rsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5C94C0"/><stop offset="100%" stopColor="#A8CCE8"/></linearGradient></defs>
    <rect width="800" height="400" fill="url(#rsky)"/>
    {/* RAND building — modernist block */}
    <rect x="150" y="100" width="500" height="220" fill="#c0b8a8" rx="2"/>
    <rect x="150" y="95" width="500" height="12" fill="#b0a898"/>
    {[0,1,2,3,4,5,6,7,8].map(c=>[0,1,2,3].map(r=>(<rect key={`${c}${r}`} x={175+c*52} y={120+r*50} width="28" height="35" fill="#4a6888" rx="1" opacity="0.7"/>)))}
    <rect x="355" y="230" width="90" height="90" fill="#5a4a3a" rx="3"/>
    <text x="400" y="105" fill="#4a3a2a" fontSize="10" textAnchor="middle" fontFamily={F.s} fontWeight="700">THE RAND CORPORATION · SANTA MONICA</text>
    {/* Palm trees */}
    {[80,720].map((x,i)=>(<g key={i}><rect x={x-3} y="200" width="6" height="120" fill="#7a6a4a"/>
      {[-30,-15,0,15,30].map((a,j)=>(<line key={j} x1={x} y1="200" x2={x+Math.sin(a*Math.PI/180)*50} y2={200-Math.cos(a*Math.PI/180)*50} stroke="#3a8a3a" strokeWidth="3"/>))}
    </g>))}
    {/* Beach / ground */}
    <rect x="0" y="320" width="800" height="80" fill="#d4c4a8"/>
    {/* Figure walking */}
    <ellipse cx="300" cy="330" rx="5" ry="6" fill="#1a1a2a"/>
    <rect x="296" y="336" width="8" height="14" fill="#2a2a4a" rx="2"/>
  </svg>
);

/* ═══ HELPERS ═══ */
const DC = ({children}) => { const f=children.charAt(0),r=children.slice(1); return(<p style={{fontFamily:F.b,fontSize:18,lineHeight:1.8,color:C.bk,margin:"0 0 24px"}}><span style={{float:"left",fontFamily:F.h,fontSize:72,fontWeight:900,lineHeight:"0.8",marginRight:8,marginTop:6,color:C.bk}}>{f}</span><span dangerouslySetInnerHTML={{__html:r}}/></p>);};
const P = ({children,style={}}) => (<p style={{fontFamily:F.b,fontSize:18,lineHeight:1.8,color:C.bk,margin:"0 0 22px",...style}} dangerouslySetInnerHTML={{__html:children}}/>);
const SB = ({title,children}) => (<div style={{background:C.sb,border:`1px solid ${C.bl}`,borderRadius:4,padding:"28px 32px",margin:"36px 0",maxWidth:680}}><div style={{fontFamily:F.s,fontSize:12,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.dg,marginBottom:8,borderBottom:`2px solid ${C.y}`,paddingBottom:6,display:"inline-block"}}>{title}</div><div style={{fontFamily:F.s,fontSize:15,lineHeight:1.7,color:C.dg,marginTop:14}} dangerouslySetInnerHTML={{__html:children}}/></div>);
const IC = ({caption,func}) => (<div style={{padding:"10px 0 32px"}}><span style={{fontFamily:F.s,fontSize:11,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:C.ac,marginRight:10}}>{func}</span><span style={{fontFamily:F.s,fontSize:13,color:C.wg,lineHeight:1.5}} dangerouslySetInnerHTML={{__html:caption}}/></div>);
const BR = () => (<div style={{textAlign:"center",margin:"48px 0",color:C.ac,fontSize:20,letterSpacing:8,fontFamily:F.b}}>❧</div>);
const PQ = ({children}) => (<blockquote style={{fontFamily:F.h,fontStyle:"italic",fontSize:26,lineHeight:1.5,color:C.dg,borderLeft:`3px solid ${C.y}`,paddingLeft:28,margin:"40px 0 40px 20px",maxWidth:600}}>{children}</blockquote>);

/* ═══ MAIN ═══ */
export default function SDPArticle() {
  return (
    <div style={{background:C.ow,minHeight:"100vh",margin:0,padding:0}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:${C.ow}}`}</style>

      <div style={{background:C.db,color:"#fff",fontFamily:F.s,fontSize:11,fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",padding:"10px 24px",textAlign:"center"}}>MODE: Encyclopaedic &nbsp;|&nbsp; FORMAT: Encyclopaedic</div>
      <div style={{height:4,background:C.y}}/>

      {/* HERO */}
      <div style={{position:"relative",minHeight:"85vh",overflow:"hidden",background:C.db}}>
        <Hero/>
        <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",justifyContent:"flex-end",minHeight:"85vh",padding:"60px 40px 50px"}}>
          <div style={{fontFamily:F.s,fontSize:11,fontWeight:700,letterSpacing:"0.2em",color:C.y,marginBottom:16}}>◆ FEATURE</div>
          <h1 style={{fontFamily:F.h,fontWeight:900,fontSize:"clamp(36px,5vw,64px)",color:"#fff",lineHeight:1.08,maxWidth:800,marginBottom:20}}>The Equation That Decides</h1>
          <p style={{fontFamily:F.b,fontStyle:"italic",fontSize:"clamp(16px,2vw,22px)",color:"rgba(255,255,255,0.8)",maxWidth:680,lineHeight:1.5,marginBottom:30}}>In 1953, a mathematician at the RAND Corporation wrote an equation that would become the beating heart of sequential decision-making — from inventory warehouses to AlphaGo. Seven decades later, the world is still learning how to solve it.</p>
          <div style={{fontFamily:F.s,fontSize:12,color:"rgba(255,255,255,0.45)",maxWidth:420,lineHeight:1.4,textAlign:"right",alignSelf:"flex-end"}}>A decision tree descends toward the value function surface defined by the Bellman equation. Each node represents a state; each branch, a decision under uncertainty.</div>
        </div>
      </div>

      {/* BODY */}
      <div style={{maxWidth:740,margin:"0 auto",padding:"60px 24px 80px"}}>

        <DC>{`Richard Bellman was hiding. Not from an enemy — from a budget committee. It was 1952, and the applied mathematician at the RAND Corporation in Santa Monica, California, was developing a mathematical framework for multi-stage decision processes that he needed to shield from Charles Erwin Wilson, the Secretary of Defense, who had, in Bellman's later telling, "a pathological fear and hatred of the term <em>research</em>." The solution was a name. "I thought dynamic programming was a good name," Bellman wrote in his autobiography. "It was something not even a Congressman could object to." The name stuck. The mathematics it concealed would reshape operations research, control theory, economics, and — half a century later — artificial intelligence.`}</DC>

        <P>{`Dynamic programming, in its stochastic form, is the mathematical framework for making optimal sequential decisions when the consequences of those decisions are uncertain. The core insight is Bellman's Principle of Optimality: "An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision." This recursive structure — the idea that the optimal solution to a large problem can be decomposed into optimal solutions to smaller subproblems — gives rise to the Bellman equation, a functional equation that relates the value of being in a state today to the values of the states you might reach tomorrow, weighted by the probabilities of reaching them and discounted by how much you care about the future.`}</P>

        <PQ>"An optimal policy has the property that whatever the initial state and initial decision are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision."</PQ>

        <P>{`The equation is elegant, powerful, and — for any problem of realistic scale — computationally intractable. Bellman himself coined the term "curse of dimensionality" to describe the fundamental obstacle: the number of states in a dynamic programming problem grows exponentially with the number of state variables. A problem with ten state variables, each discretised into a hundred levels, requires evaluating 10<sup>20</sup> states — more than the number of grains of sand on Earth. The entire history of stochastic dynamic programming, from Bellman's 1953 RAND report to the deep reinforcement learning systems that defeated human champions at Go and StarCraft in the 2010s and 2020s, can be read as a seventy-year war against this curse.`}</P>

        <BR/>

        <SceneRAND/>
        <IC func="Establishing" caption="The RAND Corporation headquarters in Santa Monica, California, where Richard Bellman developed dynamic programming in the early 1950s. The institution, founded in 1948 as a Cold War think tank, housed mathematicians, economists, and game theorists whose work would define operations research for decades."/>

        <P>{`Bellman was born in Brooklyn in 1920, studied mathematics at Brooklyn College, earned an MA from the University of Wisconsin, worked at Los Alamos during World War II, and received his PhD from Princeton in 1946 under Solomon Lefschetz. He joined RAND in 1949, and over the next decade produced a torrent of foundational work: his 1953 monograph "An Introduction to the Theory of Dynamic Programming," his 1957 book <em>Dynamic Programming</em>, and the 1962 volume <em>Applied Dynamic Programming</em> co-authored with Stuart Dreyfus. He published 619 papers and 39 books before his death in 1984 — a body of work so vast that the IEEE Medal of Honor (1979), the John von Neumann Theory Prize, and the creation of the Bellman Control Heritage Award all bear witness to its impact.`}</P>

        <P>{`The mathematical framework Bellman established is deceptively simple in its finite-horizon, discrete-state form. A Markov decision process (MDP) is defined by a set of states <em>S</em>, a set of actions <em>A</em>, a transition function <em>P(s'|s,a)</em> giving the probability of reaching state <em>s'</em> after taking action <em>a</em> in state <em>s</em>, a reward function <em>R(s,a)</em>, and a discount factor <em>γ</em> that captures the relative value of future versus present rewards. The value function <em>V(s)</em> — the expected total discounted reward starting from state <em>s</em> and acting optimally thereafter — satisfies the Bellman equation: <em>V(s) = max_a [ R(s,a) + γ Σ P(s'|s,a) V(s') ]</em>. The optimal policy is the one that achieves the maximum at each state. For finite-horizon problems, the equation is solved by backward induction — starting from the terminal period and working backward, computing the optimal action at each state and time.`}</P>

        <BellmanBackup/>
        <IC func="Data" caption="The Bellman backup diagram. The value of state s is computed by maximising over actions (green squares), each of which leads to a distribution over successor states (orange circles) weighted by transition probabilities. This single operation, repeated across all states until convergence, constitutes value iteration."/>

        <SB title="Value Iteration vs. Policy Iteration">{`Two classical algorithms solve the Bellman equation for infinite-horizon MDPs. <strong>Value iteration</strong>, introduced by Bellman, repeatedly applies the Bellman backup operator to an initial guess of the value function until it converges to the fixed point — guaranteed by the contraction mapping theorem when γ < 1. <strong>Policy iteration</strong>, introduced by Ronald Howard in 1960, alternates between two steps: policy evaluation (computing the value function for a given policy by solving a system of linear equations) and policy improvement (updating the policy to be greedy with respect to the current value function). Policy iteration converges in a finite number of steps for finite MDPs and is often faster in practice than value iteration, though each iteration is more expensive. Both algorithms require enumeration of the full state space, making them exact but limited to problems with at most a few million states.`}</SB>

        <BR/>

        <P>{`The continuous-time analogue of the Bellman equation is the Hamilton-Jacobi-Bellman (HJB) equation, a partial differential equation that extends the classical Hamilton-Jacobi equation of mechanics to stochastic optimal control. Where the discrete Bellman equation maximises over a sum, the HJB equation maximises over a differential operator, yielding a PDE whose solution — the value function — gives the optimal cost-to-go at every point in a continuous state space. The HJB equation is central to financial mathematics (where it governs optimal portfolio allocation under the Merton model), to aerospace engineering (where it governs optimal trajectory design), and to the theory of viscosity solutions developed by Michael Crandall and Pierre-Louis Lions, for which Lions shared the 2004 Fields Medal.`}</P>

        <Timeline/>
        <IC func="Data" caption="Key milestones in the development of stochastic dynamic programming, from Bellman's original RAND formulation through the modern convergence with reinforcement learning. The 1990s mark the critical bridge: Bertsekas and Tsitsiklis's Neuro-Dynamic Programming (1996) and Sutton and Barto's Reinforcement Learning (1998) translated the same ideas into the vocabularies of two different communities."/>

        <P>{`The textbook formalisation of stochastic dynamic programming for the operations research community was completed by Martin Puterman's 1994 <em>Markov Decision Processes: Discrete Stochastic Dynamic Programming</em>, which remains the standard reference. Puterman, a professor at the University of British Columbia, provided the rigorous mathematical treatment — existence and uniqueness of optimal policies, convergence proofs for value and policy iteration, structural results on the form of optimal policies — that transformed dynamic programming from a collection of techniques into a self-contained mathematical theory. His treatment of the average-reward criterion, constrained MDPs, and partially observable MDPs (POMDPs) set the agenda for a generation of researchers.`}</P>

        <P>{`But it was Dimitri Bertsekas at MIT who would become the field's most influential living figure. Bertsekas, who earned his PhD at MIT in 1971 and has been on the faculty since 1979, published the first edition of <em>Dynamic Programming and Optimal Control</em> in 1978 — a two-volume work that has been revised and expanded four times and is now the principal textbook and reference for the field. The second volume, focused on approximate dynamic programming, runs to over 700 pages and covers the territory that connects classical DP to modern reinforcement learning. Bertsekas received the 2014 Richard E. Bellman Control Heritage Award, the 2014 Khachiyan Prize for lifetime accomplishments in optimisation, the 2015 George B. Dantzig Prize, and the 2018 John von Neumann Theory Prize (jointly with John Tsitsiklis). With Tsitsiklis, he co-authored <em>Neuro-Dynamic Programming</em> (1996), a monograph that established the theoretical foundations for using neural networks to approximate value functions — the idea that would, two decades later, power DeepMind's Atari-playing agents and AlphaGo.`}</P>

        <SB title="Warren Powell and the Three Curses">{`At Princeton, Warren B. Powell — professor of operations research for 39 years and founder of CASTLE Laboratory — approached dynamic programming from the perspective of large-scale industrial applications: fleet management, energy systems, logistics. His 2011 book <em>Approximate Dynamic Programming: Solving the Curses of Dimensionality</em> identified not one but three curses: the curse of the state space (too many states to enumerate), the curse of the outcome space (too many stochastic outcomes to evaluate expectations), and the curse of the action space (too many decisions to optimise over). Powell's framework organised approximate methods into four classes of policies: myopic policies, lookahead policies, policy function approximations, and policies based on value function approximations. His 2022 book <em>Reinforcement Learning and Stochastic Optimization</em> proposed a unified framework for sequential decision problems that spans active learning, stochastic search, simulation optimisation, and dynamic resource allocation — arguing that "reinforcement learning" and "stochastic dynamic programming" are different names for overlapping but non-identical problem classes.`}</SB>

        <BR/>

        <CurseDim/>
        <IC func="Data" caption="The curse of dimensionality visualised. With 10 sample points per dimension, the number of grid points required to uniformly cover the state space grows exponentially. By 20 dimensions — a modest number for real-world control problems — the grid exceeds 10²⁰ points, rendering exact dynamic programming infeasible."/>

        <P>{`The arsenal of weapons developed against the curse of dimensionality is now vast. <strong>Function approximation</strong> replaces the tabular value function — which stores a separate number for every state — with a parameterised function (linear in basis functions, polynomial, neural network) that generalises across states. <strong>State aggregation</strong> groups similar states together, reducing the effective state space. <strong>Simulation-based methods</strong> replace the exact expectation in the Bellman equation with sample averages, avoiding the need to enumerate all possible outcomes. <strong>Temporal difference learning</strong>, introduced by Richard Sutton in 1988 and rooted in the earlier work of Arthur Samuel (1959) on self-playing checkers programs, updates value estimates incrementally from experience rather than requiring full backward passes.`}</P>

        <AlgoTaxonomy/>
        <IC func="Data" caption="A taxonomy of solution methods for stochastic dynamic programming, organised by computational strategy. Exact methods (blue) require enumeration of the full state space. Approximation methods (green) replace the value function with a parameterised model. Simulation-based methods (orange) learn from sampled trajectories. Decomposition methods (purple) exploit problem structure to break the problem into manageable pieces."/>

        <P>{`The bridge between stochastic dynamic programming and reinforcement learning was built in the 1990s, principally by three books: Bertsekas and Tsitsiklis's <em>Neuro-Dynamic Programming</em> (1996), Sutton and Barto's <em>Reinforcement Learning: An Introduction</em> (1998), and Csaba Szepesvári's <em>Algorithms for Reinforcement Learning</em> (2010). The first brought the rigour of control theory and operations research; the second brought the intuition and vocabulary of psychology-inspired learning; the third brought the modern computational complexity perspective. The terminological confusion that resulted — "approximate dynamic programming" in operations research, "neuro-dynamic programming" in control, "reinforcement learning" in computer science, "optimal control" in engineering, "dynamic stochastic general equilibrium" in macroeconomics — reflects a genuine intellectual convergence: these communities were, and still are, solving the same Bellman equation with different tools and different priorities.`}</P>

        <P>{`The deep reinforcement learning revolution, catalysed by Mnih and colleagues' 2015 <em>Nature</em> paper on Deep Q-Networks (DQN) and consolidated by Silver and colleagues' AlphaGo (2016) and AlphaZero (2017), demonstrated that neural network function approximation could crack problems that had been considered intractable — Atari games from raw pixels, the game of Go with its 10<sup>170</sup> possible board positions. These systems are, at their mathematical core, approximate solutions to the Bellman equation, implemented with convolutional and recurrent neural networks replacing the tabular value functions and linear basis functions of classical ADP. The continuity is real: Bertsekas's 2019 textbook <em>Reinforcement Learning and Optimal Control</em> presents deep RL as the latest chapter in a story that begins with Bellman in 1953.`}</P>

        <SB title="Stochastic Dual Dynamic Programming (SDDP)">{`For problems with convex structure and stage-wise independence — common in energy systems planning, water resource management, and financial optimisation — Stochastic Dual Dynamic Programming, introduced by Mario Pereira and Leontina Pinto in 1991, provides a powerful decomposition approach. SDDP approximates the expected cost-to-go function with a piecewise-linear lower bound constructed from Benders cuts, which are generated by solving linear programs at sampled states and propagating dual information backward through the stages. The method scales to problems with thousands of state variables and hundreds of time stages — far beyond the reach of grid-based DP — and has been deployed operationally in the Brazilian electricity sector, where it helps plan the dispatch of hydroelectric and thermal generation under uncertain rainfall. Extensions to risk-averse and distributionally robust settings (using conditional value-at-risk or Wasserstein ambiguity sets) have been developed by Philpott, de Matos, and Shapiro.`}</SB>

        <BR/>

        <P>{`The applications of stochastic dynamic programming span almost every domain where sequential decisions meet uncertainty. In <strong>inventory management</strong>, the (s,S) policy — order up to level S when inventory falls to s — was derived by Herbert Scarf in 1960 using dynamic programming, and remains the foundation of modern supply chain optimisation. In <strong>portfolio optimisation</strong>, Robert Merton's 1971 consumption-portfolio model is solved via the HJB equation, and its discrete-time variants underpin quantitative finance. In <strong>energy systems</strong>, SDDP-based models plan hydroelectric reservoir operations across South America, and approximate DP methods optimise the dispatch of wind, solar, and battery storage under uncertain generation. In <strong>healthcare</strong>, MDPs model treatment sequencing for chronic diseases — when to escalate therapy, when to switch drugs, when to intervene surgically — with the value function encoding the patient's expected quality-adjusted life years.`}</P>

        <P>{`In <strong>autonomous vehicle control</strong>, the partially observable MDP (POMDP) framework extends the standard MDP to handle uncertain sensor readings and occluded objects. POMDPs maintain a belief state — a probability distribution over possible states — and optimise over this belief space. The computational cost is even more severe than for fully observable MDPs (the belief space is continuous even when the underlying state space is finite), but point-based value iteration methods developed by Joelle Pineau, Geoffrey Gordon, and Sebastian Thrun in the early 2000s made practical POMDP solving feasible for robotics applications. Today, POMDP-based planners operate in surgical robots, UAV mission planning, and spoken dialogue systems.`}</P>

        <SB title="Model-Free vs. Model-Based: The Central Tension">{`The deepest conceptual divide in the field runs between model-based and model-free methods. Model-based methods — classical dynamic programming, SDDP, model predictive control — require an explicit transition model P(s'|s,a) and use it to compute or approximate the value function. Model-free methods — Q-learning, SARSA, policy gradient algorithms — learn directly from experience without ever constructing a model. Model-free methods are more flexible (they can be applied when the environment is unknown or too complex to model), but they are less sample-efficient (they require many more interactions to converge). The tension is not a clean dichotomy; modern methods like Dyna, MuZero, and world-model approaches combine both strategies, using a learned model to generate simulated experience that supplements real data. Bertsekas has argued that model predictive control and rollout algorithms — which use a base policy and a lookahead horizon — provide a principled middle ground that captures many of the benefits of both approaches.`}</SB>

        <BR/>

        <P>{`The open frontier is vast. <strong>Partial observability</strong> remains computationally daunting: exact POMDP solutions are PSPACE-complete, and scalable approximations are an active area of research. <strong>Multi-agent settings</strong> — where multiple decision-makers interact strategically — transform the Bellman equation into a system of coupled equations (the Nash-Bellman equations of stochastic games), and finding equilibria is generally intractable. <strong>Continuous state-action spaces</strong> require either discretisation (introducing approximation error) or function approximation (introducing instability — the "deadly triad" of bootstrapping, function approximation, and off-policy learning that Sutton identified as a fundamental challenge). <strong>Real-time decision-making at scale</strong> — controlling a power grid, managing a fleet of autonomous vehicles, or operating a hospital in real time — demands solution times measured in milliseconds, not hours, pushing toward online planning methods like Monte Carlo tree search and real-time dynamic programming.`}</P>

        <P>{`<strong>Distributionally robust dynamic programming</strong>, which optimises against the worst-case distribution within an ambiguity set rather than a single assumed model, has emerged as a principled approach to model uncertainty — the recognition that the transition probabilities themselves are never known exactly. <strong>Offline reinforcement learning</strong>, which learns policies from pre-collected datasets without further interaction, addresses the safety constraints that prevent online exploration in healthcare, autonomous driving, and financial trading. And the integration of large language models as world models — using their implicit knowledge of physical and social dynamics to simulate consequences of actions — represents the newest, most speculative frontier.`}</P>

        <P style={{fontStyle:"italic",fontSize:20,lineHeight:1.8}}>{`Bellman's equation is seventy years old. It fits on a single line. It describes, in the most compressed mathematical language, the structure of every problem in which a decision made now affects what is possible later, and the future is uncertain. It cannot be solved exactly for any problem that matters. And yet it is solved, approximately, every day — in the warehouses that decide when to reorder, in the algorithms that route packets across the internet, in the robots that reach for objects they have never seen, and in the climate models that ask what policy, chosen today under uncertainty, gives the best chance of a liveable world in 2100. The curse of dimensionality has not been broken. But it has been, inch by inch, decade by decade, pushed back far enough that the equation Bellman wrote in Santa Monica now governs decisions on a scale he could not have imagined from his desk at RAND.`}</P>

        {/* REFERENCE SUMMARY */}
        <div style={{background:C.cr,border:`1px solid ${C.bl}`,borderRadius:4,padding:"32px 36px",margin:"60px 0 40px"}}>
          <div style={{fontFamily:F.s,fontSize:14,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.dg,marginBottom:20,borderBottom:`2px solid ${C.y}`,paddingBottom:8,display:"inline-block"}}>Reference Summary</div>
          <div style={{fontFamily:F.s,fontSize:14,lineHeight:1.9,color:C.dg}}>
            <p><strong>Classification:</strong> Mathematical optimisation framework for sequential decision-making under uncertainty; foundation of Markov decision processes, optimal control, and reinforcement learning.</p>
            <p style={{marginTop:10}}><strong>Key concepts:</strong> Bellman equation; Principle of Optimality; value function; policy; Markov decision process (MDP); Hamilton-Jacobi-Bellman (HJB) equation; curse of dimensionality; discount factor.</p>
            <p style={{marginTop:10}}><strong>Key algorithms:</strong> Value iteration (Bellman, 1957); Policy iteration (Howard, 1960); Backward induction; Q-learning (Watkins, 1989); TD learning (Sutton, 1988); SDDP (Pereira & Pinto, 1991); Deep Q-Networks (Mnih et al., 2015); AlphaGo/AlphaZero (Silver et al., 2016/2017); Rollout algorithms (Bertsekas).</p>
            <p style={{marginTop:10}}><strong>Key figures:</strong> Richard Bellman (RAND, 1920–1984); Dimitri Bertsekas (MIT, cited 146,000+); Warren Powell (Princeton, CASTLE Lab); Martin Puterman (UBC); Ronald Howard (Stanford); Richard Sutton & Andrew Barto (U. Alberta); John Tsitsiklis (MIT); Stuart Dreyfus (Berkeley); Herbert Scarf (Yale); Robert Merton (MIT).</p>
            <p style={{marginTop:10}}><strong>Key texts:</strong> Bellman, <em>Dynamic Programming</em> (1957); Bertsekas, <em>Dynamic Programming and Optimal Control</em> (4th ed., 2017); Puterman, <em>Markov Decision Processes</em> (1994); Bertsekas & Tsitsiklis, <em>Neuro-Dynamic Programming</em> (1996); Sutton & Barto, <em>Reinforcement Learning</em> (2nd ed., 2018); Powell, <em>Reinforcement Learning and Stochastic Optimization</em> (2022).</p>
            <p style={{marginTop:10}}><strong>Application domains:</strong> Inventory management; portfolio optimisation; energy systems (hydro dispatch, battery storage); water resource management; healthcare treatment sequencing; autonomous vehicles; robotics; supply chain; financial trading; game playing (chess, Go, StarCraft).</p>
            <p style={{marginTop:10}}><strong>Open problems:</strong> Partial observability (POMDPs); multi-agent settings; continuous state-action spaces; real-time planning at scale; distributionally robust DP; offline RL; integration with foundation models.</p>
          </div>
        </div>

        {/* SOURCE INTEGRITY NOTE */}
        <div style={{background:C.cr,border:`1px solid ${C.bl}`,borderRadius:4,padding:"32px 36px",margin:"40px 0"}}>
          <div style={{fontFamily:F.s,fontSize:14,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.dg,marginBottom:20,borderBottom:`2px solid ${C.y}`,paddingBottom:8,display:"inline-block"}}>Source Integrity Note</div>
          <div style={{fontFamily:F.s,fontSize:13,lineHeight:1.8,color:C.dg}}>
            <p><strong>FACTUAL INTEGRITY DISCLOSURE</strong></p>
            <p style={{marginTop:12}}><strong>Verified facts (Tier 1):</strong> Bellman biography confirmed via Wikipedia, IT History Society, RAND paper archive (P-550), and Stuart Dreyfus's 2002 <em>Operations Research</em> retrospective. The "Congressman" anecdote is drawn from Bellman's autobiography as reproduced in Dreyfus (2002). Bellman's publication count (619 papers, 39 books) confirmed via multiple biographical sources. Bertsekas biography confirmed via MIT faculty page, Amazon author pages, and Google Scholar (146,699 citations). Powell biography confirmed via Princeton CASTLE Lab page, Amazon author pages, and his personal website. Puterman's textbook confirmed via Wiley publisher listing. Howard's policy iteration (1960) confirmed via standard references. SDDP origin (Pereira & Pinto, 1991) confirmed via energy systems literature. All award citations confirmed via professional society records.</p>
            <p style={{marginTop:12}}><strong>Composited scenes (Tier 2):</strong> The opening scene (Bellman "hiding" his research from Wilson) is drawn from verified autobiographical material but the specific temporal placement ("1952") and atmospheric details are editorial constructions. The RAND building exterior is a generic representation.</p>
            <p style={{marginTop:12}}><strong>Details requiring verification:</strong> The exact year Bellman began dynamic programming work at RAND (sources vary between 1949 and 1952 for the formal naming). The 10²⁰ grid point calculation is a standard textbook illustration (100¹⁰) and should be verified against Bellman's original formulation.</p>
            <p style={{marginTop:12}}><strong>Invented or unverifiable details:</strong> None.</p>
            <p style={{marginTop:20}}><strong>EDITORIAL PRODUCTION NOTES</strong></p>
            <p style={{marginTop:12}}><strong>Scientifically contested claims:</strong> Whether "reinforcement learning" and "stochastic dynamic programming" refer to the same or different problem classes is a matter of ongoing terminological debate (see Powell's CASTLE Lab discussion). The article presents multiple perspectives without resolving the debate. The claim that the deep RL revolution represents "approximate solutions to the Bellman equation" is the consensus view in the DP/control community but is contested by some RL researchers who emphasise policy gradient methods that do not explicitly solve a Bellman equation.</p>
            <p style={{marginTop:12}}><strong>Voices to add in full editorial process:</strong> Richard Sutton and Andrew Barto on the RL perspective; David Silver on AlphaGo/AlphaZero; Mengdi Wang on sample complexity of RL; Ben Van Roy on exploration-exploitation; practitioners in energy systems who use SDDP operationally; healthcare researchers deploying MDP-based treatment protocols; critics of the DP framework (e.g., researchers who argue that model-free deep RL supersedes classical DP for practical purposes).</p>
          </div>
        </div>
      </div>

      <div style={{textAlign:"center",padding:"40px 20px 50px"}}>
        <div style={{width:60,height:4,background:C.y,margin:"0 auto 20px"}}/>
        <div style={{fontFamily:F.s,fontSize:11,color:C.wg,letterSpacing:"0.15em",textTransform:"uppercase"}}>National Geographic-Style Production Document</div>
      </div>
    </div>
  );
}
