"use client"
import { useState } from "react"

type Choice = {
  label: string
  beers: string[]
}

type QuizSummaryProps = {
  answers: Record<number, Choice[]>
}

export default function QuizSummary({ answers }: QuizSummaryProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="p-4 bg-stone-700 rounded-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Your Preferences</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-amber-400 hover:text-amber-300"
        >
          {expanded ? "Hide ▲" : "Show ▼"}
        </button>
      </div>

      {expanded && (
        <div>
          {Object.entries(answers).map(([part, choices]) => (
            <div key={part} className="mb-3">
              <p>
                <strong>Part {part}:</strong>{" "}
                {choices.length > 0
                  ? choices.map(c => c.label).join(", ")
                  : "None"}
              </p>

              {choices.length > 0 && (
                <ul className="ml-4 list-disc text-sm text-stone-300">
                  {choices.flatMap(c => c.beers).map(beer => (
                    <li key={beer}>{beer}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
