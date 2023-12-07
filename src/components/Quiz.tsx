import ActiveQuestion from "@/components/ActiveQuestion";
import QuestionsProgessBar from "./QuestionsProgessBar";
import useQuiz from "@/hooks/useQuiz";
import ScoreBar from "./ScoreBar";

export default function Questions() {
  const { currentQIndex, handleOnNext, allQuestions, result, currentQuestion, handleOnOptionSelect, calculateAttemptQuestionsScore, calculateMaximumScore, calculateOriginalScore, originalScore, maxmScore, attemptQuestionsScore } = useQuiz()
  if (allQuestions.length === currentQIndex) {
    return <section className='flex flex-col gap-y-2 justify-center items-center h-screen'>
      <section>
        <button className="bg-black text-white text-[20px] p-4">Restart Quiz</button>
      </section>
      <section>
        You Scored {result?.score}%.
      </section>
      <section>
        {result?.status === 'fail' ? 'Failed!' : 'Passed!'}
      </section>
      <section>
        Grade : {result?.grade}
      </section>
    </section>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between border-2 border-gray-300">
      <QuestionsProgessBar currentQIndex={currentQIndex} allQuestions={allQuestions} />
      <ActiveQuestion handleOnNext={handleOnNext} currentQIndex={currentQIndex} allQuestions={allQuestions} currentQuestion={currentQuestion} handleOnOptionSelect={handleOnOptionSelect} />
      <ScoreBar allQuestions={allQuestions} originalScore={originalScore} calculateAttemptQuestionsScore={calculateAttemptQuestionsScore} maxmScore={maxmScore} attemptQuestionsScore={attemptQuestionsScore} calculateMaximumScore={calculateMaximumScore} calculateOriginalScore={calculateOriginalScore} />
    </main>
  )
}
