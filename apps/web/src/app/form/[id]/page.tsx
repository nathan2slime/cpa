'use client';

import React, { useEffect, useState } from 'react';
import { QuestionType } from '@/types/question';
import { MenuOptionNewForm } from '@/app/form/[id]/components/MenuOptionNewForm';
import { useParams } from 'next/navigation';
import { api } from '@/api';
import {Question} from '@/components/QuestionComponents';
import { QuestionOptionsRoot } from '@/components/QuestionComponents/QuestionOptionsRoot';
import { EditQuestionOption } from '@/components/QuestionComponents/EditQuestionOption';
import { FetchProvider, useFetch } from '@/context/FetchContext';
import { OptionsTypes } from '@/types/options.types';
import { Textarea } from '@/components/ui/textarea';

export interface Question extends QuestionType {
  options: OptionsTypes[];
}

const NewForm: React.FC = () => {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [shouldFetch, setShouldFetch] = useFetch()

  const params = useParams();
  const id = params.id as string

  console.log(questions);

  const getDataForm = async () => {
    const { data } = await api.get(`/api/form/show/${id}`);

    if (data) {
      data.questions && setQuestions(data.questions);
    }
  };

  useEffect(() => {
    getDataForm();
  }, [shouldFetch]);

  return (
    <main className="w-full h-full custom-scrollbar overflow-y-auto">
      <MenuOptionNewForm idForm={id} shouldFetch={setShouldFetch as React.Dispatch<React.SetStateAction<boolean>>} />
      <div className={'flex flex-col gap-3 mb-10'}>
        {questions.map((question: Question, index) => (
          <div className={'flex w-full'}>
            <Question.Root key={question.id}>
              <Question.Header key={index} title={question.title} id={question.id} index={index}/>
              {
                question.type === "CHOOSE" ?
                  <QuestionOptionsRoot questionId={question.id} opt={question.options} OptionComponent={EditQuestionOption}>
                  </QuestionOptionsRoot>
                  :
                  <Textarea/>
              }
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
