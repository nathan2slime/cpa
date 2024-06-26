import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { CardDescription } from "@/components/ui/card";

const MyPieChart = ({ data }) => {
    const colors = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57"];

    // Verificar se os dados foram passados corretamente
    if (!data || !data.options) {
        return <div>No data available</div>;
    }

    // Formatar os dados para garantir que cada entrada tenha um nome e uma quantidade
    const formattedData = data.options.map((option, index) => ({
        name: option.name,
        qtd: option.qtd,
        fill: colors[index % colors.length],
    }));

    // Tooltip personalizada para exibir nome e valor
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid black' }}>
                    <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="mt-8 flex flex-col justify-center items-center">
            <CardDescription className="text-black text-lg flex justify-center mb-5">{data.question}</CardDescription>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        dataKey="qtd"
                        data={formattedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name }) => name}
                    >
                        {formattedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyPieChart;
