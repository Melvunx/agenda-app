"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse, validateArrayString } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";

export async function deleteAssignments(
  assignmentIds: string[]
): Promise<DataResponse> {
  try {
    await requireUser();

    const ids = validateArrayString.safeParse(assignmentIds);

    if (!ids.success) {
      return {
        success: false,
        error: ids.error.message,
        message: "L'un des identifiants de devoirs n'est pas valide.",
      };
    }

    if (ids.data.length === 0) {
      return {
        success: false,
        error: "Aucun identifiant de devoir fourni.",
        message: "Veuillez fournir au moins un identifiant de devoir.",
      };
    }

    await prisma.assignment.deleteMany({
      where: {
        id: {
          in: ids.data,
        },
      },
    });

    revalidatePath("/dashboard/assignment");

    return {
      success: true,
      error: null,
      message: "Les devoirs ont été supprimés avec succès.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      error: e.message,
      message: "Une erreur s'est produite lors de la suppression des devoirs",
    };
  }
}
