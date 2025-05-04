"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { eventFormSchema } from "@/schemas/eventForm"
import type { EventForm as EventFormType } from "@/types/event.types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { DateRange } from "react-day-picker"
import { useForm as useHookForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { EventBasicInfo } from "./event-basic-info"
import { EventCourseSelector } from "./event-course-selector"
import { EventDateRange } from "./event-date-range"
import { EventFormSelector } from "./event-form-selector"
import { useEvent, useCourses, useForm, useUpdateEvent } from "@/lib/api-hooks"
import { Skeleton } from "@/components/ui/skeleton"

interface EventFormProps {
  eventId: string
}

export function EventForm({ eventId }: EventFormProps) {
  const router = useRouter()

  // React Query hooks
  const { data: event, isLoading: isLoadingEvent } = useEvent(eventId)
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses()
  const { data: formData } = useForm(event?.formId)
  const updateEventMutation = useUpdateEvent()

  // Form state
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
  const [selectedFormId, setSelectedFormId] = useState<string>("")

  // Initialize form with data once it's loaded
  const form = useHookForm<EventFormType>({
    mode: "all",
    resolver: yupResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      responsible: "",
      startDate: new Date(),
      endDate: new Date(),
      courses: [],
      form: "",
    },
  })

  const { handleSubmit, setValue, watch, reset } = form

  // Update form values when data is loaded
  useEffect(() => {
    if (event && formData) {
      reset({
        title: event.title,
        description: event.description,
        responsible: event.responsible,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        courses: event.courses || [],
        form: formData.id,
      })

      setSelectedFormId(formData.id)
      setSelectedRange({
        from: new Date(event.startDate),
        to: new Date(event.endDate),
      })
    }
  }, [event, formData, reset])

  // Form handlers
  const handleFormSelection = (formId: string) => {
    setSelectedFormId(formId)
    setValue("form", formId)
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setSelectedRange(range)
      setValue("startDate", range.from)
      setValue("endDate", range.to)
    }
  }

  const handleAddCourse = (courseId: string) => {
    const currentCourses = watch("courses") || []
    if (courseId && !currentCourses.includes(courseId)) {
      setValue("courses", [...currentCourses, courseId], { shouldValidate: true })
    }
  }

  const handleRemoveCourse = (courseId: string) => {
    const currentCourses = watch("courses") || []
    const newCourses = currentCourses.filter((course) => course !== courseId)
    setValue("courses", newCourses)
  }

  // Form submission
  const onSubmit = (values: EventFormType) => {
    updateEventMutation.mutate(
      { id: eventId, data: values },
      {
        onSuccess: () => {
          toast.success("Event updated successfully!")
          router.push("/events")
        },
        onError: (error) => {
          toast.error("Failed to update event. Please try again.")
          console.error("Update error:", error)
        },
      },
    )
  }

  // Show loading state
  if (isLoadingEvent || isLoadingCourses) {
    return <EventFormSkeleton />
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto overflow-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <EventBasicInfo control={form.control} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <EventDateRange control={form.control} selectedRange={selectedRange} onDateChange={handleDateRangeChange} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <EventFormSelector
            control={form.control}
            selectedFormId={selectedFormId}
            onFormSelect={handleFormSelection}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <EventCourseSelector
            control={form.control}
            courses={courses}
            selectedCourseIds={watch("courses") || []}
            onAddCourse={handleAddCourse}
            onRemoveCourse={handleRemoveCourse}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/events")}
            disabled={updateEventMutation.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={updateEventMutation.isPending}>
            {updateEventMutation.isPending ? "Saving..." : "Save Event"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

function EventFormSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
