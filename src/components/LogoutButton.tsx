"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const logout = await authClient.signOut();
    if (logout.data?.success) {
      router.push("/signin?auth=logout");
    } else {
      console.error("Logout failed:", logout.error?.message);
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <Button variant="outline" onClick={handleLogout}>
      Déconnexion
      <span className="sr-only">Déconnexion</span>
      <LogOut className="ml-2 h-4 w-4" />
    </Button>
  );
}
