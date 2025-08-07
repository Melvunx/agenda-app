import { FormSignin } from "@/src/components/layout/FormSignin";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const auth = urlParams.get("auth");

    if (auth === "logout") {
      toast.success("Vous êtes déconnecté avec succès");
      // Nettoyer l'URL
      window.history.replaceState({}, "", "/signin");
    }
  }, []);

  return (
    <div>
      <FormSignin />
    </div>
  );
}
