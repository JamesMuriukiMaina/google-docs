import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  HighlighterIcon,
} from "lucide-react";

export default function Align() {
  const { editor } = useEditorStore();

  const alignment = [
    { label: "Align left", value: "left", icon: AlignLeftIcon },
    { label: "Align right", value: "right", icon: AlignRightIcon },
    { label: "Align center", value: "center", icon: AlignCenterIcon },
    { label: "Align justify", value: "justify", icon: AlignJustifyIcon },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "h-7 min-w-7 flex flex-col items-center justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80"
          )}
        >
          <AlignLeftIcon className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "p-1 flex flex-col max-w-xs gap-y-1 bg-white shadow-xl rounded-sm border-2 border-white/10 z-50"
        }
      >
        {alignment.map(({ label, value, icon: Icon }) => (
          <button
            type="button"
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 p-2 px-2 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className={"size-4"} />
            <span className={"text-sm"}>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
