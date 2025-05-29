import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { type ColorResult, SketchPicker } from "react-color";

export default function Colors() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "h-7 min-w-7 flex flex-col items-center justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80"
          )}
        >
          <span className={"text-sm"}>A</span>
          <div className={"h-0.5 w-full"} style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          " flex flex-col max-w-xs gap-y-1 bg-white shadow-xl rounded-sm border-2 border-white/10 z-50"
        }
      >
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
