import {useEffect,useState} from 'react'
import {useHand} from '@/store/handStore'
const N=['INDEX','MIDDLE','RING','PINKY','THUMB'],card='bg-[#161616] rounded-xl',lab='text-[9pt] uppercase tracking-[0.2em] text-[#555]'
function Spark(){const [d,setD]=useState<number[]>([])
 useEffect(()=>{const id=setInterval(()=>setD(p=>[...p.slice(-449),useHand.getState().emg]),66);return()=>clearInterval(id)},[])
 const o=450-d.length,p=d.map((v,i)=>`${i+o},${44-v*.4}`).join(' L')
 return <div className={`${card} px-4 py-3 h-[80px]`}><div className={lab}>EMG ACTIVITY</div>
 <svg className="w-full h-[40px] mt-1" viewBox="0 0 450 48" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0F6E5E" stopOpacity=".15"/><stop offset="1" stopColor="#0F6E5E" stopOpacity="0"/></linearGradient></defs>
 {d.length>1&&<><path d={`M${o},48 L${p} L449,48Z`} fill="url(#g)"/><path d={`M${p}`} fill="none" stroke="#0F6E5E" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/></>}</svg></div>}
export default function MetricsPanel(){
 const s=useHand(),[now,setNow]=useState(Date.now()),[ask,setAsk]=useState(false)
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[])
 const sec=Math.max(0,Math.floor(((s.sessionEnd??now)-s.sessionStart)/1000)),tm=`${String((sec/60)|0).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`
 const c=(k:string)=>s.repHistory.filter(r=>r===k).length,end=()=>{if(s.sessionEnd){s.reset();setAsk(false)}else if(!ask)setAsk(true);else{s.set({sessionEnd:Date.now()});setAsk(false)}}
 const cell=(l:string,v:any,st?:any)=><div style={st} className="rounded-md"><div className="text-[9pt] uppercase tracking-[0.15em] text-[#444]">{l}</div><div className="text-[18pt] text-[#f0f0f0]">{v}</div></div>
 return <aside className="w-[30vw] h-full bg-[#111] border-l border-[#1f1f1f] flex flex-col font-mono overflow-hidden" style={{padding:'clamp(12px,2.2vh,24px)',gap:'clamp(8px,1.8vh,24px)'}}>
  <div className="flex justify-between items-baseline"><span className={`${lab} tracking-[0.3em]`}>{s.exerciseName}</span><span className="text-[12pt] text-[#888]">{tm}</span></div>
  <div className={card} style={{padding:'clamp(12px,2vh,20px)'}}><div className={lab}>REP</div>
   <div className="leading-none"><span className="text-[52pt] text-[#f0f0f0]">{String(s.repCount).padStart(2,'0')}</span><span className="text-[20pt] text-[#333]"> / {s.targetReps}</span></div>
   <div className="text-[11pt] italic text-[#666] mt-1">{s.exerciseName}</div>
   <div className="h-[3px] rounded-full bg-[#1f1f1f] mt-3"><div className="h-full rounded-full bg-[#0F6E5E] transition-all duration-300 ease-out" style={{width:`${s.repCount/s.targetReps*100}%`}}/></div>
   <div className="text-[9pt] mt-2 flex gap-3"><span style={{color:'#2ea853'}}>● {c('correct')} correct</span><span style={{color:'#f5a623'}}>● {c('partial')} partial</span><span style={{color:'#d9534f'}}>● {c('missed')} missed</span></div></div>
  <div className={card} style={{padding:'clamp(12px,2vh,20px)'}}><div className={`${lab} mb-3`}>FINGERS</div>
   {N.map((n,i)=>{const a=Math.round(s.fingers[i]),dot=a>=65&&a<=85?'#2ea853':a>=50?'#f5a623':'#555'
    return <div key={n} className={`flex items-center h-7 ${i===4?'border-t border-[#1a1a1a]':''}`}><span className="w-1.5 h-1.5 rounded-full mr-2" style={{background:dot}}/>
    <span className="w-12 text-[9pt] text-[#555]">{n}</span><div className="flex-1 h-[2px] bg-[#1a1a1a] mx-2"><div className="h-full" style={{width:`${a/90*100}%`,background:'linear-gradient(90deg,#0a4f44,#0F6E5E)',transition:'width 100ms ease-out'}}/></div>
    <span className="w-9 text-right text-[11pt] text-[#0F6E5E]">{a}°</span></div>})}</div>
  <div className={`${card} grid grid-cols-2 gap-4`} style={{padding:'clamp(12px,2vh,20px)'}}>
   {cell('AVG ROM',`${Math.round(s.avgROM)}°`)}{cell('CONSISTENCY',`${Math.round(s.consistency)}%`)}{cell('MOVE TIME',`${s.moveTime.toFixed(1)}s`)}
   {s.emgLost?cell('EMG SYNC','⚠ –',{color:'#f5a623',border:'1px solid #f5a623',padding:'0 6px'}):cell('EMG SYNC',<span style={{color:'#2ea853'}}>✓ {Math.round(s.emgSync)}%</span>)}</div>
  <Spark/>
  <button onClick={end} className="mt-auto w-full py-3 text-[12pt] uppercase tracking-[0.2em] border border-[#2a2a2a] text-[#555] hover:border-[#0F6E5E] hover:text-[#0F6E5E] transition-colors duration-200 rounded-md">{s.sessionEnd?'NEW SESSION':ask?'CONFIRM END?':'END SESSION'}</button></aside>}
