export type Question = {
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: String[]
  selectedOption: null | String
}


export type Grade = 'A-one' | 'A' | 'B' | 'C' | 'F'

export type Status = 'pass' | 'fail'

export type Result = {
  score: number;
  grade: Grade
  status: Status
}
