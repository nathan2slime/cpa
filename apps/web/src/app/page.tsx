"use client";

import { authState } from "@/store/auth.state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSnapshot } from "valtio";

const Index = () => {
  const { logged, loading, data } = useSnapshot(authState);
  const router = useRouter();

  useEffect(() => {
    if (!loading && logged && data?.user.roles.includes("ADMIN")) {
      router.replace("/dashboard");
    }
  }, [loading, logged, data, router]);

  return <div />;
};

export default Index;
