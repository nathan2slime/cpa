import { CirclePlus, Trash2 } from 'lucide-react';
import React from 'react';
import { api } from '@/api';
import { useFetch } from '@/context/FetchContext';

interface Props {
  type: string
  optionId: string
}

export const QuestionManager = ({type, optionId}: Props) => {

  const [shouldFetch, setShouldFetch] = useFetch()

  const deleteQuestion = async () => {
    await api.delete(`/api/question/remove/${optionId}`);
    setShouldFetch(!shouldFetch)
  };

  const createOption = async () => {
    const option = {
      question: optionId,
      title: 'Opção',
    };

    await api.post(`/api/question/option/create`, option);

    setShouldFetch(!shouldFetch);
  };

  return (
    <div className={'flex flex-col justify-center ml-3 gap-3'}>
      {type == 'CHOOSE' && (
        <CirclePlus
          onClick={createOption}
          className={'cursor-pointer'}
          size={20}
        />
      )}
      <Trash2
        onClick={deleteQuestion}
        className={'text-red-500 cursor-pointer'}
        size={20}
      />
    </div>
  )
}