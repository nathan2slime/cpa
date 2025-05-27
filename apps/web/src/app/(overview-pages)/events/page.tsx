"use client";

import ShowEvents from "@/components/events/events";
import { PaginationComponent } from "@/components/pagination";
import { useEvents } from "@/hooks/api-hooks";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function EventsPage() {
  return (
    <Suspense>
      <ManagerEvents />
    </Suspense>
  );
}

const ManagerEvents = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const { data: events } = useEvents(page ? +page : 1);

  return (
    <div className="h-full flex flex-col justify-between">
      <ShowEvents events={events?.data || []} />
      <PaginationComponent
        total={events?.total || 0}
        current={events?.page || 0}
        limit={events?.perPage || 0}
      />
    </div>
  );
};
