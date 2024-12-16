"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrent } from "@/features/auth/api/use-current";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div>
      <div className="">Only for authorized users</div>
    </div>
  );
}
