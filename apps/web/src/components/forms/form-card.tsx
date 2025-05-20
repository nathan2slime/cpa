import { TagPopover } from "@/components/tag-popover";
import { Badge } from "@/components/ui/badge";
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
import { useDeleteForm, useFormTags } from "@/hooks/api-hooks";
import { FormReq } from "@/types/form";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

type Props = {
  form: FormReq;
};
export const FormCard = ({ form }: Props) => {
  const { mutate: deleteForm } = useDeleteForm();
  const { data: tags = [] } = useFormTags(form.id!);
  const router = useRouter();

  return (
    <div
      key={form.id}
      className="flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
    >
      <div className="flex flex-col gap-3 justify-center">
        <div className="flex items-center gap-3">
          <p className="font-semibold">{form.title}</p>
          <p className="text-gray-500 text-sm">
            {form.updatedAt &&
              formatDistanceToNow(new Date(form.updatedAt), {
                addSuffix: true,
                locale: ptBR,
              })}
          </p>
        </div>

        {tags?.length > 0 && (
          <div className="flex gap-2 w-full">
            {tags?.map((tag) => (
              <Badge className="w-fit" variant="secondary" key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <TagPopover tags={tags} formId={form.id} />

        <Button
          variant="outline"
          onClick={() => router.push(`/form/${form.id}`)}
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
                Tem certeza que deseja excluir esse formulário?
              </DialogTitle>
              <DialogDescription>
                Você não poderá reverter essa ação.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button
                    onClick={() => deleteForm(form.id!)}
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
  );
};
