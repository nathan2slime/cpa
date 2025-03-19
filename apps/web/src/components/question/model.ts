import { QuestionType } from '@/types/question'

export type QuestionTypeProps = {
  data: QuestionType
  position: number
  onChange: (value: string) => void
}
