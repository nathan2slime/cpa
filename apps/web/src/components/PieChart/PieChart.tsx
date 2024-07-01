import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

interface ContagemRespostas {
  [key: string]: number;
}

//interface Resultado {
//  [questao: number]: ContagemRespostas;
//}

const convertData = (data) => {
  return data.map(item => {
    const name = item.name;
    const values = Object.values(item).slice(1); // Ignora o primeiro valor que é o nome da questão
    const total = values.reduce((acc, curr) => acc + curr, 0); // Soma total das respostas
    return { name, value: total };
  });
};

const MyPieChart = ({ data }): React.JSX.Element => {
  if (!data) {
    return <div>Sem dados no momento.</div>;
  }

  const chartData = convertData(data)
  console.log(chartData)
  //const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57"];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  //Verificar se os dados foram passados corretamente

  //
  // Formatar os dados para garantir que cada entrada tenha um nome e uma quantidade
  //const formattedData = data.options.map((option, index) => ({
  //  name: option.name,
  //  qtd: option.qtd,
  //  fill: colors[index % colors.length],
  //}));
  //
  // Tooltip personalizada para exibir nome e valor
  //const CustomTooltip = ({ active, payload }) => {
  //  if (active && payload && payload.length) {
  //    return (
  //      <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid black' }}>
  //        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
  //      </div>
  //    );
  //  }
  //  return null;
  //};

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>);
};

export default MyPieChart;


// TODO: consertar o grafico para exibir as respostas corretamente
