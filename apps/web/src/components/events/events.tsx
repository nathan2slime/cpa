"use client";

import { DeleteEventDialog } from "@/components/events/delete-event";
import { ToggleAtiveEventDialog } from "@/components/events/toggle-active-event";
import { QrCodeModal } from "@/components/qr-code-modal";
import { TagPopover } from "@/components/tag-popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { FiltersContent } from "@/components/filters";
import { FilterByCourse } from "@/components/filters/by-course";
import { FilterByName } from "@/components/filters/by-name";
import { FilterTag } from "@/components/filters/by-tag";
import { Button } from "@/components/ui/button";
import { useAllTagsEvent, useCourses } from "@/hooks/api-hooks";
import { EventFormResponse } from "@/types/event.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FilterByStatus } from "@/components/filters/by-status";

type EventsProps = {
  events: EventFormResponse[];
};

const ShowEvents = ({ events }: EventsProps) => {
  const { data: tags = [] } = useAllTagsEvent();
  const { data: courses = [] } = useCourses();
  const router = useRouter();

  return (
    <main className="w-full h-full flex flex-col justify-start items-start px-5 gap-3">
      <div className={"justify-between w-full flex items-center"}>
        <p className={"font-semibold text-xl"}>Gerenciar Eventos</p>
        <Link href={"/new-event"}>
          <Button>Criar novo</Button>
        </Link>
      </div>

      <FiltersContent>
        <div className="flex justify-between w-full gap-2">
          <FilterByName />
          <FilterByCourse courses={courses} />
        </div>
        <FilterByStatus />
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
            <EventCard key={event.id} event={event}>
              <>
                <QrCodeModal text={`/answer/${event.id}`} />
                <TagPopover tags={tags} eventId={event.id} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className="p-2">
                      <EllipsisVertical size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Operações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push(`/event/${event.id}`)}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DeleteEventDialog eventId={event.id!} />
                    <ToggleAtiveEventDialog
                      active={event.active}
                      eventId={event.id!}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            </EventCard>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShowEvents;
