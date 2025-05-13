import Link from "next/link";

export default function DocumentEditor() {
  return (
    <>
      <div>
        Hey,
        <Link href={"/document/132"}>Click me</Link>
      </div>
    </>
  );
}
