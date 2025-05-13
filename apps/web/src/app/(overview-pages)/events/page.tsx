"use client";

import ShowEvents from "@/components/events/events";
import { PaginationComponent } from "@/components/pagination";
import { useEvents } from "@/hooks/api-hooks";
import { useSearchParams } from "next/navigation";

export default function EventsPage() {
  const page = useSearchParams().get("page");
  const { data: events } = useEvents(page ? +page : 1);

  return (
    <div className="h-full flex flex-col justify-between">
      <ShowEvents events={events?.data || []} />;
      <PaginationComponent
        total={events?.total || 0}
        current={events?.page || 0}
        limit={events?.pages || 0}
      />
    </div>
  );
}
