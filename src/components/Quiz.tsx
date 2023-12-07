"use client"
import QuestionsProgessBar from "./QuestionsProgessBar";
import useQuiz from "@/hooks/useQuiz";
import ScoreBar from "./ScoreBar";
import Result from "./Result";
import dynamic from "next/dynamic";
const ActiveQuestion = dynamic(() => import('./ActiveQuestion'), { ssr: false })

export default function Questions() {
  const { currentQIndex, handleOnNext, allQuestions, result, handleOnRestartQuiz, currentQuestion, handleOnOptionSelect, calculateAttemptQuestionsScore, calculateMaximumScore, calculateOriginalScore, originalScore, maxmScore, attemptQuestionsScore } = useQuiz()

  if (allQuestions.length === currentQIndex) {
    return (<section>
      {result && <Result result={result} handleOnRestartQuiz={handleOnRestartQuiz} />}
    </section>)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between border-2 border-gray-300 sm:min-w-[550px]">
      <QuestionsProgessBar currentQIndex={currentQIndex} allQuestions={allQuestions} />
      <ActiveQuestion handleOnNext={handleOnNext} currentQIndex={currentQIndex} allQuestions={allQuestions} currentQuestion={currentQuestion} handleOnOptionSelect={handleOnOptionSelect} />
      <ScoreBar allQuestions={allQuestions} originalScore={originalScore} calculateAttemptQuestionsScore={calculateAttemptQuestionsScore} maxmScore={maxmScore} attemptQuestionsScore={attemptQuestionsScore} calculateMaximumScore={calculateMaximumScore} calculateOriginalScore={calculateOriginalScore} />
    </main>
  )
}
