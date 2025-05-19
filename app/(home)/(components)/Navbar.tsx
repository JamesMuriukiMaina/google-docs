import Link from "next/link";
import Image from "next/image";
import SearchInput from "./Search_input";

export default function Navbar() {
  return (
    <>
      <nav className={"flex items-center justify-between h-full w-full"}>
        <div className={"flex gap-x-3 shrink-0 items-center pr-6"}>
          <Link href={"/"}>
            <Image src={"/logo.svg"} height={36} width={36} alt="Logo" />
          </Link>
          <h3 className={"text-xl"}>Docs</h3>
        </div>

        <SearchInput />
        <div />
      </nav>
    </>
  );
}
