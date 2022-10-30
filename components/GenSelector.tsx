import Link from "next/link";

const genButtonClasses =
  "py-1 px-4 flex-1 bg-slate-400 border border-slate-500 rounded text-center";

export function GenSelector() {
  return (
    <div className="flex gap-x-2 items-center mb-4">
      <span>Gen:</span>
      <Link className={genButtonClasses} href="/type-chart/gen-1">
        1
      </Link>
      <Link className={genButtonClasses} href="/type-chart/gen-2-5">
        2-5
      </Link>
      <Link className={genButtonClasses} href="/type-chart/current">
        6+
      </Link>
    </div>
  );
}
