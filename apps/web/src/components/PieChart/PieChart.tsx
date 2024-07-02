import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

interface ContagemRespostas {
  [key: string]: number;
}

const convertData = (data) => {
  return data.map(item => {
    const name = item.name; // Nome da questão
    const responses = Object.entries(item).slice(1); // Ignora o primeiro valor que é o nome da questão
    return responses.map(([key, value]) => ({
      questao: name,
      name: key,
      value: value
    }));
  }).flat();
};

const MyPieChart = ({ data }): React.JSX.Element => {
  if (!data) {
    return <div>Sem dados no momento.</div>;
  }

  const chartData = convertData(data);
  console.log(chartData);

  return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
  );
};

export default MyPieChart;
