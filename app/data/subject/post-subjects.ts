"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";
import { CreateSubject, createSubjectSchema } from "./schema/subject";

export async function createSubject(
  data: CreateSubject
): Promise<DataResponse> {
  try {
    await requireUser();

    const subject = createSubjectSchema.safeParse(data);

    if (!subject.success) {
      return {
        success: false,
        error: subject.error.message,
        message: "Erreur lors de la création du sujet",
      };
    }

    await prisma.subject.create({
      data: {
        ...subject.data,
      },
    });

    revalidatePath("/dashboard/subject");

    return {
      success: true,
      error: null,
      message: "Nouveau sujet créé avec succès",
    };
  } catch (error: unknown) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Erreur lors de la création du sujet",
    };
  }
}
