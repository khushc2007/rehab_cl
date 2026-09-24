import './globals.css'
import {JetBrains_Mono} from 'next/font/google'
const mono=JetBrains_Mono({subsets:['latin'],variable:'--font-mono'})
export const metadata={title:'RehabGrip — Live Session'}
export default function L({children}:{children:React.ReactNode}){return <html lang="en" className={mono.variable}><body>{children}</body></html>}
