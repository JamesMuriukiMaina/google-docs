import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/useEditorStore";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useState } from "react";

export default function Image() {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu
        onOpenChange={(open) => {
          if (open) {
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
            <ImageIcon className={"size-4 shrink-0"} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={onUploadImage}
            className={
              "flex p-2 hover:bg-neutral-200/80 hover:cursor-pointer items-center gap-x-1"
            }
          >
            <UploadIcon className={"size-5 mr-2"} />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className={
              "flex p-2 hover:bg-neutral-200/80 hover:cursor-pointer items-center gap-x-1"
            }
          >
            <SearchIcon className={"size-5 mr-2"} />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image url</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={() => handleImageUrlSubmit()}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
