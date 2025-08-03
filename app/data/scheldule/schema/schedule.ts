import { CourseType, Weekday } from "@/generated/prisma";
import { z } from "better-auth";

export const createScheduleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  userId: z.string(),
  weekday: z.enum(Weekday, {
    error: "Le jour de la semaine est requis",
  }),
  minHour: z
    .number()
    .int()
    .min(6, "L'heure de début doit être au minimum 6h")
    .max(19, "L'heure de début doit être au maximum 19h"),
  maxEnd: z
    .number()
    .int()
    .min(7, "L'heure de fin doit être au minimum 7h")
    .max(20, "L'heure de fin doit être au maximum 20h"),
  courseType: z.enum(CourseType, {
    error: "Le type de cours est requis",
  }),
  recurrence: z.boolean(),
  subjectIds: z.array(z.string()).optional(),
  assignmentIds: z.array(z.string()).optional(),
  eventIds: z.array(z.string()).optional(),
});
