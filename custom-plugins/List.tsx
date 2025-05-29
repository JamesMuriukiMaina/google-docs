import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ListIcon, ListOrderedIcon } from "lucide-react";

export default function List() {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Ordered list",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Bullet list",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
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
          <ListIcon className={"size-4"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "p-1 flex flex-col max-w-xs gap-y-1 bg-white shadow-xl rounded-sm border-2 border-white/10 z-50"
        }
      >
        {lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <button
            type="button"
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 p-2 px-2 rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80"
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
