import React, { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface PromptCardProps {
  prompt: {
    id: number;
    prompt: string;
    type: string;
    difficulty: string;
  };
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // Function to truncate text for preview
  const getTruncatedText = (text: string, limit: number) =>
    text.length > limit ? `${text.slice(0, limit)}...` : text;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      {/* Truncated Prompt Text */}
      <p className="text-sm text-gray-700">
        {getTruncatedText(prompt.prompt, 100)}
      </p>

      {/* View More Button */}
      {prompt.prompt.length > 100 && (
        <Button
          variant="link"
          size="linkSm"
          className="text-indigo-600 text-xs font-semibold hover:underline"
          onClick={openDialog}
        >
          View More
        </Button>
      )}

      {/* Modal Popup */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Full Prompt</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-700">{prompt.prompt}</p>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptCard;
