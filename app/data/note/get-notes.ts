import prisma from "@/src/lib/prisma";
import "server-only";
import { requireUser } from "../user/require-user";

export async function getNotes(tag?: string) {
  await requireUser();

  if (tag) {
    const notes = await prisma.note.findMany({
      where: {
        tags: {
          hasSome: [tag],
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return notes;
  }

  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return notes;
}
