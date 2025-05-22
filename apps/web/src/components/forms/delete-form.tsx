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
import { useDeleteForm } from "@/hooks/api-hooks";
import toast from "react-hot-toast";

type Props = {
  formId: string;
};

export const DeleteFormDialog = ({ formId }: Props) => {
  const { mutate: deleteForm } = useDeleteForm();

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
     <DialogContent className="max-w-[95vw] sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Tem certeza que deseja excluir esse formulário?</DialogTitle>
        <DialogDescription>Você não poderá reverter essa ação.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <div className={"flex flex-col-reverse sm:flex-row justify-end gap-3 w-full"}>
          <DialogClose asChild>
            <Button variant="outline" className="mt-2 sm:mt-0">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() =>
                deleteForm(formId, {
                  onSuccess: () => {
                    toast.success("Formulário deletado com sucesso!")
                  },
                })
              }
              variant="destructive"
            >
              Sim, apagar
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  );
};
