'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AuthSchema, authSchema } from '@/schemas/auth'
import { sigInService } from '@/services/auth.services'
import { authState } from '@/store/auth.state'

const redirectByRole: Record<string, string> = {
  USER: '/',
  ADMIN: '/dashboard',
  MANAGER: '/dashboard'
}

export default () => {
  const router = useRouter()
  const params = useSearchParams()
  const callback = params.get('callback')
  const event = params.get('event')

  const form = useForm<AuthSchema>({
    mode: 'all',
    resolver: yupResolver(authSchema)
  })

  const onSubmit = async (values: AuthSchema) => {
    const data = await sigInService(values)

    if (data) {
      authState.logged = true
      authState.data = data
      const roles = data.user.roles

      let redirectUrl = callback || redirectByRole[roles[0]]

      if (event) {
        const url = new URL(redirectUrl, window.location.origin)
        url.searchParams.set('event', event)
        redirectUrl = url.toString()
      }

      router.push(redirectUrl)
    }
  }

  return (
    <div className="w-full h-full tracking-wide flex justify-center p-2 md:p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-center items-center">
          <Card className="w-full max-w-[380px]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription className="pb-2">Preencha com seus dados</CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="grid my-5 gap-2">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matricula</FormLabel>
                    <FormControl>
                      <Input placeholder="1-4329043" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full max-w-[200px] tracking-wide ml-auto font-bold">
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
