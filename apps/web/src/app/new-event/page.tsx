'use client'

import { api } from '@/api'
import { InputSearchSelect, SelectItemSearch } from '@/components/Combobox'
import { DatePickerWithRange } from '@/components/DateRangePicker'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { eventFormSchema } from '@/schemas/eventForm'
import { CoursesReq } from '@/types/courseType'
import { EventForm } from '@/types/event.types'
import { FormReq } from '@/types/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectGroup } from '@radix-ui/react-select'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const Event = () => {
  const router = useRouter()

  const form = useForm<EventForm>({
    mode: 'all',
    resolver: yupResolver(eventFormSchema)
  })

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [courses, setCourses] = useState<CoursesReq[]>()
  const [forms, setForms] = useState<FormReq[]>()
  const [selectCourse, setSelectCourse] = useState<string>()

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = form

  const [selectSearch, setSelectSearch] = useState<FormReq>()

  const coursesEvent = watch('courses')?.map(courseId => {
    return courses?.find(course => course.id === courseId)
  })

  const getData = async () => {
    //pegando os cursos
    const { data: courses } = await api.get<CoursesReq[]>('api/course/show')

    setCourses(courses)
  }

  const getForms = async () => {
    const { data: forms } = await api.get(`/api/form/search?perPage=5&sortOrder=desc&${selectSearch?.title && `query=${selectSearch.title}`}`)
    setForms(forms.data)
  }

  const onSelectSearch = (form: FormReq) => {
    console.log(form)

    setSelectSearch(form)
    setValue('form', form.id)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectSearch({ title: e.target.value, id: '' })
    setValue('form', '')
  }

  const handleSelectChange = (value: string) => {
    setSelectCourse(value)
  }

  const addSelectChange = () => {
    const currentCourses = watch('courses') || []
    if (selectCourse) {
      if (!currentCourses.includes(selectCourse)) {
        setValue('courses', [...currentCourses, selectCourse], { shouldValidate: true })
      }
    }
  }

  const removeCourse = (id: string) => {
    const currentCourses = watch('courses') || []
    const newCourses = currentCourses.filter(course => course !== id)
    setValue('courses', newCourses)
  }

  const saveEvent = async (values: EventForm) => {
    const { status } = await api.post('api/event/create', values)

    if (status === 201) toast.success('Evento Criado com sucesso!')

    router.push('/events')
  }

  useEffect(() => {
    getForms()
  }, [selectSearch?.title])

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="w-full h-[90vh] mb-5 flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(saveEvent)} className="flex flex-col gap-2 w-2/3">
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

            <div className={`w-full flex flex-col justify-end ${errors.endDate || errors.startDate ? 'gap-1' : null}`}>
              <DatePickerWithRange
                selectedRange={selectedRange}
                onDateChange={range => {
                  setSelectedRange(range)
                  if (range && range.from && range.to) {
                    setValue('startDate', range.from)
                    setValue('endDate', range.to)
                  }
                }}
              />
              <div className="w-full flex gap-2">
                <FormField
                  control={control}
                  name="startDate"
                  render={() => (
                    <FormItem className="w-full">
                      <FormControl>
                        <FormMessage />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="endDate"
                  render={() => (
                    <FormItem className="w-full">
                      <FormControl>
                        <FormMessage />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormField
            control={control}
            name="form"
            render={() => (
              <FormItem>
                <FormLabel>Formulário</FormLabel>
                <FormControl>
                  <InputSearchSelect onChange={onChangeTitle} value={selectSearch?.title || ''}>
                    {forms?.map(form => (
                      <SelectItemSearch onClick={() => onSelectSearch(form)} key={form.id} name={form.title} value={form.id} />
                    ))}
                  </InputSearchSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col gap-3">
            <FormField
              control={control}
              name="courses"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Cursos</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectGroup>
                          <SelectContent>
                            <SelectLabel>Selecione o Curso</SelectLabel>
                            {courses?.map(course => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectGroup>
                      </Select>
                      <Button type="button" onClick={addSelectChange} className="mb-1">
                        Adicionar
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {coursesEvent && (
              <ul className="text-sm flex flex-wrap gap-1">
                {coursesEvent?.map(courses => (
                  <li key={courses?.id} className="flex items-end">
                    {courses?.name}
                    {courses?.id && <X color="red" onClick={() => removeCourse(courses.id)} />}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Button type="submit" className="mt-3">
            Salvar
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default Event
