import { EventForm } from "@/components/event/event-form";

export default function EventEditPage({ params }: { params: { id: string } }) {
  return (
    <main className="container py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm eventId={params.id} />
    </main>
  )
}
