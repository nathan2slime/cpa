"use client";

import { Button } from "@/components/ui/button";
import { EventFormResponse } from "@/types/event.types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PaginationComponent } from "@/components/PaginationComponent";

import { Flag } from "lucide-react";
import { getEventsQuery } from "../../../api/queries/get-events.query";

const Events = () => {
  const [events, setEvents] = useState<EventFormResponse[]>([]);
  const [totalEvents, setTotalEvents] = useState<number>(0);

  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);

  //limite por pagina de formularios q serão pegos
  const perPage = 5;

  //quantidade de paginas totais arredondadas
  const pagesRounded = Math.ceil(totalEvents / perPage);

  const getEvents = async () => {
    const data = await getEventsQuery({ page, perPage });

    if (data) {
      setEvents(data.data);
      setTotalEvents(data.total);
    }
  };

  useEffect(() => {
    getEvents();
  }, [page, shouldFetch]);

  return (
    <>
      <main className="w-full h-full flex flex-col justify-start items-start">
        <div className={"justify-between w-full flex px-5 items-center"}>
          <p className={"font-semibold text-xl"}>Relatório de eventos</p>
        </div>

        <div className={"p-5 w-full h-full"}>
          <p className={"font-semibold mb-3"}>Eventos recentes</p>

          <div className={"border w-full rounded-xl"}>
            {events?.map((event: EventFormResponse) => (
              <div
                key={event.id}
                className={
                  "flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
                }
              >
                <div className={"flex gap-3 items-center"}>
                  <p className={"font-semibold"}>{event.title}</p>
                  <p className={"text-gray-500 text-sm"}>
                    {event &&
                      event.updatedAt &&
                      formatDistanceToNow(event.updatedAt, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                  </p>
                </div>

                <div className={"flex gap-2 items-center"}>
                  <Link href={"/report/" + event.id}>
                    <Button variant={"outline"} className="flex gap-2">
                      <Flag className="size-4" />
                      <p>Relatório</p>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <p className={"p-5"}>
                Sem Eventos criados {page > 0 && "ou itens na paginação."}
              </p>
            )}
          </div>
        </div>

        <PaginationComponent setPage={setPage} totalPages={pagesRounded} />
      </main>
    </>
  );
};

export default Events;
