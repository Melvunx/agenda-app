"use client";

import { requireUser } from "@/app/data/user/require-user";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

type NavlinkProps = {
  href: string;
  label: string;
  children?: React.ReactNode;
};

function Navlink({ href, label, children }: NavlinkProps) {
  return (
    <Link href={href} className="text-white hover:underline">
      {label} {children}
    </Link>
  );
}

export async function Navbar() {
  const user = await requireUser();

  const navLinks: NavlinkProps[] = [
    {
      href: "/schedule",
      label: "Schedule",
      children: <span className="text-yellow-400">📅</span>,
    },
    {
      href: "/subjects",
      label: "Subjects",
      children: <span className="text-blue-400">📚</span>,
    },
    {
      href: "/notes",
      label: "Notes",
      children: <span className="text-green-400">📝</span>,
    },
    {
      href: "/averge-calculator",
      label: "Average Calculator",
      children: <span className="text-purple-400">📊</span>,
    },
    {
      href: "/settings",
      label: "Settings",
      children: <span className="text-gray-400">⚙️</span>,
    },
  ];

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1>Bienvenue {user.name} !</h1>
      <div className="flex space-x-4">
        {navLinks.map((link) => (
          <Navlink key={link.href} href={link.href} label={link.label}>
            {link.children}
          </Navlink>
        ))}
      </div>
      <LogoutButton />
    </nav>
  );
}
