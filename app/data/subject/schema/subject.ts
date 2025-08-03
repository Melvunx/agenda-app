import { Semester } from "@/generated/prisma";
import { z } from "better-auth";

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().nullable(),
  code: z.string().min(1, "Le code est requis"),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Format de couleur invalide")
    .default("#3498db"),
  teacher: z.string().nullable(),
  room: z.string().nullable(),
  semester: z.enum(Semester, {
    error: "Le semestre est requis",
  }),
  schoolYear: z
    .string()
    .min(1, "L'année scolaire est requise")
    .default("2025-2026"),
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
  scheduleId: z.string().nullable(),
  notesIds: z.array(z.string()).optional(),
  assignmentIds: z.array(z.string()).optional(),
});

export const updateSubjectSchema = createSubjectSchema.extend({
  id: z.string().min(1, "L'ID de la matière est requis"),
});

export type CreateSubject = z.infer<typeof createSubjectSchema>;
export type UpdateSubject = z.infer<typeof updateSubjectSchema>;
