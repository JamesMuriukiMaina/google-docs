import type { Doc } from "@/convex/_generated/dataModel";
import type { PaginationStatus } from "convex/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import DocumentRow from "./Document_row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export default function DocumetnsTable({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) {
  return (
    <>
      <div className={"max-w-screen-xl px-16 py-6 flex flex-col gap-5"}>
        {documents === undefined ? (
          <>
            <div className={"flex items-center justify-center h-24"}>
              <LoaderIcon
                className={"animate-spin text-muted-foreground size-5"}
              />
            </div>
          </>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className={"hover:bg-transparent border-none"}>
                  <TableHead>Name</TableHead>
                  <TableHead>&nbsp;</TableHead>
                  <TableHead className={"hidden md:table-cell"}>
                    Shared
                  </TableHead>
                  <TableHead className={"hidden md:table-cell"}>
                    CreatedAt
                  </TableHead>
                </TableRow>
              </TableHeader>
              {documents.length === 0 ? (
                <>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className={"h-24 text-center text-muted-foreground"}
                      >
                        No document found
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </>
              ) : (
                <>
                  <TableBody>
                    {documents.map((document) => (
                      <DocumentRow key={document._id} document={document} />
                    ))}
                  </TableBody>
                </>
              )}
            </Table>
          </>
        )}
        <div className={"flex items-center justify-center"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => loadMore(5)}
            disabled={status !== "CanLoadMore"}
          >
            {status === "CanLoadMore" ? "Load more" : "End of results"}
          </Button>
        </div>
      </div>
    </>
  );
}
