"use client"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { X } from 'lucide-react'
import { EventForm } from '@/types/event.form.types';

const NewEvent = () => {

  const [courses, setCourses] = useState<string[]>([]);
  const [course, setCourse] = useState<string>("");

  const [event, setEvent] = useState<EventForm>({
    eventName: "",
    courses: courses,
    formId: null,
    initialDate: null,
    endDate: null,
  })

  const insertCourse = () => {
    if (course.trim()) {
      setEvent({...event, courses: [...event.courses, course]});
      setCourse("");
    }
  };

  const removeCourse = (index: number) => {
    const newCourses = event.courses.filter((_, i) => i !== index);
    setEvent({...event, courses: newCourses})
  };

  const saveEvent = () => {
    console.log(event);
  }

  return (
    <main className="w-full h-[90vh] flex flex-col items-center">
      <p className={'font-semibold text-xl text-center mb-5'}>Gerenciar Eventos</p>

      <div className="flex flex-col p-5 border rounded-xl gap-5 w-2/3">
        <div>
          <p>Nome do Evento</p>
          <Input onChange={(e)=> setEvent({...event, eventName: e.target.value })} />
        </div>

        <div className={'flex gap-5'}>
          <div>
            <p>Data inicial</p>
            <Input type={'date'} onChange={(e) => setEvent({...event, initialDate: e.target.value ? new Date(e.target.value) : null })} />
          </div>

          <div>
            <p>Data de termino</p>
            <Input type={'date'} onChange={(e) => setEvent({...event, endDate: e.target.value ? new Date(e.target.value) : null })} />
          </div>
        </div>

        <div>
          <p>Cursos</p>
          <span className={'flex gap-5'}>
            <Input value={course} onChange={(e) => {
              setCourse(e.target.value)
            }} type={'text'} />
            <Button onClick={insertCourse}>Adicionar</Button>
          </span>

          <div className={'flex text-sm gap-2 text-purple-500'}>
            {event.courses.length > 0 &&
              event.courses.map((course, index) => (
                <div className={'flex gap-1 items-center'}>
                  <div key={index}>{course}</div>
                  <X size={15} color={'red'} className={'cursor-pointer'} onClick={()=> removeCourse(index)}/>
                </div>
              ))
            }
          </div>

        </div>

        <div>
          <p>Formulário</p>
          <Input />
        </div>
        <Button onClick={saveEvent}>
          Salvar
        </Button>
      </div>
    </main>
  )
}

export default NewEvent;