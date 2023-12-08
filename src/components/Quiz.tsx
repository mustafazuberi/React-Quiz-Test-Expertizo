"use client";
import QuestionsProgessBar from "./QuestionsProgessBar";
import useQuiz from "@/hooks/useQuiz";
import ScoreBar from "./ScoreBar";
import Result from "./Result";
import dynamic from "next/dynamic";
const ActiveQuestion = dynamic(() => import("./ActiveQuestion"), {
  ssr: false,
});

export default function Questions() {
  const {
    currentQIndex,
    handleOnNext,
    allQuestions,
    result,
    handleOnRestartQuiz,
    currentQuestion,
    handleOnOptionSelect,
    calculateAttemptQuestionsScore,
    calculateMaximumScore,
    calculateOriginalScore,
    originalScore,
    maxmScore,
    attemptQuestionsScore,
  } = useQuiz();
  if (allQuestions.length === currentQIndex) {
    return (
      <section>
        {result && (
          <Result result={result} handleOnRestartQuiz={handleOnRestartQuiz} />
        )}
      </section>
    );
  }

  return (
    <main className="flex h-screen flex-col min-w-full justify-between">
      <section>
        <QuestionsProgessBar
          currentQIndex={currentQIndex}
          allQuestions={allQuestions}
        />
      </section>
      <section className="w-full flex flex-col flex-1 h-[90vh] justify-between p-4 items-center">
        <section className="sm:w-[70%] sm:max-w-[700px] w-full mt-2">
          <ActiveQuestion
            handleOnNext={handleOnNext}
            currentQIndex={currentQIndex}
            allQuestions={allQuestions}
            currentQuestion={currentQuestion}
            handleOnOptionSelect={handleOnOptionSelect}
          />
        </section>
        <section className="sm:w-[70%] sm:max-w-[700px] w-full">
          <ScoreBar
            allQuestions={allQuestions}
            originalScore={originalScore}
            calculateAttemptQuestionsScore={calculateAttemptQuestionsScore}
            maxmScore={maxmScore}
            attemptQuestionsScore={attemptQuestionsScore}
            calculateMaximumScore={calculateMaximumScore}
            calculateOriginalScore={calculateOriginalScore}
          />
        </section>
      </section>
    </main>
  );
}
