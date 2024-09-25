import Threads from "./threads/Threads";
import Statistics from "./statistics/Statistics";

export default function Dashboard() {
  return (
    <>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>Home</li>
            <li>Threads</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-2">
          <Statistics />
          <Threads />
        </div>
      </section>
    </>
  );
}
