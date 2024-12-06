"use client";

import QuestionCard from "@/components/question-card/question-card";
import { useGetQuestions } from "@/hooks/useGetQuestions";

const QuestionPage: React.FC = () => {
  const { data, error, isLoading } = useGetQuestions();

  if (isLoading) {
    return <div className="text-center text-lg">Loading questions...</div>;
  }

  if (error instanceof Error) {
    return (
      <div className="text-center text-red-500">
        Error fetching questions: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Questions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data?.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
