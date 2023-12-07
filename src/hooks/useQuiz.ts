import { Grade, Question, Result, Status } from "@/types/types.question"
import { questionsJson } from '@/questions'
import React from "react";

const useQuiz = () => {
  const [allQuestions, setAllQuestions] = React.useState<Question[]>([...questionsJson])
  const [currentQIndex, setCurrentQIndex] = React.useState(0)
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>({ ...allQuestions[currentQIndex] })
  const [originalScore, setOriginalScore] = React.useState(0)
  const [maxmScore, setMaxmScore] = React.useState(0)
  const [attemptQuestionsScore, setAttemptQuestionsScore] = React.useState(0)
  const [result, setResult] = React.useState<Result | null>(null)

  const handleOnOptionSelect = ({ option, qIndex }: { option: String, qIndex: number }) => {
    let modifiedQuestion: Question = { ...allQuestions[qIndex], selectedOption: option }
    let modifiedAllQuestions = [...allQuestions]
    modifiedAllQuestions[qIndex] = { ...modifiedQuestion }
    setAllQuestions([...modifiedAllQuestions])
    setCurrentQuestion({ ...modifiedQuestion })
  }

  const handleOnNext = () => {
    setCurrentQIndex(prev => prev + 1)
    setCurrentQuestion({ ...allQuestions[currentQIndex + 1] })
    if (currentQIndex === allQuestions.length - 1) {
      calculateResult()
    }
  }

  const calculateResult = () => {
    let grade: Grade;
    if (originalScore >= 80) {
      grade = 'A-one'
    } else if (originalScore >= 70) {
      grade = 'A'
    } else if (originalScore >= 60) {
      grade = 'B'
    } else if (originalScore >= 50) {
      grade = 'C'
    } else {
      grade = 'F'
    }
    let status: Status = grade === 'F' ? 'fail' : 'pass'
    setResult({ grade, status, score: originalScore })
  }

  const addStringToRandomIndex = (incorrect_answers: String[], correct_answer: String) => {
    const mergedArray = [...incorrect_answers];
    // Get a random index within the merged array length
    const randomIndex = Math.floor(Math.random() * (mergedArray.length + 1));
    // Insert the correctAnswer at the random index
    mergedArray.splice(randomIndex, 0, correct_answer);
    return mergedArray;
  }

  const handleOnRestartQuiz = () => {

  }

  const calculateOriginalScore = () => {
    const correctAnswers = allQuestions.filter((q) => q.correct_answer === q.selectedOption)
    const percent = (correctAnswers.length / allQuestions.length) * 100;
    setOriginalScore(Number(percent.toFixed(2)))
  }

  const calculateAttemptQuestionsScore = () => {
    const correctAnswers = allQuestions.filter((q) => q.correct_answer === q.selectedOption)
    const attemptQuestions = allQuestions.filter((q) => !!q.selectedOption)
    if (!attemptQuestions.length) return
    const percent = (correctAnswers.length / attemptQuestions.length) * 100;
    setAttemptQuestionsScore(Number(percent.toFixed(2)))
  }


  const calculateMaximumScore = () => {
    const attemptQuestions = allQuestions.filter((q) => !!q.selectedOption)
    const correctOutOfAttempt = attemptQuestions.filter((q) => q.correct_answer === q.selectedOption)
    const unAttemptQuestionsLength = allQuestions.length - attemptQuestions.length
    const percent = ((correctOutOfAttempt.length + unAttemptQuestionsLength) / allQuestions.length) * 100;
    setMaxmScore(Number(percent.toFixed(2)))
  }

  return { allQuestions, currentQuestion, addStringToRandomIndex, handleOnOptionSelect, currentQIndex, handleOnNext, handleOnRestartQuiz, calculateOriginalScore, calculateMaximumScore, calculateAttemptQuestionsScore, originalScore, maxmScore, attemptQuestionsScore, result }
}

export default useQuiz