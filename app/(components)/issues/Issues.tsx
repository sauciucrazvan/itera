import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import IssuesBody from "./subcomponents/IssuesBody";

export default function Issues() {
  return (
    <>
      <section className="artboard bg-base-200 px-4 py-2 rounded-md">
        <div className="flex flex-row justify-between items-center gap-2 ">
          <h1>Issues</h1>

          <Link
            className="btn btn-sm btn-outline text-content-base"
            href="/thread/new"
          >
            <FaPlus /> Create a new thread
          </Link>
        </div>
        <div className="divider m-0" />
        <IssuesBody />
      </section>
    </>
  );
}
