"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EventForm } from "@/types/event.form.types";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { X } from 'lucide-react';
import { api } from "@/api";
import { coursesReq } from "@/types/courseType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { FormReq } from '@/types/form';
import { useForm, Controller } from "react-hook-form";
import toast from 'react-hot-toast'; // Importação do react-hook-form

const NewEvent = () => {

  const { register, handleSubmit, control, setValue, watch } = useForm<EventForm>();
  const [courses, setCourses] = useState<coursesReq[]>([]);
  const [forms, setForms] = useState<FormReq[]>([]);
  const [coursesSelected, setCoursesSelected] = useState<string[]>([]);
  const [courseSelected, setCourseSelected] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();

  const [formSelected, setFormSelected] = useState<string>('');

  const [isOpenQueryForm, setIsOpenQueryForm] = useState(false);
  const [queryForm, setQueryForm] = useState<string>();
  const [isAllCourses, setIsAllCourses] = useState<boolean>(false);

  const removeCourse = (id: string) => {
    const newCourses = coursesSelected.filter((courseId) => courseId != id);
    setCoursesSelected(newCourses);
  };

  const getForms = async () => {
    const formsRes = await api.get(`/api/form/search?perPage=5&sortOrder=desc&${queryForm && `query=${queryForm}`}`);
    setForms(formsRes.data.data);
  };

  const getCourse = async () => {
    const coursesRes = await api.get("/api/course/show");
    setCourses(coursesRes.data);
  };

  const selectCourse = () => {
    if (courseSelected && !coursesSelected.includes(courseSelected)) {
      setCoursesSelected([...coursesSelected, courseSelected]);
    }
  };

  const handleDateChange = (date: DateRange) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getCourse();
  }, []);

  useEffect(() => {
    getForms();
  }, [queryForm]);

  const getSelectedCourseNames = () => {
    return coursesSelected.map((courseId) => {
      return courses.find((course) => course.id === courseId);
    });
  };

  const getFormSelected = (id: string, title: string) => {
    setValue("form", id)
    setQueryForm(title)
  }

  const saveEvent = async (data: EventForm) => {
    if (!selectedDate?.from || !selectedDate?.to) return;

    const allCourses = courses.map((course) => {
      return course.id
    })

    const eventReq: EventForm = {
      ...data,
      startDate: selectedDate.from,
      endDate: selectedDate.to,
      open: true,
      courses: isAllCourses ? allCourses : coursesSelected,
    };

    console.log(eventReq);

    const {status} = await api.post("/api/event/create", eventReq)

    if (status === 201) {
      toast.success("Evento criado com sucesso!");
    }

  };

  return (
    <main className="w-full h-[90vh] mb-5 flex flex-col items-center">
      <form className="flex flex-col gap-1 w-2/3" onSubmit={handleSubmit(saveEvent)}>
        <div>
          <p>Título</p>
          <Input {...register("title")} />
        </div>

        <div>
          <p>Descrição</p>
          <Textarea {...register("description")} />
        </div>

        <div className={'flex gap-3'}>
          <div className={'w-full'}>
            <p>Responsável</p>
            <Input {...register('responsible')} />
          </div>

          <div className={'w-full'}>
            <p>Data</p>
            <Controller
              control={control}
              name="startDate"
              render={() => (
                <DatePickerWithRange onDateChange={handleDateChange} />
              )}
            />
          </div>
        </div>

        <div className="relative">
          <p>Formulário</p>
          <Input value={queryForm} onFocus={() => setIsOpenQueryForm(true)} onBlur={() => setIsOpenQueryForm(false)}
                 onChange={(e) => setQueryForm(e.target.value)} />
          {
            isOpenQueryForm &&
            <div className={'absolute mt-1 bg-white w-full border rounded z-40'}>
              {forms.length > 0 ? forms.map((form) => (
                <div key={form.id}
                     onMouseDown={() => getFormSelected(form.id, form.title)}
                     className={'p-2 border-b last:border-none hover:bg-gray-50 cursor-pointer'}>
                  {form.title}
                </div>
              )) : (
                <div className={'p-2 border-b last:border-none'}>Nenhum formulário encontrado.</div>
              )}
            </div>
          }
        </div>

        <div className={'z-10'}>
          <p>Curso</p>
          <div className={"flex flex-col gap-2"}>
            <div className={'flex gap-2 w-full'}>
              <Select
                disabled={isAllCourses}
                value={courseSelected}
                onValueChange={(value) => setCourseSelected(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione os Cursos" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type={'button'} disabled={isAllCourses} variant="outline" onClick={selectCourse}>
                Adicionar
              </Button>
            </div>

            <div className={'flex gap-1 w-full items-center'}>
              <Checkbox id={'isAllCourses'} checked={isAllCourses}
                        onCheckedChange={() => setIsAllCourses(!isAllCourses)} />
              <label htmlFor={'isAllCourses'} className={'cursor-pointer text-sm'}>Todos os Cursos</label>
            </div>
          </div>
        </div>

        {
          coursesSelected.length > 0 && !isAllCourses &&
          <div>
            <p className="mt-4">Cursos Selecionados:</p>
            <ul className={'flex gap-2 flex-wrap'}>
              {getSelectedCourseNames().map((course, index) => (
                <div key={index} className={'flex'}>
                  <li className="mt-2 text-sm">{course?.name}</li>
                  <X className={'cursor-pointer'} onClick={() => removeCourse(course?.id!)} size={15} color="red" />
                </div>
              ))}
            </ul>
          </div>
        }

        <Button type="submit" className={'mt-3'}>Salvar</Button>
      </form>
    </main>
  );
};

export default NewEvent;
