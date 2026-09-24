'use client'
import { usePathname } from 'next/navigation'
import { useHand } from '@/store/handStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavItem {
  path: string
  icon: React.ReactNode
  label: string
}

const navItems: NavItem[] = [
  {
    path: '/session',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 8l2-2m12 0l2 2M7 10v7a2 2 0 002 2h6a2 2 0 002-2v-7M9 6h6M12 2v4" />
      </svg>
    ),
    label: 'Session',
  },
  {
    path: '/emg',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12h3l2-5 2 10 2-5 3 0M20 12h1M2 12h1" />
      </svg>
    ),
    label: 'EMG',
  },
  {
    path: '/history',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18M9 3v18M15 3v18" />
      </svg>
    ),
    label: 'History',
  },
  {
    path: '/calibration',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4m0 14v4M23 12h-4m-14 0H1" />
        <path d="M20.485 3.515l-2.828 2.828m-11.314 11.314l-2.828 2.828" />
        <path d="M20.485 20.485l-2.828-2.828m-11.314-11.314l-2.828-2.828" />
      </svg>
    ),
    label: 'Calibration',
  },
  {
    path: '/analytics',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 14l3-3 3 3 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'Analytics',
  },
  {
    path: '/settings',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4m0 14v4M23 12h-4m-14 0H1" />
        <path d="M20.485 3.515l-2.828 2.828m-11.314 11.314l-2.828 2.828" />
        <path d="M20.485 20.485l-2.828-2.828m-11.314-11.314l-2.828-2.828" />
      </svg>
    ),
    label: 'Settings',
  },
]

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const battery = useHand(s => s.battery)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <aside className="fixed left-0 top-0 h-screen w-[52px] bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col items-center py-4">
        {/* Nav items */}
        <div className="flex flex-col gap-4">
          {navItems.map(item => {
            const isActive = pathname === item.path
            return (
              <div key={item.path} className="relative group">
                <Link
                  href={item.path}
                  className={`
                    w-11 h-11 flex items-center justify-center rounded-lg cursor-pointer
                    transition-colors
                    ${isActive ? 'text-[#0F6E5E]' : 'text-[#555555] hover:text-[#888888]'}
                  `}
                >
                  {item.icon}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0F6E5E]" />
                  )}
                </Link>

                {/* Tooltip */}
                <div className="absolute left-[52px] top-1/2 -translate-y-1/2 bg-[#161616] border border-[#1f1f1f] rounded-md px-3 py-1.5 whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono text-[#f0f0f0]">{item.label}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Battery + Version */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#555555]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="6" width="16" height="10" rx="2" />
              <rect x="19" y="8" width="2" height="6" />
            </svg>
            <span className="text-[8px] font-mono text-[#555555] mt-0.5">{mounted ? battery : 100}%</span>
          </div>
          <div className="text-[7px] font-mono text-[#333333]">v1.0</div>
        </div>
      </aside>
      <main className="ml-[52px] w-[calc(100%-52px)] h-screen overflow-auto">{children}</main>
    </>
  )
}
