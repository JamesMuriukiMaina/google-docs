"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchParams from "@/hooks/use-search-params";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(search);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    // setValue("");
    inputRef.current?.blur();
  };

  return (
    <>
      <div className={"flex flex-1 items-center justify-center"}>
        <form className={"relative max-w-3xl w-full"} onSubmit={handleSubmit}>
          <Input
            placeholder="Search"
            className={
              "md:text-base ring-1 ring-inset ring-gray-900/10 placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-lg rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
            }
            value={value}
            onChange={handleChange}
            ref={inputRef}
          />

          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className={
              "absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
            }
          >
            <SearchIcon className={"size-4 "} />
          </Button>
          {value && (
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              className={
                "absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
              }
              onClick={handleClear}
            >
              <XIcon className={"size-4 "} />
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
