'use client'

import { Children, HTMLAttributes, ReactNode, useState } from 'react'
import { Input } from '../ui/input'

interface InputSearchSelectProps extends HTMLAttributes<HTMLInputElement> {
  children: ReactNode
  value: string
}

interface SelectItem extends HTMLAttributes<HTMLDivElement> {
  name: string
  key: string
  value: string
}

export const SelectItemSearch = ({ name, key, value, ...rest }: SelectItem) => {
  return (
    <div {...rest} className="p-2 hover:bg-gray-200 cursor-pointer" key={key}>
      {name}
    </div>
  )
}

export function InputSearchSelect({ children, ...rest }: InputSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 400)
  }

  return (
    <div className="relative">
      <Input {...rest} onFocus={() => setIsOpen(true)} onBlur={onClose} />
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded">
          {Children.count(children) > 0 ? children : <div className="p-2 hover:bg-gray-200 cursor-pointer">Nenhum resultado encontrado</div>}
        </div>
      )}
    </div>
  )
}
