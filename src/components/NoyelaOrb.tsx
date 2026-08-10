import { useState, useCallback } from 'react'
import orbImg from '@/imports/IMG_9781_2.png'

type OrbState  = "idle" | "listening" | "thinking" | "speaking" | "expertReview";
type OrbVariant = "original" | "lilac";

// ─── CSS keyframes ────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @media (prefers-reduced-motion: no-preference) {

    /* — Orb core — */
    @keyframes noyela-breathe {
      0%,100%{transform:scale(1)} 50%{transform:scale(1.015)}
    }
    @keyframes noyela-glow-idle   {0%,100%{opacity:.38} 50%{opacity:.62}}
    @keyframes noyela-glow-listen {0%,100%{opacity:.62} 50%{opacity:.95}}
    @keyframes noyela-glow-think  {0%,100%{opacity:.46} 60%{opacity:.72}}
    @keyframes noyela-glow-speak  {
      0%{opacity:.5}18%{opacity:.96}36%{opacity:.58}55%{opacity:.85}78%{opacity:.55}100%{opacity:.5}
    }
    @keyframes noyela-glow-expert {0%,100%{opacity:.58}50%{opacity:.68}}
    @keyframes noyela-shadow {
      0%,100%{opacity:.2; transform:translateX(-50%) scaleX(1)    scaleY(1)}
      50%    {opacity:.28;transform:translateX(-50%) scaleX(1.05) scaleY(1.2)}
    }
    @keyframes noyela-ripple-a {
      0%  {opacity:.26;transform:translateX(-50%) scale(1)}
      100%{opacity:0;  transform:translateX(-50%) scaleX(2.2) scaleY(1.7)}
    }
    @keyframes noyela-ripple-b {
      0%  {opacity:1;transform:translateX(-50%) scale(1)}
      100%{opacity:0;  transform:translateX(-50%) scaleX(1.85) scaleY(1.5)}
    }
    @keyframes noyela-highlight {
      0%  {transform:translate(-28%,-38%);opacity:.5 }
      22% {transform:translate(26%,-34%); opacity:.18}
      48% {transform:translate(30%,24%);  opacity:.28}
      72% {transform:translate(-18%,36%); opacity:.08}
      88% {transform:translate(-30%,6%);  opacity:.22}
      100%{transform:translate(-28%,-38%);opacity:.5 }
    }
    @keyframes noyela-think-rim {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes noyela-dot-a {
      0%,100%{transform:translate(0,0);    opacity:.85}
      42%    {transform:translate(4px,-7px);opacity:.3}
      70%    {transform:translate(-3px,5px);opacity:.7}
    }
    @keyframes noyela-dot-b {
      0%,100%{transform:translate(0,0);      opacity:.55}
      33%    {transform:translate(-5px,-4px); opacity:.95}
      75%    {transform:translate(4px,3px);   opacity:.4}
    }
    @keyframes noyela-dot-c {
      0%,100%{transform:translate(0,0);   opacity:.65}
      50%    {transform:translate(3px,-5px);opacity:.22}
    }
    @keyframes noyela-expert-halo {
      0%,100%{opacity:.2; transform:scale(1)}
      50%    {opacity:.32;transform:scale(1.006)}
    }
    @keyframes noyela-bar-a {from{transform:scaleY(.22)}to{transform:scaleY(1)}}
    @keyframes noyela-bar-b {from{transform:scaleY(.45)}to{transform:scaleY(.82)}}
    @keyframes noyela-bar-c {from{transform:scaleY(.14)}to{transform:scaleY(.92)}}
    @keyframes noyela-bar-d {from{transform:scaleY(.35)}to{transform:scaleY(.68)}}
    @keyframes noyela-pulse-click {
      0%{transform:scale(1);opacity:.5}50%{transform:scale(1.04);opacity:.2}100%{transform:scale(1);opacity:0}
    }
    @keyframes fade-up {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes tab-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

    /* — Cinema — */
    @keyframes cinema-breathe {
      0%,100%{transform:scale(1)} 50%{transform:scale(1.004)}
    }
    @keyframes cinema-orb-glow {
      0%,100%{opacity:.48;transform:scale(1)}
      42%    {opacity:.82;transform:scale(1.02)}
      72%    {opacity:.52;transform:scale(1.008)}
    }
    @keyframes cinema-inner-glow {
      0%,100%{opacity:.55}
      45%    {opacity:1}
      75%    {opacity:.62}
    }
    @keyframes cinema-highlight {
      0%  {transform:translate(-22%,-32%);opacity:.52}
      25% {transform:translate(20%,-26%); opacity:.2}
      50% {transform:translate(22%, 20%); opacity:.3}
      75% {transform:translate(-14%,28%); opacity:.08}
      100%{transform:translate(-22%,-32%);opacity:.52}
    }
    @keyframes cinema-ripple-a {
      0%  {opacity:.26;transform:translateX(-50%) scale(1)}
      100%{opacity:0;  transform:translateX(-50%) scaleX(3.8) scaleY(1.5)}
    }
    @keyframes cinema-ripple-b {
      0%  {opacity:.15;transform:translateX(-50%) scale(1)}
      100%{opacity:0;  transform:translateX(-50%) scaleX(3.0) scaleY(1.2)}
    }
    @keyframes cinema-face-light {
      0%,100%{opacity:0}
      42%    {opacity:1}
      72%    {opacity:.5}
    }
    @keyframes cinema-atmos {
      0%,100%{opacity:.65}
      50%    {opacity:.88}
    }
    @keyframes cinema-blink-boy {
      0%,27.7%{transform:scaleY(0)}
      28.3%   {transform:scaleY(1)}
      28.9%   {transform:scaleY(0)}
      73.7%   {transform:scaleY(0)}
      74.3%   {transform:scaleY(1)}
      74.9%   {transform:scaleY(0)}
      100%    {transform:scaleY(0)}
    }
    @keyframes cinema-blink-girl {
      0%,44.5%{transform:scaleY(0)}
      45.2%   {transform:scaleY(1)}
      45.9%   {transform:scaleY(0)}
      87.5%   {transform:scaleY(0)}
      88.2%   {transform:scaleY(1)}
      88.9%   {transform:scaleY(0)}
      100%    {transform:scaleY(0)}
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .noyela-breathe-el   {animation:none!important}
    .noyela-ripple-el    {display:none!important}
    .noyela-highlight-el {display:none!important}
    .noyela-shadow-el    {animation:none!important}
    .cinema-anim         {animation:none!important}
  }
`;

type Palette = {
  r:number;g:number;b:number;
  lr:number;lg:number;lb:number;
  waveform:string;
  highlightCenter:string;highlightMid:string;
  thinkRim:string;dotColor:string;dotGlow:string;expertBorder:string;
};

const PALETTES:Record<OrbVariant,Palette>={
  original:{r:139,g:92,b:246,lr:200,lg:172,lb:255,
    waveform:"rgba(58,22,158,0.96)",
    highlightCenter:"rgba(225,205,255,0.72)",highlightMid:"rgba(195,165,255,0.38)",
    thinkRim:"conic-gradient(transparent 0deg,transparent 155deg,rgba(210,185,255,.5) 170deg,rgba(235,225,255,.7) 180deg,rgba(210,185,255,.5) 190deg,transparent 205deg,transparent 360deg)",
    dotColor:"rgba(200,172,255,0.95)",dotGlow:"0 0 8px 4px rgba(175,140,255,.5)",expertBorder:"rgba(175,148,255,.3)"},
  lilac:{r:190,g:148,b:255,lr:225,lg:205,lb:255,
    waveform:"rgba(108,62,196,0.94)",
    highlightCenter:"rgba(242,232,255,0.78)",highlightMid:"rgba(218,198,255,0.42)",
    thinkRim:"conic-gradient(transparent 0deg,transparent 155deg,rgba(228,210,255,.55) 170deg,rgba(245,238,255,.75) 180deg,rgba(228,210,255,.55) 190deg,transparent 205deg,transparent 360deg)",
    dotColor:"rgba(225,205,255,0.95)",dotGlow:"0 0 10px 5px rgba(205,178,255,.45)",expertBorder:"rgba(210,185,255,.32)"},
};


type StateCfg={glowAnim:string;breatheDuration:string;dropShadow:string;hoverShadow:string;glowColor:string};
function buildStateCfg(p:Palette):Record<OrbState,StateCfg>{
  const c=(a:number)=>`rgba(${p.r},${p.g},${p.b},${a})`;
  const lc=(a:number)=>`rgba(${p.lr},${p.lg},${p.lb},${a})`;
  return{
    idle:{glowAnim:"noyela-glow-idle 7s ease-in-out infinite",breatheDuration:"7s",
      dropShadow:`drop-shadow(0 0 14px ${c(.32)}) drop-shadow(0 3px 7px ${c(.15)})`,
      hoverShadow:`drop-shadow(0 0 28px ${c(.7)}) drop-shadow(0 5px 14px ${c(.34)})`,glowColor:c(.2)},
    listening:{glowAnim:"noyela-glow-listen 3.5s ease-in-out infinite",breatheDuration:"5s",
      dropShadow:`drop-shadow(0 0 22px ${c(.58)}) drop-shadow(0 3px 9px ${c(.26)})`,
      hoverShadow:`drop-shadow(0 0 32px ${c(.75)}) drop-shadow(0 5px 14px ${c(.38)})`,glowColor:c(.25)},
    thinking:{glowAnim:"noyela-glow-think 9s ease-in-out infinite",breatheDuration:"9s",
      dropShadow:`drop-shadow(0 0 18px ${c(.44)}) drop-shadow(0 3px 7px ${c(.2)})`,
      hoverShadow:`drop-shadow(0 0 28px ${c(.68)}) drop-shadow(0 5px 14px ${c(.32)})`,glowColor:c(.2)},
    speaking:{glowAnim:"noyela-glow-speak 2.4s ease-in-out infinite",breatheDuration:"4s",
      dropShadow:`drop-shadow(0 0 26px ${c(.65)}) drop-shadow(0 3px 11px ${c(.32)})`,
      hoverShadow:`drop-shadow(0 0 34px ${c(.8)}) drop-shadow(0 5px 16px ${c(.4)})`,glowColor:c(.28)},
    expertReview:{glowAnim:"noyela-glow-expert 5s ease-in-out infinite",breatheDuration:"8s",
      dropShadow:`drop-shadow(0 0 20px ${c(.52)}) drop-shadow(0 0 42px ${lc(.12)})`,
      hoverShadow:`drop-shadow(0 0 30px ${c(.7)}) drop-shadow(0 0 52px ${lc(.2)})`,glowColor:lc(.2)},
  };
}


export function WaveformBars({state,fill}:{state:OrbState;fill:string}){
  const BARS=9,BAR_W=3,GAP=4;
  const totalW=BARS*(BAR_W+GAP)-GAP,maxBarH=state==="speaking"?20:12,SVG_H=26;
  const anims=["noyela-bar-a","noyela-bar-b","noyela-bar-c","noyela-bar-d"];
  const durs=[.55,.72,.48,.64,.58,.7,.5,.66,.6];
  return(
    <svg width={totalW} height={SVG_H} viewBox={`0 0 ${totalW} ${SVG_H}`} style={{overflow:"visible"}}>
      {Array.from({length:BARS}).map((_,i)=>(
        <rect key={i} x={i*(BAR_W+GAP)} y={(SVG_H-maxBarH)/2} width={BAR_W} height={maxBarH} rx={1.5} fill={fill}
          style={{transformBox:"fill-box",transformOrigin:"center",
            animation:`${anims[i%anims.length]} ${durs[i]}s ease-in-out infinite alternate`,
            animationDelay:`${i*.06}s`}}/>
      ))}
    </svg>
  );
}

export function NoyelaOrb({state="thinking",size=240,variant="original",onClick}:
  {state?:OrbState;size?:number;variant?:OrbVariant;onClick?:()=>void}){
  const[hovered,setHovered]=useState(false);
  const[clicking,setClicking]=useState(false);
  const palette=PALETTES[variant];
  const cfg=buildStateCfg(palette)[state];
  const W=Math.round(size*.82),H=size;
  const showWaveform=state==="listening"||state==="speaking";
  const showThinkRim=state==="thinking";
  const showDots=state==="thinking";
  const showExpert=state==="expertReview";
  const WAVE_H=showWaveform?42:0;
  const c=(a:number)=>`rgba(${palette.r},${palette.g},${palette.b},${a})`;
  function handleClick(){setClicking(true);setTimeout(()=>setClicking(false),600);onClick?.();}
  return(
    <div 
    
    style={{position:"relative",width:W,height:H+24+WAVE_H,cursor:onClick?"pointer":"default"}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={handleClick}>

        <style>{KEYFRAMES}</style>
      <style>{`
        html{scroll-behavior:smooth}*{box-sizing:border-box}
        body{overflow-x:hidden}::-webkit-scrollbar{width:0}
        a:hover{opacity:.72}
        button:focus-visible{outline:2px solid rgba(139,92,246,.4);outline-offset:2px}
        input:focus{border-color:rgba(139,92,246,.4)!important;box-shadow:0 0 0 3px rgba(139,92,246,.07)}
        @media(max-width:760px){
          nav{padding:18px 20px!important}
          nav>div:last-child a:first-child{display:none}
          section[id="states"]>div>div{grid-template-columns:1fr!important;gap:48px!important}
          footer{flex-direction:column;gap:12px;text-align:center;padding:28px 20px!important}
        }
      `}</style>
      <div className="noyela-shadow-el" style={{position:"absolute",bottom:WAVE_H+4,left:"50%",
        width:W*.66,height:12,background:`radial-gradient(ellipse,${c(.28)} 0%,transparent 74%)`,
        borderRadius:"50%",animation:`noyela-shadow ${cfg.breatheDuration} ease-in-out infinite`,pointerEvents:"none"}}/>
      {["noyela-ripple-a 5.5s ease-out infinite 0s","noyela-ripple-b 5.5s ease-out infinite 2.4s"].map((anim,i)=>(
        <div key={i} className="noyela-ripple-el" style={{position:"absolute",bottom:WAVE_H,left:"50%",
          width:W*.62,height:10,border:`1px solid ${c(.22)}`,borderRadius:"50%",animation:anim,pointerEvents:"none"}}/>
      ))}
      {clicking&&<div style={{position:"absolute",top:"50%",left:"50%",width:W*1.1,height:H*1.1,
        borderRadius:"50%",border:`2px solid ${c(.5)}`,transform:"translate(-50%,-50%)",
        animation:"noyela-pulse-click .55s ease-out forwards",pointerEvents:"none"}}/>}
      <div style={{position:"absolute",top:0,left:0,width:W,height:H,
        background:`radial-gradient(ellipse 62% 52% at 50% 50%,${cfg.glowColor} 0%,transparent 70%)`,
        animation:cfg.glowAnim,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,width:W,height:H,
        transform:hovered?"translateY(-3px)":"translateY(0px)",
        transition:"transform 380ms cubic-bezier(.34,1.2,.64,1)"}}>
        <div className="noyela-breathe-el" style={{width:"100%",height:"100%",
          animation:`noyela-breathe ${cfg.breatheDuration} ease-in-out infinite`}}>
          <img src={orbImg} alt="NOYELA oval"
            style={{width:"100%",height:"100%",objectFit:"contain",
              filter:hovered?cfg.hoverShadow:cfg.dropShadow,
              transition:"filter 380ms ease",display:"block"}}/>
          <div className="noyela-highlight-el" style={{position:"absolute",inset:0,
            clipPath:"ellipse(50% 50% at 50% 50%)",pointerEvents:"none"}}>
            <div style={{position:"absolute",width:"52%",height:"40%",top:"30%",left:"24%",
              background:`radial-gradient(ellipse,${palette.highlightCenter} 0%,${palette.highlightMid} 40%,transparent 70%)`,
              animation:"noyela-highlight 10s ease-in-out infinite"}}/>
          </div>
          {showThinkRim&&<div style={{position:"absolute",inset:-3,borderRadius:"50%",
            background:palette.thinkRim,animation:"noyela-think-rim 9s linear infinite",
            pointerEvents:"none",opacity:.65}}/>}
          {showDots&&[
            {top:"27%",left:"19%",anim:"noyela-dot-a 4.5s ease-in-out infinite",delay:"0s"},
            {top:"54%",left:"74%",anim:"noyela-dot-b 5.2s ease-in-out infinite",delay:".9s"},
            {top:"71%",left:"34%",anim:"noyela-dot-c 3.8s ease-in-out infinite",delay:"1.6s"},
          ].map((d,i)=>(
            <div key={i} style={{position:"absolute",top:d.top,left:d.left,width:5,height:5,
              borderRadius:"50%",background:palette.dotColor,boxShadow:palette.dotGlow,
              animation:d.anim,animationDelay:d.delay,pointerEvents:"none"}}/>
          ))}
        </div>
        {showExpert&&<div style={{position:"absolute",inset:-7,
          border:`1px solid ${palette.expertBorder}`,borderRadius:"50%",
          animation:"noyela-expert-halo 4.5s ease-in-out infinite",pointerEvents:"none"}}/>}
      </div>
      {showWaveform&&<div style={{position:"absolute",bottom:4,left:"50%",transform:"translateX(-50%)"}}>
        <WaveformBars state={state} fill={variant==="lilac"?"rgba(108,62,196,0.94)":"rgba(58,22,158,0.96)"}/>
      </div>}
    </div>
  );
}