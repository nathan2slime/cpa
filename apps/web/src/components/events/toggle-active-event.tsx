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
import { useToggleActiveEvent } from "@/hooks/api-hooks/event-api-hooks"

type Props = {
  active: boolean
  eventId: string
}

export const ToggleAtiveEventDialog = ({ active, eventId }: Props) => {
  const { mutate: toggleActiveEvent } = useToggleActiveEvent()

  const onToggleActiveEvent = () => {
    toggleActiveEvent(eventId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          size={"sm"}
          variant={"ghost"}
        >
          {active ? "Desativar" : "Ativar"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Tem certeza que deseja {active ? "desativar" : "ativar"} esse evento?
          </DialogTitle>
          <DialogDescription className="text-sm">
            {active
              ? "Enquanto estiver desativado, o evento não aceitará novas respostas."
              : "O evento será ativado e poderá receber novas respostas."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <div className={"flex flex-col sm:flex-row justify-end gap-3 w-full"}>
            <DialogClose asChild>
              <Button onClick={onToggleActiveEvent} variant="destructive" className="w-full sm:w-auto">
                Sim
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
