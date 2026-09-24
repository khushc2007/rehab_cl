import {useEffect,useRef,useState} from 'react'
import HandScene from './hand/HandScene'
import MetricsPanel,{EXERCISES,Mode,Ex} from './MetricsPanel'
import SimulationPanel from './SimulationPanel'
import Link from 'next/link'
import {autoFrame} from '@/lib/simExercises'
import {useWebSocket} from '@/hooks/useWebSocket'
import {useRepDetection} from '@/hooks/useRepDetection'
import {useHand,sensorRef} from '@/store/handStore'
const avg=(a:number[])=>a.reduce((x,y)=>x+y,0)/a.length
const saved={mode:'idle' as Mode,sel:EXERCISES[0],tremor:false} // survives navigating to other pages and back
export default function SessionPage(){
 useWebSocket();useRepDetection()
 const [mode,setMode]=useState<Mode>(saved.mode),[sel,setSel]=useState<Ex>(saved.sel),[tremor,setTremor]=useState(saved.tremor),mr=useRef<Mode>(saved.mode)
 const go=(m:Mode)=>{saved.mode=m;mr.current=m;setMode(m)}
 const pick=(e:Ex)=>{saved.sel=e;setSel(e)},trem=(v:boolean)=>{saved.tremor=v;setTremor(v)}
 // useRepDetection skips counting while store.sessionEnd is set, so "idle/done" = sessionEnd set; START clears it via reset().
 useEffect(()=>{if(saved.mode!=='active')useHand.getState().set({sessionEnd:Date.now()})},[])
 useEffect(()=>useHand.subscribe(s=>{if(mr.current==='active'&&s.repCount>0&&s.repCount>=s.targetReps){go('done');useHand.getState().set({sessionEnd:Date.now()})}}),[])
 const start=()=>{const st=useHand.getState();st.set({exerciseName:sel.name,targetReps:sel.reps});st.reset();trem(false);go('active')}
 const stop=()=>{useHand.getState().set({sessionEnd:Date.now()});go('done')}
 useEffect(()=>{const b:number[]=[] // tremor: 15-sample window, jitter = median |Δ| / 0.954 (robust std; ignores single steps)
  const id=setInterval(()=>{const f=sensorRef.current.f;b.push(f[0]);if(b.length>15)b.shift()
   if(mr.current!=='active'||b.length<15)return
   const d=b.slice(1).map((x,i)=>Math.abs(x-b[i])).sort((x,y)=>x-y)
   if(d[7]/.954>4&&avg(f.slice(0,4))>50)trem(true)},50);return()=>clearInterval(id)},[])
  useEffect(()=>{let raf=0
  const loop=()=>{const st=useHand.getState()
   if(st.simMode){const s=st.sim,now=Date.now();let f=s.f.slice(),e=Math.max(s.emg,avg(f.slice(0,4))/90*70),pitch=s.pitch
    if(s.auto){const r=autoFrame(s.preset||'FINGER_FLEXION',now/1000);f=r.f;e=r.emg;pitch=r.pitch} // no preset -> flexion cycle
    const n=()=>s.noiseOn?Math.sin(now/200)*s.noise*.5+(Math.random()-.5)*s.noise:0
    sensorRef.current={t:now,f:f.map(v=>Math.max(0,Math.min(90,v+n()))),e:Math.max(0,Math.min(100,e+n()*2)),roll:s.roll,pitch,yaw:s.yaw,bat:100}}
   raf=requestAnimationFrame(loop)}
  raf=requestAnimationFrame(loop);return()=>cancelAnimationFrame(raf)},[])
 return <div className="h-full w-full overflow-hidden bg-[#0a0a0a] flex"><div className="w-[70%] h-full relative"><HandScene/><Link href="/analytics" className="absolute top-4 left-24 font-mono text-[9pt] text-[#555] hover:text-[#0F6E5E]">← EXIT</Link></div>
  <MetricsPanel mode={mode} sel={sel} onSelect={pick} onStart={start} onStop={stop} tremor={tremor}/><SimulationPanel/></div>}
