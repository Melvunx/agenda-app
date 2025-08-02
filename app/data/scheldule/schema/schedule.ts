import { CourseType, Weekday } from "@/generated/prisma";
import { z } from "better-auth";

export const CreateScheduleSchema = z.object({
  userId: z.string(),
  weekday: Weekday,
  hourStart: z.date(),
  hourEnd: z.date(),
  validityStartTime: z.date(),
  validityEndTime: z.date(),
  courseType: CourseType,
  recurrence: z.boolean(),
});

