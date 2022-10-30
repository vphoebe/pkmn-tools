export function TypeSelector({
  types,
  value,
  onChange,
}: {
  types: string[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select
      onChange={onChange}
      value={value}
      className="px-4 py-2 flex-1 rounded"
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
