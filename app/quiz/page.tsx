"use client"
import { useState } from "react"
import Image from "next/image"
import quizData from "@/data/quiz.json"
import beers from "@/data/beers.json"
import QuizPart from "@/components/QuizPart"
import QuizResult from "@/components/QuizResult"

type Choice = {
  label: string
  beers: string[]
}

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<number, Choice[]>>({})
  const [step, setStep] = useState(0)
  const [matches, setMatches] = useState<
    { name: string; reasons: string[]; pitch: string }[] | null
  >(null)

  const handlePartChange = (id: number, selected: Choice[]) => {
    setAnswers(prev => ({ ...prev, [id]: selected }))
  }

  const handleNext = () => {
    if (step < quizData.length - 1) {
      setStep(step + 1)
    } else {
      const beerReasons: Record<string, string[]> = {}

      Object.values(answers).forEach(choices => {
        choices.forEach(choice => {
          choice.beers.forEach(beer => {
            if (!beerReasons[beer]) beerReasons[beer] = []
            beerReasons[beer].push(choice.label)
          })
        })
      })

      let sorted = Object.entries(beerReasons).sort(
        (a, b) => b[1].length - a[1].length
      )

      const wantsNonAlcoholic = Object.values(answers).some(choices =>
        choices.some(choice => choice.label.toLowerCase().includes("sans alcool"))
      )

      if (wantsNonAlcoholic) {
        sorted = sorted.filter(([name]) => {
          const beerData = beers.find(b => b.name === name)
          return beerData?.category === "Sans Alcool"
        })
      }

      sorted = sorted.slice(0, 3)

      const withPitch = sorted.map(([name, reasons]) => {
        const beerData = beers.find(b => b.name === name)
        return {
          name,
          reasons,
          pitch: beerData?.pitch || "Pas de description disponible."
        }
      })

      setMatches(withPitch)
    }
  }

  if (matches) {
    return (
      <div className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
        {/* ✅ End background anchored at bottom */}
        <Image
          src="/endBackground.png"
          alt="End background"
          fill
          className="object-cover object-bottom -z-10"
          priority
        />

        {/* ❌ QuizSummary removed */}
        <QuizResult matches={matches} />
      </div>
    )
  }

  const currentPart = quizData[step]
  const bgImage = `/steps/step_${step + 1}.png`

  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex items-start justify-center overflow-hidden pt-6">
      {/* Step background anchored at bottom */}
      <Image
        src={bgImage}
        alt={`Step ${step + 1} background`}
        fill
        className="object-cover object-bottom -z-10"
        priority
      />

      {/* Foreground quiz content */}
      <div className="flex flex-col items-center gap-4 bg-white/80 p-6 rounded-lg max-w-lg w-full">
        <QuizPart
          key={currentPart.id}
          title={currentPart.title}
          choices={currentPart.choices}
          onChange={selected => handlePartChange(currentPart.id, selected)}
        />

        <button
          onClick={handleNext}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg shadow-md hover:bg-amber-700"
        >
          {step < quizData.length - 1 ? "Next →" : "Voir mes bières 🍺"}
        </button>

        <p className="text-sm text-black">
          Question {step + 1} / {quizData.length}
        </p>
      </div>
    </div>
  )
}
