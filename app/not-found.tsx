import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col gap-1 px-4 py-4">
        <div className="font-bold">Oops! ⸻ 404</div>
        <span>We couldn&apos;t find the content you&apos;re looking for!</span>
        <Link href="/" className="btn btn-neutral w-fit">
          <FaArrowLeft />
        </Link>
      </div>
    </>
  );
}
