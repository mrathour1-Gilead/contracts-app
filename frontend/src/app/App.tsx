/**
 * Main Application Component
 * Global Supply Chain Contracts Database
 */

import { useState } from "react";
import { ConfigProvider } from "antd";
import type { ViewState, Contract } from "./types";
import { useContracts, useStepNavigation } from "./hooks";
import { WORKFLOW_STEPS, LOADING_DELAYS } from "./constants";
import { antdTheme } from "./theme/antd-theme";
import { GileadHeader } from "./components/GileadHeader";
import { DashboardView } from "./components/dashboard/DashboardView";
import { StepperFormView } from "./components/stepper/StepperFormView";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  const [viewState, setViewState] = useState<ViewState>("dashboard");

  // Contract management
  const {
    contracts,
    loading,
    selectContract,
    addContract,
    reloadContracts,
  } = useContracts();

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
    reset: resetStepper,
  } = useStepNavigation({
    totalSteps: WORKFLOW_STEPS.length,
    onComplete: (data) => {
      addContract(data);
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
  };

  /**
   * Handle returning to dashboard
   */
  const handleBackToDashboard = () => {
    handleCancel();
    setViewState("dashboard");
  };

  /**
   * Handle contract row click
   */
  const handleRowClick = (contract: Contract) => {
    selectContract(contract);
    console.log("Selected contract:", contract);
  };

  /**
   * Handle view contract action
   */
  const handleViewContract = (contract: Contract) => {
    console.log("View contract:", contract);
    // TODO: Implement view contract modal/page
  };

  /**
   * Handle edit contract action
   */
  const handleEditContract = (contract: Contract) => {
    console.log("Edit contract:", contract);
    // TODO: Implement edit contract functionality
  };

  /**
   * Handle reload contracts
   */
  const handleReload = () => {
    reloadContracts(LOADING_DELAYS.reload);
  };

  return (
    <ErrorBoundary>
      <ConfigProvider theme={antdTheme}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Header - Sticky at top for all views */}
          <div className="shadow-sm sticky top-0 z-50">
            <GileadHeader />
          </div>

          {/* Main Content - Conditional rendering based on view state */}
          {viewState === "dashboard" && (
            <DashboardView
              contracts={contracts}
              loading={loading}
              onAddContract={handleAddContract}
              onReload={handleReload}
              onRowClick={handleRowClick}
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
            />
          )}
        </div>
      </ConfigProvider>
    </ErrorBoundary>
  );
}