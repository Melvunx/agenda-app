import { NoteType } from "@/generated/prisma";
import { z } from "better-auth";

export const createSubjectNoteSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  chapter: z.string().nullable(),
  subjectDate: z.date({
    error: "La date du cours est requise",
  }),
  noteType: z.enum(NoteType, {
    error: "Le type de note est requis",
  }),
  files: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  favorite: z.boolean().default(false),
  subjectId: z.string().min(1, "Le cours est requis"),
});
