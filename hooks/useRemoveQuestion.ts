import { useMutation, useQueryClient } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

export const useRemoveQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: number) =>
      QuestionService.removeQuestion(questionId),
    onMutate: async (questionId) => {
      // Cancel any ongoing queries for questions
      await queryClient.cancelQueries({ queryKey: ["questions"] });

      // Get the current cached questions
      const previousQuestions = queryClient.getQueryData<Question[]>([
        "questions",
      ]);

      // Optimistically update the cache by removing the question
      queryClient.setQueryData<Question[]>(
        ["questions"],
        (oldQuestions) =>
          oldQuestions?.filter((q) => q.id !== questionId) || [],
      );

      // Return the previous state to roll back if the mutation fails
      return { previousQuestions };
    },
    onError: (err, _, context) => {
      // If there's an error, revert to the previous state
      queryClient.setQueryData(["questions"], context?.previousQuestions);
    },
    onSettled: () => {
      // Invalidate the queries to ensure fresh data after mutation
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
};
