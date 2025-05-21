import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "@/convex/_generated/dataModel";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
interface DocumentRowProps {
  document: Doc<"documents">;
}

export default function DocumentRow({ document }: DocumentRowProps) {
  return (
    <>
      <TableRow className={"cursor-pointer"}>
        <TableCell className={"w-[50px]"}>
          <SiGoogledocs className={"size-6 fill-indigo-500"} />
        </TableCell>
        <TableCell className={"font-medium w-[45%]"}>
          {document.title}
        </TableCell>
        <TableCell
          className={"text-muted-foreground hidden md:flex items-center gap-2"}
        >
          {document.organizationId ? (
            <>
              <Building2Icon className={" size-4"} />
            </>
          ) : (
            <>
              <CircleUserIcon className={" size-4"} />
            </>
          )}{" "}
          {document.organizationId ? "Organization" : "Personal"}
        </TableCell>
        <TableCell className={"text-muted-foreground hidden md:table-cell"}>
          {format(new Date(document._creationTime), "MMM dd,yyyy")}
        </TableCell>
        <TableCell className={"flex justify-end"}>
          <Button variant={"ghost"} className={"rounded-full"} size={"icon"}>
            <MoreVertical className={"size=4"} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
