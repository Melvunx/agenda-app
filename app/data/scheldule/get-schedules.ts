import { Schedule } from "@/generated/prisma";
import prisma from "@/src/lib/prisma";
import "server-only";
import { requireUser } from "../user/require-user";

export async function getSchedules(): Promise<Schedule[]> {
  await requireUser();

  const schedules = await prisma.schedule.findMany({
    include: {
      subjects: {
        orderBy: {
          hourStart: "asc",
        },
      },
      assignments: {
        orderBy: {
          hourStart: "asc",
        },
      },
      evenements: {
        orderBy: {
          hourStart: "asc",
        },
      },
    },
  });

  return schedules;
}
