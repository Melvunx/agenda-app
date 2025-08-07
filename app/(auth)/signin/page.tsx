"use client";

import { FormSignin } from "@/src/components/layout/FormSignin";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const auth = urlParams.get("auth");

    if (auth === "logout") {
      toast.success("Vous êtes déconnecté avec succès");
      window.history.replaceState({}, "", "/signin");
    } else if (auth === "required") {
      toast.error("Vous devez être connecté pour accéder à cette page");
      window.history.replaceState({}, "", "/signin");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <FormSignin />
    </div>
  );
}
