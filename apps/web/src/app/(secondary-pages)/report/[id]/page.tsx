import { getAnswersQuery } from "@/api/queries/get-answer.query";
import ReportDashboard from "@/components/report-dashboard";

type Param = {
  params: { id: string };
};

export default async function ReportPage({ params }: Param) {
  const { id } = params;
  const data = await getAnswersQuery(id);

  return <ReportDashboard data={data} />;
}
