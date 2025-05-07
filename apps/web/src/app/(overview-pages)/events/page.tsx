"use client";

import ShowEvents from "@/components/events/events";
import { useEvents } from "@/hooks/api-hooks";

export default function EventsPage() {
  const { data: events } = useEvents();

  return <ShowEvents events={events?.data || []} />;
}
