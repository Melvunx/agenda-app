"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse, validateString } from "@/src/lib/utils";
import { requireUser } from "./require-user";

export async function updateUsername(data: {
  userId: string;
  name: string;
}): Promise<DataResponse> {
  try {
    const user = await requireUser();

    const id = validateString.safeParse(data.userId);

    const name = validateString.safeParse(data.name);
    if (!id.success || !name.success) {
      return {
        success: false,
        error: "Invalid input",
        message: "ID ou nom d'utilisateur invalide",
      };
    }

    if (user.id !== id.data) {
      return {
        success: false,
        error: "Unauthorized",
        message: "Vous n'êtes pas autorisé à modifier ce nom d'utilisateur",
      };
    }

    await prisma.user.update({
      where: { id: id.data },
      data: { name: name.data },
    });

    return {
      success: true,
      error: null,
      message: "Nom d'utilisateur mis à jour avec succès",
    };
  } catch (error: unknown) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la mise à jour du nom d'utilisateur",
    };
  }
}
