import { ConfigProvider, Button } from "antd";
import { antdTheme } from "../theme/antd-theme";
import { useState } from "react";
import {
  FileTextOutlined,
  SyncOutlined,
  FileProtectOutlined,
  CarOutlined,
  ShoppingOutlined,
  LineChartOutlined,
  DollarOutlined,
  ExperimentOutlined,
  SafetyOutlined,
  RocketOutlined,
  AuditOutlined,
  CommentOutlined,
  StarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

export interface Step {
  id: number;
  label: string;
  completed: boolean;
  completedDate?: string;
}

interface VerticalStepperProps {
  steps: Step[];
  currentStep: number;
}

const stepIcons = [
  <FileTextOutlined />,
  <SyncOutlined />,
  <FileProtectOutlined />,
  <CarOutlined />,
  <ShoppingOutlined />,
  <LineChartOutlined />,
  <DollarOutlined />,
  <ExperimentOutlined />,
  <SafetyOutlined />,
  <RocketOutlined />,
  <AuditOutlined />,
  <CommentOutlined />,
  <StarOutlined />,
];

export function VerticalStepper({
  steps,
  currentStep,
}: VerticalStepperProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setIsCollapsed(!isCollapsed);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <div 
        className={`vertical-stepper-container bg-white rounded-lg border border-gray-200 self-stretch flex flex-col ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isTransitioning ? 'is-transitioning' : ''}`}
      >
        {/* Collapse/Expand Button */}
        <div className="border-b border-gray-200 p-2 flex justify-end flex-shrink-0">
          <Button
            type="text"
            size="small"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleToggle}
            className="text-gray-600 hover:text-[#306e9a]"
          />
        </div>

        <nav className="py-2 flex-1 overflow-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`
                relative py-3 transition-all duration-300 ease-in-out ${isCollapsed ? 'px-3' : 'px-6'} cursor-default
                ${
                  index === currentStep
                    ? "bg-gray-100 border-l-4 border-l-[#dc2626] text-gray-900 rounded-l-md active-step"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
              title={isCollapsed ? step.label : undefined}
            >
              <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <span
                  className={`text-base flex-shrink-0 ${index === currentStep ? "text-[#dc2626]" : "text-gray-500"}`}
                >
                  {stepIcons[index]}
                </span>
                <span
                  className={`stepper-label-text text-sm whitespace-nowrap overflow-hidden ${
                    index === currentStep ? "font-medium" : "font-normal"
                  } ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </ConfigProvider>
  );
}