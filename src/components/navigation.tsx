"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {routes.map(({ label, href, icon, activeIcon }) => {
        const fullHref = `/workspaces/${workspaceId}${href}`;
        const isActive = pathname === fullHref;

        const Icon = isActive ? activeIcon : icon;

        return (
          <li key={label}>
            <Link href={fullHref}>
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition-colors hover:text-primary",
                  isActive &&
                    "bg-white text-primary shadow-sm hover:opacity-100",
                )}
              >
                <Icon className="h-5 w-5 text-neutral-500" />
                <span className="ml-2">{label}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Navigation;
