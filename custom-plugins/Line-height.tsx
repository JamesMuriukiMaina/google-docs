import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Icon, ListCollapse } from "lucide-react";

export default function LineHeight() {
  const { editor } = useEditorStore();

  const lineHeight = [
    { label: "default", value: "normal" },
    { label: "single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "double", value: "2" },
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
          <ListCollapse className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "p-1 flex flex-col max-w-sm gap-y-1 bg-white shadow-xl rounded-sm border-2 border-white/10 z-50"
        }
      >
        {lineHeight.map(({ label, value }) => (
          <button
            type="button"
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 p-2 px-2 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className={"text-sm"}>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
