import { EventType } from "@/generated/prisma";
import { z } from "better-auth";

export const createEvenementSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  scheduleId: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().optional(),
  eventType: z.enum(EventType, {
    error: "Le type d'événement est requis",
  }),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Format de couleur invalide")
    .default("#129aa5"),
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
});
