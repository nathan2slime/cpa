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
} from "@/components/ui/dropdown-menu"

import { database } from '@/database';

import { FormProps } from './model';
import { AvatarFallback } from '@radix-ui/react-avatar';

export const Form = ({ id }: FormProps) => {
  const payload = database[id];

  const {
    formState: { isValid },
    setValue,
    reset,
    watch,
    control,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(payload.schema),
  });

  const { fields, append, remove } = useFieldArray({
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
    <div className="w-full h-full bg-[#fffbf7] p-8">
      <div className="max-w-4xl w-full mx-auto flex items-end flex-col">
        <div className="w-full mb-5 bg-white border border-zinc-400 rounded-lg flex items-center justify-between gap-2 py-7 px-7">
          <h1 className="text-2xl font-bold tracking-wide text-zinc-900">
            {payload.title}
          </h1>


          <DropdownMenu dir="rtl" modal>
            <DropdownMenuTrigger>
              <Avatar className="w-[50px] cursor-pointer h-[50px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Jhonathan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Minha conta</DropdownMenuItem>
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {payload.data.map((question, index) => (
          <Question
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
