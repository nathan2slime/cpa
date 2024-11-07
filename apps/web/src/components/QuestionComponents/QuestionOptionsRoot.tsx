"use client"

import { EditQuestionOptionProps, QuestionOptionProps } from '@/components/QuestionComponents/EditQuestionOption';
import { OptionsTypes } from '@/types/options.types';
import React, { useContext, useEffect, useState } from 'react';
import { FetchContext, useFetch } from '@/context/FetchContext';
import { AnswerData } from '@/types/answer.type';
import { api } from '@/api';

interface IQuestionOptions {
  OptionComponent: React.ComponentType<EditQuestionOptionProps | QuestionOptionProps>
  isAdmin?: boolean
  formResponse?: AnswerData[]
  setValue?: React.SetStateAction<AnswerData>
  opt: OptionsTypes[]
  questionId?: string
}

export const QuestionOptionsRoot = ({OptionComponent, opt, isAdmin = true, setValue, formResponse, questionId}: IQuestionOptions) => {

  const [options, setOptions] = useState<OptionsTypes[]>(opt)

  const isFetchContextAvailable = useContext(FetchContext) !== undefined;
  const [shouldFetch] = isFetchContextAvailable ? useFetch<boolean>() : [false];
  const [selectedOption, setSelectedOptions] = useState<OptionsTypes>();

  const fetchOption = async () => {
    const {data} = await api.get("/api/question/option/show?question=" + questionId)
    setOptions(data)
  }

  useEffect(() => {
    if (isAdmin){
      fetchOption()
    }
  }, [isAdmin, shouldFetch]);

  useEffect(() => {

    if (!selectedOption) return

    const newObj : AnswerData = {
      value: selectedOption?.id,
      questionId: selectedOption?.questionId
    }

    const updatedFormResponse = formResponse.filter((res) => res.questionId !== selectedOption.questionId);

    setValue([...updatedFormResponse, newObj])

  }, [selectedOption]);

  return (
    <>
      {
        options?.map((option, i) => (
          <OptionComponent isActive={selectedOption?.id === option?.id && !isAdmin} option={option} key={i} setSelectedOption={!isAdmin && setSelectedOptions}/>
        ))
      }
    </>
  )
}