"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

import { authService } from "@/services/auth.services";
import { authState } from "@/store/auth.state";
import { AppChildren } from "@/types";

export const AuthProvider = ({ children }: AppChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const { logged, loading, data } = useSnapshot(authState);

  useEffect(() => {
    onLoadAuth();
  }, []);

  useEffect(() => {
    const isAnswer = pathname.includes("answer");

    if (logged && pathname.includes("/signing")) return router.push("/");

    if (loading || logged) return;

    if (pathname.includes("/signing")) return;

    if (isAnswer) {
      router.push(`/auth/signing?callback=${pathname}`);
      return;
    }
    router.push("/auth/signing");
  }, [loading]);

  const onLoadAuth = async () => {
    const res = await authService();

    authState.data = res || null;
    authState.logged = !!res;
    authState.loading = false;
  };

  return <>{loading ? <div /> : children}</>;
};
