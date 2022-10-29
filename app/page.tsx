import { getTypes } from "../lib/getTypes";
import Table from "./Table";

export default async function Page() {
  const data = await getTypes();
  return (
    <div className="max-w-sm p-8">
      <Table data={data} />
    </div>
  );
}
