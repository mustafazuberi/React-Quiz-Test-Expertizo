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
    <div>
      <div className='flex flex-row justify-between'>
        <div className=''>
          Score : {originalScore}%
        </div>
        <div>
          Max Score : {maxmScore}%
        </div>
      </div>
      <div className="w-full flex flex-row border-2 border-black rounded-xl">
        <div className="bg-black h-6 rounded-l-xl" style={{ width: `${originalScore}%` }}></div>
        <div className="bg-gray-600 h-6" style={{ width: `${attemptQuestionsScore - originalScore}%` }}></div>
        <div className="bg-gray-400 h-6 rounded-r-xl" style={{ width: `${maxmScore - attemptQuestionsScore}%` }}></div>
      </div>
    </div>
  )
}

export default ScoreBar