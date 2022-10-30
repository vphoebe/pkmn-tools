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
      className="px-4 py-2 flex-1 rounded disabled:opacity-60 disabled:cursor-not-allowed"
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
