'use client';

import { HTMLAttributes } from 'react';

interface QuestionContainerOptions extends HTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const QuestionRoot = ({
                               children,
                               className,
                               ...rest
                             }: QuestionContainerOptions) => {
  return (
    <div {...rest} className={`w-3/4 border p-5 rounded-xl bg-gray-50 ${className || ''}`}>
      <div className={'space-y-3'}>
        {children}
      </div>
    </div>
  );
};


