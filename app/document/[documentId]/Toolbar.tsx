"use client";
import { LucideIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      onClick={onClick}
      className={cn(
        "flex items-center justify-center text-sm h-7 min-w-7 rounded-sm hover:bg-neutral-200/50",
        isActive && "bg-neutral-200/80"
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
  const sections: SectionsProps = [
    [
      {
        label: "undo",
        icon: Undo2Icon,
        onClick: () => console.log("I love jimmie"),
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
      </div>
    </>
  );
}
