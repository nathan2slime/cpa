export type EventForm = {
  eventName: string,
  courses: string[],
  initialDate: Date | null,
  endDate: Date | null,
  formId: number | null
}