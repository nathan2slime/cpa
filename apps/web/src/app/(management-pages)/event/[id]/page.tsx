import EventForm from "@/components/event/event-form";

export default function EventEditPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <EventForm eventId={params.id} />
    </main>
  );
}
