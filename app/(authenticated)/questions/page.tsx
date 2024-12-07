"use client";

import { useState } from "react";
import { IconCancel, IconFileExport } from "@tabler/icons-react";
import QuestionService from "@/api/question.service";
import { Button } from "@/components/ui/button";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import QuestionCard from "@/components/question-card/question-card";
import { EditIcon } from "lucide-react";

const QuestionPage: React.FC = () => {
  const { data, error, isLoading } = useGetQuestions();
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(
    new Set(),
  );
  const [isExporting, setIsExporting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state to manage edit mode

  const handleSelectQuestion = (id: number) => {
    setSelectedQuestions((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(id)) {
        updatedSelection.delete(id);
      } else {
        updatedSelection.add(id);
      }
      return updatedSelection;
    });
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const selectedIds = Array.from(selectedQuestions);

      // Call exportQuestions from QuestionService
      const blob = await QuestionService.exportQuestions(selectedIds);

      // Create a URL for the Blob and trigger a download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the download
      link.download = "questions.xlsx";
      link.click();

      // Clean up the temporary Blob URL
      window.URL.revokeObjectURL(url);

      // Reset the selection after successful export
      setSelectedQuestions(new Set());
    } catch (error) {
      console.error("Error exporting questions:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode); // Toggle edit mode
  };

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
    <div className="max-w-full mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Questions
      </h2>
      <p className="text-lg text-center text-gray-600 mb-8">
        Below are the questions you can review, edit, or regenerate. Select the
        questions you want to export and click &quot;Export Selected.&quot;
      </p>

      <div className="flex justify-between">
        <div className="text-center mb-4">
          <Button
            variant="outline"
            onClick={toggleEditMode}
            className={`flex items-center ${isEditMode ? "text-red-600 border-red-600 hover:text-red-600 hover:border-red-600" : "text-indigo-600 border-indigo-600/60 hover:text-indigo-600 hover:border-indigo-600"}`}
          >
            {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
            {isEditMode ? (
              <IconCancel className="ml-2 h-4 w-4" />
            ) : (
              <EditIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Export Selected Button (only visible if questions are selected) */}
        {selectedQuestions.size > 0 && (
          <div className="text-right mb-4">
            <Button
              variant="default" // Using a default variant for a filled button
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center ${isExporting ? "bg-green-300 text-gray-600" : "bg-green-600 text-white hover:bg-green-700"}`}
            >
              <IconFileExport className="mr-2 h-4 w-4" />
              {isExporting ? "Exporting..." : "Export Selected"}
            </Button>
          </div>
        )}
      </div>

      {/* Edit Mode Toggle Button */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isSelected={selectedQuestions.has(question.id)}
            onSelect={handleSelectQuestion}
            isEditMode={isEditMode} // Pass the edit mode state to QuestionCard
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
