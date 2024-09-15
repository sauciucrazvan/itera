export default function IssuesSkeleton() {
  return (
    <>
      <div className="py-2">
        <div className="flex flex-row items-center justify-between">
          <div className="skeleton w-64 h-6" />
          <div className="skeleton w-48 h-6" />
        </div>
        <div className="flex flex-col items-start py-2">
          <div className="skeleton w-full h-[50vh]" />
        </div>
        <div className="divider m-0" />
      </div>
    </>
  );
}
