'use client';

import React, { useEffect, useState } from 'react';
import { Question } from '@/app/form/[id]/components/cardForm';
import { QuestionType } from '@/types/question';
import { MenuOptionNewForm } from '@/app/form/[id]/components/MenuOptionNewForm';
import { useParams } from 'next/navigation';
import { api } from '@/api';
import { FormType } from '@/types/form';

const NewForm: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [form, setForm] = useState<FormType>();

  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const params = useParams();
  const id = params.id as string;

  const getDataForm = async () => {
    const { data } = await api.get<FormType>(`/api/form/show/${id}`);

    if (data) {
      setForm(data);

      data.questions && setQuestions(data.questions);
    }
  };

  const addQuestion = () => {};

  useEffect(() => {
    getDataForm();
  }, [shouldFetch]);

  return (
    <main className="pt-5 w-full h-[90vh] custom-scrollbar overflow-y-auto">
      <MenuOptionNewForm idForm={id} shouldFetch={setShouldFetch} />

      <div className={'flex flex-col gap-3'}>
        {questions.map((question: QuestionType, index) => (
          <Question
            key={question.id}
            index={index + 1}
            id={question.id}
            titleQuestion={question.title}
            type={question.type}
            setShouldFetch={setShouldFetch}
            shouldFetch={shouldFetch}
          />
        ))}
      </div>
    </main>
  );
};

export default NewForm;
