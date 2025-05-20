import type { Question, QuestionAnswer } from "@/types/report.type"

type TextResponsesProps = {
  question: Question
}

type GroupedResponses = {
  [optionId: string]: QuestionAnswer[]
  noOption: QuestionAnswer[]
}

export function TextResponses({ question }: TextResponsesProps) {
  const groupedResponses =
    question.type === "CHOOSE_AND_TEXT"
      ? question.questionAnswer.reduce<GroupedResponses>(
          (acc, answer) => {
            if (answer.questionOptionId) {
              if (!acc[answer.questionOptionId]) {
                acc[answer.questionOptionId] = []
              }
              acc[answer.questionOptionId].push(answer)
            } else {
              acc.noOption.push(answer)
            }
            return acc
          },
          { noOption: [] },
        )
      : { allResponses: question.questionAnswer }

  const hasTextResponses = question.questionAnswer.some((a) => a.value && a.value.trim())

  if (question.type === "CHOOSE_AND_TEXT") {
    return (
      <div className="space-y-4 max-h-[500px] overflow-y-auto border rounded-md p-3">
        {hasTextResponses ? (
          <>
            {Object.entries(groupedResponses).map(([optionId, answers]) => {
              if (optionId === "noOption" && answers.length === 0) return null

              const optionTitle =
                optionId === "noOption"
                  ? "Sem opção selecionada"
                  : question.options.find((opt) => opt.id === optionId)?.title || "Opção desconhecida"

              const textAnswers = answers.filter((a) => a.value?.trim())
              if (textAnswers.length === 0) return null

              return (
                <div key={optionId} className="mb-4">
                  <h4 className="font-medium text-sm mb-2 text-primary">{optionTitle}</h4>
                  <div className="space-y-2 pl-3 border-l-2 border-muted">
                    {textAnswers.map((answer, i) => (
                      <div key={i} className="text-sm py-1">
                        {answer.value && answer.value.trim() ? (
                          answer.value.trim()
                        ) : (
                          <span className="text-muted-foreground">Resposta vazia</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div className="text-muted-foreground italic">Sem respostas de texto</div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-3">
      {hasTextResponses ? (
        question.questionAnswer.map((a, i) => (
          <div key={i} className="text-sm py-1">
            {a.value && a.value.trim() ? a.value.trim() : <span className="text-muted-foreground">Resposta vazia</span>}
          </div>
        ))
      ) : (
        <div className="text-muted-foreground italic">Sem respostas de texto</div>
      )}
    </div>
  )
}
