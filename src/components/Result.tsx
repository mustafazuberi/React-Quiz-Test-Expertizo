import { Result } from "@/types/types.quiz";

const Result = ({
  result,
  handleOnRestartQuiz,
}: {
  result: Result;
  handleOnRestartQuiz: () => void;
}) => {
  return (
    <section className="flex flex-col gap-y-2 justify-center items-center h-screen">
      <section>
        <button
          className="bg-black text-white text-[20px] p-2"
          onClick={() => handleOnRestartQuiz()}
        >
          Restart Quiz
        </button>
      </section>
      <section>You Scored {result?.score}%.</section>
      <section>
        {result?.status === "fail" ? (
          <span className="text-red-600">{"Failed!"}</span>
        ) : (
          <span className="text-green-600">{"Passed!"}</span>
        )}
      </section>
      <section>Grade : {result?.grade}</section>
    </section>
  );
};

export default Result;
