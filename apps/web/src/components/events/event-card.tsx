import { EventFormResponse } from "@/types/event.types";
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
import { QrCodeModal } from "@/components/qr-code-modal";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDeleteEvent, useEventTags } from "@/hooks/api-hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TagPopover } from "@/components/tag-popover";

type Props = {
  event: EventFormResponse;
  operations?: boolean;
  children?: React.ReactNode;
};

export const EventCard = ({ event, operations = true, children }: Props) => {
  const router = useRouter();
  const { mutate: deleteEvent } = useDeleteEvent();
  const { data: tags = [] } = useEventTags(event.id!);

  return (
    <>
      <div
        key={event.id}
        className={
          "flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
        }
      >
        <div className={"flex flex-col gap-3 justify-center"}>
          <div className="flex items-center gap-3">
            <p className={"font-semibold"}>{event.title}</p>
            <p className={"text-gray-500 text-sm"}>
              {event.updatedAt &&
                formatDistanceToNow(event.updatedAt, {
                  addSuffix: true,
                  locale: ptBR,
                })}
            </p>
          </div>

          {tags.length > 0 && (
            <div className="flex gap-2 w-full">
              {tags?.map((tag) => (
                <Badge className="w-fit" variant="secondary" key={tag.id}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className={"flex gap-2 items-center"}>
          {!operations && children}
          {operations && (
            <>
              <QrCodeModal text={`/answer/${event.id}`} />
              <TagPopover tags={tags} eventId={event.id} />
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
