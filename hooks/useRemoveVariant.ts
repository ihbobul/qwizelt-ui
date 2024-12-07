import { useMutation, useQueryClient } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

export const useRemoveVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variantId: number) => QuestionService.removeVariant(variantId),
    onMutate: async (variantId) => {
      // Cancel any ongoing queries for questions
      await queryClient.cancelQueries({ queryKey: ["questions"] });

      // Get the current cached questions
      const previousQuestions = queryClient.getQueryData<Question[]>([
        "questions",
      ]);

      // Optimistically update the cache by removing the variant
      queryClient.setQueryData<Question[]>(
        ["questions"],
        (oldQuestions) =>
          oldQuestions?.map((q) => ({
            ...q,
            variants: q.variants.filter((v) => v.id !== variantId),
          })) || [],
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
