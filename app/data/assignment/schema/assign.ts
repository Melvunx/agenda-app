import { AssignmentType, Priority, Status } from "@/generated/prisma";
import { z } from "better-auth";

export const createAssignmentSchema = z.object({
  description: z.string().min(1, "La description est requise"),
  dueDate: z.date({
    error: "La date d'échéance est requise",
  }),
  limitDate: z.date({
    error: "La date limite est requise",
  }),
  assignmentType: z.enum(AssignmentType, {
    error: "Le type de devoir est requis",
  }),
  status: z.enum(Status, {
    error: "Le statut est requis",
  }),
  priority: z.enum(Priority, {
    error: "La priorité est requise",
  }),
  files: z.array(z.string()).nullable(),
  hourStart: z
    .number()
    .int()
    .min(6, "L'heure de début doit être au minimum 6h")
    .max(19, "L'heure de début doit être au maximum 19h")
    .nullable(),
  hourEnd: z
    .number()
    .int()
    .min(7, "L'heure de fin doit être au minimum 7h")
    .max(20, "L'heure de fin doit être au maximum 20h")
    .nullable(),
  subjectId: z.string().min(1, "Le cours est requis"),
  scheduleId: z.string().nullable(),
});
