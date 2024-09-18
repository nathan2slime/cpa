export type EventForm = {
  title: string,
  description: string,
  courses: string[],
  responsible: string
  startDate: Date,
  endDate: Date,
  form: string,
  open: boolean
}