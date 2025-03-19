'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    path: string
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname()
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
        {links.map((link, index) => {
          const active = pathname.includes(link.path)
          const variant = active ? 'default' : 'ghost'

          return (
            <Link
              key={index}
              href={link.path}
              className={cn(
                buttonVariants({ variant, size: 'sm' }),
                pathname.includes(link.path) && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && <span className={cn('ml-auto', variant === 'default' && 'text-background dark:text-white')}>{link.label}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
