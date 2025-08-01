import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession } = createAuthClient();

export type Provider = "google" | "github";

export type SignInResponse = {
  success: boolean;
  message: string;
};

export const signInWithProvider = async (
  provider: Provider
): Promise<SignInResponse> => {
  try {
    const data = await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
    });

    if (data.error) {
      return {
        success: false,
        message:
          data.error.message ||
          `An error occurred during sign-in with the provider ${provider}`,
      };
    }

    return {
      success: true,
      message: `Successfully signed in with ${provider}`,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An error occurred during sign-in",
    };
  }
};
