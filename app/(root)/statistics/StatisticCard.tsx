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
    <div className="stat rounded-md bg-base-200 hover:drop-shadow-md hover:translate-x-1 transition ease-in-out duration-300 border-l-4 border-primary">
      <div className="stat-figure text-primary bg-base-100/80 p-4 rounded-3xl">
        {icon}
      </div>
      {value !== -1 ? (
        <>
          <div className="stat-value">{value}</div>
          <div className="stat-title font-medium text-sm tracking-widest">
            {title.toLocaleUpperCase()}
          </div>
        </>
      ) : (
        <div className="animate-pulse">
          <div className="stat-value py-2">
            <div className="skeleton h-6 w-20"></div>
          </div>
          <div className="stat-title font-medium text-sm tracking-widest">
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      )}
    </div>
  );
}
