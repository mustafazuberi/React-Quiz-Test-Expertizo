import { Question } from "@/types/types.quiz";
import React, { useEffect, useState } from "react";

type Props = {
  allQuestions: Question[];
  calculateOriginalScore: () => void;
  calculateAttemptQuestionsScore: () => void;
  calculateMaximumScore: () => void;
  originalScore: number;
  attemptQuestionsScore: number;
  maxmScore: number;
};

const ScoreBar = ({
  allQuestions,
  calculateOriginalScore,
  calculateAttemptQuestionsScore,
  calculateMaximumScore,
  attemptQuestionsScore,
  maxmScore,
  originalScore,
}: Props) => {
  const [animatedWidth, setAnimatedWidth] = useState(originalScore);

  useEffect(() => {
    calculateOriginalScore();
    calculateAttemptQuestionsScore();
    calculateMaximumScore();

    // Update animatedWidth with a delay to trigger the transition
    setTimeout(() => {
      setAnimatedWidth(originalScore);
    }, 0);
  }, [allQuestions, originalScore]);

  const calculateWidth = (score: number) => {
    // Ensure the width is between 0 and 100
    return Math.min(100, Math.max(0, score));
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="">Score : {originalScore}%</div>
        <div>Max Score : {maxmScore}%</div>
      </div>
      <div className="w-full flex flex-row border border-black">
        <div
          className="bg-black h-6"
          style={{
            width: `${calculateWidth(animatedWidth)}%`,
            transition: "width 0.5s",
          }}
        ></div>
        <div
          className="bg-gray-600 h-6"
          style={{
            width: `${calculateWidth(attemptQuestionsScore - animatedWidth)}%`,
            transition: "width 0.5s",
          }}
        ></div>
        <div
          className="bg-gray-400 h-6"
          style={{
            width: `${calculateWidth(maxmScore - attemptQuestionsScore)}%`,
            transition: "width 0.5s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreBar;
