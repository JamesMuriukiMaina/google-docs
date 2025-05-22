import RenameDialog from "@/components/EditDialog";
import RemoveDialog from "@/components/RemoveDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Id } from "@/convex/_generated/dataModel";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";

interface DropdownMenuButtonProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

export default function DropdownMenuButton({
  documentId,
  title,
  onNewTab,
}: DropdownMenuButtonProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className={"rounded-full"} size={"icon"}>
            <MoreVertical className={"size=4"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onNewTab(documentId)}>
            <ExternalLinkIcon className={"size-4 mr-2"} />
            Open in new tab
          </DropdownMenuItem>
          <RenameDialog documentId={documentId} initialTitle={title}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              <FilePenIcon className={"size-4 mr-2"} />
              Edit
            </DropdownMenuItem>
          </RenameDialog>
          <RemoveDialog documentId={documentId}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              <TrashIcon className={"size-4 mr-2"} />
              Remove
            </DropdownMenuItem>
          </RemoveDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
