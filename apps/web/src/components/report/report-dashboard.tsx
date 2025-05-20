"use client";

import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChartIcon, FileText } from "lucide-react";
import type { ReportResponse } from "@/types/report.type";
import { ReportHeader } from "@/components/report/report-header";
import { VisualTab } from "@/components/report/visual-tab";
import { DataTab } from "@/components/report/data-tab";
import { FiltersContent } from "@/components/filters";
import { FilterByCourse } from "@/components/filters/by-course";

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

  return (
    <main className="max-w-7xl">
      <div className="grid gap-6">
        <ReportHeader title={data.form.title} totalResponses={totalResponses} />

        <FiltersContent>
          <FilterByCourse courses={data.courses} />
        </FiltersContent>

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
            <VisualTab
              questions={data.question}
              expandedQuestions={expandedQuestions}
              toggleQuestion={toggleQuestion}
            />
          </TabsContent>

          <TabsContent value="data">
            <DataTab questions={data.question} refs={refs} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
