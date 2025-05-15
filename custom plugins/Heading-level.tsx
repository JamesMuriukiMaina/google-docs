import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import type { Level } from "@tiptap/extension-heading";
import { ChevronDown } from "lucide-react";

export default function Headings() {
	const { editor } = useEditorStore();

	const headings = [
		{
			label: "Normal Text",
			fontSize: "16px",
			value: 0,
		},
		{
			label: "Heading 1",
			fontSize: "32px",
			value: 1,
		},
		{
			label: "Heading 2",
			fontSize: "24px",
			value: 2,
		},
		{
			label: "Heading 3",
			fontSize: "18px",
			value: 3,
		},
		{
			label: "Heading 4",
			fontSize: "16px",
			value: 4,
		},
		{
			label: "Heading 5",
			fontSize: "14px",
			value: 5,
		},
	];

	const getCurrentHeading = () => {
		for (let level = 0; level < headings.length - 1; level++) {
			if (editor?.isActive("heading", { level })) {
				return `Heading ${level}`;
			}
		}
		return "Normal Text";
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn(
						"h-7 min-w-7 flex items-center justify-center rounded-sm px-1.5 overflow-hidden text-sm hover:bg-neutral-200/80",
					)}
				>
					<span className={"truncate"}>{getCurrentHeading()}</span>
					<ChevronDown className={"ml-2 size-4 shrink-0"} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={
					"p-1 flex flex-col max-w-xs gap-y-1 bg-white shadow-xl rounded-sm border-2 border-white/10 z-50"
				}
			>
				{headings.map(({ label, value, fontSize }) => (
					<button
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({ level: value as Level })
									.run();
							}
						}}
						type="button"
						key={value}
						style={{ fontSize }}
						className={cn(
							"flex items-center gap-x-2 justify-start px-2 py-1 rounded-sm hover:bg-neutral-200/80",
							(value === 0 && !editor?.isActive("heading")) ||
								(editor?.isActive("heading", { level: value }) &&
									"bg-neutral-200/80"),
						)}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
