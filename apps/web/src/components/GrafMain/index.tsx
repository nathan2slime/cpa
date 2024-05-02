"use client";
import {
  BarChart as BarGraph,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar
} from "recharts";

type Props = {};

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 100) + 100
  },
  {
    name: "Fev",
    total: Math.floor(Math.random() * 100) + 120
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 100) + 150
  },
  {
    name: "Abr",
    total: Math.floor(Math.random() * 100) + 100
  },
  {
    name: "Mai",
    total: Math.floor(Math.random() * 100) + 300
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 100) + 500
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 100) + 530
  },
  {
    name: "Ago",
    total: Math.floor(Math.random() * 100) + 440
  },
  {
    name: "Set",
    total: Math.floor(Math.random() * 100) + 500
  },
  {
    name: "Out",
    total: Math.floor(Math.random() * 100) + 300
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 100) + 400
  },
  {
    name: "Dez",
    total: Math.floor(Math.random() * 100) + 500
  }
];

export default function GraphMain({ }: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => value}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
