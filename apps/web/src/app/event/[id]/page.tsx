'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { EventForm } from '@/types/event.form.types';
import { api } from '@/api';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { eventFormSchema } from '@/schemas/eventForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { DatePickerWithRange } from '@/components/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { CoursesReq } from '@/types/courseType';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { SelectGroup } from '@radix-ui/react-select';
import { InputSearchSelect, SelectItemSearch } from '@/components/Combobox';
import { FormReq } from '@/types/form';

const Event = () => {
  const { id } = useParams();

  const form = useForm<EventForm>({
    mode: 'all',
    resolver: yupResolver(eventFormSchema),
  });

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined,
  );
  const [courses, setCourses] = useState<CoursesReq[]>();
  const [nameForm, setNameForm] = useState<string>();
  const [forms, setForms] = useState<FormReq[]>();

  const [selectSearch, setSelectSearch] = useState<FormReq>();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const getData = async () => {
    //pegando o eventos
    const { data: event } = await api.get<EventForm>(`/api/event/show/${id}`);

    //pegando os cursos
    const { data: courses } = await api.get<CoursesReq[]>('api/course/show');

    setCourses(courses);

    //setando o evento no useForm
    setValue('title', event.title);
    setValue('description', event.description);
    setValue('responsible', event.responsible);
    setValue('startDate', event.startDate);
    setValue('endDate', event.endDate);
  };

  const getForm = async () => {
    const { data: forms } = await api.get(
      `/api/form/search?perPage=5&sortOrder=desc&${selectSearch?.title && `query=${selectSearch.title}`}`,
    );
    setForms(forms.data);
  };

  const onSelectSearch = (form: FormReq) => {
    setSelectSearch(form);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectSearch({ title: e.target.value, id: '' });
  };

  const saveEvent = async () => {
    console.log(watch);
  };

  useEffect(() => {
    getForm();
  }, [selectSearch?.title]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="w-full h-[90vh] mb-5 flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(saveEvent)}
          className="flex flex-col gap-1 w-2/3"
        >
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <div className="w-full">
              <FormField
                control={control}
                name="responsible"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-end">
              <DatePickerWithRange
                selectedRange={selectedRange}
                onDateChange={(range) => {
                  setSelectedRange(range);
                  if (range && range.from && range.to) {
                    setValue('startDate', range.from);
                    setValue('endDate', range.to);
                  }
                }}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="courses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cursos</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Selecione o Curso</SelectLabel>
                        {courses?.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputSearchSelect
            onChange={onChangeTitle}
            value={selectSearch?.title || ''}
          >
            {forms?.map((form) => (
              <SelectItemSearch
                onClick={() => onSelectSearch(form)}
                key={form.id}
                name={form.title}
                value={form.id}
              />
            ))}
          </InputSearchSelect>

          <Button type="submit" className="mt-3">
            Salvar
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Event;
