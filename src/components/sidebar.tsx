import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navigation from "@/components/navigation";
import { Separator } from "@/components/ui/separator";
import WorkspaceSwitcher from "@/components/workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={56}
          width={152}
          priority={true}
          className="w-auto"
        />
      </Link>

      <Separator className="my-4" />

      <WorkspaceSwitcher />

      <Separator className="my-4" />

      <Navigation />
    </aside>
  );
};

export default Sidebar;
