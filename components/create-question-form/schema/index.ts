import { z } from "zod";

export const generateQuestionsSchema = z.object({
  prompt: z.string().optional(),
  numberOfQuestions: z
    .number()
    .min(1, "Number of questions must be at least 1"),
  type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  label: z.string().optional(),
});
