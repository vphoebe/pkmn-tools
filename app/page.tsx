import { getTypes } from "../lib/getTypes";
import Table from "./Table";

export default async function Page() {
  const data = await getTypes("current");
  return (
    <div className="max-w-sm p-8 mx-auto">
      <Table data={data} />
    </div>
  );
}
