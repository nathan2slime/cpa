"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Status = "andamento" | "encerrado" | "agendado";

type StatusOption = {
  id: Status | "";
  name: string;
};

const statusOptions: StatusOption[] = [
  { id: "", name: "Todos" },
  { id: "andamento", name: "Em andamento" },
  { id: "encerrado", name: "Encerrado" },
  { id: "agendado", name: "Agendado" },
];

export const FilterByStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const statusParam = searchParams.get("s");

  const [value, setValue] = useState(statusParam || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("s", value);
    } else {
      params.delete("s");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    router.push(newUrl, { scroll: false });
  }, [value, router, searchParams]);

  useEffect(() => {
    if (statusParam !== value) {
      setValue(statusParam || "");
    }
  }, [statusParam]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <p className="truncate text-sm font-medium">
            {value
              ? statusOptions.find((status) => status.id === value)?.name
              : "Todos"}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            if (!search) return 1;
            const statusName = value.toLowerCase();
            const searchTerm = search.toLowerCase();
            return statusName.includes(searchTerm) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Buscar status..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
            <CommandGroup>
              {statusOptions.map((status) => (
                <CommandItem
                  key={status.id || "todos"}
                  value={status.name.toLowerCase()}
                  onSelect={() => {
                    setValue(status.id);
                    setOpen(false);
                  }}
                >
                  {status.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === status.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
