import { z } from "zod";

export const generateQuestionsSchema = z
  .object({
    prompt: z
      .string()
      .optional()
      .refine((val) => val?.trim() || !val, "Prompt cannot be empty."),
    numberOfQuestions: z
      .number()
      .min(1, "Number of questions must be at least 1")
      .max(20, "Number of questions must be at most 20"),
    type: z.enum([
      "MULTIPLE_CHOICE_QUESTION",
      "TRUE_OR_FALSE_QUESTION",
      "SHORT_ANSWER_QUESTION",
    ]),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    labels: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    ),
    file: z
      .instanceof(File)
      .optional()
      .refine(
        (file) =>
          !file ||
          [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
          ].includes(file.type),
        "File must be .txt, .docx, or .pdf.",
      )
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        "File size must not exceed 5MB.",
      ),
  })
  .refine((data) => data.prompt || data.file, {
    message: "Either a prompt or a file must be provided.",
    path: ["prompt"],
  })
  .refine(
    (data) => !(data.prompt && data.file),
    "Cannot provide both prompt and file.",
  );
