import { CommonDataView } from "./CommonDataView";

interface CommonStepViewProps {
  contractData?: any;
  title: string;
  dataKey: string;
}

export function CommonStepView({
  contractData,
  title,
  dataKey
}: CommonStepViewProps) {
  const data = Object.values(
    (contractData?.[dataKey]) || {}
  ).sort((a: any, b: any)  => a.sno - b.sno);

  return <CommonDataView data={data} title={title} />;
}