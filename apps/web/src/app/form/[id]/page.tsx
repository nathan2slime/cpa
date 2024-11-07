'use client';

import React, { useEffect, useState } from 'react';
import { QuestionType } from '@/types/question';
import { MenuOptionNewForm } from '@/app/form/[id]/components/MenuOptionNewForm';
import { useParams } from 'next/navigation';
import { api } from '@/api';
import { FormType } from '@/types/form';
import {Question} from '@/components/QuestionComponents';
import { QuestionOptionsRoot } from '@/components/QuestionComponents/QuestionOptionsRoot';
import { EditQuestionOption } from '@/components/QuestionComponents/EditQuestionOption';
import { FetchProvider, useFetch } from '@/context/FetchContext';

const NewForm: React.FC = () => {

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [shouldFetch, setShouldFetch] = useFetch()

  const params = useParams();
  const id = params.id as string;

  console.log(shouldFetch);

  const getDataForm = async () => {
    const { data } = await api.get<FormType>(`/api/form/show/${id}`);

    if (data) {
      data.questions && setQuestions(data.questions);
    }
  };

  useEffect(() => {
    getDataForm();
  }, [shouldFetch]);

  return (
    <main className="w-full h-[90vh] custom-scrollbar overflow-y-auto">
      <MenuOptionNewForm idForm={id} shouldFetch={setShouldFetch} />
      <div className={'flex flex-col gap-3'}>
        {questions.map((question: QuestionType, index) => (
          <div className={'flex w-full'}>
            <Question.Root key={question.id}>
              <Question.Header key={index} title={question.title} id={question.id} index={index}/>
              <QuestionOptionsRoot questionId={question.id} OptionComponent={EditQuestionOption}>
              </QuestionOptionsRoot>
            </Question.Root>

            <Question.Manager type={question.type} optionId={question.id}/>

          </div>
        ))}
      </div>
    </main>
  );
};

export default () => (
  <FetchProvider>
    <NewForm/>
  </FetchProvider>
)
