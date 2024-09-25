"use client";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ThreadsList from "./ThreadsList";
import { useMemo, useState } from "react";
import {
  Category,
  categoryTypes,
} from "@/app/thread/(components)/types/Categories";

export default function Threads() {
  const [category, setCategory] = useState<Category>("Issues");

  const categoryOptions = useMemo(
    () =>
      Object.entries(categoryTypes).map(([key, value]) => ({
        key,
        value,
      })),
    []
  );

  return (
    <>
      <section className="w-full bg-base-200 px-4 py-2 rounded-md">
        <div className="flex flex-row justify-between items-center gap-2 pb-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <div className="text-md text-base-content font-semibold tracking-wider">
              THREADS
            </div>
            <div className="join">
              {categoryOptions.map(({ key, value }) => (
                <button
                  key={key}
                  className={`btn join-item btn-sm btn-neutral ${
                    category === value ? "btn-active" : ""
                  }`}
                  onClick={() => setCategory(value as Category)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <Link
            className="btn btn-sm btn-primary rounded-md text-content-base"
            href="/thread/new"
          >
            <FaPlus /> Create a new thread
          </Link>
        </div>
        <ThreadsList category={category} />
      </section>
    </>
  );
}
