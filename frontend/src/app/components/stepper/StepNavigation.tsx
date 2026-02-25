/**
 * Navigation buttons for stepper workflow
 */

import { memo } from "react";
import { Button } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { BRAND_COLORS } from "../../constants";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onSaveLater: () => void;
  viewMode?: boolean;
  createUpdateLoader: boolean;
}

export const StepNavigation = memo(({
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
  onSave,
  onSaveLater,
  createUpdateLoader,
  viewMode,
}: StepNavigationProps) => {
  if (viewMode) {
    return (
      <div className="flex justify-between mt-3">
        <div className="flex gap-3">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={onPrevious}
            disabled={isFirstStep}
            size="middle"
            className="font-semibold"
          >
            Previous
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={onNext}
            size="middle"
            className="font-semibold"
            iconPlacement="end"
            disabled={isLastStep}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-3">
      <div className="flex gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onPrevious}
          disabled={isFirstStep}
          size="middle"
          className="font-semibold"
        >
          Previous
        </Button>
      </div>

      {!isLastStep ? (
        <div className="flex gap-3">
          {!isFirstStep && (
            <Button
              onClick={onSaveLater}
              size="middle"
              className="font-semibold"
            >
              Save for Later
            </Button>
          )}
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={onNext}
            size="middle"
            className="font-semibold"
            iconPlacement="end"
            loading={createUpdateLoader}
          >
            {isFirstStep ? "Create" : "Save and Continue"}
          </Button>
        </div>
      ) : (
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={onSave}
          size="middle"
          className="font-semibold"
          style={{
            background: BRAND_COLORS.success,
            borderColor: BRAND_COLORS.successBorder,
          }}
        >
          Save Contract
        </Button>
      )}
    </div>
  );
});

StepNavigation.displayName = "StepNavigation";