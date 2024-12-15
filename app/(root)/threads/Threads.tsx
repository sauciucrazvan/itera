"use client";
import Link from "next/link";
import { FaFilter, FaPlus } from "react-icons/fa";
import ThreadsList from "./ThreadsList";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Category,
  categoryTypes,
  isCategory,
} from "@/app/thread/(components)/types/Categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSliders } from "react-icons/fa6";

export default function Threads() {
  const searchParams = useSearchParams(),
    router = useRouter(),
    pathname = usePathname();
  const categoryParameter = searchParams.get("category");
  const [category, setCategory] = useState<Category>("All"),
    [filterCategory, setFilterCategory] = useState<Category>("All");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (categoryParameter && isCategory(categoryParameter)) {
      setCategory(categoryParameter);
    }
  }, [categoryParameter]);

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
          <div className="flex flex-row items-center gap-2">
            <div className="text-md text-base-content font-semibold tracking-wider">
              THREADS
            </div>
            <div>
              <details className="dropdown">
                <summary className="btn btn-sm shadow-none">
                  <FaSliders />
                </summary>
                <ul className="menu dropdown-content bg-base-300 rounded-box z-[1] w-54 shadow">
                  <div className="card-body">
                    <h4 className="card-title">Filters</h4>
                    <div className="flex flex-col gap-1">
                      <div className="font-bold">Category</div>
                      <div className="flex flex-col gap-1">
                        {categoryOptions.map(({ key, value }) => (
                          <div
                            key={key}
                            className="flex flex-row gap-1 items-center"
                          >
                            <input
                              name="category"
                              type="radio"
                              className="radio radio-xs"
                              onChange={() =>
                                setFilterCategory(value as Category)
                              }
                              defaultChecked={value === category}
                            ></input>
                            <div>{value}</div>
                          </div>
                        ))}

                        <div className="pt-2 flex flex-row gap-1">
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() => {
                              setCategory(filterCategory);
                              router.push(
                                pathname +
                                  "?" +
                                  createQueryString("category", filterCategory)
                              );
                            }}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </details>
            </div>
            {/* <div className="join">
              {categoryOptions.map(({ key, value }) => (
                <button
                  key={key}
                  className={`join-item btn btn-xs md:btn-sm btn-neutral text-base-content ${
                    category === value ? "btn-active" : ""
                  }`}
                  onClick={() => {
                    setCategory(value as Category);
                    router.push(
                      pathname + "?" + createQueryString("category", value)
                    );
                  }}
                >
                  {value}
                </button>
              ))}
            </div> */}
          </div>

          <Link
            className="hidden lg:inline-flex btn btn-sm btn-primary rounded-md text-content-base"
            href={
              "/thread/new" +
              (category !== "All"
                ? "?" + createQueryString("category", category)
                : "")
            }
          >
            <FaPlus /> Create a new thread
          </Link>
          <Link
            className="lg:hidden btn btn-sm btn-primary btn-square text-content-base"
            href={
              "/thread/new" +
              (category !== "All"
                ? "?" + createQueryString("category", category)
                : "")
            }
          >
            <FaPlus />
          </Link>
        </div>
        <ThreadsList category={category} />
      </section>
    </>
  );
}
