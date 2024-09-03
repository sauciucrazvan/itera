interface StatusBadgeProps {
  type: string;
}

const badgeTypes: { [key: string]: string } = {
  open: "badge-accent",
  closed: "badge-neutral",
  reviewing: "badge-secondary",
};

export default function StatusBadge({ type }: StatusBadgeProps) {
  return (
    <>
      <div className={"badge " + badgeTypes[type]}>{type}</div>
    </>
  );
}
