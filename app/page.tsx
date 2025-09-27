import Image from "next/image"
import ButtonLink from "@/components/ButtonLink"

export default function HomePage() {
  return (
    <div className="relative w-full h-screen flex items-start justify-center overflow-hidden pt-20">
      {/* 🌄 Image de fond plein écran */}
      <Image
        src="/background.jpg"
        alt="Fond bière"
        fill
        className="object-cover object-center -z-10"
        priority
      />

      {/* Contenu par-dessus */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md text-white drop-shadow-md">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-black/80 rounded-lg px-4 py-2">
          🍻 Trouve ta bière d’chez nous
        </h1>


        <ButtonLink text="Fais le quiz" href="/quiz" />
        <ButtonLink text="Découvre nos bières" href="/explore" />
      </div>
    </div>
  )
}
