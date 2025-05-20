"use client";

import { FiltersContent } from "@/components/filter";
import { FilterByName } from "@/components/filter/by-name";
import { FilterTag } from "@/components/filter/by-tag";
import { FormCard } from "@/components/forms/form-card";
import { Button } from "@/components/ui/button";
import { useAllTagsForm, useCreateForm } from "@/hooks/api-hooks";
import { FormReq } from "@/types/form";

import { useRouter } from "next/navigation";

type FormsProps = {
  forms: FormReq[] | [];
};

export default function ShowForms({ forms }: FormsProps) {
  const router = useRouter();
  const { mutate: createForm } = useCreateForm();
  const { data: tags = [] } = useAllTagsForm();

  return (
    <main className="flex flex-col justify-start items-start px-5 gap-3">
      <div className="justify-between w-full flex items-center">
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

      <FiltersContent>
        <FilterByName />
        <FilterTag tags={tags} />
      </FiltersContent>

      <div className="w-full h-full">
        <p className="font-semibold mb-3">Recentes</p>

        <div className="border w-full rounded-xl">
          {forms.length === 0 ? (
            <p className="p-5">
              Sem formulários criados. Crie um formulário no botão acima "Criar
              novo".
            </p>
          ) : (
            forms.map((form) => <FormCard key={form.id} form={form} />)
          )}
        </div>
      </div>
    </main>
  );
}
