'use client'
import { BookKey, FileType, LayoutDashboard, Star, Settings } from 'lucide-react'

import { Nav } from '@/components/core/nav'

export const Sidebar = () => {
  return (
    <aside className="w-full max-w-[200px] h-[calc(100vh-60px)] px-2 border-r border-border py-2 sticky top-1">
      <Nav
        isCollapsed={false}
        links={[
          {
            title: 'Visão geral',
            icon: LayoutDashboard,
            path: '/dashboard'
          },
          {
            title: 'Formulários',
            icon: FileType,
            path: '/forms'
          },
          {
            title: 'Eventos',
            icon: Star,
            path: '/events'
          },
          {
            title: 'Relatórios',
            icon: BookKey,
            path: '/reports'
          },
          {
            title: 'Configurações',
            icon: Settings,
            path: '/configs'
          }
        ]}
      />
    </aside>
  )
}
