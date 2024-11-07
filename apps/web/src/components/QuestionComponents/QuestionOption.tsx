import { OptionsTypes } from '@/types/options.types';
import { Checkbox } from '@/components/ui/checkbox';

export interface QuestionOptionProps {
  option: OptionsTypes;
  setSelectedOption: (selectedOption: OptionsTypes) => void;
  isActive: boolean
}

export const QuestionOptions = ({option, setSelectedOption, isActive} : QuestionOptionProps) => {

  return (
    <div onClick={()=> setSelectedOption(option)} className={"px-3 flex gap-3 items-center cursor-pointer"}>
      <Checkbox checked={isActive}/>
      <p className={`flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-none transition-colors ${isActive && 'ring-1 ring-primary'}`}>{option.title}</p>
    </div>
  )
}