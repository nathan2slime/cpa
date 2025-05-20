import { EventFormResponse } from "@/types/event.types";

import { EventCard } from "@/components/events/event-card";
import { FiltersContent } from "@/components/filters";
import { FilterByName } from "@/components/filters/by-name";
import { FilterTag } from "@/components/filters/by-tag";
import { Button } from "@/components/ui/button";
import { useAllTagsEvent, useCourses } from "@/hooks/api-hooks";
import { Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import { FilterByCourse } from "@/components/filters/by-course";

type Props = {
  events: EventFormResponse[];
};

const Reports = ({ events }: Props) => {
  const router = useRouter();
  const { data: tags = [] } = useAllTagsEvent();
  const { data: courses = [] } = useCourses();

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start px-5 gap-3">
        <div className={"justify-between w-full flex items-center"}>
          <p className={"font-semibold text-xl"}>Relatório de eventos</p>
        </div>

        <FiltersContent>
          <div className="flex justify-between w-full gap-2">
            <FilterByName />
            <FilterByCourse courses={courses} />
          </div>
          <FilterTag tags={tags} />
        </FiltersContent>

        <div className={"w-full h-full"}>
          <p className={"font-semibold mb-3"}>Recentes</p>

          <div className={"border w-full rounded-xl"}>
            {events?.map((event: EventFormResponse) => (
              <EventCard event={event} key={event.id} operations={false}>
                <Button
                  onClick={() => router.push(`/report/${event.id}`)}
                  variant={"outline"}
                  className="flex gap-1 items-center"
                >
                  Relatórios
                  <Flag size={16} />
                </Button>
              </EventCard>
            ))}
            {events.length === 0 && (
              <p className={"p-5"}>
                Sem eventos, reveja a paginação para ver os eventos mais
                recentes.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Reports;
