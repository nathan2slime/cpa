"use client";

import { usePathname, useRouter } from "next/navigation";
import { authState } from "@/store/auth.state";
import { ReactNode, useEffect } from "react";
import { useSnapshot } from "valtio";

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: auth } = useSnapshot(authState);

  useEffect(() => {
    const allowedPaths = ["/auth/signing", "/answer"];

    const isAllowed = allowedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    if (auth?.user && !auth.user.roles.includes("ADMIN") && !isAllowed) {
      router.replace("/auth/signing");
    }
  }, [auth, pathname, router]);

  return <>{children}</>;
};
