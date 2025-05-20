"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const FilterByName = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name") || "";

  const [name, setName] = useState(nameParam);

  useEffect(() => {
    setName(nameParam);
  }, [nameParam]);

  const onSubmitAction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (name.trim()) {
      params.set("name", name.trim());
    } else {
      params.delete("name");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="flex gap-2 w-fit" onSubmit={onSubmitAction}>
      <Input
        placeholder="Filtrar pelo nome..."
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant={"outline"}>Filtrar</Button>
    </form>
  );
};
