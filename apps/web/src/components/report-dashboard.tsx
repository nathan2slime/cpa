"use client";

import QuestionCard from "@/components/question-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ReportResponse } from "@/types/report.type";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
  PieChartIcon,
  Download,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import * as htmlToImage from "html-to-image";

type ReportDashboardProps = {
  data: ReportResponse;
};

export default function ReportDashboard({ data }: ReportDashboardProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const totalResponses =
    data.question.length > 0
      ? data.question
          .flatMap((q) => q.questionAnswer.map((a) => a.answerId))
          .filter((value, index, self) => self.indexOf(value) === index).length
      : 0;

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleDownload = async (questionId: string) => {
    const element = refs.current[questionId];
    if (!element) return;

    const clone = element.cloneNode(true) as HTMLElement;

    clone.style.padding = "1rem";
    clone.style.backgroundColor = "#ffffff";
    clone.style.width = `${element.offsetWidth}px`;

    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-10000px";
    wrapper.style.left = "-10000px";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    try {
      const dataUrl = await htmlToImage.toPng(clone, {
        cacheBust: true,
        backgroundColor: "#fff",
      });
      const link = document.createElement("a");
      link.download = `dados-brutos-${questionId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
    } finally {
      document.body.removeChild(wrapper);
    }
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {data.form.title}
            </h1>
          </div>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <FileText className="mr-1 h-4 w-4" />
            {totalResponses} {totalResponses === 1 ? "resposta" : "respostas"}{" "}
            totais
          </Badge>
        </div>

        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="visual">
              <PieChartIcon className="mr-2 h-4 w-4" />
              Visualização
            </TabsTrigger>
            <TabsTrigger value="data">
              <FileText className="mr-2 h-4 w-4" />
              Dados Brutos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            {data.question.map((question) => (
              <Card key={question.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleQuestion(question.id)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{question.title}</CardTitle>
                    {expandedQuestions[question.id] ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <CardDescription>
                    {question.questionAnswer.length}{" "}
                    {question.questionAnswer.length === 1
                      ? "resposta"
                      : "respostas"}
                  </CardDescription>
                </CardHeader>

                {(expandedQuestions[question.id] ||
                  expandedQuestions[question.id] === undefined) && (
                  <CardContent>
                    <QuestionCard question={question} />
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Dados Brutos</CardTitle>
                <CardDescription>
                  Visualização detalhada de todas as respostas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {data.question.map((question) => {
                    const chartRef = (el: HTMLDivElement | null) => {
                      refs.current[question.id] = el;
                    };

                    const renderChartData = () => {
                      const optionCountMap: Record<string, number> = {};
                      question.options.forEach((option) => {
                        optionCountMap[option.id] = 0;
                      });

                      question.questionAnswer.forEach((answer) => {
                        if (question.type === "CHOOSE_AND_TEXT") {
                          if (answer.questionOptionId) {
                            optionCountMap[answer.questionOptionId] =
                              (optionCountMap[answer.questionOptionId] || 0) +
                              1;
                          }
                        } else {
                          const optId =
                            answer.questionOptionId || answer.value || "";
                          if (optionCountMap[optId] !== undefined) {
                            optionCountMap[optId]++;
                          }
                        }
                      });

                      const total = Object.values(optionCountMap).reduce(
                        (acc, val) => acc + val,
                        0
                      );

                      return question.options.map((option) => {
                        const count = optionCountMap[option.id] || 0;
                        const percentage =
                          total > 0
                            ? ((count / total) * 100).toFixed(1)
                            : "0.0";
                        return {
                          ...option,
                          count,
                          percentage,
                        };
                      });
                    };

                    return (
                      <div
                        key={question.id}
                        className="space-y-4"
                        ref={chartRef}
                      >
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">
                              {question.title}
                            </h3>
                            {(question.type === "TEXT" ||
                              question.type === "CHOOSE_AND_TEXT") && (
                              <Badge variant="outline" className="bg-muted">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Questão com texto
                              </Badge>
                            )}
                          </div>
                          {(question.type === "CHOOSE" ||
                            question.type === "CHOOSE_AND_TEXT") && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(question.id)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Baixar imagem
                            </Button>
                          )}
                        </div>

                        {(question.type === "CHOOSE" ||
                          question.type === "CHOOSE_AND_TEXT") && (
                          <div className="grid gap-2">
                            {renderChartData().map((entry) => (
                              <div
                                key={entry.id}
                                className="flex justify-between items-center"
                              >
                                <span>{entry.title}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary"
                                      style={{
                                        width: `${entry.percentage}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                                    {entry.count} ({entry.percentage}%)
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {(question.type === "TEXT" ||
                          question.type === "CHOOSE_AND_TEXT") && (
                          <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-3">
                            {question.questionAnswer.some((a) =>
                              a.value?.trim()
                            ) ? (
                              question.questionAnswer.map((a, i) => (
                                <div key={i} className="text-sm py-1">
                                  {a.value?.trim() || (
                                    <span className="text-muted-foreground">
                                      Resposta vazia
                                    </span>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="text-muted-foreground italic">
                                Sem respostas de texto
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
