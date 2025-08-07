"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { requireUser } from "../user/require-user";
import { updateEvenementSchema, UpdateEvent } from "./schema/event";

export async function updateEvent(data: UpdateEvent): Promise<DataResponse> {
  try {
    await requireUser();

    const event = updateEvenementSchema.safeParse(data);
    if (!event.success) {
      return {
        success: false,
        error: "Validation Error",
        message: event.error.message,
      };
    }

    await prisma.evenement.update({
      where: { id: event.data.id },
      data: {
        ...event.data,
      },
    });

    return {
      success: true,
      error: null,
      message: "Événement mis à jour avec succès",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la mise à jour de l'événement",
    };
  }
}
