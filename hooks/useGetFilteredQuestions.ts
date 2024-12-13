import { useQuery } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";

export const useGetFilteredByLabelQuestions = (label: string) =>
  useQuery({
    queryKey: ["filteredQuestions", label],
    queryFn: async () => {
      const response = await QuestionService.getFilteredQuestions(label);
      return response.questions;
    },
    enabled: !!label, // Only run the query if a label is provided
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
