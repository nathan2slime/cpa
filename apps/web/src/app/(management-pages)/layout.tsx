"use client";

import { Button } from "@/components/ui/button";
import { AppChildren } from "@/types";
import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";

export default ({ children }: Readonly<AppChildren>) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div>
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
