"use client";
import FontFamily from "@/custom plugins/Font-family";
import Headings from "@/custom plugins/Heading-level";
import HightlightColor from "@/custom plugins/Hightlight-color";
import Link from "@/custom plugins/Link";
import Colors from "@/custom plugins/Text-color";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  type LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import ImageUpload from "@/custom plugins/Image";
import Align from "@/custom plugins/Align";
import List from "@/custom plugins/List";
import FontSize from "@/custom plugins/Font-size";
import LineHeight from "@/custom plugins/Line-height";

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center text-sm h-7 min-w-7 rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80 font-bold"
      )}
    >
      <Icon className={"size-4"} />
    </button>
  );
};

type SectionsProps = {
  isActive?: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}[][];

export default function Toolbar() {
  const { editor } = useEditorStore();

  const sections: SectionsProps = [
    [
      {
        label: "undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "spell-check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "comment",
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMarks"),
      },
      {
        label: "list todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "remove formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <>
      <div
        className={
          "bg-[#f1f4f9] px-2.5 py-0.5 flex items-center rounded-[24px] min-h-[40px] gap-x-0.5 max-w-7xl overflow-x-auto "
        }
      >
        {sections[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}

        <FontFamily />
        <Headings />
        <FontSize />
        {sections[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <Colors />
        <HightlightColor />
        <ImageUpload />
        <Link />
        <Align />
        <LineHeight />
        <List />

        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>
    </>
  );
}
