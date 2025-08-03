"use server";

import prisma from "@/src/lib/prisma";
import {
  DataResponse,
  validateArrayString,
  validateString,
} from "@/src/lib/utils";
import { revalidatePath } from "next/cache";
import { requireUser } from "../user/require-user";

export async function deleteNotes(noteIds: string[]): Promise<DataResponse> {
  await requireUser();

  const ids = validateArrayString.safeParse(noteIds);

  if (!ids.success) {
    return {
      success: false,
      error: ids.error.message,
      message: "Identifiants de notes invalides",
    };
  }

  await prisma.note.deleteMany({
    where: {
      id: {
        in: ids.data.map((id) => id.trim()),
      },
    },
  });

  revalidatePath("/dashboard/note");

  return {
    success: true,
    error: null,
    message: "Notes supprimées avec succès",
  };
}

export async function deleteNote(noteId: string): Promise<DataResponse> {
  await requireUser();

  const id = validateString.safeParse(noteId);

  if (!id.success) {
    return {
      success: false,
      error: id.error.message,
      message: "Identifiant de note invalide",
    };
  }

  await prisma.note.delete({
    where: { id: id.data.trim() },
  });

  revalidatePath("/dashboard/note");

  return {
    success: true,
    error: null,
    message: "Note supprimée avec succès",
  };
}
