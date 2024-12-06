import { useMutation, useQueryClient } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

export const useEditVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      newVariantText,
    }: {
      variantId: number;
      newVariantText: string;
    }) => QuestionService.editVariant(variantId, newVariantText),
    onSuccess: (data, { variantId }) => {
      queryClient.setQueryData<Question[]>(["questions"], (oldQuestions) =>
        oldQuestions?.map((q) => ({
          ...q,
          variants: q.variants.map((v) =>
            v.id === variantId ? { ...v, variant: data.variant } : v,
          ),
        })),
      );
    },
  });
};
