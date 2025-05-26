"use client";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import { BsCloudCheck } from "react-icons/bs";

interface NavbarProps {
  data: Doc<"documents">;
}

export default function DocumentInput({ data }: NavbarProps) {
  const [value, setValue] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const mutate = useMutation(api.document.create);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    //Todo: implement debounce;
  };

  return (
    <>
      <div className={"flex items-center gap-2"}>
        {isEditing ? (
          <>
            <form className={"relative w-fit max-w-[50ch]"}>
              <span className={"invisible whitespace-pre px-1.5 text-lg"}>
                {value || ""}
              </span>
              <input
                type="text"
                ref={inputRef}
                value={value}
                onChange={onChange}
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
        <BsCloudCheck />
      </div>
    </>
  );
}
