import { getCurrentUser } from "@/src/server/session";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

export const requireUser = cache(async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin");
  }

  return user;
});
