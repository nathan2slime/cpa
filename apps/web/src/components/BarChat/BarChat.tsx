// components/Chart.js
"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CardDescription } from "@/components/ui/card";

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
};

const MyBarChart: React.FC<MyBarChartProps> = ({ data }) => {
    return (
        <div className="mt-8 flex flex-col justify-center items-center">
            <CardDescription className="text-black text-lg mb-5">{data.question}</CardDescription>
            <BarChart width={430} height={250} data={data.options}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qtd" fill="black" />
            </BarChart>
        </div>
    );
};

export default MyBarChart;
