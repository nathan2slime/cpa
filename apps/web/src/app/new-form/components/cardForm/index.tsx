import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { QuestionType } from '@/types/question';
import { CirclePlus, Trash2, CircleX } from 'lucide-react';

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
  removeOption: (questionIndex: number, optionIndex: number) => void;
  isLastQuestion: boolean;
  addQuestion: () => void;
  removeQuestion: () => void;
  isActive: boolean;  // Adicionando a prop isActive
}

export const NewFormQuestion: React.FC<Props> = ({
                                                   question,
                                                   index,
                                                   handleQuestionTitleChange,
                                                   handleOptionChange,
                                                   handleAddOption,
                                                   removeOption,
                                                   isLastQuestion,
                                                   addQuestion,
                                                   removeQuestion,
                                                   isActive,  // Recebendo a prop isActive
                                                 }) => {
  return (
    <div className="flex items-start gap-4 max-w-3xl m-auto">
      <div className="w-full my-4 p-6 bg-gray-100 rounded-lg">
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
            placeholder="Pergunta"
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
              {isActive && (  // Renderizar o botão de remover opção apenas se a questão estiver ativa
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => removeOption(index, optionIndex)}
                  title="Remover opção"
                >
                  <CircleX size={16} />
                </Button>
              )}
            </div>
          ))}

          {isActive && (  // Renderizar o botão de adicionar opção apenas se a questão estiver ativa
            <div className="w-full flex justify-evenly">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleAddOption(index)}
              >
                <p className="font-bold text-gray-400 underline">Adicionar uma alternativa</p>
              </Button>
            </div>
          )}
        </div>
      </div>

      {isActive && (  // Renderizar os botões de adicionar e remover questão apenas se a questão estiver ativa
        <div>
          <Button
            className="rounded-full mt-5"
            variant="ghost"
            size="icon"
            title="Adicionar questão"
            onClick={addQuestion}
          >
            <CirclePlus size={20} />
          </Button>

          <Button
            className="rounded-full mt-2"
            variant="ghost"
            size="icon"
            title="Remover questão"
            onClick={removeQuestion}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};
