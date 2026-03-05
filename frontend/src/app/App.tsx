/**
 * Main Application Component
 * Global Supply Chain Contracts Database
 */

import { useState } from "react";
import { ConfigProvider, App as ContractApp } from "antd";
import type { ViewState } from "./types";
import  { Contract } from  "@/app/store/contracts/contracts.types"
import { useContracts, useStepNavigation } from "./hooks";
import { WORKFLOW_STEPS, LOADING_DELAYS } from "./constants";
import { antdTheme } from "./theme/antd-theme";
import { GileadHeader } from "./components/GileadHeader";
import { DashboardView } from "./components/dashboard/DashboardView";
import { StepperFormView } from "./components/stepper/StepperFormView";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  const [viewState, setViewState] = useState<ViewState>("dashboard");
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);



  // Step navigation management
  const {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrevious,
    handleSave: saveStepData,
    handleSaveLater,
    handleCancel,
    handleCurrentStep,
    reset: resetStepper,
  } = useStepNavigation({
    totalSteps: WORKFLOW_STEPS.length,
    onComplete: (data) => {
      // addContract(data);
      setViewState("dashboard");
    },
    onCancel: () => {
      setViewState("dashboard");
    },
  });

  /**
   * Handle adding a new contract
   */
  const handleAddContract = () => {
    resetStepper();
    setViewState("stepper-form");
    setIsEdit(false)
  };

  /**
   * Handle returning to dashboard
   */
  const handleBackToDashboard = () => {
    handleCancel();
    setViewState("dashboard");
    setIsEdit(false)
  };

    /**
   * Handle view contract action
   */
  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    resetStepper(); // Reset to step 0
    setViewState("stepper-view");
    setIsEdit(false);
  };
  /**
   * Handle edit contract action
   */
  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract);
    resetStepper(); // Reset to step 0
    setViewState("stepper-form");
    setIsEdit(true);
    if(contract.currentStep && contract.currentStep > 0) {
      handleCurrentStep(contract.currentStep)
    }
  };



  return (
    <ErrorBoundary>
      <ConfigProvider theme={antdTheme}>
        <ContractApp>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header - Sticky at top for all views */}
            <div className="shadow-sm sticky top-0 z-50">
              <GileadHeader />
            </div>

            {/* Main Content - Conditional rendering based on view state */}
            {viewState === "dashboard" && (
              <DashboardView
                onAddContract={handleAddContract}
                onViewContract={handleViewContract}
                onEditContract={handleEditContract}
              />
            )}

            {viewState === "stepper-form" && (
              <StepperFormView
                steps={WORKFLOW_STEPS}
                currentStep={currentStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                onBackToDashboard={handleBackToDashboard}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSave={saveStepData}
                onSaveLater={handleSaveLater}
                contractData={selectedContract}
                isEdit={isEdit}
              />
            )}
            {viewState === "stepper-view" && (
              <StepperFormView
                steps={WORKFLOW_STEPS}
                currentStep={currentStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                onBackToDashboard={handleBackToDashboard}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSave={() => {}}
                onSaveLater={() => {}}
                viewMode={true}
                contractData={selectedContract}
              />
            )}
          </div>
        </ContractApp>
      </ConfigProvider>
    </ErrorBoundary>
  );
}