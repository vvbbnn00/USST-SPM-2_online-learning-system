import './globals.css'
import {Inter} from 'next/font/google'
import {Providers} from "@/app/provider";

export const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: '项目管理与过程改进',
    description: '项目管理与过程改进的在线学习网站',
}

export default function RootLayout({children}) {
    const year = new Date().getFullYear()

    return (
        <html lang="en" className='light'>
        <body className={inter.className}>
        <Providers>
            <div className={"min-h-screen"}>
                {children}
            </div>
        </Providers>

        <div className={"h-20 bg-white p-5 border-t-1"}>
            <div className={"flex flex-row justify-center items-center h-full"}>
                <div className={"text-black font-mono text-medium"}>© {year} {metadata.title} All Right Reserved.</div>
            </div>
        </div>

        </body>
        </html>
    )
}
