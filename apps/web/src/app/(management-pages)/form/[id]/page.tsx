"use client";

import { useParams } from "next/navigation";
import { useForm } from "@/hooks/api-hooks";
import { Loader2 } from "lucide-react";
import { FormHeader } from "@/components/form/form-header";
import { FormTabs } from "@/components/form/form-tabs";

export default function FormularioPage() {
  const params = useParams();
  const formId = params.id as string;

  const { data: form, isLoading, error } = useForm(formId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Erro ao carregar formulário
          </h2>
          <p className="text-gray-600 mt-2">
            Não foi possível carregar o formulário solicitado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FormHeader />
      <FormTabs />
    </div>
  );
}
