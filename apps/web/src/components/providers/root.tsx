import { AppChildren } from '@/types'

export const RootProvider = ({ children }: Readonly<AppChildren>) => {
  return <div className="bg-background max-w-screen min-h-screen overflow-hidden">{children}</div>
}
