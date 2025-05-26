import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import DocumentInput from "./Document_input";
import MenuBar from "./Menu_bar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Avatars from "./Avatars";
import Inbox from "./Inbox";
import type { Doc } from "@/convex/_generated/dataModel";

interface NavbarProps {
  data: Doc<"documents">;
}

export default function Navbar({ data }: NavbarProps) {
  return (
    <>
      <nav className={"flex items-center justify-between"}>
        <div className={"flex gap-2 items-center"}>
          <Link href={"/"}>
            <Image src={Logo} alt="logo" height={36} width={36} />
          </Link>

          <div className={"flex flex-col"}>
            {/* Document Input */}
            <DocumentInput data={data} />

            {/* Menu Bar */}
            <MenuBar data={data} />
          </div>
        </div>
        <div className={"flex gap-x-3 items-center pl-6"}>
          <Inbox />
          <Avatars />
          <OrganizationSwitcher
            afterCreateOrganizationUrl={"/"}
            afterLeaveOrganizationUrl="/"
            afterSelectPersonalUrl={"/"}
            afterSelectOrganizationUrl={"/"}
          />
          <UserButton />
        </div>
      </nav>
    </>
  );
}
