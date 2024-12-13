"use client";

import { useEffect, useState } from "react";

import { EditIcon, SearchIcon } from "lucide-react";

import { IconCancel, IconFileExport } from "@tabler/icons-react";

import QuestionService from "@/api/question.service";
import Pagination from "@/components/pagination/pagination";
import QuestionCard from "@/components/question-card/question-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetQuestions } from "@/hooks/useGetQuestions";

const QuestionPage: React.FC = () => {
  const { data, error, isLoading } = useGetQuestions();
  const [selectedQuestions, setSelectedQuestions] = useState<
    Record<number, Set<number>>
  >({});
  const [isExporting, setIsExporting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(5);
  const [filteredQuestions, setFilteredQuestions] = useState(data || []);
  const [searchLabel, setSearchLabel] = useState("");
  const [noResults, setNoResults] = useState(false);

  // This effect will filter questions based on initial search condition
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line no-use-before-define
      handleSearch(); // Apply search when component mounts
    }
  }, [data]);

  const handleSelectQuestion = (id: number, page: number) => {
    setSelectedQuestions((prev) => {
      const updatedPageSet = new Set<number>(prev[page] || []);
      if (updatedPageSet.has(id)) {
        updatedPageSet.delete(id);
      } else {
        updatedPageSet.add(id);
      }
      return { ...prev, [page]: updatedPageSet };
    });
  };

  const handleSelectAll = (page: number, currentQuestions: number[]) => {
    setSelectedQuestions((prev) => {
      const isPageFullySelected =
        (prev[page]?.size || 0) === currentQuestions.length;
      const updatedPageSet = isPageFullySelected
        ? new Set<number>() // Deselect all
        : new Set<number>(currentQuestions); // Select all

      return { ...prev, [page]: updatedPageSet };
    });
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const selectedIds = Object.values(selectedQuestions).flatMap((set) =>
        Array.from(set),
      );

      const blob = await QuestionService.exportQuestions(selectedIds);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "questions.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);

      setSelectedQuestions({});
      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.error("Error exporting questions:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleQuestionsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setQuestionsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (!searchLabel.trim()) {
      setFilteredQuestions(data || []);
      setNoResults(false);
      return;
    }

    const filtered = data?.filter((question) =>
      question.labels.some((label) =>
        label.toLowerCase().includes(searchLabel.toLowerCase()),
      ),
    );

    setFilteredQuestions(filtered || []);
    setNoResults(filtered?.length === 0);
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

  const totalQuestions = filteredQuestions?.length || 0;
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  const paginatedQuestions = filteredQuestions?.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage,
  );

  const areAllSelectedOnPage =
    paginatedQuestions &&
    selectedQuestions[currentPage]?.size === paginatedQuestions.length;

  return (
    <div className="max-w-full mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Questions
      </h2>
      <p className="text-lg text-center text-gray-600 mb-8">
        Below are the questions you can review, edit, or regenerate. Select the
        questions you want to export and click &quot;Export Selected.&quot;
      </p>

      <div className="mb-6 flex items-center justify-center">
        <Input
          type="text"
          placeholder="Enter label..."
          value={searchLabel}
          onChange={(e) => setSearchLabel(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border rounded-l"
        />
        <SearchIcon
          onClick={handleSearch}
          className="h-5 w-5 ml-4 text-gray-600 cursor-pointer"
        />
      </div>

      {noResults && (
        <div className="text-center text-red-500 mb-4">
          No questions found matching the label &quot;{searchLabel}&quot;
        </div>
      )}

      {/* Render only if there are questions */}
      {totalQuestions > 0 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={areAllSelectedOnPage}
                onChange={() =>
                  handleSelectAll(
                    currentPage,
                    paginatedQuestions?.map((q) => q.id) || [],
                  )
                }
                className="mr-2"
              />
              <span className="text-gray-700">Select All on Page</span>
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="questionsPerPage" className="text-gray-700">
                Show per page:
              </label>
              <select
                id="questionsPerPage"
                value={questionsPerPage}
                onChange={handleQuestionsPerPageChange}
                className="border-gray-300 rounded px-2 py-1"
              >
                {[5, 10, 20].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>

              <Button
                variant="outline"
                onClick={toggleEditMode}
                className={`flex items-center ${
                  isEditMode
                    ? "text-red-600 border-red-600 hover:text-red-600 hover:border-red-600"
                    : "text-indigo-600 border-indigo-600/60 hover:text-indigo-600 hover:border-indigo-600"
                }`}
              >
                {isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
                {isEditMode ? (
                  <IconCancel className="ml-2 h-4 w-4" />
                ) : (
                  <EditIcon className="ml-2 h-4 w-4" />
                )}
              </Button>

              {Object.values(selectedQuestions).flat().length > 0 && (
                <Button
                  variant="default"
                  onClick={handleExport}
                  disabled={isExporting}
                  className={`flex items-center ${
                    isExporting
                      ? "bg-green-300 text-gray-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <IconFileExport className="mr-2 h-4 w-4" />
                  {isExporting ? "Exporting..." : "Export Selected"}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedQuestions?.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                isSelected={
                  selectedQuestions[currentPage]?.has(question.id) || false
                }
                onSelect={() => handleSelectQuestion(question.id, currentPage)}
                isEditMode={isEditMode}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default QuestionPage;
