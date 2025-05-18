import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function FontSize() {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (size: string) => {
    console.log(size);
    const newSize = parseInt(size, 10);
    if (!isNaN(newSize) && newSize > 0) {
      editor?.chain().focus().setFontSize(`${newSize}px`).run();
      setFontSize(size);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateFontSize(inputValue);
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };
  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className={"flex items-center gap-x-0.5"}>
      <button
        type="button"
        className={cn(
          "h-7 w-auto flex items-center justify-center rounded-sm  hover:bg-neutral-200/80"
        )}
        onClick={decrement}
      >
        <MinusIcon className={"size-5"} />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className={cn(
            "h-7 w-10 border border-neutral-400 text-center rounded-sm text-sm hover:bg-neutral-200/80 focus:outline-none focus:ring-0 bg-transparent"
          )}
        />
      ) : (
        <button
          type={"button"}
          onClick={() => {
            setIsEditing(true);

            setFontSize(currentFontSize);
          }}
          className={cn(
            "h-7 w-10 border border-neutral-400 text-center rounded-sm text-sm bg-transparent cursor-text"
          )}
        >
          {currentFontSize}
        </button>
      )}

      <button
        type="button"
        className={cn(
          "h-7 w-auto flex items-center justify-center rounded-sm  hover:bg-neutral-200/80"
        )}
        onClick={increment}
      >
        <PlusIcon className={"size-5"} />
      </button>
    </div>
  );
}
