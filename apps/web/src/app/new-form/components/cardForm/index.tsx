import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { QuestionType } from '@/types/question';

interface Props {
  question: QuestionType;
  index: number;
  handleQuestionTitleChange: (e: string, index: number) => void;
  handleOptionChange: (
    e: string,
    questionIndex: number,
    optionIndex: number,
  ) => void;
  handleAddOption: (index: number) => void;
}

export const NewFormQuestion: React.FC<Props> = ({
  question,
  index,
  handleQuestionTitleChange,
  handleOptionChange,
  handleAddOption,
}) => {
  return (
    <div className="w-full max-w-3xl m-auto my-4 p-6 bg-white rounded-lg">
      <div className="flex gap-3 items-start justify-start">
        <Button
          disabled
          size="icon"
          variant="outline"
          className="font-bold flex-shrink-0 text-zinc-900"
        >
          {(index + 1).toString()}
        </Button>
        <Input
          type="text"
          value={question.question}
          onChange={(e) => handleQuestionTitleChange(e.target.value, index)}
          className="w-min text-lg font-medium text-zinc-900"
        />
      </div>

      <Separator className="mt-3" />

      <div className="flex ml-[42px] flex-col mt-4">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex flex-row mt-4 space-x-2">
            <input
              type="radio"
              id={`option_${index}_${optionIndex}`}
              name={`question_${index}`}
            />
            <Input
              name={`question_${index}`}
              type="text"
              value={option}
              onChange={(e) =>
                handleOptionChange(e.target.value, index, optionIndex)
              }
              className="w-full text-lg font-medium text-zinc-900"
              placeholder="Opção"
            />
          </div>
        ))}

        <div className="w-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAddOption(index)}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
