import Link from "next/link";
import { useRouter } from "next/router";

const genButtonClasses =
  "py-1 px-4 flex-1 text-center hover:opacity-80 border-px";

function GenButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const { pathname } = useRouter();
  const backgroundClass = pathname === href ? "bg-blue-600" : "bg-slate-400";
  return (
    <Link
      className={`${genButtonClasses} ${backgroundClass} ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
}

export function GenSelector() {
  return (
    <div className="flex items-center mb-4 gap-x-px">
      <span className="mr-4">Gen:</span>
      <GenButton href="/type-chart/gen-1" label="1" className="rounded-l" />
      <GenButton href="/type-chart/gen-2-5" label="2-5" />
      <GenButton href="/type-chart/current" label="6+" className="rounded-r" />
    </div>
  );
}
