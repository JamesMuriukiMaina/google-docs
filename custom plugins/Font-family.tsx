import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function FontFamily() {
  const { editor } = useEditorStore();

  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 w-[120px] flex items-center justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80"
          )}
        >
          <span className={"truncate"}>
            {editor?.getAttributes("textStyle").FontFamily || "Arial"}
          </span>
          <ChevronDown className={"ml-2 size-4 shrink-0"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "p-1 flex flex-col max-w-xs gap-y-1 bg-white shadow-xl rounded-sm border-2 border-white/10 z-50"
        }
      >
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={label}
            className={cn(
              "flex items-center gap-x-2 justify-start px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").FontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className={"text-sm"}>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
