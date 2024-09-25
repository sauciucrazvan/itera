"use client";

import { useEffect, useState } from "react";

import { getThreads } from "@/app/(database)/threads/getThreads";

import {
  FaChartArea,
  FaChartPie,
  FaCheckCircle,
  FaClone,
  FaExclamationCircle,
  FaHourglass,
  FaLayerGroup,
  FaSortNumericDown,
  FaStar,
} from "react-icons/fa";

import Error from "@/app/(components)/helpers/Error";
import Loading from "@/app/(components)/helpers/Loading";

import { Thread } from "@/app/thread/(components)/types/Topics";
import { StatisticCard } from "./StatisticCard";
import { getAllThreads } from "@/app/(database)/threads/getAllThreads";

export default function Statistics() {
  const [loading, setLoading] = useState(false),
    [error, setError] = useState(false),
    [statsData, setStatsData] = useState({
      total: -1,
      issues: -1,
      feature_requests: -1,
      feedback: -1,
    });

  const getStats = (threads: Thread[]) => {
    let issues = 0,
      feature_requests = 0,
      feedback = 0;

    threads.forEach((issue) => {
      switch (issue.category) {
        case "Issues":
          issues++;
          break;

        case "Feature Request":
          feature_requests++;
          break;

        case "Feedback":
          feedback++;
          break;
      }
    });

    return {
      total: threads.length,
      issues,
      feature_requests,
      feedback,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issuesData: Thread[] = await getAllThreads(false);
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
        icon={<FaChartPie size="32" />}
        title="Threads"
        value={statsData.total}
      />
      <StatisticCard
        icon={<FaExclamationCircle size="32" />}
        title="Issues"
        value={statsData.issues}
      />
      <StatisticCard
        icon={<FaLayerGroup size="32" />}
        title="Feature Requests"
        value={statsData.feature_requests}
      />
      <StatisticCard
        icon={<FaStar size="32" />}
        title="Feedback Topics"
        value={statsData.feedback}
      />
    </div>
  );
}
