import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courses } from '@/database/courses';

export const SelectCourse = () => {
  return (
      <Select>
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
  )
}
