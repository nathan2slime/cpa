import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { fonts } from "@/global/fonts";
import { AppChildren } from "@/types";

import { AuthProvider } from "@/components/providers/auth";
import { RootProvider } from "@/components/providers/root";
import { toaster } from "@/lib/toaster";

import "@/global/styles.scss";
import { QueryClientProviderRoot } from "@/components/providers/query-client";

export const metadata: Metadata = {
  title: "UniFacema SUAI",
};

const RootLayout = ({ children }: Readonly<AppChildren>) => {
  return (
    <html lang="pt-BR">
      <body className={fonts}>
        <RootProvider>
          <QueryClientProviderRoot>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProviderRoot>
        </RootProvider>
        <Toaster {...toaster} />
      </body>
    </html>
  );
};

export default RootLayout;
