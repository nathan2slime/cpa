'use client';
import { Button } from '@/components/ui/button';
import { CirclePlus, StretchHorizontal } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { api } from '@/api';

export const MenuOptionNewForm = ({
  idForm,
  shouldFetch,
}: {
  idForm: string;
  shouldFetch: Dispatch<SetStateAction<boolean>>;
}) => {
  const createQuestion = async (type: string) => {
    await api.post('/api/question/create', {
      form: idForm,
      type: type,
      title: 'Questão',
    });

    shouldFetch((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center gap-4 bg-white m-auto rounded-full p-1 mb-4">
      <Button
        className="rounded-full"
        variant="ghost"
        size="icon"
        title={'Adicionar uma Questão do tipo texto'}
        onClick={() => createQuestion('TEXT')}
      >
        <StretchHorizontal size={20} />
      </Button>

      <Button
        className="rounded-full"
        variant="ghost"
        size="icon"
        title={'Adicionar uma Questão do tipo escolha'}
        onClick={() => createQuestion('CHOOSE')}
      >
        <CirclePlus size={20} />
      </Button>
    </div>
  );
};
