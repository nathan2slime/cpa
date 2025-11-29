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
import type { EventFormResponse } from "@/types/event.types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterByStatus } from "@/components/filters/by-status";

type EventsProps = {
  events: EventFormResponse[];
};

const ShowEvents = ({ events }: EventsProps) => {
  const { data: tags = [] } = useAllTagsEvent();
  const { data: courses = [] } = useCourses();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <main className="w-full h-full flex flex-col justify-start items-start px-2 sm:px-5 gap-3">
      <div
        className={
          "justify-between w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0"
        }
      >
        <p className={"font-semibold text-lg sm:text-xl"}>Gerenciar Eventos</p>
        <Link href={"/new-event"}>
          <Button className="w-full sm:w-auto">Criar novo</Button>
        </Link>
      </div>

      <FiltersContent>
        <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
          <FilterByName />
          <FilterByCourse courses={courses} />
        </div>
        <FilterByStatus />
        <FilterTag tags={tags} />
      </FiltersContent>

      <div className={"w-full h-full"}>
        <p className={"font-semibold mb-2 sm:mb-3 text-base sm:text-lg"}>
          Recentes
        </p>

        <div className={"border w-full rounded-xl"}>
          {events.length === 0 && (
            <p className={"p-3 sm:p-5 text-sm sm:text-base"}>
              {searchParams.size > 0
                ? "Nenhum resultado encontrado para sua busca."
                : 'Sem eventos criados. Crie um evento no botão acima "Criar novo".'}
            </p>
          )}
          {events.map((event) => (
            <EventCard key={event.id} event={event}>
              <>
                <QrCodeModal
                  text={`${window.location.origin}/answer/${event.id}`}
                />
                <TagPopover tags={tags} eventId={event.id} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="p-1 sm:p-2 h-8 w-8"
                    >
                      <EllipsisVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="text-xs sm:text-sm">
                      Operações
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push(`/event/${event.id}`)}
                      className="text-xs sm:text-sm"
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
