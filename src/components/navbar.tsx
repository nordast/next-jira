"use client";

import { usePathname } from "next/navigation";
import React from "react";
import MobileSidebar from "@/components/mobile-sidebar";
import UserButton from "@/features/auth/components/user-button";

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all of your tasks",
  },
  projects: {
    title: "My Project",
    description: "View tasks of your project",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here ",
};

const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <MobileSidebar />
      <UserButton />
    </nav>
  );
};

export default Navbar;
