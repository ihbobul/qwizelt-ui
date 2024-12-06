import { useQuery } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";
import { Question } from "@/api/types";

export const useGetQuestions = () =>
  useQuery<Question[], Error>({
    queryKey: ["questions"], // Unique key for the query
    queryFn: () => QuestionService.getQuestions(), // Fetching the questions from the API
  });
