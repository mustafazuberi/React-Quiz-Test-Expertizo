import { Question } from '@/types/types.question'
import React, { useEffect } from 'react'

type Props = {
  allQuestions: Question[]
  calculateOriginalScore: () => void
  calculateAttemptQuestionsScore: () => void
  calculateMaximumScore: () => void
  originalScore: number
  attemptQuestionsScore: number
  maxmScore: number
}

const ScoreBar = ({ allQuestions, calculateOriginalScore, calculateAttemptQuestionsScore, calculateMaximumScore, attemptQuestionsScore, maxmScore, originalScore }: Props) => {

  useEffect(() => {
    calculateOriginalScore()
    calculateAttemptQuestionsScore()
    calculateMaximumScore()
  }, [allQuestions])

  return (
    <div className="bg-gray-200 dark:bg-gray-700 w-full flex flex-row">
      <div className="bg-black flex items-center text-xs font-medium text-blue-100 text-center h-6 leading-none" style={{ width: `${originalScore}%` }}>{originalScore}%</div>
      <div className="bg-gray-600 flex items-center text-xs font-medium text-blue-100 text-center h-6 leading-none" style={{ width: `${attemptQuestionsScore - originalScore}%` }}>{attemptQuestionsScore}%</div>
      <div className="bg-gray-400 flex items-center text-xs font-medium text-blue-100 text-center h-6 leading-none" style={{ width: `${maxmScore - attemptQuestionsScore}%` }}>{maxmScore}%</div>
    </div>
  )
}

export default ScoreBar