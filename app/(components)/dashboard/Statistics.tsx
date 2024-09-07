"use client";
import Error from "../Error";

import { useEffect, useState } from "react";
import { getThreads, IssueThread } from "@/app/(database)/getThreads";

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
        const issuesData: IssueThread[] = await getThreads();

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
      <div className="stats shadow w-[96vw] bg-base-200">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaExclamationCircle size="32" />
          </div>
          <div className="stat-title">Issues</div>
          <div className="stat-value">{data[0]}</div>
          <div className="stat-desc">
            {data[0] - data[1]} currently unsolved
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaCheckCircle size="32" />
          </div>
          <div className="stat-title">Solved</div>
          <div className="stat-value">{data[1]}</div>
        </div>

        <div className="stat">
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
