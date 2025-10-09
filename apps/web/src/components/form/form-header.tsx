"use client";

import { Input } from "@/components/ui/input";
import { useUpdateForm, useForm } from "@/hooks/api-hooks";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export function FormHeader() {
  const params = useParams();
  const formId = params.id as string;

  const { data: form } = useForm(formId);
  const [title, setTitle] = useState("");
  const updateFormMutation = useUpdateForm();

  console.log(form);

  useEffect(() => {
    if (form?.title) {
      setTitle(form.title);
    }
  }, [form]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formId && title && title !== form?.title) {
        updateFormMutation.mutate({ id: formId, title });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [title]);

  return (
    <div className="mb-6">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-semibold text-black border-0 px-0 focus-visible:px-2 bg-transparent"
        placeholder="Título do formulário"
      />
      <p className="text-sm text-muted-foreground mt-1">
        Elabore e organize as questões do formulário. É possível adicionar
        questões discursivas ou de múltipla escolha.
      </p>
    </div>
  );
}
