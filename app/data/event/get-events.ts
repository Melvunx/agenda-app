import { Evenement } from "@/generated/prisma";
import prisma from "@/src/lib/prisma";
import "server-only";
import { requireUser } from "../user/require-user";

export async function getEvents(search?: string): Promise<Evenement[]> {
  await requireUser();

  if (search) {
    const events = await prisma.evenement.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return events;
  }

  const events = await prisma.evenement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return events;
}
