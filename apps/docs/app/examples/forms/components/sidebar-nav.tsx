"use client";

import { type HTMLAttributes, type JSX } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@codefast/ui/utils";
import Link from "next/link";
import { buttonVariants } from "@codefast/ui/button";

interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={buttonVariants({
            variant: "ghost",
            className: [
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              "justify-start",
            ],
          })}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
