import prisma from "@/src/lib/prisma";
import "server-only";
import { requireUser } from "../user/require-user";

export async function getSubjects(search?: string) {
  await requireUser();

  if (search) {
    const subjects = await prisma.subject.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return subjects;
  }

  const subjects = await prisma.subject.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return subjects;
}
