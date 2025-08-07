"use client";

import { requireUser } from "@/app/data/user/require-user";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  const user = await requireUser();

  return (
    <div>
      <h1>Bienvenue, {user.name}</h1>
      <LogoutButton />
    </div>
  );
}
