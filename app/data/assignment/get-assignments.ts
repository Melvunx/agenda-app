import { AssignmentType } from "@/generated/prisma";
import prisma from "@/src/lib/prisma";
import "server-only";
import { requireUser } from "../user/require-user";

export async function getAssignments(assignType?: AssignmentType) {
  await requireUser();

  if (assignType && Object.values(AssignmentType).includes(assignType)) {
    const assignments = await prisma.assignment.findMany({
      where: {
        assignmentType: {
          equals: assignType,
        },
      },
      orderBy: {
        dueDate: "desc",
      },
    });

    return assignments;
  }

  const assignments = await prisma.assignment.findMany({
    orderBy: {
      dueDate: "desc",
    },
  });
  
  return assignments;
}
