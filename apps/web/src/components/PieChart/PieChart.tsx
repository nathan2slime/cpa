"use client";

import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Answers } from "@/types/report.type";

function generatePieChartData(answers: Answers[]) {
  const optionCountMap: Record<string, number> = {};

  answers.forEach((answer) => {
    const optionId = answer.option?.id;
    if (optionId) {
      optionCountMap[optionId] = (optionCountMap[optionId] || 0) + 1;
    }
  });

  const totalAnswers = answers.length;

  const pieChartData = Object.entries(optionCountMap).map(
    ([optionId, count]) => {
      const optionTitle =
        answers.find((a) => a.option?.id === optionId)?.option?.title ||
        "Desconhecido";
      return {
        name: optionTitle,
        value: count,
        percentage: ((count / totalAnswers) * 100).toFixed(2) + "%",
      };
    }
  );

  return pieChartData;
}

type PieChartProps = {
  answers: Answers[];
};

const MyPieChart = ({ answers }: PieChartProps): React.JSX.Element => {
  if (!answers || answers.length === 0) {
    return <div>Sem dados no momento.</div>;
  }

  const pieChartData = generatePieChartData(answers);
  return (
    <ResponsiveContainer height={300} width={300}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={({ value, name }) => `${name}: ${value}`}
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart;
