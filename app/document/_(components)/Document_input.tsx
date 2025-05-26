"use client";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import useDebounce from "@/hooks/use-debounce";
import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { toast } from "sonner";

interface NavbarProps {
  data: Doc<"documents">;
}

export default function DocumentInput({ data }: NavbarProps) {
  const status = useStatus();
  const [value, setValue] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const mutate = useMutation(api.document.edit);
  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === value) return;
    setIsPending(true);
    mutate({ id: data._id, title: newValue })
      .then(() => toast.success("document updated"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsPending(false));
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id: data._id, title: value })
      .then(() => {
        toast.success("document updated");
        setIsEditing(false);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsPending(false));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const isShowLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const isShowError = status === "disconnected";

  return (
    <>
      <div className={"flex items-center gap-2"}>
        {isEditing ? (
          <>
            <form
              className={"relative w-fit max-w-[50ch]"}
              onSubmit={handleSubmit}
            >
              <span className={"invisible whitespace-pre px-1.5 text-lg"}>
                {value || ""}
              </span>
              <input
                type="text"
                ref={inputRef}
                value={value}
                onChange={onChange}
                onBlur={() => setIsEditing(false)}
                className={
                  "absolute inset-0 text-lg text-black px-1.5 bg-transparent"
                }
              />
            </form>
          </>
        ) : (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <span
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 100);
            }}
            className={"text-lg px-1.5 cursor-pointer truncate"}
          >
            {data.title}
          </span>
        )}
        {isShowError && <BsCloudSlash className={"size-4"} />}
        {!isShowError && !isShowLoader && <BsCloudCheck className={"size-4"} />}
        {isShowLoader && (
          <LoaderIcon className={"size-4 animate-spin text-muted-foreground"} />
        )}
      </div>
    </>
  );
}
