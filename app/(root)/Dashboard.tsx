import Threads from "./threads/Threads";
import Statistics from "./statistics/Statistics";

const configuration = require("../configuration");

export default function Dashboard() {
  return (
    <>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>Home</li>
            <li>Threads</li>
            <li>Viewing</li>
          </ul>
        </div>
        {!configuration.production && (
          <div className="pt-2 pb-4">
            <div role="alert" className="alert bg-primary/30 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Itera is currently running in testing mode.</span>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-start gap-2">
          <Statistics />
          <Threads />
        </div>
      </section>
    </>
  );
}
