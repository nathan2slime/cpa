"use client"

import ShowForms from "@/components/forms/forms";
import { useForms } from "@/hooks/api-hooks";

export default function Forms() {
  const { data: forms } = useForms();

  return (
    <div>
      <ShowForms forms={forms?.data || []} />
    </div>
  );
}
