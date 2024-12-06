import { useEffect, useState } from "react";

import {
  CheckCircleIcon,
  Edit2Icon,
  Loader2,
  PlusIcon,
  RefreshCcwIcon,
  Trash2Icon,
} from "lucide-react";

import { Question } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { useAddVariant } from "@/hooks/useAddVariant";
import { useEditQuestion } from "@/hooks/useEditQuestion";
import { useEditVariant } from "@/hooks/useEditVariant";
import { useRegenerateQuestion } from "@/hooks/useRegenerateQuestions";
import { useRemoveQuestion } from "@/hooks/useRemoveQuestion";
import { useRemoveVariant } from "@/hooks/useRemoveVariant";

import { Button } from "../ui/button";
import VariantCreateDialog from "../variant-create-dialog/variant-create-dialog"; // Import the new create dialog
import VariantEditDialog from "../variant-edit-dialog/variant-edit-dialog";

const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-600 bg-green-100";
    case "medium":
      return "text-yellow-600 bg-yellow-100";
    case "hard":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const { question: questionText, prompt, variants, labels, id } = question;
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editedQuestionText, setEditedQuestionText] = useState(
    questionText || "",
  );
  const [newVariant, setNewVariant] = useState("");
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null);
  const [editingVariantText, setEditingVariantText] = useState<string>("");
  const [isCreatingVariant, setIsCreatingVariant] = useState(false); // To control the create variant dialog

  const regenerateMutation = useRegenerateQuestion();
  const editQuestionMutation = useEditQuestion();
  const addVariantMutation = useAddVariant();
  const editVariantMutation = useEditVariant();
  const removeVariantMutation = useRemoveVariant();
  const removeQuestionMutation = useRemoveQuestion();

  const isLoading =
    regenerateMutation.isPending &&
    regenerateMutation.variables?.questionId === id;

  // Effect to update editedQuestionText when questionText changes (e.g., after regeneration)
  useEffect(() => {
    setEditedQuestionText(questionText || ""); // Reset to the most recent question text
  }, [questionText]);

  const handleRegenerate = () => {
    regenerateMutation.mutate({ questionId: id, promptId: prompt.id });
  };

  const handleSaveQuestion = () => {
    editQuestionMutation.mutate({
      questionId: id,
      newQuestionText: editedQuestionText,
    });
    setIsEditingQuestion(false);
  };

  const handleAddVariant = (newText: string) => {
    if (newText.trim()) {
      addVariantMutation.mutate({ questionId: id, newVariantText: newText });
      setNewVariant("");
      setIsCreatingVariant(false); // Close the create variant dialog after saving
    }
  };

  const handleSaveVariant = (newText: string) => {
    if (newText.trim()) {
      editVariantMutation.mutate({
        variantId: editingVariantId!,
        newVariantText: newText,
      });
      setEditingVariantId(null);
      setEditingVariantText("");
    }
  };

  const handleCancelVariantEdit = () => {
    setEditingVariantId(null);
    setEditingVariantText("");
    setIsCreatingVariant(false); // reset the create variant state
  };

  const handleDeleteQuestion = () => {
    // Call the mutation to delete the question
    removeQuestionMutation.mutate(id);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 space-y-4 hover:shadow-xl transition-all ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {labels.map((label, index) => (
            <Badge key={index} className="text-sm" variant="outline">
              {label}
            </Badge>
          ))}
        </div>
        <span
          className={`text-sm font-semibold px-2 py-1 rounded ${getDifficultyColor(prompt.difficulty)}`}
        >
          {prompt.difficulty}
        </span>
      </div>

      <div>
        {isEditingQuestion ? (
          <>
            <input
              value={editedQuestionText}
              onChange={(e) => setEditedQuestionText(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <Button
              variant="outline"
              className="mt-2"
              onClick={handleSaveQuestion}
              disabled={editQuestionMutation.isPending}
            >
              <CheckCircleIcon className="mr-2 h-4 w-4" /> Save
            </Button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-800">
              {questionText}
            </h3>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setIsEditingQuestion(true)}
              disabled={editQuestionMutation.isPending}
            >
              <Edit2Icon className="mr-2 h-4 w-4" /> Edit
            </Button>
            <div className="flex items-center mt-4 space-x-4">
              {/* Delete Button */}
              <Button
                variant="outline"
                className="text-red-600"
                onClick={handleDeleteQuestion}
                disabled={removeQuestionMutation.isPending}
              >
                <Trash2Icon className="mr-2 h-4 w-4" /> Delete Question
              </Button>
            </div>
          </>
        )}
      </div>

      {variants.length > 0 && (
        <div className="space-y-3 mt-4">
          {variants
            .slice()
            .sort((a, b) =>
              a.variant ? a.variant.localeCompare(b.variant || "") : 0,
            )
            .map((variant) => (
              <div
                key={variant.id} // Ensure the key is the unique variant.id
                className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <div className="flex items-center space-x-2 w-full">
                  <span>{variant.variant}</span>
                  <div className="flex space-x-2">
                    {/* Edit Button */}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingVariantId(variant.id);
                        setEditingVariantText(variant.variant);
                      }}
                    >
                      <Edit2Icon className="h-5 w-5 text-blue-600" />
                    </Button>
                    {/* Trash Button */}
                    <Button
                      variant="ghost"
                      onClick={() => removeVariantMutation.mutate(variant.id)}
                    >
                      <Trash2Icon className="h-5 w-5 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="flex items-center mt-4">
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => setIsCreatingVariant(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add Variant
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full mt-4 flex items-center justify-center"
        onClick={handleRegenerate}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Regenerating...
          </>
        ) : (
          <>
            <RefreshCcwIcon className="mr-2 h-4 w-4" /> Regenerate
          </>
        )}
      </Button>

      {/* Edit Variant Dialog */}
      <VariantEditDialog
        isOpen={editingVariantId !== null}
        variantId={editingVariantId}
        variantText={editingVariantText}
        onSave={handleSaveVariant}
        onCancel={handleCancelVariantEdit}
        onChange={setEditingVariantText}
      />

      {/* Create Variant Dialog */}
      <VariantCreateDialog
        isOpen={isCreatingVariant}
        variantText={newVariant}
        onSave={handleAddVariant}
        onCancel={handleCancelVariantEdit}
        onChange={setNewVariant}
      />
    </div>
  );
};

export default QuestionCard;
