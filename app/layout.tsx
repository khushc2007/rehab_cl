import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import SidebarLayout from '@/components/SidebarLayout'

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = { title: 'RehabGrip' }

export default function L({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <SidebarLayout>{children}</SidebarLayout>
      </body>
    </html>
  )
}
