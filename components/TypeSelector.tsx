export function TypeSelector({
  types,
  value,
  onChange,
  isDisabled,
}: {
  types: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  isDisabled: boolean;
}) {
  return (
    <select
      onChange={onChange}
      value={value}
      className={`dark:text-white px-4 py-2 flex-1 rounded disabled:opacity-80 disabled:cursor-not-allowed ${
        value !== "none" ? `bg-${value}` : "dark:bg-slate-700"
      }`}
      disabled={isDisabled}
    >
      <option value="none">(none)</option>
      {types.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
