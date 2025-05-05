"use client"

import { useState } from "react"
import { X, Check, ChevronsUpDown } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Control } from "react-hook-form"
import type { EventForm } from "@/types/event.types"
import type { CoursesReq } from "@/types/courseType"

interface EventCourseSelectorProps {
  control: Control<EventForm>
  courses: CoursesReq[]
  selectedCourseIds: string[]
  onAddCourse: (courseId: string) => void
  onRemoveCourse: (courseId: string) => void
}

export function EventCourseSelector({
  control,
  courses,
  selectedCourseIds,
  onAddCourse,
  onRemoveCourse,
}: EventCourseSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = searchQuery
    ? courses.filter((course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : courses

  const selectedCourses = selectedCourseIds
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean) as CoursesReq[]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Cursos</h2>

      <FormField
        control={control}
        name="courses"
        render={() => (
          <FormItem className="space-y-4">
            <FormLabel>Adicionar Cursos</FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    Selecione um curso
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar curso..." onValueChange={setSearchQuery} />
                    <CommandList>
                      <CommandEmpty>Nenhum curso encontrado.</CommandEmpty>
                      <CommandGroup>
                        {filteredCourses.map((course) => (
                          <CommandItem
                            key={course.id}
                            value={course.id}
                            onSelect={() => {
                              onAddCourse(course.id)
                              setOpen(false)
                            }}
                            disabled={selectedCourseIds.includes(course.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCourseIds.includes(course.id) ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {course.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />

            {selectedCourses.length > 0 && (
              <div className="mt-2">
                <FormLabel>Cursos Selecionados</FormLabel>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {selectedCourses.map((course) => (
                    <li
                      key={course.id}
                      className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {course.name}
                      <button
                        type="button"
                        onClick={() => onRemoveCourse(course.id)}
                        className="text-red-500 hover:text-red-700 ml-1"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  )
}
