"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDeleteEvent } from "@/hooks/api-hooks"
import toast from "react-hot-toast"

type Props = {
  eventId: string
}

export const DeleteEventDialog = ({ eventId }: Props) => {
  const { mutate: deleteEvent } = useDeleteEvent()

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
      <DialogContent className="w-[95%] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Tem certeza que deseja excluir esse evento?</DialogTitle>
          <DialogDescription className="text-sm">Você não poderá reverter essa ação.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <div className={"flex flex-col sm:flex-row justify-end gap-3 w-full"}>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  deleteEvent(eventId, {
                    onSuccess: () => {
                      toast.success("Evento deletado com sucesso!")
                    },
                  })
                }
                variant="destructive"
                className="w-full sm:w-auto"
              >
                Sim, apagar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
