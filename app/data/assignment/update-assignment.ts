"use server";

import { DataResponse } from "@/src/lib/utils";
import { UpdateAssignment, updateAssignmentSchema } from "./schema/assign";
import { requireUser } from "../user/require-user";
import prisma from "@/src/lib/prisma";

export async function updateAssignement(data: UpdateAssignment): Promise<DataResponse> {
  try {
    await requireUser();

    const assignment = updateAssignmentSchema.safeParse(data);

    if (!assignment.success) {
      return {
        success: false,
        error: assignment.error.message,
        message: "Les données du devoir ne sont pas valides.",
      };
    }

    await prisma.assignment.update({
      where: { id: assignment.data.id },
      data: {
        ...assignment.data,
        files: assignment.data.files ? assignment.data.files : [],
      },
    });

    return {
      success: true,
      error: null,
      message: "Le devoir a été mis à jour avec succès.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      error: e.message,
      message: "Une erreur s'est produite lors de la mise à jour du devoir",
    };
  }
}