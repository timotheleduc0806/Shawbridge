"use client"

import Link from "next/link"

type ButtonLinkProps = {
  text: string
  href: string
}

export default function ButtonLink({ text, href }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="
        w-full max-w-xs
        px-6 py-4
        text-center text-lg font-bold
        bg-amber-600 text-white
        rounded-xl shadow-lg
        transition transform
        hover:bg-amber-700 hover:scale-105
        active:scale-95
      "
    >
      {text}
    </Link>
  )
}
