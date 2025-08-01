"use client";

import {
  Provider,
  SignInResponse,
  signInWithProvider,
} from "@/src/lib/auth-client";
import { useRouter } from "next/router";
import { FC } from "react";
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
  signInWithProvider: (provider: Provider) => Promise<SignInResponse>;
};

const ProviderButton: FC<ProviderButtonProps> = ({
  provider,
  signInWithProvider,
}) => {
  return (
    <Button type="button" onClick={() => signInWithProvider(provider)}>
      {provider}
    </Button>
  );
};

export function FormSignin() {
  const router = useRouter();

  const providers: Provider[] = ["google", "github"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup Agenda Manager</CardTitle>
      </CardHeader>
      <CardContent>
        {providers.map((provider, idx) => (
          <ProviderButton
            key={idx}
            provider={provider}
            signInWithProvider={() => signInWithProvider(provider)}
          />
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
