import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className={
          "flex items-center max-w-xl mx-auto pt-8 text-indigo-500 font-semibold text-xl"
        }
      >
        <Link href={"/document/132"}>
          Click me <span>&rarr;</span>
        </Link>
      </div>
    </>
  );
}
