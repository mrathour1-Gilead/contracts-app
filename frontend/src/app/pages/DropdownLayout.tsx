import { App as AntApp } from "antd";
import { GileadHeader } from "@/app/components/GileadHeader";
import { DropdownPage } from "../components/dropdownOptions/DropdownPage";

export default function DropdownLayout() {
  return (
    <AntApp>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* SAME HEADER */}
        <div className="shadow-sm sticky top-0 z-50">
          <GileadHeader />
        </div>

        {/* PAGE CONTENT */}
        <DropdownPage />
      </div>
    </AntApp>
  );
}