"use client"
import { Question } from "@/types/types.question";
import { useEffect, useState } from "react";

const QuestionsProgessBar = ({ currentQIndex, allQuestions }: { currentQIndex: number, allQuestions: Question[] }) => {
  const [questionProgessbar, setQuestionProgessBar] = useState(0)

  useEffect(() => {
    function calculatePercentage(currentQIndex: number, totalQuestions: number) {
      const percentage = ((currentQIndex + 1) / totalQuestions) * 100;
      return percentage.toFixed(2);
    }
    const percentage = calculatePercentage(currentQIndex, allQuestions.length);
    setQuestionProgessBar(Number(percentage))
  }, [currentQIndex])

  return (
    <div className="bg-gray-200 rounded-full dark:bg-gray-700 w-full">
      <div className="bg-gray-600 text-xs font-medium text-blue-100 text-center h-6 leading-none" style={{ width: `${questionProgessbar}%` }}></div>
    </div>
  )
}

export default QuestionsProgessBar