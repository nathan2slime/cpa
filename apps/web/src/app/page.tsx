"use client";

import { authState } from "@/store/auth.state";
import { redirect } from "next/navigation";
import { useSnapshot } from "valtio";

const Index = () => {
  const { logged, loading, data } = useSnapshot(authState);

  if (!loading && logged && data?.user.roles.includes("admin")) {
    redirect("/dashboard");
  }

  return <div />;
};

export default Index;
