// eslint-disable no-unused-vars
"use client";
import Editor from "./editor";
import Navbar from "../_(components)/Navbar";
import Toolbar from "../_(components)/Toolbar";
import { Room } from "./Room";
import { usePreloadedQuery, type Preloaded } from "convex/react";
import type { api } from "@/convex/_generated/api";

interface Id {
  preloadedDocument: Preloaded<typeof api.document.getById>;
}

export default function Document({ preloadedDocument }: Id) {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className={"min-h-screen bg-[#FAFBFD]"}>
        <div
          className={
            "flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 z-10 bg-[#FAFBFD] print:hidden w-full"
          }
        >
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className={"pt-[114px] print:pt-0"}>
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
}
