"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";
import { CreateSchedule, createScheduleSchema } from "./schema/schedule";

export async function createScheldule(
  data: CreateSchedule
): Promise<DataResponse> {
  try {
    await requireUser();

    const schedule = createScheduleSchema.safeParse(data);

    if (!schedule.success) {
      return {
        success: false,
        error: schedule.error.message,
        message: "Erreur lors de la création du créneau",
      };
    }

    await prisma.schedule.create({
      data: {
        ...schedule.data,
      },
    });

    revalidatePath("/dashboard/schedule");

    return {
      success: true,
      error: null,
      message: "Nouveau créneau créé avec succès",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la création du créneau",
    };
  }
}
