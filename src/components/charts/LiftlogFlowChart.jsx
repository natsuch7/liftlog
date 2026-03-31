import { useEffect, useState } from "react";
const phases = [
  { number:"01", label:"蓄積期", en:"ACCUMULATION", weeks:"Week 1–3", intensity:"65–75%", description:"重量に慣れる\nフォームを磨く" },
  { number:"02", label:"強化期", en:"INTENSIFICATION", weeks:"Week 4–6", intensity:"75–87%", description:"限界に挑戦\n神経系を鍛える" },
  { number:"03", label:"実現期", en:"REALIZATION", weeks:"Week 7–9", intensity:"87–100%", description:"疲労を抜く\n記録を更新する" },
];
export default function LiftlogFlowChart() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);
  return (
    <div style={{ width:"100%", maxWidth:560, margin:"28px auto", fontFamily:"'Courier New',monospace" }}>
      <div style={{ width:"100%", aspectRatio:"1/1", background:"#0a0a0a", position:"relative", overflow:"hidden", boxShadow:"0 0 60px rgba(230,57,70,0.12)", boxSizing:"border-box" }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:5,background:"linear-gradient(to right,#e63946,transparent)" }} />
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(230,57,70,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(230,57,70,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none" }} />
        <div style={{ position:"relative",zIndex:2,padding:"7%",height:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
          <div style={{ opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(-10px)",transition:"all 0.5s ease" }}>
            <div style={{ color:"#e63946",fontSize:"clamp(7px,1.6vw,12px)",letterSpacing:"0.3em",fontWeight:700,marginBottom:4 }}>LIFTLOG — 9 WEEK PROGRAM</div>
            <div style={{ color:"#fff",fontSize:"clamp(18px,5vw,40px)",fontWeight:900,lineHeight:1.05,fontFamily:"Georgia,serif",letterSpacing:"-0.02em" }}>強くなる人は<br/><span style={{color:"#e63946"}}>時期を分けている。</span></div>
          </div>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:0,flex:1,margin:"5% 0" }}>
            {phases.map((phase,i) => (
              <div key={i} style={{ display:"flex",alignItems:"center",flex:i<phases.length-1?"1":"0 0 auto" }}>
                <div style={{ opacity:visible?1:0,transform:visible?"scale(1)":"scale(0.85)",transition:`all 0.5s ease ${0.15+i*0.2}s`,background:i===2?"rgba(230,57,70,0.12)":"rgba(255,255,255,0.03)",border:i===2?"1px solid rgba(230,57,70,0.5)":"1px solid rgba(255,255,255,0.07)",padding:"clamp(10px,2.5vw,20px) clamp(8px,2vw,16px)",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",minWidth:"clamp(70px,18vw,145px)",position:"relative" }}>
                  <div style={{ color:i===2?"rgba(230,57,70,0.5)":"rgba(255,255,255,0.08)",fontSize:"clamp(28px,7.5vw,62px)",fontWeight:900,lineHeight:1,fontFamily:"Georgia,serif",marginBottom:2 }}>{phase.number}</div>
                  <div style={{ color:i===2?"#e63946":"#fff",fontSize:"clamp(11px,2.8vw,22px)",fontWeight:800,letterSpacing:"-0.01em",marginBottom:4 }}>{phase.label}</div>
                  <div style={{ width:30,height:1,background:i===2?"rgba(230,57,70,0.6)":"rgba(255,255,255,0.12)",margin:"4px 0" }} />
                  <div style={{ color:"#e63946",fontSize:"clamp(10px,2.5vw,19px)",fontWeight:700,fontFamily:"Georgia,serif",marginBottom:2 }}>{phase.intensity}</div>
                  <div style={{ color:"#555",fontSize:"clamp(6px,1.2vw,9px)",letterSpacing:"0.1em",marginBottom:6 }}>{phase.weeks}</div>
                  <div style={{ color:"#777",fontSize:"clamp(7px,1.5vw,11px)",lineHeight:1.5,whiteSpace:"pre-line" }}>{phase.description}</div>
                  {i===2&&<div style={{ position:"absolute",top:-10,right:-8,background:"#e63946",color:"#fff",fontSize:"clamp(5px,1.1vw,8px)",fontWeight:700,letterSpacing:"0.1em",padding:"2px 6px" }}>PEAK</div>}
                </div>
                {i<phases.length-1&&(
                  <div style={{ opacity:visible?1:0,transition:`all 0.4s ease ${0.3+i*0.2}s`,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 clamp(4px,1vw,8px)",flexShrink:0 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:0 }}>
                      <div style={{ width:"clamp(16px,4vw,32px)",height:1,background:"linear-gradient(to right,#333,#e63946)" }} />
                      <div style={{ width:0,height:0,borderTop:"clamp(4px,1vw,6px) solid transparent",borderBottom:"clamp(4px,1vw,6px) solid transparent",borderLeft:"clamp(6px,1.5vw,10px) solid #e63946" }} />
                    </div>
                    <div style={{ color:"#333",fontSize:"clamp(5px,1vw,7px)",letterSpacing:"0.1em",marginTop:4 }}>3W</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ opacity:visible?1:0,transition:"all 0.5s ease 0.8s",display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"4%" }}>
            <div>
              <div style={{ color:"#e63946",fontSize:"clamp(8px,1.8vw,14px)",fontWeight:700,letterSpacing:"0.02em" }}>この波を自動で設計する</div>
              <div style={{ color:"#444",fontSize:"clamp(6px,1.2vw,9px)",letterSpacing:"0.06em",marginTop:2 }}>liftlog-theta.vercel.app — 完全無料</div>
            </div>
            <span style={{ color:"#e63946",fontSize:"clamp(10px,2.2vw,18px)",fontWeight:900,letterSpacing:"0.12em" }}>LIFTLOG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
