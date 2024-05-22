'use client';

import React, { useState } from 'react';
import { HeaderForm } from './components/HeaderForm';
import { NewFormQuestion } from './components/cardForm';
import { Input } from '@/components/ui/input';
import { QuestionType } from '@/types/question';
import { MenuOptionNewForm } from './components/MenuOptionNewForm';

const NewForm: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState<string>('');

  const newQuestion: QuestionType = {
    type: 'choose',
    question: 'Titulo da questão',
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

  return (
    <main className="pt-20">
      <HeaderForm />
      <MenuOptionNewForm onClick={addQuestion} />
      <div className="h-max w-full max-w-3xl m-auto my-4 p-6 bg-white rounded-lg flex flex-col gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl text-zinc-900"
          placeholder="Titulo do formulário"
        />
      </div>

      {questions.map((question, index) => (
        <NewFormQuestion
          key={index}
          question={question}
          index={index}
          handleQuestionTitleChange={handleQuestionTitleChange}
          handleOptionChange={handleOptionChange}
          handleAddOption={handleAddOption}
        />
      ))}
    </main>
  );
};

export default NewForm;
