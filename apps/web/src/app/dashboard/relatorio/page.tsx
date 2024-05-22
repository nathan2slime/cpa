'use client';
import React from 'react';
import { QuestionGrafic } from '@/components/CardGrafic';
import { SelectCourse } from '@/components/SelectCourse';

const Relatorio = () => {
  return (
    <section className="min-h-screen w-full bg-gray-200">
      <h1>Pagina de Relatorio</h1>

      <div className="w-full bg-red-400 grid place-items-center">
        <SelectCourse />
      </div>
      <QuestionGrafic />
    </section>
  );
};
export default Relatorio;
