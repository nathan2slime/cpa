"use client";

import type { EventFormResponse } from "@/types/event.types";

import { EventCard } from "@/components/events/event-card";
import { FiltersContent } from "@/components/filters";
import { FilterByName } from "@/components/filters/by-name";
import { FilterTag } from "@/components/filters/by-tag";
import { Button } from "@/components/ui/button";
import { useAllTagsEvent, useCourses } from "@/hooks/api-hooks";
import { Flag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterByCourse } from "@/components/filters/by-course";
import { FilterByStatus } from "@/components/filters/by-status";

type Props = {
  events: EventFormResponse[];
};

const Reports = ({ events }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: tags = [] } = useAllTagsEvent();
  const { data: courses = [] } = useCourses();

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start px-3 sm:px-4 md:px-5 gap-2 sm:gap-3">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="font-semibold text-lg sm:text-xl">
            Relatório de eventos
          </p>
        </div>

        <FiltersContent>
          <div className="flex flex-col md:flex-row justify-between w-full gap-2">
            <FilterByName />
            <FilterByCourse courses={courses} />
          </div>
          <FilterByStatus />
          <FilterTag tags={tags} />
        </FiltersContent>

        <div className="w-full h-full">
          <p className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
            Recentes
          </p>

          <div className="border w-full rounded-xl">
            {events?.map((event: EventFormResponse) => (
              <EventCard event={event} key={event.id}>
                <Button
                  onClick={() => router.push(`/report/${event.id}`)}
                  variant="outline"
                  className="flex gap-1 items-center text-xs sm:text-sm"
                  size="sm"
                >
                  <span className="hidden xs:inline">Relatórios</span>
                  <Flag size={16} />
                </Button>
              </EventCard>
            ))}
            {events.length === 0 && (
              <p className="p-3 sm:p-5 text-sm sm:text-base">
                {searchParams.size > 0
                  ? "Nenhum resultado encontrado para sua busca."
                  : 'Sem eventos disponíveis, eventos podem ser criados na aba de "Eventos" no botão "Criar novo".'}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;
