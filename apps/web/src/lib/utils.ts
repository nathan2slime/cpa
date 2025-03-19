import { type ClassValue, clsx } from 'clsx'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const setStorage = <T = {}>(key: string, value: T): boolean => {
  if (typeof window === 'undefined') return false

  try {
    localStorage.setItem(key, JSON.stringify(value))

    return true
  } catch (_e) {
    return false
  }
}

export const getStorage = <T = {}>(key: string): T | null => {
  if (typeof window === 'undefined') return null

  try {
    return JSON.parse(localStorage.getItem(key) || '') as T
  } catch (_e) {
    return null
  }
}

export const copyTextToTranferArea = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Link Copiado')
  } catch (_err) {
    toast.error('Erro ao copiar o link')
  }
}
