"use client";

import ReportDashboard from "@/components/report/report-dashboard";
import { useAnswers } from "@/hooks/api-hooks";
import { useParams } from "next/navigation";

export default function ReportPage() {
  const id = useParams().id;
  const { data: answers } = useAnswers(id as string);

  if (answers) return <ReportDashboard data={answers} />;
}
