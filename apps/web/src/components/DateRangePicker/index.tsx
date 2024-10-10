'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  selectedRange?: DateRange;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  selectedRange,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  useEffect(() => {
    if (selectedRange) {
      setDate(selectedRange);
    }
  }, [selectedRange]);

  const handleDateChange = (newDate: DateRange | undefined) => {
    if (newDate) {
      setDate(newDate);
      onDateChange(newDate);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal', // w-full para ocupar toda a largura
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}{' '}
                  - {format(date.to, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            numberOfMonths={2}
            onSelect={handleDateChange}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

