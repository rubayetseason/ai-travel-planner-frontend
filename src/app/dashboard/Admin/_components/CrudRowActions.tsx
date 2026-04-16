import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type CrudRowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  editLabel: string;
  deleteLabel: string;
};

const CrudRowActions = ({
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
}: CrudRowActionsProps) => {
  return (
    <div className="flex justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-sky-700 hover:bg-sky-100 hover:text-sky-800"
        onClick={onEdit}
        aria-label={editLabel}
      >
        <Pencil className="size-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-rose-700 hover:bg-rose-100 hover:text-rose-800"
        onClick={onDelete}
        aria-label={deleteLabel}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};

export default CrudRowActions;
