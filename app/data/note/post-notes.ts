"use server";

import prisma from "@/src/lib/prisma";
import { DataResponse } from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";
import { CreateNote, createNoteSchema } from "./schema/note";

export async function createNote(data: CreateNote): Promise<DataResponse> {
  await requireUser();

  const note = createNoteSchema.safeParse(data);

  if (!note.success) {
    return {
      success: false,
      error: note.error.message,
      message: "Note invalide",
    };
  }

  await prisma.note.create({
    data: {
      ...note.data,
    },
  });

  revalidatePath("/dashboard/note");

  return {
    success: true,
    error: null,
    message: "Note créée avec succès",
  };
}
