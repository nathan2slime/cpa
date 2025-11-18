"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type AuthSchema, authSchema } from "@/schemas/auth";
import { sigInService } from "@/services/auth.services";
import { authState } from "@/store/auth.state";
import { Suspense } from "react";

const redirectByRole: Record<string, string> = {
  USER: "/",
  ADMIN: "/dashboard",
  MANAGER: "/dashboard",
};

export default () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

const Login = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callback = params.get("callback");
  const event = params.get("event");

  const form = useForm<AuthSchema>({
    mode: "all",
    resolver: yupResolver(authSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthSchema) => {
    const data = await sigInService(values);

    if (data) {
      authState.logged = true;
      authState.data = data;
      const roles = data.user.roles;

      let redirectUrl = callback || redirectByRole[roles[0]];

      if (event) {
        const url = new URL(redirectUrl, window.location.origin);
        url.searchParams.set("event", event);
        redirectUrl = url.toString();
      }

      router.push(redirectUrl);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6 md:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm"
        >
          <Card className="w-full shadow-md">
            <CardHeader className="space-y-1 sm:space-y-2">
              <CardTitle className="text-xl font-bold sm:text-2xl">
                Login
              </CardTitle>
              <CardDescription className="pb-1 text-sm sm:pb-2">
                Preencha com seus dados
              </CardDescription>
              <Separator />
            </CardHeader>
            <CardContent className="grid gap-3 pt-2 sm:gap-4 sm:pt-4">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Login
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1-4329043"
                        className="h-9 sm:h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="h-9 sm:h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end pb-4 pt-2 sm:pb-6 sm:pt-4">
              <Button
                type="submit"
                className="w-full max-w-[200px] font-bold tracking-wide sm:text-base"
              >
                Continuar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
