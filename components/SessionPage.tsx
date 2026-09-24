import {useEffect} from 'react'
import HandScene from './hand/HandScene'
import MetricsPanel from './MetricsPanel'
import SimulationPanel from './SimulationPanel'
import {useWebSocket} from '@/hooks/useWebSocket'
import {useRepDetection} from '@/hooks/useRepDetection'
import {useHand,sensorRef} from '@/store/handStore'
const avg=(a:number[])=>a.reduce((x,y)=>x+y,0)/a.length
export default function SessionPage(){
 useWebSocket();useRepDetection()
 useEffect(()=>{let raf=0
  const loop=()=>{const st=useHand.getState()
   if(st.simMode){const s=st.sim,now=Date.now();let f=s.f.slice()
    if(s.auto){const v=((now/2000)|0)%3?75:0;f=[v,v,v,v,v*.4]} // OPEN -> CLOSE -> HOLD, 2s each
    const n=()=>s.noiseOn?Math.sin(now/200)*s.noise*.5+(Math.random()-.5)*s.noise:0
    f=f.map(a=>Math.max(0,Math.min(90,a+n())))
    sensorRef.current={t:now,f,e:Math.min(100,Math.max(s.emg,avg(f.slice(0,4))/90*70)+n()*2),roll:s.roll+(s.preset==='WAVE'?Math.sin(now/400)*25:0),pitch:s.pitch,yaw:s.yaw,bat:100}}
   raf=requestAnimationFrame(loop)}
  raf=requestAnimationFrame(loop);return()=>cancelAnimationFrame(raf)},[])
 return <div className="h-screen w-screen overflow-hidden bg-[#0a0a0a] flex"><div className="w-[70vw] h-full"><HandScene/></div><MetricsPanel/><SimulationPanel/></div>}
