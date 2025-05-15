"use client"

import { PaginationComponent } from "@/components/pagination";
import Reports from "@/components/reports-list";
import { useEvents } from "@/hooks/api-hooks";
import { useSearchParams } from "next/navigation";

export default function ReportsPage() {
  const page = useSearchParams().get("page");
  const { data: events } = useEvents(page ? +page : 1);

  return (
    <div className="h-full flex flex-col justify-between">
      <Reports events={events?.data || []} />
      <PaginationComponent
        total={events?.total || 0}
        current={events?.page || 0}
        limit={events?.pages || 0}
      />
    </div>
  );
}
