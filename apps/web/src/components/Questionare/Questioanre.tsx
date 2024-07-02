"use client";

import { ChangeEvent, useState } from 'react';
import { anual_avaliation } from '@/database/anual_avaliation';
//import { QuestionType } from '@/types/question';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { Button } from '../ui/button';


// enviar para o banco de dados
//const handleFormSubmit = async (data: Record<string, any>) => {
const handleFormSubmit = (data: string[]) => {
  addDoc(collection(db, 'answers'), {
    ...data,
  });
};

const Questionaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(anual_avaliation.length).fill(''));

  const handleNextQuestion = () => {
    if (currentQuestionIndex < anual_avaliation.length - 1 && answers[currentQuestionIndex] !== '') {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log('Respostas:', answers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{anual_avaliation[currentQuestionIndex].question}</h2>
        <div className="mb-4">
          {anual_avaliation[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={handleAnswerChange}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            onClick={handlePreviousQuestion}
            className={`${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={currentQuestionIndex === 0}
          >
            Voltar
          </Button>
          {currentQuestionIndex < anual_avaliation.length - 1 ? (
            <Button
              onClick={handleNextQuestion}
              disabled={answers[currentQuestionIndex] === '' ? true : false}
            >
              Próxima
            </Button>
          ) : (
            <Button
              onClick={() => handleFormSubmit(answers)}
              className="bg-green-600 hover:bg-green-800"
              disabled={answers[currentQuestionIndex] === '' ? true : false}
            >
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionaire;




