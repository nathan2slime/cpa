import React from 'react';

type QuestionProps = {
  type?: string;
  question: string;
  options: string[];
  numberQuestion?: string | number;
};

export const Question: React.FC<QuestionProps> = ({
  type,
  question,
  options,
  numberQuestion,
}) => {
  return (
    <div className="max-w-3xl m-auto my-4 p-5 shadow-lg bg-white border border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold">
        {numberQuestion} - {question}
      </h3>

      <div className="flex flex-col mt-4 gap-2">
        {options.map((option, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <input
              id={`r${index + question}`}
              type="radio"
              name="pergunta1"
              value={index + 1}
            />
            <label htmlFor={`r${index + question}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
