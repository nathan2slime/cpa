"use client";

import { useState } from 'react';
import { anual_avaliation } from '@/database/anual_avaliation';
import { QuestionType } from '@/types/question';

const Questionaire = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(anual_avaliation.length).fill(''));

    const handleNextQuestion = () => {
        if (currentQuestionIndex < anual_avaliation.length - 1 && answers[currentQuestionIndex] !== '') {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log('Respostas:', answers);
            // Aqui você pode fazer algo com as respostas, como enviar para um servidor
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <button
                        onClick={handlePreviousQuestion}
                        className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                            currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={currentQuestionIndex === 0}
                    >
                        Voltar
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {currentQuestionIndex < anual_avaliation.length - 1 ? 'Próxima' : 'Finalizar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questionaire;




