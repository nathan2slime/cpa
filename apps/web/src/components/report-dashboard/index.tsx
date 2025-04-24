"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, FileText, PieChartIcon } from "lucide-react";
import QuestionCard from "@/components/question-card";
import type { Answers } from "@/types/report.type";

type ReportDashboardProps = {
  data: {
    form: {
      id: string;
      title: string;
      description?: string;
      questions: {
        id: string;
        title: string;
        options: {
          id: string;
          title: string;
        }[];
      }[];
    };
    answers: Answers[];
  };
};

export default function ReportDashboard({ data }: ReportDashboardProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});

  const answerByQuestion = (questionId: string) => {
    return data.answers.filter((answer) => answer.questionId === questionId);
  };

  const totalResponses =
    data.answers.length > 0
      ? data.answers.reduce((acc, curr) => {
          const existingIds = acc.map((a) => a.id);
          if (!existingIds.includes(curr.id)) {
            return [...acc, curr];
          }
          return acc;
        }, [] as Answers[]).length
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
            {data.form.description && (
              <p className="text-muted-foreground mt-1">
                {data.form.description}
              </p>
            )}
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
            {data.form.questions.map((question) => (
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
                    {answerByQuestion(question.id).length}{" "}
                    {answerByQuestion(question.id).length === 1
                      ? "resposta"
                      : "respostas"}
                  </CardDescription>
                </CardHeader>

                {(expandedQuestions[question.id] ||
                  expandedQuestions[question.id] === undefined) && (
                  <CardContent>
                    <QuestionCard
                      question={question}
                      answers={answerByQuestion(question.id)}
                    />
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
                  {data.form.questions.map((question) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="text-lg font-medium">{question.title}</h3>
                      <div className="grid gap-2">
                        {question.options.map((option) => {
                          const count = answerByQuestion(question.id).filter(
                            (a) => a.option?.id === option.id
                          ).length;
                          const percentage =
                            answerByQuestion(question.id).length > 0
                              ? (
                                  (count /
                                    answerByQuestion(question.id).length) *
                                  100
                                ).toFixed(1)
                              : 0;

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
