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
import { useCreateForm, useDeleteForm } from "@/hooks/api-hooks";
import { FormReq } from "@/types/form";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

type FormsProps = {
  forms: FormReq[] | []
};

export default function ShowForms({ forms }: FormsProps) {
  const router = useRouter();
  const { mutate: createForm } = useCreateForm();
  const { mutate: deleteForm } = useDeleteForm();

  return (
    <main className="w-full h-full flex flex-col justify-start items-start">
      <div className="justify-between w-full flex px-5 items-center">
        <p className="font-semibold text-xl">Gerenciar Formulários</p>
        <Button
          onClick={() =>
            createForm(undefined, {
              onSuccess: (data) => router.push(`/form/${data.id}`),
            })
          }
        >
          Criar novo
        </Button>
      </div>

      <div className="p-5 w-full h-full">
        <p className="font-semibold mb-3">Recentes</p>

        <div className="border w-full rounded-xl">
          {forms.length === 0 ? (
            <p className="p-5">
              Sem formulários criados. Crie um formulário no botão acima "Criar
              novo".
            </p>
          ) : (
            forms.map((form) => (
              <div
                key={form.id}
                className="flex justify-between items-center p-4 border-b last:border-none last:rounded-b-xl first:rounded-t-xl hover:bg-gray-50 border-xl"
              >
                <div className="flex gap-3 items-center">
                  <p className="font-semibold">{form.title}</p>
                  <p className="text-gray-500 text-sm">
                    {form.updatedAt &&
                      formatDistanceToNow(new Date(form.updatedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
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
            ))
          )}
        </div>
      </div>
    </main>
  );
}
