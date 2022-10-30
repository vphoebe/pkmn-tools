import Link from "next/link";
import { useRouter } from "next/router";

const genButtonClasses =
  "py-1 px-4 flex-1 border border-slate-500 rounded text-center";

function GenButton({ href, label }: { href: string; label: string }) {
  const { pathname } = useRouter();
  const backgroundClass = pathname === href ? "bg-blue-600" : "bg-slate-400";
  return (
    <Link className={`${genButtonClasses} ${backgroundClass}`} href={href}>
      {label}
    </Link>
  );
}

export function GenSelector() {
  const { pathname } = useRouter();

  return (
    <div className="flex gap-x-2 items-center mb-4 ">
      <span>Gen:</span>
      <GenButton href="/type-chart/gen-1" label="1" />
      <GenButton href="/type-chart/gen-2-5" label="2-5" />
      <GenButton href="/type-chart/current" label="6+" />
    </div>
  );
}
