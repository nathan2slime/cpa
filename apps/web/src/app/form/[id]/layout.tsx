'use client'

import { Sidebar } from '@/components/core/sidebar'

import { api } from '@/api'
import { HeaderForm } from '@/app/form/[id]/components/HeaderForm'
import { AppChildren } from '@/types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default ({ children }: Readonly<AppChildren>) => {
  const params = useParams()
  const id = params.id as string

  const [title, setTitle] = useState('')

  const getDataForm = async () => {
    const { data } = await api.get(`/api/form/show/${id}`)
    setTitle(data.title)
  }

  useEffect(() => {
    getDataForm()
  }, [id])

  return (
    <main className="w-full h-full">
      <HeaderForm titleForm={title} idForm={id} />

      <div className="w-full flex pt-[60px] overflow-y-auto items-start h-screen">
        <Sidebar />

        <div className="w-full h-full p-4">{children}</div>
      </div>
    </main>
  )
}
