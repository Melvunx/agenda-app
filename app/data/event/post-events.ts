"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { requireUser } from "../user/require-user";
import { createEvenementSchema, CreateEvent } from "./schema/event";

export async function createEvents(data: CreateEvent): Promise<DataResponse> {
  try {
    await requireUser();

    const event = createEvenementSchema.safeParse(data);
    if (!event.success) {
      return {
        success: false,
        error: "Validation Error",
        message: event.error.message,
      };
    }

    await prisma.evenement.create({
      data: {
        ...event.data,
      },
    });

    return {
      success: true,
      error: null,
      message: "Événement créé avec succès",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la création de l'événement",
    };
  }
}
