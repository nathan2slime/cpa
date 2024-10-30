'use client';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { FormType } from '@/types/form';
import { getFullFormByIdService } from '@/services/form.sevices';
import { QuestionType } from '@/types/question';
import { OptionsTypes } from '@/types/options.types';

type Props = {
  params: {
    id: string;
  };
};

export type FullFormType = FormType & {
  questions: (QuestionType & {
    options: OptionsTypes;
  })[];
};

const Answer: NextPage<Props> = ({ params: { id } }) => {
  const [form, setForm] = useState<FullFormType>();

  const onLoadForm = async () => {
    const res = await getFullFormByIdService(id);

    if (res) {
      setForm(res);
    }
  };

  useEffect(() => {
    onLoadForm();
  }, []);

  return <div className="w-screen h-screen">{JSON.stringify(form)}</div>;
};

export default Answer;
