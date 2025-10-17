"use client"

import { useState, useEffect } from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useSearchForms } from "@/hooks/api-hooks"
import type { Control } from "react-hook-form"
import type { EventForm } from "@/types/event.types"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EventFormSelectorProps {
  control: Control<EventForm>
  selectedFormId: string
  onFormSelect: (formId: string) => void
}

export function EventFormSelector({ control, selectedFormId, onFormSelect }: EventFormSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { data: forms = [] } = useSearchForms(searchQuery)
  const [selectedFormTitle, setSelectedFormTitle] = useState<string>("")

  useEffect(() => {
    if (selectedFormId) {
      const selectedForm = forms.find((form) => form.id === selectedFormId)
      if (selectedForm) {
        setSelectedFormTitle(selectedForm.title)
      }
    }
  }, [selectedFormId, forms])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Formulário</h2>

      <FormField
        control={control}
        name="form"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Selecione um Formulário</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {selectedFormTitle || "Selecione um formulário"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar formulário..." onValueChange={(value) => setSearchQuery(value)} />
                  <CommandList>
                    <CommandEmpty>Nenhum formulário encontrado.</CommandEmpty>
                    <CommandGroup>
                      {forms.map((form) => (
                        <CommandItem
                          key={form.id}
                          value={form.id}
                          onSelect={() => {
                            onFormSelect(form.id)
                            setSelectedFormTitle(form.title)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", selectedFormId === form.id ? "opacity-100" : "opacity-0")}
                          />
                          {form.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
