import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const auth = urlParams.get("auth");

    if (auth === "success") {
      // Nettoyer l'URL
      toast.success("Vous êtes connecté avec succès");
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  return <div>Dashboard</div>;
}
