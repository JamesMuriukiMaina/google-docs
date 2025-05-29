import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/useEditorStore";
import { Link2Icon } from "lucide-react";
import { useState } from "react";

export default function Link() {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className={
            "flex items-center justify-center p-1.5 h-7 min-w-7 hover:bg-neutral-200/80 rounded-sm"
          }
        >
          <Link2Icon className={"size-4 shrink-0"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"p-2.5 flex items-center gap-x-2"}>
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
