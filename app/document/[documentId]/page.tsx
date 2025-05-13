// eslint-disable no-unused-vars
import Editor from "./editor";
import Toolbar from "./Toolbar";

interface Id {
  params: Promise<{ documentId: string }>;
}

export default async function DocumentId({ params }: Id) {
  return (
    <div className={"min-h-screen bg-[#FAFBFD]"}>
      <Toolbar />
      <Editor />
    </div>
  );
}
