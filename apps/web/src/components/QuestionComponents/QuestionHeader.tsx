'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { api } from '@/api';

interface QuestionHeaderProps {
  index: number
  title: string
  id?: string
  isAdmin?: boolean
}

export const QuestionHeader = ({
                                 index,
                                 title,
                                 id,
                                 isAdmin = true
                               }: QuestionHeaderProps) => {

  const [titleQuestion, setTitleQuestion] = React.useState(title);

  const putTitle = async (title: string) => {
      if (title != '') {
        await api.patch(`api/question/update/${id}`, {
          title: title,
        });
      } else {
        setTitleQuestion('Questão');
        await api.patch(`api/question/update/${id}`, { title: 'Questão' });
      }
    };

  return (
    <div className="flex w-full">
      <span className="bg-white border rounded size-7 flex items-center justify-center mr-3 text-sm font-semibold">
        {index + 1}
      </span>
      {
        isAdmin ?
          <Input
            className="bg-white"
            value={titleQuestion}
            onChange={(e) => setTitleQuestion(e.target.value)}
            onBlur={(e) => putTitle(e.target.value)}
          />
          :
          <p>{titleQuestion}</p>
      }
    </div>
  );
};
