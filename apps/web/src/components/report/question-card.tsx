"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Question } from "@/types/report.type";
import * as htmlToImage from "html-to-image";
import { Button } from "@/components/ui/button";

type QuestionCardProps = {
  question: Question;
};

export default function QuestionCard({ question }: QuestionCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"pie" | "bar">("pie");
  const answers = question.questionAnswer || [];

  const COLORS = [
    "hsl(45, 90%, 55%)",
    "hsl(210, 70%, 50%)",
    "hsl(260, 70%, 60%)",
    "hsl(15, 90%, 55%)",
    "hsl(90, 65%, 50%)",
    "hsl(30, 90%, 60%)",
    "hsl(120, 70%, 50%)",
    "hsl(340, 65%, 47%)",
  ];

  const chartRef = useRef<HTMLDivElement>(null);

  async function handleDownload() {
    if (!chartRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(chartRef.current, {
        cacheBust: true,
        backgroundColor: "#fff",
      });
      const link = document.createElement("a");
      link.download = `question-${question.id}-${activeTab}-chart.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar a imagem:", error);
    }
  }

  const generateChartData = () => {
    const optionCountMap: Record<string, number> = {};

    question.options.forEach((option) => {
      optionCountMap[option.id] = 0;
    });

    answers.forEach((answer) => {
      if (answer.questionOptionId) {
        optionCountMap[answer.questionOptionId] += 1;
      } else if (answer.value) {
        const matchingOption = question.options.find(
          (option) => option.id === answer.value
        );
        if (matchingOption) {
          optionCountMap[matchingOption.id] += 1;
        }
      }
    });

    const totalAnswers = Object.values(optionCountMap).reduce(
      (sum, count) => sum + count,
      0
    );

    return question.options.map((option) => {
      const count = optionCountMap[option.id] || 0;
      const percentage = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0;

      return {
        name: option.title,
        value: count,
        percentage: percentage.toFixed(1),
        id: option.id,
      };
    });
  };

  const chartData = generateChartData();

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (!answers.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Sem dados disponíveis para esta questão.
      </div>
    );
  }

  if (question.type === "TEXT") {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-2 max-h-[400px] overflow-auto">
            {answers.map((answer, index) => (
              <div key={index} className="text-sm border-b last:border-none">
                {answer.value || (
                  <span className="text-muted-foreground">Resposta vazia</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (
    question.type === "CHOOSE" &&
    (!question.options || question.options.length === 0)
  ) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Esta questão não possui opções definidas.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "pie" | "bar")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="pie">Gráfico de Pizza</TabsTrigger>
          <TabsTrigger value="bar">Gráfico de Barras</TabsTrigger>
        </TabsList>

        <div className="flex justify-end">
          <Button variant={"outline"} size={"sm"} onClick={handleDownload}>
            Baixar gráfico
          </Button>
        </div>

        <TabsContent value="pie">
          <div
            className="flex flex-col md:flex-row gap-6 items-center justify-center"
            ref={chartRef}
          >
            <div className="w-full md:w-1/2 h-[300px]">
              <ChartContainer
                className="h-full w-full"
                config={Object.fromEntries([
                  ["value", { label: "Respostas" }],
                  ...question.options.map((option, index) => [
                    option.id,
                    {
                      label: option.title,
                      color: COLORS[index % COLORS.length],
                    },
                  ]),
                ])}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      activeIndex={activeIndex}
                      onMouseEnter={onPieEnter}
                      nameKey="name"
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="var(--background)"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelFormatter={(label: string) => label}
                          formatter={(value: any) => [
                            `${value} selecionaram esse opção`,
                          ]}
                        />
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="w-full md:w-1/2">
              <Card>
                <CardContent className="p-4 overflow-scroll">
                  <ul className="space-y-2">
                    {chartData.map((entry, index) => (
                      <li
                        key={entry.id}
                        className="flex items-center justify-between py-1 cursor-pointer hover:bg-muted/50 px-2 rounded"
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                          <span className="text-sm font-medium truncate max-w-[200px]">
                            {entry.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {entry.value}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({entry.percentage}%)
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bar">
          <div className="h-full w-full overflow-y-auto" ref={chartRef}>
            <ChartContainer
              config={Object.fromEntries([
                ["value", { label: "Respostas" }],
                ...question.options.map((option, index) => [
                  option.id,
                  {
                    label: option.title,
                    color: COLORS[index % COLORS.length],
                  },
                ]),
              ])}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      value.length > 20 ? `${value.substring(0, 20)}...` : value
                    }
                  />
                  <Tooltip
                    formatter={(value) => [`${value} respostas`, "Quantidade"]}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
