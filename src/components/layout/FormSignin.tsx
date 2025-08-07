"use client";

import { authClient, Provider } from "@/src/lib/auth-client";
import { FC } from "react";
import { toast } from "sonner";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ProviderButtonProps = {
  provider: Provider;
};

const ProviderButton: FC<ProviderButtonProps> = ({ provider }) => {
  const signWithProvider = async (provider: Provider) => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard?auth=success",
      });
    } catch (error) {
      const e = error as Error;
      console.error("Error during sign-in: ", e.message);
      toast.error(`Erreur lors de la connexion avec ${provider}`);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => signWithProvider(provider)}
    >
      {provider}
    </Button>
  );
};

export function FormSignin() {
  const providers: Provider[] = ["google", "github"];

  return (
    <Card className="w-full gap-8 max-w-sm mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle>Connectez vous à Agenda manager !</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4">
          {providers.map((provider, idx) => (
            <ProviderButton key={idx} provider={provider} />
          ))}
        </div>
      </CardContent>
      <CardFooter>Melvunx - Sorbonne Paris Web 2025</CardFooter>
    </Card>
  );
}
