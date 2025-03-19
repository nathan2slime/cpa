'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { createAnswer } from '@/services/answer.service'
import { getFullFormByIdService } from '@/services/form.sevices'
import { FormType } from '@/types/form'
import { OptionsTypes } from '@/types/options.types'
import { QuestionType } from '@/types/question'

type Props = {
  params: {
    id: string
  }
}

export type FullFormType = FormType & {
  questions: (QuestionType & {
    options: OptionsTypes
  })[]
}

const Answer: NextPage<Props> = ({ params: { id } }) => {
  const [form, setForm] = useState<FullFormType>()
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [answered, setAnswered] = useState(false)

  const onLoadForm = async () => {
    setLoading(true)

    const res = await getFullFormByIdService(id)

    if (res.status === 200) setForm(res.data)
    if (res.status === 204) setAnswered(true)

    setLoading(false)
  }

  useEffect(() => {
    onLoadForm()
  }, [])

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const validateResponses = () => {
    if (!form?.questions) return false

    const unansweredQuestions = form.questions.filter(question => !responses[question.id] || responses[question.id].trim() === '')

    if (unansweredQuestions.length > 0) {
      toast.error('Por favor, responda todas as questões antes de enviar.')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateResponses()) return

    const loadingToast = toast.loading('Enviando suas respostas...')

    setSubmitting(true)

    try {
      const submission = {
        eventId: id,
        data: Object.entries(responses).map(([questionId, value]) => ({
          questionId,
          value
        }))
      }

      const { status } = await createAnswer(submission)

      if (status === 201) {
        toast.dismiss(loadingToast)
        setSubmitting(false)
        return toast.success('Suas respostas foram enviadas com sucesso!')
      }
    } catch (_error) {
      toast.dismiss(loadingToast)
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando formulário...</span>
      </div>
    )
  }

  if (answered) {
    return (
      <div className="h-screen flex justify-center">
        <div className="border p-8 rounded-md w-[500px] h-fit mt-10 border-t-primary border-t-8">
          <p className="text-xl">Você já respondeu.</p>
          <p className="text-sm mt-2">Este evento não pode ser respondido novamente, Se achar que isso é um erro contacte a cordenadoria.</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className={'p-5'}>Formulário não encontrado 404</p>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>{form.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.questions.map(question => (
            <div key={question.id} className="space-y-3">
              <h3 className="text-lg font-medium">
                {question.title}
                <span className="text-red-500 ml-1">*</span>
              </h3>

              {question.type === 'CHOOSE' && (
                <RadioGroup value={responses[question.id] || ''} onValueChange={value => handleResponseChange(question.id, value)}>
                  {question?.options?.map(option => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id}>{option.title}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'TEXT' && (
                <Textarea
                  placeholder="Digite sua resposta aqui..."
                  value={responses[question.id] || ''}
                  onChange={e => handleResponseChange(question.id, e.target.value)}
                  className="min-h-[100px]"
                />
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={submitting} className="w-full">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar respostas'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Answer
