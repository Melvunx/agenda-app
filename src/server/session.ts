"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";

export type SessionResponse = {
  authenticated: boolean;
  user: Record<string, unknown> | null;
  sessionId: string | null;
  message: string;
};

export async function getUserSession(): Promise<SessionResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user && session.session?.id) {
      return {
        authenticated: true,
        user: session.user,
        sessionId: session.session.id,
        message: "User authenticated successfully",
      };
    }

    // Session invalide ou utilisateur non trouvé
    return {
      authenticated: false,
      user: null,
      sessionId: null,
      message: "No active session found",
    };
  } catch (error) {
    const e = error as Error;

    return {
      authenticated: false,
      user: null,
      sessionId: null,
      message: e.message || "An error occurred while fetching the session",
    };
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getUserSession();
  return session.authenticated;
}

export async function getCurrentUser() {
  const session = await getUserSession();
  return session.authenticated ? session.user : null;
}
