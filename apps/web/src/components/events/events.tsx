"use client";

import { EventCard } from "@/components/events/event-card";
import { FiltersContent } from "@/components/filters";
import { FilterByName } from "@/components/filters/by-name";
import { FilterTag } from "@/components/filters/by-tag";
import { Button } from "@/components/ui/button";
import { useAllTagsEvent } from "@/hooks/api-hooks";
import { EventFormResponse } from "@/types/event.types";
import Link from "next/link";

type EventsProps = {
  events: EventFormResponse[];
};

const ShowEvents = ({ events }: EventsProps) => {
  const { data: tags = [] } = useAllTagsEvent();
  return (
    <main className="w-full h-full flex flex-col justify-start items-start px-5 gap-3">
      <div className={"justify-between w-full flex items-center"}>
        <p className={"font-semibold text-xl"}>Gerenciar Eventos</p>
        <Link href={"/new-event"}>
          <Button>Criar novo</Button>
        </Link>
      </div>

      <FiltersContent>
        <FilterByName />
        <FilterTag tags={tags} />
      </FiltersContent>

      <div className={"w-full h-full"}>
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
