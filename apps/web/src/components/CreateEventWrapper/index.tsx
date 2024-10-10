'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '../ui/label';
import { useState } from 'react';
import { Button } from '../ui/button';
import { courses } from '@/database/courses';
import { Modal } from '../Modal';

export const WrapperEvent = () => {
  const [responsavelEvent, setResponsavelEvent] = useState('');
  const [coursesSelected, setCoursesSelected] = useState<string[]>([]);
  const [typeForm, setTypeForm] = useState('');

  const resetField = () => {
    setResponsavelEvent('');
    setCoursesSelected([]);
    setTypeForm('');
  };

  return (
    <section className="bg-white w-max max-md:w-full rounded-lg min-h-96 p-4 grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
      <div className=" w-full border-r px-2 h-full">
        <h2 className="text-2xl mb-2 w-full p-2">Novo Evento</h2>

        <div className="mb-4">
          <Label htmlFor="course">Curso responsável pelo evento: *</Label>
          <Select
            value={responsavelEvent}
            onValueChange={(value) => setResponsavelEvent(value)}
          >
            <SelectTrigger id="course" className="w-full">
              <SelectValue placeholder="Escolha um curso" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mt-4" htmlFor="course">
            Cursos participantes: *
          </Label>

          <div
            className="flex gap-2
         items-center w-full"
          >
            <Select
              onValueChange={(e) => setCoursesSelected([...coursesSelected, e])}
            >
              <SelectTrigger id="course" className="w-[400px]">
                <SelectValue placeholder="Escolha um curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-y-auto custom-scrollbar h-32 w-full bg-gray-100 rounded-lg text-sm">
            <ul className="">
              {coursesSelected.map((course, index) => (
                <li
                  key={index}
                  className="text-sm border-b p-1 flex justify-between items-center"
                >
                  {course}
                  <Button
                    className="w-4 h-4 -scale-75"
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      setCoursesSelected(
                        coursesSelected.filter((c) => c !== course),
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="py-2 w-full">
        <Select value={typeForm} onValueChange={(e) => setTypeForm(e)}>
          <SelectTrigger id="course" className="max-w-[400px]">
            <SelectValue placeholder="Formulario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="avaliacao-institucional">
              Avaliação Institucional
            </SelectItem>
            <SelectItem value="avaliacao-2">Avaliação 2</SelectItem>
            <SelectItem value="avaliacao-3">Avaliação 3</SelectItem>
          </SelectContent>
        </Select>

        <div className="mb-4 mt-4">
          <Label>Responsável pelo evento: *</Label>
          <input
            type="text"
            className="w-full border-gray-300 rounded-md p-2"
            placeholder="Informe o responsável pelo evento"
          />
        </div>

        <div className="mb-4">
          <Label>Descrição:</Label>
          <textarea
            className="w-full border-gray-300 rounded-md p-2 resize-none overflow-y-auto"
            rows={4}
            placeholder="Descreva o evento"
          ></textarea>
        </div>

        {typeForm === '' ? (
          <Button
            className="bg-green-300 hover:bg-green-400 hover:text-white transition-all delay-100"
            variant="secondary"
            disabled
          >
            Escolha um formulario
          </Button>
        ) : (
          <Modal formId={typeForm} onClose={resetField} />
        )}
      </div>
    </section>
  );
};
