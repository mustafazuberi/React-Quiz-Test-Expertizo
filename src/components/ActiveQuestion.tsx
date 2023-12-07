"use client"
import { FaStar } from "react-icons/fa";
import React from 'react'
import { Question } from "@/types/types.question";
import useQuiz from "@/hooks/useQuiz";

type Props = {
  allQuestions: Question[];
  handleOnOptionSelect: ({ option, qIndex }: { option: String, qIndex: number }) => void;
  currentQuestion: Question;
  handleOnNext: () => void;
  currentQIndex: number;
}

const difficultyLevels = {
  HARD: 'hard',
  MEDIUM: 'medium',
  EASY: 'easy'
}

const ActiveQuestion = ({ handleOnNext, currentQIndex, currentQuestion, handleOnOptionSelect, allQuestions }: Props) => {
  const { shuffleArray } = useQuiz()
  // Adding it in use Memo because it rerenders and shuffled again  on component rerender!
  let options = React.useMemo(() => shuffleArray([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]), [currentQIndex])

  return (
    <main className="px-6">
      <section className='flex flex-col justify-start items-center gap-y-7'>
        <section className="flex flex-col items-start sm:w-[550px] w-[90%]">
          <section className="text-[30px] text-gray-600 min-w-full">Question {currentQIndex + 1} of 20</section>
          <section>{currentQuestion.category}</section>
          {/* Stars */}
          {currentQuestion.difficulty === difficultyLevels.HARD ? <section className='flex flex-row gap-x-1'>
            <FaStar />
            <FaStar />
            <FaStar />
          </section > : currentQuestion.difficulty === difficultyLevels.MEDIUM ? <section className='flex flex-row gap-x-1'>
            <FaStar />
            <FaStar />
            <FaStar className='text-white' />
          </section> : <section className='flex flex-row gap-x-1'>
            <FaStar />
            <FaStar className='text-white' />
            <FaStar className='text-white' />
          </section>
          }

        </section>
        {/* Question */}
        <section className="flex flex-col items-start sm:w-[550px] w-[90%]">
          <h6 className="text-xl">Q : {currentQuestion.question}</h6>
        </section>

        {/* Options */}
        <section className='flex flex-row gap-3 sm:w-[550px] w-[90%] min-w-full flex-wrap'>
          {options.map((option: String, i) => {
            return <button disabled={!!currentQuestion.selectedOption} key={option.toString()} className={`p-2 w-[45%] border ${currentQuestion.selectedOption === option ? 'border-black text-white bg-black' : 'text-black bg-white'}`} onClick={() => handleOnOptionSelect({ option, qIndex: currentQIndex })}>{option}</button>
          })}
        </section>
        {/* Correct / Incorrect status */}
        <section>
          {currentQuestion.selectedOption === currentQuestion.correct_answer && <h2 className="text-[30px] text-green-600">Correct!</h2>}
          {currentQuestion.selectedOption && currentQuestion.selectedOption !== currentQuestion.correct_answer && <h2 className="text-[30px] text-red-600">Wrong!</h2>}
        </section>
        {currentQuestion.selectedOption && <button className="p-3 bg-black text-white mb-3" onClick={() => handleOnNext()}>{allQuestions.length - 1 === currentQIndex ? 'Show Result' : 'Next Question'}</button>}
      </section>
    </main>
  )
}

export default ActiveQuestion