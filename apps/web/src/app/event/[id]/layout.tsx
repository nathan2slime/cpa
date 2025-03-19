'use client'

import { Sidebar } from '@/components/core/sidebar'

import { Navbar } from '@/components/Navbar'
import { AppChildren } from '@/types'

export default ({ children }: Readonly<AppChildren>) => {
  return (
    <main className="w-full h-full">
      <Navbar />

      <div className="w-full flex pt-[60px] overflow-y-auto items-start h-screen">
        <Sidebar />

        <div className="w-full h-full p-4">{children}</div>
      </div>
    </main>
  )
}
