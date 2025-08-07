"use server";

import prisma from "@/src/lib/prisma";
import {
  DataResponse,
  validateArrayString,
  validateString,
} from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";

export async function deleteSubjects(
  subjectIds: string[]
): Promise<DataResponse> {
  try {
    await requireUser();

    const ids = validateArrayString.safeParse(subjectIds);

    if (!ids.success) {
      return {
        success: false,
        error: ids.error.message,
        message: "ID du cours invalide",
      };
    }

    if (ids.data.length === 0) {
      return {
        success: false,
        error: "No subject IDs provided",
        message: "Aucun ID de cours fourni",
      };
    }

    await prisma.subject.deleteMany({
      where: {
        id: {
          in: ids.data.map((id) => id.trim()),
        },
      },
    });

    revalidatePath("/dashboard/subject");

    return {
      success: true,
      error: null,
      message: "Cours supprimés avec succès",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la suppression des cours",
    };
  }
}

export async function deleteSubject(subjectId: string): Promise<DataResponse> {
  try {
    await requireUser();

    const id = validateString.safeParse(subjectId);

    if (!id.success) {
      return {
        success: false,
        error: id.error.message,
        message: "ID du cours invalide",
      };
    }

    await prisma.subject.delete({
      where: { id: id.data.trim() },
    });

    revalidatePath("/dashboard/subject");

    return {
      success: true,
      error: null,
      message: "Cours supprimé avec succès",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la suppression du cours",
    };
  }
}
