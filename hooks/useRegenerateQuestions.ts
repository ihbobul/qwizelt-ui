import { useMutation, useQueryClient } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

interface RegenerateQuestionParams {
  questionId: number;
  promptId: number;
}

export const useRegenerateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, promptId }: RegenerateQuestionParams) =>
      QuestionService.regenerateQuestion(questionId, promptId),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMutate: async ({ questionId }) => {
      // Optionally show loading state in your UI
      const previousQuestions = queryClient.getQueryData<Question[]>([
        "questions",
      ]);
      return { previousQuestions };
    },
    onSuccess: (data, { questionId }) => {
      // Update the question in the cache
      queryClient.setQueryData<Question[]>(["questions"], (oldQuestions) =>
        oldQuestions?.map((q) => (q.id === questionId ? { ...q, ...data } : q)),
      );
    },
    onError: (error, variables, context) => {
      // Rollback cache if needed
      if (context?.previousQuestions) {
        queryClient.setQueryData(["questions"], context.previousQuestions);
      }
    },
  });
};
