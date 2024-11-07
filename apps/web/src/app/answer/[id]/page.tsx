'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { FormResponse, FormType } from '@/types/form';
import { getFullFormByIdService } from '@/services/form.sevices';
import { QuestionType } from '@/types/question';
import { OptionsTypes } from '@/types/options.types';
import { Question } from '@/components/QuestionComponents';
import { QuestionOptions } from '@/components/QuestionComponents/QuestionOption';
import { Textarea } from '@/components/ui/textarea';
import { AnswerData, AnswerType } from '@/types/answer.type';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { submitForm } from '@/services/answear.services';
import { getEventByIdService } from '@/services/event.services';
import { EventReq } from '@/types/event.types';

type Props = {
  params: {
    id: string;
  };
};

export interface Question extends QuestionType {
  options: OptionsTypes[];
}

export interface FullFormType extends FormType {
  questions: Question[];
}


const Answer: NextPage<Props> = ({ params: { id } }) => {

  const [form, setForm] = useState<FullFormType>();
  const [formResponse, setFormResponse] = useState<AnswerData[]>([])
  const [event, setEvent] = useState<EventReq>()

  const [errors, setErrors] = useState<boolean>(false)

  const onLoadEvent = async () => {

    if (event && event.formId){

      if (eventRes && eventRes.formId){
        const formRes : FormResponse = await getFullFormByIdService(eventRes.formId)
        setForm(formRes)
      }

      return
    }

    const eventRes : EventReq = await getEventByIdService(id)

    if (eventRes && eventRes.formId){
      const formRes : FormResponse = await getFullFormByIdService(eventRes.formId)
      setForm(formRes)
    }

    if (eventRes){
      setEvent(eventRes)
    }
  };

  const answered = (id: string): boolean => {
    return formResponse.some((form) => form.questionId === id && form.value) && errors
  }

  const onSubmit = async () => {
    if (formResponse.length !== form.questions.length){
      setErrors(true)
      toast.error("Responda todas as Questões")
      return
    }

    const data : AnswerType = {
      eventId: event.id,
      data: formResponse
    }

    const res = await submitForm(data)

    if (res) {
      toast.success("Form enviado com sucesso!")
    }

  }

  const handleResponseQuestionText = (questionId: string, value: string) => {
    const formResponseFiltered = formResponse.filter((form) => form.questionId != questionId)
    setFormResponse([...formResponseFiltered, { questionId: questionId, value: value }])
  }

  useEffect(() => {
    onLoadEvent();
  }, []);

  return (
      <div className="w-full h-screen custom-scrollbar overflow-y-auto p-5">
        <p className={'text-center text-2xl xl:text-3xl font-semibold mb-5'}>{form?.title}</p>
        <div className={'flex flex-col gap-5 w-full items-center'}>
          {
            form?.questions?.map((question, index) => (
              <Question.Root className={!answered(question.id) && errors && "ring-red-600 ring-1"}>
                <Question.Header index={index} title={question.title} isAdmin={false}/>
                {
                  question.type == "CHOOSE" ?
                    <Question.OptionsRoot opt={question.options} setValue={setFormResponse} formResponse={formResponse} isAdmin={false} OptionComponent={QuestionOptions}>
                    </Question.OptionsRoot>
                    :
                    <Textarea className={'bg-white'} onChange={(e)=> handleResponseQuestionText(question.id, e.target.value)}/>
                }
              </Question.Root>
            ))
          }
        </div>
        <div className={'flex justify-center mt-5'}>
          <Button onClick={onSubmit}>Enviar Formulário</Button>
        </div>
      </div>
  )
};

export default Answer;
