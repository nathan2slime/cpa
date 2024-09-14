'use client'

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/api';
import { OptionsTypes } from '@/types/options.types';

export const Question = ({titleQuestion, type, id, shouldFetch, setShouldFetch, index}) => {

  const [options, setOptions] = useState<OptionsTypes[]>([])

  const getOptions = async () => {
    const {data} : OptionsTypes = await api.get(`/api/question/option/show?question=${id}`)
    setOptions(data)
  }

  const putOption = async (id: string | undefined) => {

    const newOption = {
      weight: options.find((option) => option.id === id).weight,
      title: options.find((option) => option.id === id).title
    }

    await api.patch(`api/question/option/update/${id}`, newOption)

  }

  const changeOption = async (id: string | undefined, title: string) => {
    setOptions(state => state.map((option)=> option.id === id ? {...option, title: title} : option))
  }

  const putTitle = async (title: string) => {
    await api.patch(`/api/question/update/${id}`, {
      title: title
    })
  }

  const deleteQuestion = async () => {
    await api.delete(`/api/question/remove/${id}`)
    setShouldFetch(prev => !prev)
  }

  const createOption = async () => {
    const option = {
      question: id,
      weight: 1,
      title: "Opção"
    }

    await api.post(`/api/question/option/create`, option)

    setShouldFetch(prev => !prev)
  }

  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    setTitle(titleQuestion)
    getOptions()
  }, [titleQuestion, shouldFetch]);

  return (
    <div className={'flex'}>
      <div className={'w-3/4 border p-5 rounded-xl bg-gray-50'}>
        <div className={'space-y-3'}>
          <div className={'flex'}>
            <span className={'bg-white border rounded size-7 flex items-center justify-center mr-3 text-sm font-semibold'}>{index}</span>
            <Input className={'bg-white'} value={title} onChange={(e) => setTitle(e.target.value)} onBlur={(e) => putTitle(e.target.value)} />
          </div>
          {
            type == 'TEXT' && <Textarea />
          }
          {
            options.length > 0 &&
            options.map((option, index) => (
              <div className={'ml-16 flex gap-1 items-center'} key={index}>
                <Input className={'bg-white'} value={option.title} onBlur={()=> putOption(option.id)} onChange={(e)=> changeOption(option.id, e.target.value)}/>
                <Input
                  className={'w-[35px]'}
                  value={option.weight}
                  />
              </div>
            ))
          }
        </div>
      </div>

      <div className={'flex flex-col justify-center ml-3 gap-3'}>
        {
          type == "CHOOSE" && <CirclePlus onClick={createOption} className={'cursor-pointer'} size={20}/>
        }
        <Trash2 onClick={deleteQuestion} className={'text-red-500 cursor-pointer'} size={20}/>
      </div>
    </div>
  );
};
