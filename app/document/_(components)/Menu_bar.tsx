"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/useEditorStore";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  Printer,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";

export default function MenuBar() {
  const { editor } = useEditorStore();
  /* Activate the comment below after re-installing the table extension */
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    // editor?.chain().focus().insertTable({ rows, cols  withHeaders:false}).run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const onSaveJson = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, "document.json"); // TODO: Use document name;
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, "document.html"); // TODO: Use document name;
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, "document.txt"); // TODO: Use document name;
  };

  return (
    <>
      <div className={"flex"}>
        <Menubar
          className={"border-none bg-transparent shadow-none h-auto p-0"}
        >
          <MenubarMenu>
            <MenubarTrigger
              className={
                "text-sm font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              }
            >
              File
            </MenubarTrigger>
            <MenubarContent className=" print:hidden">
              <MenubarSub>
                <MenubarSubTrigger
                  className={
                    "flex items-center hover:bg-neutral-200 cursor-pointer p-2 hover:text-gray-900"
                  }
                >
                  <FileIcon className={" inline size-4 mr-2"} />
                  <span>Save</span>
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem onClick={onSaveJson}>
                    <FileJsonIcon className={"size-4 mr-2 inline"} />
                    <span>JSON</span>
                  </MenubarItem>
                  <MenubarItem onClick={onSaveHTML}>
                    <GlobeIcon className={"size-4 mr-2 inline"} />
                    <span>HTML</span>
                  </MenubarItem>
                  <MenubarItem onClick={() => window.print()}>
                    <BsFilePdf className={"size-4 mr-2 inline"} />
                    <span>PDF</span>
                  </MenubarItem>
                  <MenubarItem onClick={onSaveText}>
                    <FileTextIcon className={"size-4 mr-2 inline"} />
                    <span>Text</span>
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                <FilePlusIcon className={"size-4 inline mr-2"} />
                New Document
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <FilePenIcon className={"size-4 inline mr-2"} />
                Rename
              </MenubarItem>
              <MenubarItem>
                <TrashIcon className={"size-4 inline mr-2"} />
                Remove
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => window.print()}>
                <Printer className={"size-4 mr-2 inline"} />
                Print
                {/* TODO: Add the shortcuts using the MenubarShortcut component */}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={
                "text-sm font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              }
            >
              Edit
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                <Undo2Icon className={"size-4 mr-2 inline"} />
                Undo
                {/* TODO: Add the shortcuts using the MenubarShortcut component */}
              </MenubarItem>
              <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                <Redo2Icon className={"size-4 mr-2 inline"} />
                Redo
                {/* TODO: Add the shortcuts using the MenubarShortcut component */}
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={
                "text-sm font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              }
            >
              Insert
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>Table</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 1, cols: 1 })}
                  >
                    1 * 1
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 2, cols: 2 })}
                  >
                    2 * 2
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 3, cols: 3 })}
                  >
                    3 * 3
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => insertTable({ rows: 4, cols: 4 })}
                  >
                    4 * 4
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={
                "text-sm font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
              }
            >
              Format
            </MenubarTrigger>
            <MenubarContent>
              <MenubarSub>
                <MenubarSubTrigger>
                  <TextIcon className={" size-4 mr-2 inline"} />
                  Text
                  {/* TODO: Add the shortcuts using the MenubarShortcut component */}
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                  >
                    <BoldIcon className={"size-4 mr-2 inline"} />
                    Bold
                    {/* TODO: Add the shortcuts using the MenubarShortcut component */}
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                  >
                    <ItalicIcon className={"size-4 mr-2 inline"} />
                    Italic
                    {/* TODO: Add the shortcuts using the MenubarShortcut component */}
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => {
                      /* Activate the below comment after re-installing the underline extension */
                      // editor?.chain().focus().toggleUnderline().run();
                    }}
                  >
                    <UnderlineIcon className={"size-4 mr-2 inline"} />
                    Underline
                    {/* TODO: Add the shortcuts using the MenubarShortcut component */}
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                  >
                    <StrikethroughIcon className={"size-4 mr-2 inline"} />
                    Strikethrough
                    {/* TODO: Add the shortcuts using the MenubarShortcut component */}
                  </MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem
                onClick={() => editor?.chain().focus().unsetAllMarks().run()}
              >
                <RemoveFormattingIcon className={"size-4 mr-2 inline"} />
                Clear formatting
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
