"use client"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { EventForm } from '@/types/event.form.types';
import { Textarea } from '@/components/ui/textarea';
import { DatePickerWithRange } from '@/components/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { api } from '@/api';
import { coursesReq, TCourses } from '@/types/courseType';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NewEvent = () => {

  const [courses, setCourses] = useState<coursesReq[]>([]);
  const [coursesSelected, setCoursesSelected] = useState<string[]>([]);
  const [courseSelected, setCourseSelected] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>()

  const [event, setEvent] = useState<EventForm>()

  const getCourses = async () => {
    const coursesRes = await api.get("/api/course/show")
    setCourses(coursesRes.data)
  }

  const selectCourse = () => {
    setCoursesSelected([...coursesSelected, courseSelected])
  }

  const handleDateChange = (date: DateRange) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    getCourses()
  }, []);

  return (
    <main className="w-full h-[90vh] flex flex-col items-center">
      <p className={'font-semibold text-xl text-center mb-5'}>Criar Evento</p>

      <div className="flex flex-col p-5 border rounded-xl gap-2 w-2/3">
        <div>
          <p>Titulo</p>
          <Input onChange={(e) => setEvent({ ...event, title: e.target.value })} />
        </div>

        <div>
          <p>Descrição</p>
          <Textarea onChange={(e) => setEvent({ ...event, description: e.target.value })} />
        </div>

        <div>
          <p>Responsável</p>
          <Input onChange={(e) => setEvent({ ...event, responsible: e.target.value })} />
        </div>

        <div>
          <p>Data</p>
          <DatePickerWithRange onDateChange={handleDateChange}/>
        </div>

        <div>
          <p>Curso</p>
          <div className={'flex gap-2'}>
            <Select value={courseSelected} onValueChange={(value)=> setCourseSelected(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione os Cursos" />
              </SelectTrigger>
              <SelectContent>
                {
                  courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            <Button variant='outline' onClick={selectCourse}>Adicionar</Button>
          </div>
        </div>

        <Button>
          Salvar
        </Button>
      </div>
    </main>
  )
}

export default NewEvent;