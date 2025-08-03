"use server";

import prisma from "@/src/lib/prisma";
import {
  DataResponse,
  validateArrayString,
  validateString,
} from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";

export async function deleteSchedules(
  scheduleIds: string[]
): Promise<DataResponse> {
  await requireUser();

  const ids = validateArrayString.safeParse(scheduleIds);

  if (!ids.success) {
    return {
      success: false,
      error: ids.error.message,
      message: "Invalid schedule IDs",
    };
  }

  if (ids.data.length === 0) {
    return {
      success: false,
      error: "No schedule IDs provided",
      message: "Aucun ID de créneau fourni",
    };
  }

  await prisma.schedule.deleteMany({
    where: {
      id: {
        in: ids.data.map((id) => id.trim()),
      },
    },
  });

  revalidatePath("/dashboard/schedule");

  return {
    success: true,
    error: null,
    message: "Créneaux supprimés avec succès",
  };
}

export async function deleteSchedule(
  scheduleId: string
): Promise<DataResponse> {
  await requireUser();

  const id = validateString.safeParse(scheduleId);

  if (!id.success) {
    return {
      success: false,
      error: id.error.message,
      message: "ID invalide",
    };
  }

  await prisma.schedule.delete({
    where: {
      id: id.data,
    },
  });

  revalidatePath("/dashboard/schedule");

  return {
    success: true,
    error: null,
    message: "Créneau supprimé avec succès",
  };
}
