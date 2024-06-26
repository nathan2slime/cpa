"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/database/courses";
import MyBarChart from '@/components/BarChat/BarChat';
import SelectTipo from "@/components/Select/Select";
import MyPieChart from '@/components/PieChart/PieChart';
import { anual_avaliation } from '@/database/anual_avaliation';
import { QuestionType } from '@/types/question';

type Option = {
  name: string;
  qtd: number;
};

type ChartData = {
  question: string;
  options: Option[];
};

export default function PageReport() {
  const [responsavelEvent, setResponsavelEvent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('coluna');

  const transformData = (questions: QuestionType[]): ChartData[] => {
    // Placeholder function to generate random data for the example
    const generateRandomData = (options: string[]): Option[] => {
      return options.map(option => ({ name: option, qtd: Math.floor(Math.random() * 10) + 1 }));
    };

    return questions.map(question => ({
      question: question.question,
      options: generateRandomData(question.options),
    }));
  };

  const data = transformData(anual_avaliation);

  return (
      <section className="w-full">
        <main className="pb-20 md:pr-24 w-full h-[90vh] custom-scrollbar overflow-y-auto">
          <section className="w-full m-auto mb-4 gap-4 transition-all lg:grid-cols-2">
            <Card>
              <div className="flex">
                <SelectTipo value={selectedCategory} onValueChange={setSelectedCategory} initialValue={selectedCategory} className="ml-auto pt-5 pr-5" />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-center">Relatório</CardTitle>
              </CardHeader>
              <Select
                  value={responsavelEvent}
                  onValueChange={(value) => setResponsavelEvent(value)}
              >
                <SelectTrigger id="course" className="flex w-2/6 m-auto justify-center border-solid border-2 bg-gray-200 rounded-2xl">
                  <SelectValue placeholder="Escolha um curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {responsavelEvent ? (
                  <CardContent>
                    {data.map((item, index) => (
                        selectedCategory === 'coluna' ? (
                            <MyBarChart key={index} data={item} />
                        ) : (
                            <MyPieChart key={index} data={item} />
                        )
                    ))}
                  </CardContent>
              ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20 mb-20">
                    <div className="text-4xl">📘</div>
                    <CardTitle className="flex justify-center text-black text-4xl">Por favor, selecione um curso.</CardTitle>
                  </div>
              )}
              <CardFooter>
              </CardFooter>
            </Card>
          </section>
        </main>
      </section>
  );
}
