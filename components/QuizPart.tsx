"use client"
import { useState } from "react"

type Choice = {
  label: string
  beers: string[]
}

type QuizPartProps = {
  title: string
  choices: Choice[]
  onChange: (selected: Choice[]) => void
}

export default function QuizPart({ title, choices, onChange }: QuizPartProps) {
  const [selected, setSelected] = useState<Choice[]>([])

  const toggleChoice = (choice: Choice) => {
    const newSelected = selected.some(c => c.label === choice.label)
      ? selected.filter(c => c.label !== choice.label)
      : [...selected, choice]

    setSelected(newSelected)
    onChange(newSelected)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-6">
      {/* Question */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold mb-2 text-amber-600">{title}</h2>

        <p className="text-sm text-stone-600">Choisis une ou plusieurs réponses</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {choices.map(choice => {
          const isSelected = selected.some(c => c.label === choice.label)
          return (
            <button
              key={choice.label}
              onClick={() => toggleChoice(choice)}
              className={`px-4 py-3 rounded-lg border font-medium transition 
                ${
                  isSelected
                    ? "bg-amber-600 border-amber-600 text-white shadow-md"
                    : "bg-white/90 border-stone-300 text-stone-900 hover:bg-amber-100"
                }`}
            >
              {choice.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
