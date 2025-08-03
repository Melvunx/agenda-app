import { NoteType } from "@/generated/prisma";
import { z } from "better-auth";

export const createNoteSchema = z.object({
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
  tags: z.array(z.string()),
  favorite: z.boolean().default(false),
  subjectId: z.string().min(1, "Le cours est requis"),
});

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().min(1, "L'ID de la note est requis"),
});

export type CreateNote = z.infer<typeof createNoteSchema>;
export type UpdateNote = z.infer<typeof updateNoteSchema>;
