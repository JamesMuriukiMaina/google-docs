import type { Id } from "@/convex/_generated/dataModel";
import { auth } from "@clerk/nextjs/server";
import Document from "./documents";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

interface DocumentIdProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

export default async function DocumentId({ params }: DocumentIdProps) {
  const { documentId } = await params;

  const { getToken } = await auth();

  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.document.getById,
    {
      id: documentId,
    },
    { token }
  );

  return (
    <>
      <Document preloadedDocument={preloadedDocument} />
    </>
  );
}
