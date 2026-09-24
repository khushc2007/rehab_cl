'use client'
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {useEffect,useState} from 'react'
import {useHand} from '@/store/handStore'
const I=(d:string)=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
const NAV=[
 {l:'Dashboard',p:'/analytics',i:'M3 11l9-8 9 8v10H3zM9 21v-6h6v6'},{l:'Patients',p:'/history',i:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9'},
 {l:'Session History',p:'/history',i:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'},{l:'Exercise Programs',p:'/calibration',i:'M6 4v16M18 4v16M3 8v8M21 8v8M6 12h12'},
 {l:'Analytics',p:'/analytics',i:'M3 3v18h18M7 15l4-4 3 3 5-6'},{l:'Reports',p:'/history',i:'M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6'},
 {l:'Live Session',p:'/session',i:'M5 12h4l2-6 3 12 2-6h3'},{l:'EMG Monitor',p:'/emg',i:'M2 12h4l3-8 4 16 3-8h6'},{l:'Settings',p:'/settings',i:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.7a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.7a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.2-.8.2-1.2z'}]
const SUB=['Device Status','Calibration History','Exercise Library','User Profile','Notifications','Help & Troubleshooting','Export & Backup']
const TITLES:Record<string,string>={'/analytics':'Dashboard','/history':'Session History','/calibration':'Calibration','/settings':'Settings','/emg':'EMG Monitor'}
export default function SidebarLayout({children}:{children:React.ReactNode}){
 const path=usePathname(),battery=useHand(s=>s.battery),[m,setM]=useState(false)
 useEffect(()=>setM(true),[])
 if(path==='/session')return <main className="h-screen w-screen overflow-hidden">{children}</main> // dark, no chrome
 const active=NAV.findIndex(n=>path===n.p||path.startsWith(n.p+'/'))
 return <>
  <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0f1923] text-white flex flex-col z-20 font-sans overflow-y-auto">
   <div className="px-5 pt-6 pb-4 border-b border-white/5 flex items-center gap-3">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F6E5E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 10V3.5a1.5 1.5 0 0 1 3 0V10M14 10V5a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.5-1.5L8 13"/></svg>
    <div><div className="text-[15pt] font-bold leading-tight">RehabGrip</div><div className="text-[9pt] text-gray-500">Clinical Dashboard</div></div></div>
   <nav className="mt-4 px-3 flex flex-col gap-1">{NAV.map((n,k)=><div key={k}>
    <Link href={n.p} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13pt] font-medium border-l-2 transition-colors ${active===k?'bg-[#0F6E5E]/20 text-[#0F6E5E] border-[#0F6E5E]':'text-gray-400 border-transparent hover:bg-white/5 hover:text-white'}`}>{I(n.i)}{n.l}</Link>
    {n.p==='/settings'&&path.startsWith('/settings')&&<div className="ml-8 mt-1 flex flex-col gap-0.5">{SUB.map((s,j)=><span key={s} className={`px-3 py-1.5 rounded-md text-[11pt] ${j===0?'bg-[#0F6E5E]/20 text-[#0F6E5E]':'text-gray-500'}`}>{s}</span>)}</div>}</div>)}</nav>
   <div className="mt-auto px-3 pb-6 pt-6">
    <div className="bg-white/5 rounded-xl p-4"><div className="w-8 h-8 rounded-full bg-[#0F6E5E] flex items-center justify-center font-bold">?</div>
     <div className="text-[12pt] font-bold mt-2">Need Help?</div><div className="text-[10pt] text-gray-400">Check our guides or contact support.</div>
     <button className="w-full mt-3 py-2 text-[11pt] rounded-lg border border-white/10 hover:bg-white/5">View Help Center ↗</button></div>
    <div className="mt-3 flex items-center gap-3 px-2"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#14907b] to-[#0a4f44] flex items-center justify-center text-[12pt] font-bold">DS</div>
     <div className="flex-1"><div className="text-[12pt] font-bold">Dr. Smith</div><div className="text-[9pt] text-gray-400">Physical Therapist</div></div><span className="text-gray-500 hover:text-white cursor-pointer" title="Log out">⇥</span></div></div>
  </aside>
  <header className="fixed top-0 left-[240px] right-0 h-16 bg-white border-b border-gray-100 flex items-center px-6 z-10 font-sans">
   <div className="text-[14pt] font-semibold text-gray-900">{TITLES[path]??'RehabGrip'}</div>
   <div className="ml-auto flex items-center gap-5"><span className="text-[10pt] font-mono text-gray-500">🔋 {m?battery:100}%</span>
    <span className="relative text-gray-500">🔔<span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-red-500"/></span>
    <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-[#0F6E5E] text-white text-[10pt] font-bold flex items-center justify-center">DS</div><div className="text-[11pt] font-medium text-gray-800 leading-tight">Dr. Smith<div className="text-[9pt] text-gray-400 font-normal">Therapist ▾</div></div></div></div>
  </header>
  <main className="ml-[240px] pt-16 h-screen overflow-auto bg-[#f8fafc] font-sans">{children}</main></>}
