"use client";
import { Separator } from "@/components/ui/separator";
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
import Image from "@/custom plugins/Image";

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
        onClick: () => console.log("Who clicked the master"),
        isActive: false, // TODO: Enable this functionality.
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
          "bg-[#f1f4f9] px-2.5 py-0.5 flex items-center rounded-[24px] min-h-[40px] gap-x-0.5 overflow-x-auto "
        }
      >
        {sections[0].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}

        {/* Ask Ai for assistance. The separator is not appearing */}
        <Separator orientation="vertical" className={"h-6 bg-neutral-200"} />
        <FontFamily />
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        <Headings />
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        {/* TODO: font-size */}
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        {sections[1].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        <Colors />
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        <HightlightColor />
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        <Image />
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        <Link />
        {/* TODO:align */}
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        {/* TODO:Line height */}
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        {/* TODO:List */}
        <Separator orientation="vertical" className={"h-6 bg-indigo-500"} />
        {sections[2].map((item) => (
          <ToolbarButton key={item.label} {...item} />
        ))}
      </div>
    </>
  );
}
