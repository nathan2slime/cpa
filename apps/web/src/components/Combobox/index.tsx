"use client"

import { ReactElement, ReactNode, useState } from "react"
import { Input } from "../ui/input"

interface InputSearchSelectProps {
  children: ReactElement<SelectItem>[];
}

interface SelectItem {
  name: string
  key: string
  value: string
}

export const SelectItemSearch = ({name, key, value}: SelectItem) =>  {
  return (
    <div className="p-2 hover:bg-gray-200 cursor-pointer" key={key}>{name}</div>
  )
}

export function InputSearchSelect({children} : InputSearchSelectProps) {

  const [isOpen, setIsOpen] = useState(false)

  console.log(isOpen);
  

  return (
    <div className="relative">
        <Input onFocus={()=> setIsOpen(true)} onBlur={()=> setIsOpen(false)}/>
        {
          isOpen && 
            <div className="absolute mt-2 w-full bg-white border rounded">
              {children}
            </div>
        }
    </div>
  )
}
