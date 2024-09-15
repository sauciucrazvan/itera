"use client";

import { useEffect, useState } from "react";
import { getThreads } from "@/app/(database)/getThreads";

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglass,
} from "react-icons/fa";

import Error from "../Error";
import Loading from "../Loading";

import { Thread } from "@/app/(types)/Topics";
import { StatisticCard } from "./StatisticCard";

export default function Statistics() {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState(false),
    [statsData, setStatsData] = useState({
      total: -1,
      solved: -1,
      pending: -1,
    });

  const getStats = (threads: Thread[]) => {
    let solved = 0,
      pending = 0;

    threads.forEach((issue) => {
      switch (issue.status) {
        case "closed":
          solved++;
          break;

        case "reviewing":
          pending++;
          break;
      }
    });

    return {
      total: threads.length,
      solved: solved,
      pending: pending,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesData: Thread[] = await getThreads();
        const stats = getStats(issuesData);

        setStatsData(stats);
      } catch (error) {
        console.error("Failed to fetch the threads: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <div className="shadow lg:w-[25vw] flex flex-col gap-3">
      <StatisticCard
        icon={<FaExclamationCircle size="32" />}
        title="Issues"
        value={statsData.total}
      />
      <StatisticCard
        icon={<FaCheckCircle size="32" />}
        title="Solved"
        value={statsData.solved}
      />
      <StatisticCard
        icon={<FaHourglass size="32" />}
        title="Pending"
        value={statsData.pending}
      />
    </div>
  );
}
