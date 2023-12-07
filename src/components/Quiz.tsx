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
    <main className="flex h-screen flex-col min-w-full justify-between">
      <section>
        <QuestionsProgessBar currentQIndex={currentQIndex} allQuestions={allQuestions} />
      </section>
      <section className="w-full flex justify-center">
        <section className="h-[75vh] sm:w-[70%] w-full">
          <ActiveQuestion handleOnNext={handleOnNext} currentQIndex={currentQIndex} allQuestions={allQuestions} currentQuestion={currentQuestion} handleOnOptionSelect={handleOnOptionSelect} />
        </section>
      </section>
      <section className="w-full flex h-[20vh] justify-center items-center">
        <section className="sm:w-[70%] w-full">
          <ScoreBar allQuestions={allQuestions} originalScore={originalScore} calculateAttemptQuestionsScore={calculateAttemptQuestionsScore} maxmScore={maxmScore} attemptQuestionsScore={attemptQuestionsScore} calculateMaximumScore={calculateMaximumScore} calculateOriginalScore={calculateOriginalScore} />
        </section>
      </section>
    </main>
  )
}
