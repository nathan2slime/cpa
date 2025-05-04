"use client"

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import type { Control } from "react-hook-form"
import type { EventForm } from "@/types/event.types"
import type { CoursesReq } from "@/types/courseType"

interface EventCourseSelectorProps {
  control: Control<EventForm>
  courses: CoursesReq[]
  selectedCourseIds: string[]
  onAddCourse: (courseId: string) => void
  onRemoveCourse: (courseId: string) => void
}

export function EventCourseSelector({
  control,
  courses,
  selectedCourseIds,
  onAddCourse,
  onRemoveCourse,
}: EventCourseSelectorProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")

  const handleSelectChange = (value: string) => {
    setSelectedCourseId(value)
  }

  const handleAddCourse = () => {
    if (selectedCourseId) {
      onAddCourse(selectedCourseId)
      setSelectedCourseId("")
    }
  }

  // Filter out courses that are already selected
  const availableCourses = courses.filter((course) => !selectedCourseIds.includes(course.id))

  // Get selected course objects
  const selectedCourses = selectedCourseIds
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean) as CoursesReq[]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Associated Courses</h2>

      <FormField
        control={control}
        name="courses"
        render={() => (
          <FormItem>
            <FormLabel>Courses</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Select value={selectedCourseId} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCourses.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No courses available
                      </SelectItem>
                    ) : (
                      availableCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <Button type="button" onClick={handleAddCourse} disabled={!selectedCourseId}>
                Add
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedCourses.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Selected Courses:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCourses.map((course) => (
              <Badge key={course.id} variant="secondary" className="px-3 py-1">
                {course.name}
                <button
                  type="button"
                  onClick={() => onRemoveCourse(course.id)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {course.name}</span>
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
