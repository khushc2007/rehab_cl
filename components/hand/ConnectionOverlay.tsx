import {useHand} from '@/store/handStore'
export default function ConnectionOverlay(){
 const sim=useHand(s=>s.simMode),c=useHand(s=>s.connected)
 const [t,col]=sim?['SIM','#0F6E5E']:c?['LIVE','#2ea853']:['OFFLINE','#d9534f']
 return <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9pt]" style={{color:col}}><span className="w-1.5 h-1.5 rounded-full" style={{background:col}}/>{t}</div>}
