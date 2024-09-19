"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EventForm } from "@/types/event.form.types";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { X } from 'lucide-react'
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

const NewEvent = () => {

  const [courses, setCourses] = useState<coursesReq[]>([]);
  const [forms, setForms] = useState<FormReq[]>([]);
  const [coursesSelected, setCoursesSelected] = useState<string[]>([]);
  const [courseSelected, setCourseSelected] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();

  const [allCourses, setAllCourses] = useState<boolean>(false);

  const [event, setEvent] = useState<EventForm>();

  const removeCourse = (id: string) => {
    const newCourses = coursesSelected.filter((courseId) => courseId != id)
    setCoursesSelected(newCourses);
  }

  const getCoursesAndForms = async () => {
    const coursesRes = await api.get("/api/course/show");
    setCourses(coursesRes.data);

    const formsRes = await api.get("/api/form/search");
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
    getCoursesAndForms();
  }, []);

  // obter o nome dos cursos selecionados
  const getSelectedCourseNames = () => {
    return coursesSelected.map((courseId) => {
      return courses.find((course) => course.id === courseId);
    });
  };

  const saveEvent = () => {

  }

  return (
    <main className="w-full h-[90vh] mb-5 flex flex-col items-center">
      <p className={"font-semibold text-xl text-center"}>Criar Evento</p>

      <div className="flex flex-col gap-1 w-2/3">
        <div>
          <p>Título</p>
          <Input
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
        </div>

        <div>
          <p>Descrição</p>
          <Textarea
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
        </div>

        <div>
          <p>Responsável</p>
          <Input
            onChange={(e) => setEvent({ ...event, responsible: e.target.value })}
          />
        </div>

        <div>
          <p>Data</p>
          <DatePickerWithRange onDateChange={handleDateChange} />
        </div>

        <div>
          <p>Curso</p>
          <div className={"flex flex-col gap-2"}>
            <div className={'flex gap-2 w-full'}>
              <Select
                disabled={allCourses}
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
              <Button disabled={allCourses} variant="outline" onClick={selectCourse}>
                Adicionar
              </Button>
            </div>

            <div className={'flex gap-1 w-full items-center'}>
              <Checkbox id={'allCourses'} checked={allCourses} onCheckedChange={() => setAllCourses(!allCourses)} />
              <label htmlFor={'allCourses'} className={'cursor-pointer text-sm'}>Todos os Cursos</label>
            </div>

          </div>
        </div>

        {
          coursesSelected.length > 0 &&
          <div>
            <p className="mt-4">Cursos Selecionados:</p>
            <ul className={'flex gap-2 flex-wrap'}>
              {getSelectedCourseNames().map((course, index) => (
                <div className={'flex'}>
                  <li key={index} className="mt-2 text-sm">
                    {course.name}
                  </li>
                  <X className={'cursor-pointer'} onClick={() => removeCourse(course.id)} size={15} color="red" />
                </div>
              ))}
            </ul>
          </div>
        }

        <Button className={'mt-3'}>Salvar</Button>
      </div>
    </main>
  );
};

export default NewEvent;
