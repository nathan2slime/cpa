"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Question } from "@/types/report.type";
import QuestionCard from "@/components/report/question-card";

type VisualTabProps = {
  questions: Question[];
  expandedQuestions: Record<string, boolean>;
  toggleQuestion: (questionId: string) => void;
};

export function VisualTab({
  questions,
  expandedQuestions,
  toggleQuestion,
}: VisualTabProps) {
  console.log(questions);

  return (
    <>
      {questions.map((question) => (
        <Card key={question.id} className="overflow-hidden min-w-[800px]">
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
              {question.questionAnswer.length === 1 ? "resposta" : "respostas"}
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
    </>
  );
}
