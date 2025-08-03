import prisma from "@/src/lib/prisma";
import { DataRespoonse } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";
import { createScheduleSchema, UpdateSchedule } from "./schema/schedule";

export async function updateSchedule(
  data: UpdateSchedule
): Promise<DataRespoonse> {
  await requireUser();

  const schedule = createScheduleSchema.safeParse(data);

  if (!schedule.success) {
    return {
      success: false,
      error: schedule.error.message,
      message: "Erreur lors de la mise à jour du créneau",
    };
  }

  await prisma.schedule.update({
    where: { id: data.id },
    data: {
      ...schedule.data,
    },
  });

  revalidatePath("/dashboard/schedule");

  return {
    success: true,
    error: null,
    message: "Créneau mis à jour avec succès",
  };
}
