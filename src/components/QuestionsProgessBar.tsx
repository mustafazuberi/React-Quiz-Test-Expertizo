"use client";
import { Question } from "@/types/types.quiz";
import { useEffect, useState } from "react";

const QuestionsProgessBar = ({
  currentQIndex,
  allQuestions,
}: {
  currentQIndex: number;
  allQuestions: Question[];
}) => {
  const [questionProgessbar, setQuestionProgessBar] = useState(0);

  useEffect(() => {
    function calculatePercentage(
      currentQIndex: number,
      totalQuestions: number
    ) {
      const percentage = ((currentQIndex + 1) / totalQuestions) * 100;
      return percentage.toFixed(2);
    }

    const percentage = calculatePercentage(currentQIndex, allQuestions.length);
    // Introduce a delay to trigger the transition
    setTimeout(() => {
      setQuestionProgessBar(Number(percentage));
    }, 0);
  }, [currentQIndex, allQuestions]);

  return (
    <div
      className="bg-[#a9aaa9] h-[4vh] transition-width duration-500"
      style={{ width: `${questionProgessbar}%` }}
    ></div>
  );
};

export default QuestionsProgessBar;
