import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/core/sidebar'

import { AppChildren } from '@/types'

export const AppLayout = ({ children }: AppChildren) => {
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
