"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventFormResponse } from "@/types/event.types";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { QrCodeModal } from "@/components/qr-code-modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDeleteEvent } from "@/hooks/api-hooks";

type EventsProps = {
  events: EventFormResponse[];
};

const ShowEvents = ({ events }: EventsProps) => {
  const router = useRouter();
  const { mutate: deleteEvent } = useDeleteEvent();

  return (
    <main className="w-full h-full flex flex-col justify-start items-start">
      <div className={"justify-between w-full flex px-5 items-center"}>
        <p className={"font-semibold text-xl"}>Gerenciar Eventos</p>
        <Link href={"/new-event"}>
          <Button>Criar novo Evento</Button>
        </Link>
      </div>

      <div className={"p-5 w-full h-full"}>
        <p className={"font-semibold mb-3"}>Eventos recentes</p>

        <div className={"border w-full rounded-xl"}>
          {events.length === 0 && (
            <p className={"p-5"}>
              Sem eventos criados. Crie um evento no botão acima "Criar novo
              evento".
            </p>
          )}
          {events.map((event) => (
            <div
              key={event.id}
              className={
                "flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
              }
            >
              <div className={"flex gap-3 items-center"}>
                <p className={"font-semibold"}>{event.title}</p>
                <p className={"text-gray-500 text-sm"}>
                  {event.updatedAt &&
                    formatDistanceToNow(event.updatedAt, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                </p>
              </div>

              <div className={"flex gap-2 items-center"}>
                <QrCodeModal text={`/answer/${event.id}`} />
                <Button
                  variant="outline"
                  onClick={() => router.push(`/event/${event.id}`)}
                >
                  Editar
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Excluir</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Tem certeza que deseja excluir esse evento?
                      </DialogTitle>
                      <DialogDescription>
                        Você não poderá reverter essa ação.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className={"flex justify-end gap-3"}>
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              deleteEvent(event.id!, {
                                onSuccess: () => {
                                  toast.success("Evento deletado com sucesso!");
                                },
                              })
                            }
                            variant="destructive"
                          >
                            Sim, apagar
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShowEvents;
