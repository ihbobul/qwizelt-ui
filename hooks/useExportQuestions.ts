import { useMutation } from "@tanstack/react-query";

import QuestionService from "@/api/question.service";

export const useExportQuestions = () =>
  useMutation({
    mutationFn: async (selectedQuestionIds: number[]) => {
      const response =
        await QuestionService.exportQuestions(selectedQuestionIds);

      // Ensure the response is treated as an Excel file Blob
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Generate a download URL
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element for download
      const link = document.createElement("a");
      link.href = url;

      // Set download filename (Excel format)
      link.download = "questions-export.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);
    },
  });
