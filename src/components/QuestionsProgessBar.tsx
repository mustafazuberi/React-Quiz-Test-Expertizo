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
    setQuestionProgessBar(Number(percentage));
  }, [currentQIndex]);

  return (
    <div
      className="bg-[#a9aaa9] h-[5vh]"
      style={{ width: `${questionProgessbar}%` }}
    ></div>
  );
};

export default QuestionsProgessBar;
