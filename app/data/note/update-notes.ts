"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";
import { UpdateNote, updateNoteSchema } from "./schema/note";

export async function updateNote(data: UpdateNote): Promise<DataResponse> {
  try {
    await requireUser();

    const note = updateNoteSchema.safeParse(data);

    if (!note.success) {
      return {
        success: false,
        error: note.error.message,
        message: "Note invalide",
      };
    }

    await prisma.note.update({
      where: { id: data.id },
      data: {
        ...note.data,
      },
    });

    revalidatePath("/dashboard/note");

    return {
      success: true,
      error: null,
      message: "Note mise à jour avec succès",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      error: e.message,
      message: "Une erreur s'est produite lors de la mise à jour de la note",
    };
  }
}
