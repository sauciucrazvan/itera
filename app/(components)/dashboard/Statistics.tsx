"use client";
import Error from "../Error";

import { useEffect, useState } from "react";
import { getThreads } from "@/app/(database)/getThreads";
import { Thread } from "@/app/(types)/Topics";

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglass,
} from "react-icons/fa";

export default function Statistics() {
  const [data, setData] = useState([0, 0, 0]),
    [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesData: Thread[] = await getThreads();

        let solved = 0,
          pending = 0;
        issuesData.forEach((issue) => {
          switch (issue.status) {
            case "closed":
              solved++;
              break;

            case "reviewing":
              pending++;
              break;
          }
        });

        setData([issuesData.length, solved, pending]);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) return <Error />;

  return (
    <>
      <div className="shadow lg:w-[25vw] flex flex-col gap-2">
        <div className="stat rounded-md bg-base-200 hover:bg-base-300/80 transition ease-in-out duration-300">
          <div className="stat-figure text-secondary">
            <FaExclamationCircle size="32" />
          </div>
          <div className="stat-title">Issues</div>
          <div className="stat-value">{data[0]}</div>
        </div>
        <div className="stat rounded-md bg-base-200 hover:bg-base-300/80 transition ease-in-out duration-300">
          <div className="stat-figure text-secondary">
            <FaCheckCircle size="32" />
          </div>
          <div className="stat-title">Solved</div>
          <div className="stat-value">{data[1]}</div>
        </div>
        <div className="stat rounded-md bg-base-200 hover:bg-base-300/80 transition ease-in-out duration-300">
          <div className="stat-figure text-secondary">
            <FaHourglass size="32" />
          </div>
          <div className="stat-title">Pending</div>
          <div className="stat-value">{data[2]}</div>
        </div>
      </div>
    </>
  );
}
