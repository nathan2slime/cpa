"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { Control } from "react-hook-form"
import type { EventForm } from "@/types/event.types"
import type { DateRange } from "react-day-picker"

interface EventDateRangeProps {
  control: Control<EventForm>
  selectedRange: DateRange | undefined
  onDateChange: (range: DateRange | undefined) => void
}

export function EventDateRange({ control, selectedRange, onDateChange }: EventDateRangeProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Event Date</h2>

      <FormField
        control={control}
        name="startDate"
        render={() => (
          <FormItem className="flex flex-col">
            <FormLabel>Date Range</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedRange && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedRange?.from ? (
                      selectedRange.to ? (
                        <>
                          {format(selectedRange.from, "LLL dd, y")} - {format(selectedRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(selectedRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={selectedRange?.from}
                  selected={selectedRange}
                  onSelect={onDateChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
