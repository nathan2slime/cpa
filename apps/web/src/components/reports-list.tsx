import { EventFormResponse } from "@/types/event.types";

import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  events: EventFormResponse[];
};

const Reports = ({ events }: Props) => {
  const router = useRouter();

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">
        <div className={"justify-between w-full flex px-5 items-center"}>
          <p className={"font-semibold text-xl"}>Relatório de eventos</p>
        </div>

        <div className={"p-5 w-full h-full"}>
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
