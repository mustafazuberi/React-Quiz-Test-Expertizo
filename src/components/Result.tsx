import { Result } from '@/types/types.question'

const Result = ({ result, handleOnRestartQuiz }: { result: Result, handleOnRestartQuiz: () => void }) => {

  return (
    <section className='flex flex-col gap-y-2 justify-center items-center h-screen'>
      <section>
        <button className="bg-black text-white text-[20px] p-4" onClick={() => handleOnRestartQuiz()}>Restart Quiz</button>
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
  )
}

export default Result