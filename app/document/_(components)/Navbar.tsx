import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import DocumentInput from "./Document_input";
import MenuBar from "./Menu_bar";

export default function Navbar() {
  return (
    <>
      <nav className={"flex items-center justify-between"}>
        <div className={"flex gap-2 items-center"}>
          <Link href={"/"}>
            <Image src={Logo} alt="logo" height={36} width={36} />
          </Link>

          <div className={"flex flex-col"}>
            {/* Document Input */}
            <DocumentInput />

            {/* Menu Bar */}
            <MenuBar />
          </div>
        </div>
      </nav>
    </>
  );
}
