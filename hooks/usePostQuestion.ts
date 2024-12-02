import { useMutation } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";

interface GenerateQuestionsParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // FormData or JSON object
  isJson: boolean;
}

export const usePostQuestion = () =>
  useMutation({
    mutationFn: ({ data, isJson }: GenerateQuestionsParams) =>
      QuestionService.generateQuestions(data, isJson),
    onSuccess: () => {
      console.log("Successfully generated questions.");
    },
  });
