"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerWithRangeProps {
  className?: string
  selectedRange?: DateRange
  onDateChange: (range: DateRange | undefined) => void
}

export function DatePickerWithRange({ className, selectedRange, onDateChange }: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !selectedRange && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedRange?.from ? (
              selectedRange.to ? (
                <>
                  {format(selectedRange.from, "dd/MM/yyyy")} - {format(selectedRange.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(selectedRange.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
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
    </div>
  )
}
