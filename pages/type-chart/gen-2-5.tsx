import TypeChartTool from "../../components/Tool";
import { getTypes, TypeData } from "../../lib/getTypes";

export default function Current({ data }: { data: TypeData[] }) {
  return <TypeChartTool data={data} />;
}

export async function getStaticProps() {
  const data = await getTypes("generation-v");
  return {
    props: { data },
  };
}
