import { getEventsQuery } from "@/api/queries/get-events.query";
import Reports from "@/components/reports-list";

export default async function ReportsPage() {
  const events = await getEventsQuery();

  return <Reports events={events.data} />;
}
