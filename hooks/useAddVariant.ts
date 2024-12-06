import { useMutation, useQueryClient } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

export const useAddVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      newVariantText,
    }: {
      questionId: number;
      newVariantText: string;
    }) => QuestionService.addVariant(questionId, newVariantText),
    onSuccess: (data, { questionId }) => {
      queryClient.setQueryData<Question[]>(["questions"], (oldQuestions) =>
        oldQuestions?.map((q) =>
          q.id === questionId
            ? {
                ...q,
                variants: [
                  ...q.variants,
                  { id: data.id, variant: data.variant },
                ],
              }
            : q,
        ),
      );
    },
  });
};
