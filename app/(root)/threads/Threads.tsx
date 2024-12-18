"use client";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import ThreadsList from "./ThreadsList";
import { useEffect, useMemo, useState } from "react";
import {
  Category,
  categoryTypes,
  isCategory,
} from "@/app/thread/(components)/types/Categories";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSliders } from "react-icons/fa6";
import {
  isStatus,
  Status,
  statusTypes,
} from "@/app/thread/(components)/types/Statuses";

export default function Threads() {
  const searchParams = useSearchParams(),
    router = useRouter();

  const categoryParameter = searchParams.get("category"),
    statusParameter = searchParams.get("status");

  const [category, setCategory] = useState<Category>("All"),
    [filterCategory, setFilterCategory] = useState<Category>("All"),
    [status, setStatus] = useState<Status | null>(null),
    [filterStatus, setFilterStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (statusParameter && isStatus(statusParameter)) {
      setStatus(statusParameter);
      setFilterStatus(statusParameter);
    } else {
      setStatus(null);
      setFilterStatus(null);
    }

    if (categoryParameter && isCategory(categoryParameter)) {
      setCategory(categoryParameter);
      setFilterCategory(categoryParameter);
    } else {
      setCategory("All");
      setFilterCategory("All");
    }
  }, [statusParameter, categoryParameter]);

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
                <ul className="menu dropdown-content bg-base-300 rounded-sm z-[1] shadow">
                  <div className="card-body p-2">
                    <h4 className="card-title text-sm">Filters</h4>
                    {/* <div className="divider m-0" /> */}
                    <div className="flex flex-col lg:flex-row items-start gap-1">
                      <details className="collapse rounded-sm collapse-arrow bg-base-200 border-base-300 border">
                        <summary className="collapse-title text-sm">
                          Category
                        </summary>
                        <div className="collapse-content">
                          <div className="flex flex-col gap-1">
                            {categoryOptions.map(({ key, value }) => (
                              <div
                                key={key}
                                className="flex flex-row gap-1 items-center"
                              >
                                <input
                                  name="category"
                                  type="radio"
                                  className="radio radio-primary radio-xs"
                                  onChange={() =>
                                    setFilterCategory(value as Category)
                                  }
                                  checked={value === filterCategory}
                                />
                                <div>{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </details>

                      <details className="collapse rounded-sm collapse-arrow bg-base-200 border-base-300 border">
                        <summary className="collapse-title text-sm">
                          Status
                        </summary>
                        <div className="collapse-content">
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-row gap-1 items-center">
                              <input
                                name="status"
                                type="radio"
                                className="radio radio-accent radio-xs"
                                onChange={() => setFilterStatus(null)}
                                checked={null === filterStatus}
                              />
                              <div>all</div>
                            </div>
                            {statusTypes.map((sts) => (
                              <div
                                key={sts}
                                className="flex flex-row gap-1 items-center"
                              >
                                <input
                                  name="status"
                                  type="radio"
                                  className="radio radio-accent radio-xs"
                                  onChange={() =>
                                    setFilterStatus(sts as Status)
                                  }
                                  checked={sts === filterStatus}
                                />
                                <div>{sts}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </details>

                      {/* <div className="flex flex-col gap-1">
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
                                className="radio radio-primary radio-xs"
                                onChange={() =>
                                  setFilterCategory(value as Category)
                                }
                                checked={value === filterCategory}
                              />
                              <div>{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="font-bold">Status</div>
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-row gap-1 items-center">
                            <input
                              name="status"
                              type="radio"
                              className="radio radio-accent radio-xs"
                              onChange={() => setFilterStatus(null)}
                              checked={null === filterStatus}
                            />
                            <div>all</div>
                          </div>
                          {statusTypes.map((sts) => (
                            <div
                              key={sts}
                              className="flex flex-row gap-1 items-center"
                            >
                              <input
                                name="status"
                                type="radio"
                                className="radio radio-accent radio-xs"
                                onChange={() => setFilterStatus(sts as Status)}
                                checked={sts === filterStatus}
                              />
                              <div>{sts}</div>
                            </div>
                          ))}
                        </div>
                      </div> */}
                    </div>
                    <div className="pt-2 flex flex-row gap-1">
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => {
                          setCategory(filterCategory);
                          setStatus(filterStatus);
                          router.push(
                            "?" +
                              new URLSearchParams({
                                category: filterCategory,
                                ...(filterStatus != null && {
                                  status: filterStatus,
                                }),
                              }).toString()
                          );
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </ul>
              </details>
            </div>
          </div>

          <Link
            className="hidden lg:inline-flex btn btn-sm btn-primary rounded-md text-content-base"
            href={
              "/thread/new" +
              (category !== "All"
                ? "?" +
                  new URLSearchParams({
                    category: filterCategory,
                  }).toString()
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
                ? "?" +
                  new URLSearchParams({
                    category: filterCategory,
                  }).toString()
                : "")
            }
          >
            <FaPlus />
          </Link>
        </div>
        <ThreadsList category={category} status={status} />
      </section>
    </>
  );
}
