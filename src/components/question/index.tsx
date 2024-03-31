'use client';

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { AnswerRadio } from '@/components/answer_radio';
import { Separator } from '@/components/ui/separator';

import { QuestionTypeProps } from './model';

export const Question = ({
  data: { type, question, options },
  position,
    onChange,
}: QuestionTypeProps) => {
  const answers: Record<string, ReactNode> = {
    choose: <AnswerRadio onChange={onChange} position={position} data={options} />,
  };

  return (
    <div className="w-full m-auto my-4 p-6 bg-white rounded-lg">
      <div className="flex gap-3 items-start justify-start">
        <Button
          variant="outline"
          className="font-bold flex-shrink-0 text-zinc-900"
          size="icon"
        >
          {position + 1}
        </Button>
        <h3 className="text-lg font-medium text-zinc-900">{question}</h3>
      </div>

      <Separator className="mt-3" />

      <div className="flex ml-[42px] flex-col mt-4">{answers[type]}</div>
    </div>
  );
};
