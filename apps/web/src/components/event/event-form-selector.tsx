"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useSearchForms } from "@/lib/api-hooks"
import { CheckIcon, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { Control } from "react-hook-form"
import type { EventForm } from "@/types/event.types"
import { useDebounce } from "@/hooks/use-debounce"

interface EventFormSelectorProps {
  control: Control<EventForm>
  selectedFormId: string
  onFormSelect: (formId: string) => void
}

export function EventFormSelector({ control, selectedFormId, onFormSelect }: EventFormSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Use React Query to fetch forms based on search query
  const { data: forms = [], isLoading } = useSearchForms(debouncedSearch)

  // Find the selected form title
  const selectedForm = forms.find((form) => form.id === selectedFormId)
  const displayValue = selectedForm?.title || ""

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Associated Form</h2>

      <FormField
        control={control}
        name="form"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Form</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {displayValue || "Select a form"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search forms..." value={searchQuery} onValueChange={setSearchQuery} />
                  <CommandList>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      </div>
                    ) : (
                      <>
                        <CommandEmpty>No forms found.</CommandEmpty>
                        <CommandGroup>
                          {forms.map((form) => (
                            <CommandItem
                              key={form.id}
                              value={form.title}
                              onSelect={() => {
                                onFormSelect(form.id)
                                setOpen(false)
                              }}
                            >
                              <CheckIcon
                                className={cn("mr-2 h-4 w-4", field.value === form.id ? "opacity-100" : "opacity-0")}
                              />
                              {form.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
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
