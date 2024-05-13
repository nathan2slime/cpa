'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Question } from '@/components/question';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { database } from '@/database';

import { FormProps } from './model';
import { AvatarFallback } from '@radix-ui/react-avatar';

export const Form = ({ id }: FormProps) => {
  const payload = database[id];

  const {
    formState: { isValid },
    watch,
    control,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(payload.schema),
  });

  const { append, remove } = useFieldArray({
    name: 'data',
    control,
  });

  const form = watch();

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onChangeQuestion = (e: string) => {
    const [question, answer] = e.split('-').map((e) => parseInt(e));

    const item = (form.data || []).find(
      (e: Record<string, number>) => e.question == question,
    );

    if (!!item) {
      remove(item);
    }

    append({ question, answer });
  };

  return (
    <div className="w-full h-full bg-[#fffbf7] p-4 md:p-8">
      <div className="max-w-4xl w-full flex-col mx-auto flex items-end">
        <div className="flex items-center flex-wrap mb-4 gap-6 md:flex-row justify-end md:justify-start w-full">
          <DropdownMenu dir="rtl" modal>
            <DropdownMenuTrigger>
              <div className="w-full h-[70px] bg-white border border-zinc-400 rounded-lg flex items-center justify-between p-2">
                <Avatar className="md:w-[50px] cursor-pointer h-[52px] w-[52px] md:h-[50px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Jhonathan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Minha conta</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-[70px] w-full md:w-fit bg-white border border-zinc-400 rounded-lg flex items-center justify-center md:justify-start gap-2 p-4 md:p-8">
            <h1 className="text-xl md:text-2xl font-bold tracking-wide text-zinc-900">
              {payload.title}
            </h1>
          </div>
        </div>

        {payload.data.map((question, index) => (
          <Question
            key={'question_' + index}
            data={question}
            position={index}
            onChange={onChangeQuestion}
          />
        ))}

        <Button
          className="w-full mt-5 max-w-[180px] tracking-wider"
          size="lg"
          disabled={!isValid}
          color="primary"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};
