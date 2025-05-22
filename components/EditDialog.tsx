"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface RenameDialog {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

export default function RenameDialog({
  documentId,
  children,
  initialTitle,
}: RenameDialog) {
  const edit = useMutation(api.document.edit);
  const [isRenaming, setIsRenaming] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRenaming(true);

    edit({ id: documentId, title: title.trim() || "Untitled" })
      .catch(() => toast("something went wrong"))
      .finally(() => {
        setIsRenaming(false);
        setIsOpen(false);
      });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Rename document</DialogTitle>
              <DialogDescription>
                Enter a name for this document
              </DialogDescription>
            </DialogHeader>
            <div className={"my-4"}>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Document name"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant={"ghost"}
                disabled={isRenaming}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isRenaming}
                onClick={(e) => e.stopPropagation()}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
