"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  return (
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
  );
};

export default Logo;
