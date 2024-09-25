export const Select = ({
  label,
  icon: Icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ComponentType;
  options: { key: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div>
    <h1 className="text-md flex flex-row items-center gap-1 pt-2">
      <Icon /> {label}
    </h1>
    <select
      className="select select-bordered w-full"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  </div>
);
