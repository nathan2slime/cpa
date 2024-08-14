"use client";

import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/database/courses";
import { MyBarChart } from '@/components/BarChat/BarChat';
import SelectTipo from "@/components/Select/Select";
import MyPieChart from '@/components/PieChart/PieChart';
import { collection, getDocs } from 'firebase/firestore';


// quantas vezes cada opção foi escolhida
function contarTodasRespostas(data: Array<Record<number, string>>): Record<number, Record<string, number>> {
  const resultado: Record<number, Record<string, number>> = {};

  data.forEach(entry => {
    for (const [questao, resposta] of Object.entries(entry)) {
      const qNumber = parseInt(questao);
      if (!resultado[qNumber]) {
        resultado[qNumber] = {};
      }
      if (!resultado[qNumber][resposta]) {
        resultado[qNumber][resposta] = 0;
      }
      resultado[qNumber][resposta]++;
    }
  });

  return resultado;
}


export default function PageReport() {
  const [responsavelEvent, setResponsavelEvent] = useState('');
  const [graphType, setGraphType] = useState('coluna');
  const [answers, setAnswers] = useState<Record<number, string>>([]);

  const fetchData = async () => {
    const data: Array<Object> = [];

    const querySnapshot = await getDocs(collection(db, "answers"));
    querySnapshot.forEach((doc) => {

      data.push(doc.data());

    });
    const newData = contarTodasRespostas(data as Array<Record<number, string>>);
    setAnswers(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = Object.keys(answers).map(questao => {
    return {
      name: `Questão ${questao}`,
      ...answers[parseInt(questao)]
    };
  });


  return (
    <main className="pb-20 md:pr-24 w-full h-[90vh] custom-scrollbar overflow-y-auto">
      <section className="w-full m-auto mb-4 gap-4 transition-all lg:grid-cols-2">
        <h1>teste</h1>
        <SelectTipo graphType={graphType} setGraphType={setGraphType} />

        <Select
          value={responsavelEvent}
          onValueChange={(value) => setResponsavelEvent(value)}
        >
          <SelectTrigger id="course" className="flex w-2/6 m-auto justify-center border-solid border-2  rounded-2xl">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>


        {
          graphType === 'coluna' ? (
            chartData.map((data, index) => (
              <>
                <h3 key={index}>{data.name}</h3>
                <MyBarChart index={index} data={data} />
              </>
            ))) :
            (
              chartData.map((data, index) => (
                <>
                  <h3 key={index}>{data.name}</h3>
                  <MyPieChart data={[data]} />
                </>
              ))
            )
        }

      </section>
    </main>
  );
}
