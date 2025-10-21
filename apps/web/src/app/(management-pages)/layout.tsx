"use client";

import { Button } from "@/components/ui/button";
import { AppChildren } from "@/types";
import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";

export default ({ children }: Readonly<AppChildren>) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-start gap-4 p-4 w-full max-w-[750px]">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4 flex gap-1"
        >
          <ArrowBigLeftDash className="text-gray-700" /> Voltar
        </Button>
        {children}
      </div>
    </div>
  );
};
