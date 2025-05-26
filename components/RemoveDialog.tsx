"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RemoveDialog {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

export default function RemoveDialog({ documentId, children }: RemoveDialog) {
  const router = useRouter();
  const remove = useMutation(api.document.remove);
  const [isRemoving, setIsRemoving] = useState(false);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete your document
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={(e) => e.stopPropagation()}
              disabled={isRemoving}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isRemoving}
              onClick={(e) => {
                e.stopPropagation();
                setIsRemoving(true);
                remove({ id: documentId })
                  .then(() => {
                    toast.success("Document successfully deleted");
                    router.push("/");
                  })
                  .catch(() => toast.error("Something went wrong"))
                  .finally(() => {
                    setIsRemoving(false);
                  });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
