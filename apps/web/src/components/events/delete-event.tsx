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
import { useDeleteEvent } from "@/hooks/api-hooks";
import toast from "react-hot-toast";

type Props = {
  eventId: string;
};

export const DeleteEventDialog = ({ eventId }: Props) => {
  const { mutate: deleteEvent } = useDeleteEvent();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          size={"sm"}
          variant={"ghost"}
        >
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir esse evento?</DialogTitle>
          <DialogDescription>
            Você não poderá reverter essa ação.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className={"flex justify-end gap-3"}>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  deleteEvent(eventId, {
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
  );
};
