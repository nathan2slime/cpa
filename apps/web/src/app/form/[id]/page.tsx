'use client';

import React, { useEffect, useState } from 'react';
import { HeaderForm } from '../components/HeaderForm';
import { NewFormQuestion } from '../components/cardForm';
import { Input } from '@/components/ui/input';
import { QuestionType } from '@/types/question';
import { MenuOptionNewForm } from '../components/MenuOptionNewForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, SquarePlus } from 'lucide-react';

const NewForm: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  const newQuestion: QuestionType = {
    type: 'choose',
    question: '',
    options: [''],
  };

  const addQuestion = () => {
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTitleChange = (e: string, index: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index]) {
      updatedQuestions[index].question = e;
      setQuestions(updatedQuestions);
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex]) {
      updatedQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(updatedQuestions);
    }
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index]) {
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
    // Atualiza a questão ativa, caso a removida seja a ativa
    if (activeQuestionIndex === index) {
      setActiveQuestionIndex(null);
    }
  };

  const handleOptionChange = (
    e: string,
    questionIndex: number,
    optionIndex: number,
  ) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex]) {
      updatedQuestions[questionIndex].options[optionIndex] = e;
      setQuestions(updatedQuestions);
    }
  };

  const handleAddOption = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  useEffect(() => {

  }, []);

  return (
    <main className="pt-5 w-full h-[90vh] custom-scrollbar overflow-y-auto">
      <MenuOptionNewForm onClick={addQuestion} />

      {questions.length === 0 && (
        <div className="h-max w-full max-w-3xl m-auto p-3 bg-white rounded-lg flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-2/5"
            onClick={addQuestion}
          >
            <p className="font-bold text-lg flex">Adicionar questão</p>
            <PlusCircle className={'ml-2'} size={20} />
          </Button>
        </div>
      )}

      {questions.map((question, index) => (
        <div key={index} onClick={() => setActiveQuestionIndex(index)}>
          <NewFormQuestion
            question={question}
            index={index}
            handleQuestionTitleChange={handleQuestionTitleChange}
            handleOptionChange={handleOptionChange}
            handleAddOption={handleAddOption}
            isLastQuestion={index === questions.length - 1}
            addQuestion={addQuestion}
            removeQuestion={() => removeQuestion(index)}
            removeOption={removeOption}
            // Passa informações adicionais para saber se é a questão ativa
            isActive={activeQuestionIndex === index}
          />
        </div>
      ))}

      {
        questions.length > 0 && (
          <div className={'flex w-full justify-center'}>
            <Button>Finalizar Formulário</Button>
          </div>
        )
      }

    </main>
  );
};

export default NewForm;