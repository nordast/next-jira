"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  const { resolvedTheme } = useTheme();

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
              alt="Logo"
              height={56}
              width={152}
              priority={true}
              className="w-auto"
            />
          </Link>

          <div className="flex items-center gap-x-4">
            <ModeToggle />

            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              <Button variant="secondary">
                {isSignIn ? "Sign Up" : "Sign In"}
              </Button>
            </Link>
          </div>
        </nav>

        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
