import ReportDashboard from "@/components/report-dashboard";
import { getAnswersQuery } from "../../../../api/queries/get-answer.query";

type Param = {
  params: { id: string };
};

export default async function ReportPage({ params }: Param) {
  const { id } = params;
  const data = await getAnswersQuery(id);

  return <ReportDashboard data={data} />;
}
