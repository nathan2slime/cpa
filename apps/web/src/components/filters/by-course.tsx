"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
import { useEffect, useState } from "react";
import { CoursesReq } from "@/types/courseType";

type Props = {
  courses: CoursesReq[];
};

export const FilterByCourse = ({ courses }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const courseParam = searchParams.get("c");

  const [value, setValue] = useState(courseParam || "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("c", value);
    } else {
      params.delete("c");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    router.push(newUrl, { scroll: false });
  }, [value, router, searchParams]);

  useEffect(() => {
    if (courseParam !== value) {
      setValue(courseParam || "");
    }
  }, [courseParam]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          <p className="truncate text-sm font-medium">
            {value
              ? courses.find((course) => course.id === value)?.name
              : "Todos"}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command
          filter={(value, search) => {
            if (!search) return 1;
            const courseName = value.toLowerCase();
            const searchTerm = search.toLowerCase();
            return courseName.includes(searchTerm) ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Buscar curso..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum curso encontrado.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                key="todos"
                value="todos"
                onSelect={() => {
                  setValue("");
                  setOpen(false);
                }}
              >
                Todos
                <Check
                  className={cn(
                    "ml-auto",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {courses.map((course) => (
                <CommandItem
                  key={course.id}
                  value={course.name.toLowerCase()}
                  onSelect={() => {
                    setValue(course.id);
                    setOpen(false);
                  }}
                >
                  {course.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === course.id ? "opacity-100" : "opacity-0"
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
