"use client";

import { FiltersContent } from "@/components/filters";
import { FilterByName } from "@/components/filters/by-name";
import { FilterTag } from "@/components/filters/by-tag";
import { FormCard } from "@/components/forms/form-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  useAllTagsForm,
  useCreateForm,
  useDuplicateForm,
} from "@/hooks/api-hooks";
import { FormReq } from "@/types/form";
import { DeleteFormDialog } from "@/components/forms/delete-form";
import { TagPopover } from "@/components/tag-popover";
import { useRouter, useSearchParams } from "next/navigation";
import { EllipsisVertical } from "lucide-react";

type FormsProps = {
  forms: FormReq[] | [];
};

export default function ShowForms({ forms }: FormsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: createForm } = useCreateForm();
  const { mutate: duplicateForm } = useDuplicateForm();
  const { data: tags = [] } = useAllTagsForm();

  return (
    <main className="flex flex-col justify-start items-start px-2 sm:px-5 gap-3 w-full">
      <div className="justify-between w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
        <p className="font-semibold text-lg sm:text-xl">
          Gerenciar Formulários
        </p>
        <Button
          onClick={() =>
            createForm(undefined, {
              onSuccess: (data) => router.push(`/form/${data.id}`),
            })
          }
          className="w-full sm:w-auto"
        >
          Criar novo
        </Button>
      </div>

      <FiltersContent>
        <FilterByName />
        <FilterTag tags={tags} />
      </FiltersContent>

      <div className="w-full h-full">
        <p className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
          Recentes
        </p>

        <div className="border w-full rounded-xl">
          {forms.length === 0 && (
            <p className={"p-3 sm:p-5 text-sm sm:text-base"}>
              {searchParams.size > 0
                ? "Nenhum resultado encontrado para sua busca."
                : 'Sem formulários criados. Crie um formulário no botão acima "Criar novo".'}
            </p>
          )}
          {forms.map((form) => (
            <FormCard key={form.id} form={form}>
              <>
                <TagPopover tags={tags} formId={form.id} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"sm"} variant={"outline"} className="p-2">
                      <EllipsisVertical size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Operações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push(`/form/${form.id}`)}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => duplicateForm(form.id!)}>
                      Duplicar
                    </DropdownMenuItem>
                    <DeleteFormDialog formId={form.id!} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            </FormCard>
          ))}
        </div>
      </div>
    </main>
  );
}
