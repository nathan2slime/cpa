"use client";

import { PaginationComponent } from "@/components/pagination";
import Reports from "@/components/reports-list";
import { useEvents } from "@/hooks/api-hooks";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ReportsPage() {
  return (
    <Suspense>
      <Report />
    </Suspense>
  );
}

const Report = () => {
  const page = useSearchParams().get("page");
  const { data: events } = useEvents(page ? +page : 1);

  return (
    <div className="h-full flex flex-col justify-between">
      <Reports events={events?.data || []} />
      <PaginationComponent
        total={events?.total || 0}
        current={events?.page || 0}
        limit={events?.perPage || 0}
      />
    </div>
  );
};
