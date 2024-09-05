import {
  FaCheckCircle,
  FaExclamationCircle,
  FaUserCircle,
} from "react-icons/fa";

export default function Statistics() {
  return (
    <>
      <div className="stats shadow w-[96vw] bg-base-200">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaExclamationCircle size="32" />
          </div>
          <div className="stat-title">Issues</div>
          <div className="stat-value">161</div>
          <div className="stat-desc">2 currently unsolved</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaCheckCircle size="32" />
          </div>
          <div className="stat-title">Solved</div>
          <div className="stat-value">159</div>
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
