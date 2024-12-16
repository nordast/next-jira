import Link from "next/link";
import React from "react";
import { SettingsIcon, UsersIcon } from "lucide-react";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    href: "/",
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
  return (
    <ul className="flex flex-col">
      {routes.map(({ label, href, icon, activeIcon }) => {
        const isActive = false;
        // const isActive = window.location.pathname === href;
        const Icon = isActive ? activeIcon : icon;

        return (
          <li key={href}>
            <Link href={href}>
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
