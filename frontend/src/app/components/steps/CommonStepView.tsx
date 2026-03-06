import { Contract } from "@/app/store/contracts/contracts.types";
import { CommonDataView } from "./CommonDataView";

interface CommonStepViewProps {
  contractData?: Contract;
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
  ).sort((a, b) => a.sno - b.sno);

  return <CommonDataView data={data} title={title} />;
}