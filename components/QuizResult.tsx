"use client"
import { useState } from "react"
import Image from "next/image"

type QuizResultProps = {
  matches: { name: string; reasons: string[]; pitch: string; src?: string }[]
}

export default function QuizResult({ matches }: QuizResultProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = matches[currentIndex]

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      {/* Infos + Buttons in a solid black card */}
      <div className="p-6 rounded-lg text-white bg-black w-full flex flex-col items-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-400">
          🍺 Votre {currentIndex === 0 ? "bière gagnante!" : `${currentIndex + 1}e suggestion`}
        </h2>

        {/* Infos texte */}
        <div className="mb-6 flex flex-col items-center">
          <p className="text-lg font-semibold text-center text-stone-100 mb-3">
            {current.name}
          </p>
          <p className="text-sm text-stone-300 mb-2 text-center">
            👉 Parce que vous avez choisi{" "}
            <span className="text-orange-300">{current.reasons.join(", ")}</span>
          </p>
          <p className="italic text-stone-200 text-center">« {current.pitch} »</p>
        </div>


        {/* Navigation + Progression */}
        <div className="flex items-center justify-between w-full">
          {currentIndex > 0 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-4 py-2 bg-stone-800 rounded-lg hover:bg-orange-600 transition-colors"
            >
              ← Précédent
            </button>
          ) : (
            <div className="w-[90px]" />
          )}

          {/* Progression centered */}
          <p className="text-sm text-orange-300 text-center flex-1">
            Suggestion {currentIndex + 1} / {matches.length}
          </p>

          {currentIndex < matches.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-4 py-2 bg-stone-800 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Suivant →
            </button>
          ) : (
            <div className="w-[90px]" />
          )}
        </div>
      </div>

      {/* Image en bas */}
      <div className="mt-6">
        <Image
          src="/beers/juicetown@3x.png"
          alt="Beer can"
          width={220}
          height={220}
          className="object-contain"
        />
      </div>
    </div>
  )
}
