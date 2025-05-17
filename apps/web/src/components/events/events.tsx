"use client";

import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { EventFormResponse } from "@/types/event.types";
import Link from "next/link";

type EventsProps = {
  events: EventFormResponse[];
};

const ShowEvents = ({ events }: EventsProps) => {
  return (
    <main className="w-full h-full flex flex-col justify-start items-start">
      <div className={"justify-between w-full flex px-5 items-center"}>
        <p className={"font-semibold text-xl"}>Gerenciar Eventos</p>
        <Link href={"/new-event"}>
          <Button>Criar novo</Button>
        </Link>
      </div>

      <div className={"p-5 w-full h-full"}>
        <p className={"font-semibold mb-3"}>Recentes</p>

        <div className={"border w-full rounded-xl"}>
          {events.length === 0 && (
            <p className={"p-5"}>
              Sem eventos criados. Crie um evento no botão acima "Criar novo".
            </p>
          )}
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShowEvents;
