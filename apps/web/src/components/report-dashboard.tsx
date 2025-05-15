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
} from "lucide-react";
import { useState } from "react";

type ReportDashboardProps = {
  data: ReportResponse;
};

export default function ReportDashboard({ data }: ReportDashboardProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});

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
                  {data.question.map((question) => (
                    <div key={question.id} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">
                          {question.title}
                        </h3>
                        {question.type === "TEXT" && (
                          <Badge variant="outline" className="bg-muted">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Questão de texto
                          </Badge>
                        )}
                      </div>

                      {question.type === "TEXT" ? (
                        <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-md p-3">
                          {question.questionAnswer.length > 0 ? (
                            <div className="text-muted-foreground italic">
                              {question.questionAnswer.length}{" "}
                              {question.questionAnswer.length === 1
                                ? "resposta"
                                : "respostas"}
                            </div>
                          ) : (
                            <div className="text-muted-foreground italic">
                              Sem respostas
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid gap-2">
                          {question.options.map((option) => {
                            const count = question.questionAnswer.filter(
                              (a) =>
                                a.questionOptionId === option.id ||
                                a.value === option.id
                            ).length;

                            const totalAnswers = question.options.reduce(
                              (total, opt) => {
                                return (
                                  total +
                                  question.questionAnswer.filter(
                                    (a) =>
                                      a.questionOptionId === opt.id ||
                                      a.value === opt.id
                                  ).length
                                );
                              },
                              0
                            );

                            const percentage =
                              totalAnswers > 0
                                ? ((count / totalAnswers) * 100).toFixed(1)
                                : "0.0";

                            return (
                              <div
                                key={option.id}
                                className="flex justify-between items-center"
                              >
                                <span>{option.title}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                                    {count} ({percentage}%)
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
