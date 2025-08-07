import { getCurrentUser } from "@/src/server/session";
import { User } from "better-auth";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

export const requireUser = cache(async (): Promise<User> => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin?auth=required");
  }

  return user;
});
