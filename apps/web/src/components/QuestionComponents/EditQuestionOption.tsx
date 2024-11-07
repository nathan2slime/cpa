"use client"

import { Input } from '@/components/ui/input';
import { CircleX } from 'lucide-react';
import React from 'react';
import { OptionsTypes } from '@/types/options.types';
import { api } from '@/api';
import { useFetch } from '@/context/FetchContext';

export interface EditQuestionOptionProps {
  option: OptionsTypes
}

export const EditQuestionOption = ({option} : EditQuestionOptionProps) => {

  const [optionQuestion, setOptionQuestion] = React.useState<OptionsTypes>(option)

  const [shouldFetch, setShouldFetch] = useFetch<boolean>()

  const putOption = async (id: string | undefined) => {
      const newOption = {
        title: optionQuestion.title
      };

      if (newOption.title !== '') {
        await api.patch(`api/question/option/update/${id}`, newOption);
      } else {
        setOptionQuestion({ ...optionQuestion, title: "Opção" });
        await api.patch(`api/question/option/update/${id}`, { title: "Opção" });
      }
    };

  const removeOption = async (id: string) => {
      await api.delete(`api/question/option/remove/${id}`);
      setShouldFetch(!shouldFetch);
    };

  return (
    <div className={'ml-16 flex gap-1 items-center'}>
      <Input
        className={'bg-white'}
        value={optionQuestion.title}
        onBlur={() => putOption(optionQuestion.id)}
        onChange={(e) => setOptionQuestion({...optionQuestion, title: e.target.value})}
      />
      <div className={'size-7 flex items-center justify-center'}>
        <CircleX
          size={15}
          className={'cursor-pointer text-red-500'}
          onClick={() => removeOption(option.id)}
        />
      </div>
    </div>
  )
}