import { QuestionDataItem } from "@/components/report/question-data-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Question } from "@/types/report.type";
import type { MutableRefObject } from "react";

type DataTabProps = {
  questions: Question[];
  refs: MutableRefObject<Record<string, HTMLDivElement | null>>;
};

export function DataTab({ questions, refs }: DataTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Brutos</CardTitle>
        <CardDescription>
          Visualização detalhada de todas as respostas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {questions.map((question) => (
            <QuestionDataItem
              key={question.id}
              question={question}
              setRef={(el) => {
                refs.current[question.id] = el;
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
