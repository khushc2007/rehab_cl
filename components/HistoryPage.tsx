'use client'
import {useState} from 'react'
import Link from 'next/link'
const G='#0F6E5E',TABS=['Session Overview','Detailed Analytics','EMG Analysis','Comparison','Raw Data']
const Ic=({d,c='text-gray-400',s=20}:any)=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={c}><path d={d}/></svg>
const P={user:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',cal:'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4',hand:'M8 13V5a1.5 1.5 0 0 1 3 0v6M11 10V3.5a1.5 1.5 0 0 1 3 0V10M14 10V5a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.5-1.5L8 13',clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',chart:'M3 3v18h18M7 15l4-4 3 3 5-6',pen:'M4 20h4L19 9l-4-4L4 16z',doc:'M14 3H6v18h12V7zM14 3v4h4',ok:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6'}
const DATES=['Sep 18','Sep 20','Sep 22','Sep 23'],ROM=[70,72,74,76],CON=[72,77,85,91],REPS=[6,8,9,10],XS=[60,240,420,600]
const FING=[['Index',77,92],['Middle',78,91],['Ring',76,90],['Pinky',74,88]]
const Y=(v:number)=>170-((v-60)/25)*150
const series=[{n:'Average ROM (°)',c:G,w:2.5,r:5,v:ROM.map(Y)},{n:'Consistency (%)',c:'#3b82f6',w:2,r:4,v:CON.map(v=>Y(60+(v-60)/40*25))},{n:'Reps (out of 10, scaled)',c:'#22c55e',w:1.5,r:4,dash:'5 3',v:REPS.map(r=>Y(60+(r-5)*4.2))}]
const curve=(ys:number[])=>{const p=ys.map((y,i)=>[XS[i],y]);let d=`M${p[0][0]},${p[0][1]}`
 for(let i=0;i<p.length-1;i++){const a=p[i-1]??p[i],b=p[i],c=p[i+1],e=p[i+2]??c;d+=` C${b[0]+(c[0]-a[0])/6},${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6},${c[1]-(e[1]-b[1])/6} ${c[0]},${c[1]}`}return d}
const Card=({children,cls=''}:any)=><div className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-5 ${cls}`}>{children}</div>
const Head=({i,t,s,right}:any)=><div className="flex items-start justify-between"><div className="flex items-center gap-3"><Ic d={i} c="text-[#0F6E5E]"/><div><div className="text-[16pt] font-bold text-gray-900">{t}</div><div className="text-[11pt] text-gray-500">{s}</div></div></div>{right}</div>
function Stat({t,v,sub,pct,col,ic,icc,vc='text-gray-900'}:any){return <div className="relative"><div className="text-[12pt] text-gray-500">{t}</div>
 <div className={`text-[32pt] font-bold font-mono mt-1 ${vc}`}>{v}{sub&&<span className="text-[11pt] font-normal text-gray-500 font-sans ml-2">{sub}</span>}</div>
 <div className="h-2 bg-gray-100 rounded-full mt-2"><div className="h-full rounded-full" style={{width:`${pct}%`,background:col}}/></div><Ic d={ic} c={`absolute top-0 right-0 ${icc}`} s={24}/></div>}
export default function HistoryPage(){
 const [tab,setTab]=useState(0),[h,setH]=useState<number|null>(null),[edit,setEdit]=useState(false)
 const [notes,setNotes]=useState('Session quality was excellent. Patient achieved consistent ROM across all fingers. No tremor detected. Ready to progress to next exercise level.'),[draft,setDraft]=useState(notes),[stamp,setStamp]=useState('Sep 23, 2026, 2:54 PM by Dr. Smith')
 const save=()=>{setNotes(draft);setStamp(new Date().toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'})+' by Dr. Smith');setEdit(false)}
 const info=[[P.user,'Patient ID','024','Male • 26 yrs','Post-Stroke Rehabilitation'],[P.cal,'Session Date & Time','Sep 23, 2026','2:47 PM',''],[P.hand,'Exercise Type','Finger Flexion','(Grip & Release)','Level 1 — Basic'],[P.clock,'Session Duration','4:23','(mm:ss)','']]
 return <div className="px-8 py-6 max-w-[1200px]">
  <div className="text-[9pt] text-gray-400 flex gap-2"><Link href="/history" className="hover:text-gray-600">Patients</Link>›<Link href="/history" className="hover:text-gray-600">Patient 024</Link>›<Link href="/history" className="hover:text-gray-600">Session History</Link>›<span className="font-bold text-gray-700">Sep 23, 2026</span></div>
  <div className="flex justify-between items-start mt-4"><div><h1 className="text-[28pt] font-bold text-gray-900 leading-tight">Session Report</h1><div className="text-[13pt] text-gray-500 mt-1">Patient Rehabilitation Session Details</div></div>
   <div className="text-right text-[11pt] text-gray-400"><b className="text-gray-600">RehabGrip</b><br/>Move Better. Live Fuller.</div></div>
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mt-6 grid grid-cols-5 gap-4">
   {info.map(([d,l,v,a,b],i)=><div key={i} className="border-r border-gray-100 last:border-0 pr-4"><Ic d={d}/><div className="text-[9pt] text-gray-500 mt-1">{l}</div>
    <div className={`font-bold text-gray-900 ${i===0?'text-[22pt]':i===3?'text-[18pt] font-mono':'text-[15pt]'}`}>{v}</div><div className="text-[10pt] text-gray-500">{a}</div><div className="text-[10pt] text-gray-500">{b}</div></div>)}
   <div><div className="text-[9pt] text-gray-500">Session Status</div><span className="inline-block mt-2 bg-[#dcfce7] text-[#15803d] border border-green-200 rounded-full px-4 py-1.5 text-[12pt] font-medium">Completed ✓</span>
    <button onClick={()=>{setDraft(notes);setEdit(true);setTab(0)}} className="flex items-center gap-1 mt-2 text-[10pt] text-[#0F6E5E]">✏ Add Notes</button></div></div>
  <div className="flex gap-6 border-b border-gray-200 mt-5">{TABS.map((t,i)=><button key={t} onClick={()=>setTab(i)} className={`pb-3 text-[13pt] font-medium -mb-[2px] border-b-2 ${tab===i?'text-[#0F6E5E] border-[#0F6E5E]':'text-gray-500 border-transparent hover:text-gray-700'}`}>{t}</button>)}</div>
  {tab!==0?<Card><div className="text-[13pt] text-gray-500">“{TABS[tab]}” isn’t built yet — Session Overview is the only tab with content.</div></Card>:<>
  <Card><Head i={P.chart} t="Session Performance Summary" s="Key metrics from this session"/>
   <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-5">
    <Stat t="Repetitions Completed" v="10 / 10" pct={100} col={G} ic={P.ok} icc="text-gray-300"/>
    <Stat t="ROM Consistency" v="91%" vc="text-[#0F6E5E]" pct={91} col={G} ic={P.chart} icc="text-gray-300"/>
    <Stat t="Average Range of Motion" v="76°" sub="(Target: 75°)" pct={76/90*100} col={G} ic={P.ok} icc="text-[#0F6E5E]"/>
    <Stat t="Average Movement Time" v="1.3s" sub="(Target: 1.2s)" pct={80} col="#f59e0b" ic={P.clock} icc="text-amber-500"/></div></Card>
  <Card><Head i={P.hand} t="Finger-by-Finger Breakdown" s="Detailed performance metrics for each finger"/>
   <table className="w-full mt-5 text-left"><thead><tr className="border-b border-gray-100 text-[11pt] font-medium text-gray-500 uppercase tracking-wide">{['Finger','Reps Completed','Avg ROM (°)','Consistency (%)','EMG Sync','Notes'].map(x=><th key={x} className="pb-3 font-medium">{x}</th>)}</tr></thead>
   <tbody>{FING.map(([n,r,c])=><tr key={n as string} className="border-b border-gray-50 text-[13pt] hover:bg-gray-50 transition-colors"><td className="py-4 font-medium text-gray-900">{n}</td><td className="text-[#0F6E5E] font-mono">10 / 10</td><td className="text-[#0F6E5E] font-medium font-mono">{r}°</td><td className="text-[#0F6E5E] font-medium">{c}%</td>
    <td><span className="inline-flex w-5 h-5 rounded-full bg-[#0F6E5E] items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 12l5 5 9-10"/></svg></span></td><td className="text-gray-400">—</td></tr>)}
    <tr className="text-[13pt] text-gray-300 hover:bg-gray-50"><td className="py-4 font-medium text-gray-900">Thumb</td><td>—</td><td>—</td><td>—</td><td>—</td><td className="text-gray-400">N/A</td></tr></tbody></table></Card>
  <Card><Head i={P.chart} t="Progress Trend (Last 5 Sessions)" s="Track improvement over time" right={<div className="bg-gray-50 rounded-xl p-3 text-[10pt] text-gray-500 leading-relaxed">Latest (Sep 23)<div className="text-gray-900"><span style={{color:G}}>●</span> ROM: 76° <b className="text-green-600">↑ +12%</b></div><div className="text-gray-900"><span className="text-blue-500">◇</span> Consistency: 91% <b className="text-green-600">↑ +19%</b></div><div className="text-gray-900"><span className="text-green-500">●</span> Reps: 10/10 <b className="text-green-600">↑ +4</b></div></div>}/>
   <div className="relative mt-5" onMouseLeave={()=>setH(null)} onMouseMove={e=>{const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*700;setH(XS.reduce((b,v,i)=>Math.abs(v-x)<Math.abs(XS[b]-x)?i:b,0))}}>
    <svg viewBox="0 0 700 200" className="w-full">{[65,70,75,80,85].map(v=><g key={v}><line x1="40" x2="690" y1={Y(v)} y2={Y(v)} stroke="#f3f4f6"/><text x="30" y={Y(v)+4} textAnchor="end" fontSize="11" fill="#9ca3af">{v}°</text></g>)}
     {XS.map((x,i)=><text key={x} x={x} y="195" textAnchor="middle" fontSize="11" fill="#9ca3af">{DATES[i]}</text>)}
     {series.map(s=><g key={s.n}><path d={curve(s.v)} fill="none" stroke={s.c} strokeWidth={s.w} strokeDasharray={s.dash}/>{s.v.map((y,i)=><circle key={i} cx={XS[i]} cy={y} r={s.r} fill="#fff" stroke={s.c} strokeWidth={s.w}/>)}</g>)}</svg>
    {h!==null&&<div className="absolute top-2 -translate-x-1/2 bg-[#111827] border border-gray-700 rounded-xl p-3 shadow-xl text-[10pt] text-white pointer-events-none whitespace-nowrap" style={{left:`${XS[h]/7}%`}}><div className="font-bold mb-1">{DATES[h]}</div>ROM: {ROM[h]}°<br/>Consistency: {CON[h]}%<br/>Reps: {REPS[h]}/10</div>}</div>
   <div className="flex gap-6 mt-4 text-[11pt] text-gray-600">{series.map(s=><span key={s.n}><span style={{color:s.c}}>●</span> {s.n}</span>)}</div></Card>
  <Card><div className="flex justify-between items-center"><div className="flex items-center gap-3"><Ic d={P.doc} c="text-[#0F6E5E]"/><div className="text-[16pt] font-bold text-gray-900">Therapist Notes &amp; Observations</div></div>
   <button aria-label="Edit notes" onClick={()=>{setDraft(notes);setEdit(true)}} className="text-gray-400 hover:text-gray-700"><Ic d={P.pen}/></button></div>
   {edit?<div className="mt-4"><textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={4} className="w-full bg-gray-50 rounded-xl p-5 border-l-4 border-[#0F6E5E] text-[13pt] text-gray-600 italic outline-none"/>
    <div className="flex gap-3 mt-3"><button onClick={save} className="bg-[#0F6E5E] text-white rounded-lg px-4 py-2 text-[12pt] hover:bg-[#1a8a78]">Update Notes</button><button onClick={()=>setEdit(false)} className="border border-gray-200 text-gray-600 rounded-lg px-4 py-2 text-[12pt]">Cancel</button></div></div>
   :<div className="mt-4 bg-gray-50 rounded-xl p-5 border-l-4 border-[#0F6E5E] text-[13pt] text-gray-600 italic leading-relaxed">{notes}</div>}
   <div className="text-[10pt] text-gray-400 mt-3">{stamp}</div></Card>
  </>}
  <div className="mt-8 pb-8 flex items-center gap-4">
   <button onClick={()=>window.print()} className="border border-gray-200 text-gray-700 rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-gray-50"><Ic d={P.doc} s={18}/>Export session as PDF</button>
   <Link href="/calibration" className="bg-[#0F6E5E] text-white rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-[#1a8a78]"><Ic d={P.cal} s={18} c="text-white"/>Schedule next session</Link>
   <Link href="/analytics" className="ml-auto text-[#0F6E5E] underline hover:no-underline">View full patient history →</Link></div></div>}
