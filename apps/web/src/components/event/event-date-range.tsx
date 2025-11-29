"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Control } from "react-hook-form";
import type { EventForm } from "@/types/event.types";
import type { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";

interface EventDateRangeProps {
  control: Control<EventForm>;
  selectedRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
  disableStartDate?: boolean;
}

export function EventDateRange({
  control,
  selectedRange,
  onDateChange,
  disableStartDate,
}: EventDateRangeProps) {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  useEffect(() => {
    if (!selectedRange) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      onDateChange({
        from: today,
        to: tomorrow,
      });
    }
  }, [selectedRange, onDateChange]);

  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (selectedRange?.to && date > selectedRange.to) {
      const newEndDate = new Date(date);
      newEndDate.setDate(date.getDate() + 1);
      onDateChange({ from: date, to: newEndDate });
    } else {
      onDateChange({ from: date, to: selectedRange?.to });
    }

    setStartDateOpen(false);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (selectedRange?.from && date < selectedRange.from) {
      return;
    }

    onDateChange({ from: selectedRange?.from, to: date });
    setEndDateOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Data do evento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de início</FormLabel>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal"
                      )}
                      onClick={() => setStartDateOpen(true)}
                      disabled={disableStartDate}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedRange?.from ? (
                        format(selectedRange.from, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione a data de início</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={selectedRange?.from}
                    onSelect={handleStartDateSelect}
                    defaultMonth={selectedRange?.from || new Date()}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de término</FormLabel>
              <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal"
                      )}
                      onClick={() => setEndDateOpen(true)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedRange?.to ? (
                        format(selectedRange.to, "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })
                      ) : (
                        <span>Selecione a data de término</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="single"
                    selected={selectedRange?.to}
                    onSelect={handleEndDateSelect}
                    defaultMonth={
                      selectedRange?.to || selectedRange?.from || new Date()
                    }
                    disabled={(date) =>
                      selectedRange?.from
                        ? date < selectedRange.from
                        : date < new Date()
                    }
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="hidden">
        <input
          type="hidden"
          value={selectedRange?.from ? selectedRange.from.toISOString() : ""}
          onChange={(e) => {
            if (e.target.value) {
              const date = new Date(e.target.value);
              onDateChange({ from: date, to: selectedRange?.to });
            }
          }}
        />
        <input
          type="hidden"
          value={selectedRange?.to ? selectedRange.to.toISOString() : ""}
          onChange={(e) => {
            if (e.target.value) {
              const date = new Date(e.target.value);
              onDateChange({ from: selectedRange?.from, to: date });
            }
          }}
        />
      </div>
    </div>
  );
}
