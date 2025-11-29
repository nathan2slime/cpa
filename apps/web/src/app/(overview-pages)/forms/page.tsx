"use client";

import ShowForms from "@/components/forms/forms";
import { PaginationComponent } from "@/components/pagination";
import { useForms } from "@/hooks/api-hooks";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Forms() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}

const Form = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const { data: forms } = useForms(page ? +page : 1);

  return (
    <div className="h-full flex flex-col justify-between">
      <ShowForms forms={forms?.data || []} />
      <PaginationComponent
        total={forms?.total || 0}
        current={forms?.page || 0}
        limit={forms?.perPage || 5}
      />
    </div>
  );
};
