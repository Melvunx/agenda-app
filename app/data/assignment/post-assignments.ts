"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { requireUser } from "../user/require-user";
import { CreateAssignment, createAssignmentSchema } from "./schema/assign";

export async function createAssignment(
  data: CreateAssignment
): Promise<DataResponse> {
  try {
    await requireUser();

    const assignment = createAssignmentSchema.safeParse(data);

    if (!assignment.success) {
      return {
        success: false,
        error: assignment.error.message,
        message: "Les données du devoir ne sont pas valides.",
      };
    }

    await prisma.assignment.create({
      data: {
        ...assignment.data,
        files: assignment.data.files ? assignment.data.files : [],
      },
    });

    return {
      success: true,
      error: null,
      message: "Le devoir a été créé avec succès.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      error: e.message,
      message: "Une erreur s'est produite lors de la création du devoir",
    };
  }
}
