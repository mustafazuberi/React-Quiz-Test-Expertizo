"use client";
import { useMemo } from "react";
import { Question } from "@/types/types.quiz";
import useQuiz from "@/hooks/useQuiz";
import DifficultyStars from "./DifficultyStars";

type Props = {
  allQuestions: Question[];
  handleOnOptionSelect: ({
    option,
    qIndex,
  }: {
    option: String;
    qIndex: number;
  }) => void;
  currentQuestion: Question;
  handleOnNext: () => void;
  currentQIndex: number;
};

const ActiveQuestion = ({
  handleOnNext,
  currentQIndex,
  currentQuestion,
  handleOnOptionSelect,
  allQuestions,
}: Props) => {
  const { shuffleArray } = useQuiz();
  // Adding it in use Memo because it rerenders and shuffled again  on component rerender!
  let options = useMemo(
    () =>
      shuffleArray([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ]),
    [currentQIndex]
  );

  return (
    <section className="flex flex-col justify-center gap-y-7 min-h-full px-6">
      <section className="flex flex-col items-start min-w-full">
        <section className="text-[28px] text-gray-700 min-w-full">
          Question {currentQIndex + 1} of 20
        </section>
        <section className="text-gray-500 text-[12px]">
          Entertainment : {currentQuestion.category}
        </section>
        {/* Difficulty level stars */}
        <DifficultyStars difficulty={currentQuestion.difficulty} />
      </section>
      {/* Question */}
      <section className="flex flex-col items-start justify-start ">
        <h6 className="text-[16px] font-bold">{currentQuestion.question}</h6>
      </section>

      {/* Options */}
      <section className="flex flex-row gap-6 min-w-full justify-around flex-wrap">
        {options.map((option: String, i) => {
          return (
            <button
              disabled={!!currentQuestion.selectedOption}
              key={option.toString()}
              className={`p-1.5 sm:w-[35%] w-full border font-bold text-[13px] rounded-md ${
                currentQuestion.selectedOption === option
                  ? "border-gray-700 text-white bg-black"
                  : "bg-gray-200 border-2 border-black text-black "
              }`}
              onClick={() =>
                handleOnOptionSelect({ option, qIndex: currentQIndex })
              }
            >
              {option}
            </button>
          );
        })}
      </section>
      {/* Correct / Incorrect status */}
      <section
        className={`flex flex-col justify-center gap-y-4 items-center h-[15vh]`}
      >
        <section>
          {currentQuestion.selectedOption ===
            currentQuestion.correct_answer && (
            <h2 className="text-[30px] text-green-600">Correct!</h2>
          )}
          {currentQuestion.selectedOption &&
            currentQuestion.selectedOption !==
              currentQuestion.correct_answer && (
              <h2 className="text-[30px] text-red-600">Sorry!</h2>
            )}
        </section>
        <section>
          {currentQuestion.selectedOption && (
            <button
              className="p-1 px-4 rounded-md bg-gray-200 text-black border-2 border-black text-[13px]"
              onClick={() => handleOnNext()}
            >
              {allQuestions.length - 1 === currentQIndex
                ? "Show Result"
                : "Next Question"}
            </button>
          )}
        </section>
      </section>
    </section>
  );
};

export default ActiveQuestion;
