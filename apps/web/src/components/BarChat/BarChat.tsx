"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type Option = {
  name: string;
  qtd: number;
};

type ChartData = {
  question: string;
  options: Option[];
};

type MyBarChartProps = {
  data: ChartData;
  index: number | string;
};

export const MyBarChart: React.FC<MyBarChartProps> = ({ index, data }) => {
  return (
    <div key={index} style={{ marginBottom: '50px' }}>
      <BarChart
        width={600}
        height={300}
        data={[data]}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(data).map((key, i) => {
          if (key !== 'name') {
            return <Bar key={i} dataKey={key} fill={i % 2 === 0 ? '#8884d8' : '#82ca9d'} />;
          }
          return null;
        })}
      </BarChart>
    </div>

  );
};
