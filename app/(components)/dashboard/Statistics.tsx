"use client";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaUserCircle,
} from "react-icons/fa";
import Error from "../Error";
import { getThreads, IssueThread } from "@/app/(database)/getThreads";

export default function Statistics() {
  const [data, setData] = useState([0, 0]),
    [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesData: IssueThread[] = await getThreads();

        let solved = 0;
        issuesData.forEach((issue) => {
          if (issue.status == "closed") solved++;
        });

        setData([issuesData.length, solved]);
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
            <FaUserCircle size="32" />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">3,211</div>
        </div>
      </div>
    </>
  );
}
