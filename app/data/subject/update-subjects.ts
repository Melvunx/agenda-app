"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";
import { createSubjectSchema, UpdateSubject } from "./schema/subject";

export async function updateSubject(
  data: UpdateSubject
): Promise<DataResponse> {
  try {
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
  } catch (error: unknown) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la mise à jour du cours",
    };
  }
}
