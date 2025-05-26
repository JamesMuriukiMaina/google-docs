import type { Editor } from "@tiptap/react";
import { ClientSideSuspense, useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";

interface ThreadsProps {
  editor: Editor | null;
}

export default function Threads({ editor }: ThreadsProps) {
  return (
    <>
      <ClientSideSuspense fallback={null}>
        <ThreadsList editor={editor} />
      </ClientSideSuspense>
    </>
  );
}

function ThreadsList({ editor }: ThreadsProps) {
  const { threads } = useThreads({ query: { resolved: false } });
  return (
    <>
      <div className={"anchored-threads"}>
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        threads={threads}
        editor={editor}
        className={"floating-threads"}
      />

      <FloatingComposer editor={editor} className={"floating-composer"} />
    </>
  );
}
