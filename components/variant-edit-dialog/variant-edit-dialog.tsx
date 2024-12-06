import { CheckCircleIcon, XIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

interface VariantEditDialogProps {
  isOpen: boolean;
  variantId: number | null;
  variantText: string;
  onSave: (newText: string) => void; // Expects a string (new variant text)
  onCancel: () => void;
  onChange: (newText: string) => void;
}

const VariantEditDialog: React.FC<VariantEditDialogProps> = ({
  isOpen,
  variantText,
  onSave,
  onCancel,
  onChange,
}) => (
  <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Variant</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <input
          value={variantText}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Edit variant text"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          <XIcon className="mr-2" />
          Cancel
        </Button>
        <Button
          onClick={() => onSave(variantText)} // Calls onSave with the updated variant text
          disabled={!variantText.trim()}
        >
          <CheckCircleIcon className="mr-2" />
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default VariantEditDialog;
