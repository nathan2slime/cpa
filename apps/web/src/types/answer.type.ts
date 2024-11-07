export type AnswerType = {
  eventId: string
  data: AnswerData[]
}

export type AnswerData = {
  value: string
  questionId: string
}