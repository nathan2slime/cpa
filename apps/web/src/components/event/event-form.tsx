"use client";

import { EventBasicInfo } from "@/components/event/event-basic-info";
import { EventCourseSelector } from "@/components/event/event-course-selector";
import { EventDateRange } from "@/components/event/event-date-range";
import { EventFormSelector } from "@/components/event/event-form-selector";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCourses,
  useCreateEvent,
  useEvent,
  useForm,
  useUpdateEvent,
} from "@/lib/api-hooks";
import { eventFormSchema } from "@/schemas/eventForm";
import type { EventForm as EventFormType } from "@/types/event.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { useForm as useHookForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface EventFormProps {
  eventId?: string;
}

export default function EventForm({ eventId }: EventFormProps) {
  const router = useRouter();
  const isEditMode = !!eventId;

  const { data: event, isLoading: isLoadingEvent } = useEvent(eventId || "");
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  const { data: formData } = useForm(event?.formId);

  const updateEventMutation = useUpdateEvent();
  const createEventMutation = useCreateEvent();

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [selectedFormId, setSelectedFormId] = useState<string>("");

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
  });

  const { handleSubmit, setValue, watch, reset } = form;

  useEffect(() => {
    if (isEditMode && event && formData) {
      reset({
        title: event.title,
        description: event.description,
        responsible: event.responsible,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        courses: event.courses || [],
        form: formData.id,
      });

      setSelectedFormId(formData.id);
      setSelectedRange({
        from: new Date(event.startDate),
        to: new Date(event.endDate),
      });
    }
  }, [event, formData, isEditMode, reset]);

  const handleFormSelection = (formId: string) => {
    setSelectedFormId(formId);
    setValue("form", formId);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setSelectedRange(range);
      setValue("startDate", range.from);
      setValue("endDate", range.to);
    }
  };

  const handleAddCourse = (courseId: string) => {
    const currentCourses = watch("courses") || [];
    if (courseId && !currentCourses.includes(courseId)) {
      setValue("courses", [...currentCourses, courseId], {
        shouldValidate: true,
      });
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    const currentCourses = watch("courses") || [];
    const newCourses = currentCourses.filter((course) => course !== courseId);
    setValue("courses", newCourses);
  };

  const onSubmit = (values: EventFormType) => {
    if (isEditMode) {
      updateEventMutation.mutate(
        { id: eventId!, data: values },
        {
          onSuccess: () => {
            toast.success("Evento atualizado com sucesso!");
            router.push("/events");
          },
          onError: (error) => {
            toast.error("Falha ao atualizar evento. Tente novamente.");
            console.error("Update error:", error);
          },
        }
      );
    } else {
      createEventMutation.mutate(values, {
        onSuccess: () => {
          toast.success("Evento criado com sucesso!");
          router.push("/events");
        },
        onError: (error) => {
          toast.error("Falha ao criar evento. Tente novamente.");
          console.error("Create error:", error);
        },
      });
    }
  };

  const isLoading = isEditMode
    ? isLoadingEvent || isLoadingCourses
    : isLoadingCourses;
  const isPending =
    updateEventMutation.isPending || createEventMutation.isPending;

  if (isLoading) {
    return <EventFormSkeleton />;
  }

  return (
    <div className="lg:min-w-[800px] md:min-w-[600px]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border overflow-hidden">
            <EventBasicInfo control={form.control} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border overflow-hidden">
            <EventDateRange
              control={form.control}
              selectedRange={selectedRange}
              onDateChange={handleDateRangeChange}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border overflow-hidden">
            <EventFormSelector
              control={form.control}
              selectedFormId={selectedFormId}
              onFormSelect={handleFormSelection}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border overflow-hidden">
            <EventCourseSelector
              control={form.control}
              courses={courses}
              selectedCourseIds={watch("courses") || []}
              onAddCourse={handleAddCourse}
              onRemoveCourse={handleRemoveCourse}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/events")}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending
                ? "Salvando..."
                : isEditMode
                  ? "Atualizar Evento"
                  : "Criar Evento"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function EventFormSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border">
        <Skeleton className="h-6 w-36 mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <Skeleton className="h-10 w-full sm:w-24" />
        <Skeleton className="h-10 w-full sm:w-24" />
      </div>
    </div>
  );
}
