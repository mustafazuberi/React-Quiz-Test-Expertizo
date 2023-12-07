import { Grade, Question, Result, Status } from "@/types/types.quiz";
import { questionsJson } from "@/questions";
import { useState } from "react";

const getdecodedQuestions = () => {
  const questions = questionsJson.map((q) => ({
    ...q,
    category: decodeURIComponent(q.category as string),
    question: decodeURIComponent(q.question as string),
    correct_answer: decodeURIComponent(q.correct_answer as string),
    incorrect_answers: q.incorrect_answers.map((option) =>
      decodeURIComponent(option as string)
    ),
    selectedOption: null,
  }));
  return questions;
};

const decodedQuestions = getdecodedQuestions();

const useQuiz = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([
    ...decodedQuestions,
  ]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    ...allQuestions[currentQIndex],
  });
  const [originalScore, setOriginalScore] = useState(0);
  const [maxmScore, setMaxmScore] = useState(0);
  const [attemptQuestionsScore, setAttemptQuestionsScore] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const handleOnOptionSelect = ({
    option,
    qIndex,
  }: {
    option: String;
    qIndex: number;
  }) => {
    let modifiedQuestion: Question = {
      ...allQuestions[qIndex],
      selectedOption: option,
    };
    let modifiedAllQuestions = [...allQuestions];
    modifiedAllQuestions[qIndex] = { ...modifiedQuestion };
    setAllQuestions([...modifiedAllQuestions]);
    setCurrentQuestion({ ...modifiedQuestion });
  };

  const handleOnNext = () => {
    setCurrentQIndex((prev) => prev + 1);
    setCurrentQuestion({ ...allQuestions[currentQIndex + 1] });
    if (currentQIndex === allQuestions.length - 1) {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let grade: Grade;
    if (originalScore >= 80) {
      grade = "A-one";
    } else if (originalScore >= 70) {
      grade = "A";
    } else if (originalScore >= 60) {
      grade = "B";
    } else if (originalScore >= 50) {
      grade = "C";
    } else {
      grade = "F";
    }
    let status: Status = grade === "F" ? "fail" : "pass";
    setResult({ grade, status, score: originalScore });
  };

  const calculateOriginalScore = () => {
    const correctAnswers = allQuestions.filter(
      (q) => q.correct_answer === q.selectedOption
    );
    const percent = (correctAnswers.length / allQuestions.length) * 100;
    setOriginalScore(Math.round(percent));
  };

  const calculateAttemptQuestionsScore = () => {
    const correctAnswers = allQuestions.filter(
      (q) => q.correct_answer === q.selectedOption
    );
    const attemptQuestions = allQuestions.filter((q) => !!q.selectedOption);
    if (!attemptQuestions.length) return;
    const percent = (correctAnswers.length / attemptQuestions.length) * 100;
    setAttemptQuestionsScore(Math.round(percent));
  };

  const calculateMaximumScore = () => {
    const attemptQuestions = allQuestions.filter((q) => !!q.selectedOption);
    const correctOutOfAttempt = attemptQuestions.filter(
      (q) => q.correct_answer === q.selectedOption
    );
    const unAttemptQuestionsLength =
      allQuestions.length - attemptQuestions.length;
    const percent =
      ((correctOutOfAttempt.length + unAttemptQuestionsLength) /
        allQuestions.length) *
      100;
    setMaxmScore(Math.round(percent));
  };

  function shuffleArray(originalArray: String[]) {
    const shuffledArray = [...originalArray];
    // Fisher-Yates (Knuth) Shuffle Algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  const handleOnRestartQuiz = () => {
    setCurrentQIndex(0);
    setAllQuestions([...decodedQuestions]);
    setResult(null);
    setCurrentQuestion(decodedQuestions[0]);
    setMaxmScore(0);
    setOriginalScore(0);
    setAttemptQuestionsScore(0);
  };

  return {
    allQuestions,
    currentQuestion,
    handleOnOptionSelect,
    currentQIndex,
    handleOnNext,
    calculateOriginalScore,
    calculateMaximumScore,
    calculateAttemptQuestionsScore,
    originalScore,
    maxmScore,
    attemptQuestionsScore,
    result,
    shuffleArray,
    handleOnRestartQuiz,
  };
};

export default useQuiz;
