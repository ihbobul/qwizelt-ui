import { useMutation, useQueryClient } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

export const useEditQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      questionId,
      newQuestionText,
    }: {
      questionId: number;
      newQuestionText: string;
    }) => QuestionService.editQuestion(questionId, newQuestionText),
    onSuccess: (data, { questionId }) => {
      queryClient.setQueryData<Question[]>(["questions"], (oldQuestions) =>
        oldQuestions?.map((q) =>
          q.id === questionId ? { ...q, question: data.question } : q,
        ),
      );
    },
  });
};
