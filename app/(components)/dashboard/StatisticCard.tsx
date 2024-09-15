export function StatisticCard({
  icon,
  title,
  value,
}: {
  icon: JSX.Element;
  title: string;
  value: number;
}) {
  return (
    <div className="stat rounded-md bg-base-200 hover:bg-base-300/80 transition ease-in-out duration-300">
      <div className="stat-figure text-secondary">{icon}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">
        {value || <div className="loading loading-bars" />}
      </div>
    </div>
  );
}
