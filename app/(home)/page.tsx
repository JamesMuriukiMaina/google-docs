"use client";

import Navbar from "@/app/(home)/(components)/Navbar";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import TemplatesGallery from "./(components)/Templates";
import Link from "next/link";
import DocumentsTable from "./(components)/DocumentsTable";

export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.document.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <>
      <div className={"min-h-screen flex flex-col"}>
        <div className={"fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4"}>
          <Navbar />
        </div>
        <div className={"mt-16"}>
          <TemplatesGallery />
        </div>
        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
        <span>
          <Link href={"/document/132"}>click me</Link>
        </span>
      </div>
    </>
  );
}
