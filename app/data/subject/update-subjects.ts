"use server";

import prisma from "@/src/lib/prisma";
import { requireUser } from "../user/require-user";
import { createSubjectSchema, UpdateSubject } from "./schema/subject";
import { revalidatePath } from "next/cache";
import { DataResponse } from "@/src/lib/utils";

export async function updateSubject(data: UpdateSubject): Promise<DataResponse> {
  await requireUser();

  const subject = createSubjectSchema.safeParse(data);

  if (!subject.success) {
    return {
      success: false,
      error: subject.error.message,
      message: "Erreur lors de la mise à jour du cours",
    };
  }

  await prisma.subject.update({
    where: { id: data.id },
    data: {
      ...subject.data,
    },
  });

  revalidatePath("/dashboard/subject");

  return {
    success: true,
    error: null,
    message: "Cours mis à jour avec succès",
  };
}