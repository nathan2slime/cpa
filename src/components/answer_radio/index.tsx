import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { AnswerRadioProps } from './model';

export const AnswerRadio = ({ data, position, onChange }: AnswerRadioProps) => {
  return (
    <RadioGroup

      onValueChange={onChange}
      className="flex flex-col gap-4"
    >
      {data.map((answer, index) => {
        const key = position.toString() + '-' + index.toString();

        return (
          <div key={key}  className="flex items-center space-x-2">
            <RadioGroupItem id={key} value={key} />
            <Label
              htmlFor={key}
              className="text-base cursor-pointer text-zinc-800 font-normal"
            >
              {answer}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
