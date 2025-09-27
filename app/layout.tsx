import "./globals.css"
import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {/* 🔥 Persistent header */}
        <header className="w-full bg-black px-4 py-2 shadow-md flex items-center justify-between sticky top-0 z-50 h-14">
          <Link href="/" className="flex items-center">
            <Image
              src="/LogoShawbridge.jpg"
              alt="Shawbridge Logo"
              width={90}
              height={24}
              priority
            />
          </Link>

          <nav className="flex gap-4 text-sm sm:text-base font-semibold">
            <Link href="/quiz" className="text-amber-400 hover:text-amber-300">
              Quiz
            </Link>
            <Link href="/beers" className="text-amber-400 hover:text-amber-300">
              Bières
            </Link>
          </nav>

        </header>



        {/* Page content */}
        <main className="flex flex-col items-center justify-center w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
