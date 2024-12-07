import { CheckCircleIcon, XIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";

interface VariantCreateDialogProps {
  isOpen: boolean;
  variantText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
  onChange: (newText: string) => void;
}

const VariantCreateDialog: React.FC<VariantCreateDialogProps> = ({
  isOpen,
  variantText,
  onSave,
  onCancel,
  onChange,
}) => (
  <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Variant</DialogTitle>
      </DialogHeader>
      <div className="space-y-2">
        <input
          value={variantText}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter variant text"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          <XIcon className="mr-2" />
          Cancel
        </Button>
        <Button
          onClick={() => onSave(variantText)}
          disabled={!variantText.trim()}
        >
          <CheckCircleIcon className="mr-2" />
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default VariantCreateDialog;
