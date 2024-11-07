"use client"

import { EditQuestionOptionProps, QuestionOptionProps } from '@/components/QuestionComponents/EditQuestionOption';
import { OptionsTypes } from '@/types/options.types';
import { api } from '@/api';
import React, { useContext, useEffect, useState } from 'react';
import { FetchContext, useFetch } from '@/context/FetchContext';
import { AnswerData } from '@/types/answer.type';

interface IQuestionOptions {
  OptionComponent: React.ComponentType<EditQuestionOptionProps | QuestionOptionProps>
  isAdmin?: boolean
  formResponse: AnswerData[]
  setValue: React.SetStateAction<AnswerData>
  opt: OptionsTypes[]
  setShouldFetch: React.SetStateAction<boolean>
}

export const QuestionOptionsRoot = ({OptionComponent, opt, isAdmin = true, setValue, formResponse, setShouldFetch}: IQuestionOptions) => {

  const [options, setOptions] = useState<OptionsTypes[]>(opt)

  const isFetchContextAvailable = useContext(FetchContext) !== undefined;
  const [shouldFetch] = isFetchContextAvailable ? useFetch<boolean>() : [false];
  const [selectedOption, setSelectedOptions] = useState<OptionsTypes>();

  useEffect(() => {

    if (!selectedOption) return

    const newObj : AnswerData = {
      value: selectedOption?.id,
      questionId: selectedOption?.questionId
    }

    const updatedFormResponse = formResponse.filter((res) => res.questionId !== selectedOption.questionId);

    setValue([...updatedFormResponse, newObj])

  }, [selectedOption]);

  useEffect(() => {
    setShouldFetch((prevState) => !prevState)
  }, [shouldFetch]);

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