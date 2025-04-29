"use client";

import { authState } from "@/store/auth.state";
import { redirect } from "next/navigation";
import { useSnapshot } from "valtio";

const Index = () => {
  const { logged, loading } = useSnapshot(authState);

  if (!loading && logged) {
    redirect("/dashboard");
  }

  return <div />;
};

export default Index;
