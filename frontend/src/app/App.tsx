/**
 * Main Application Component
 * Global Supply Chain Contracts Database
 */

import { useState } from "react";
import { App as ContractApp } from "antd";
import type { ViewState } from "./types";
import { Contract } from "@/app/store/contracts/contracts.types"
import { useStepNavigation } from "./hooks";
import { WORKFLOW_STEPS, LOADING_DELAYS } from "./constants";
import { GileadHeader } from "./components/GileadHeader";
import { DashboardView } from "./components/dashboard/DashboardView";
import { StepperFormView } from "./components/stepper/StepperFormView";
import { clearAuditLogs, setSelectedContract } from "@/app/store/contracts/contractsSlice"
import { useAppSelector, useAppDispatch } from "@/app/store/hooks"
import AuditLogDrawer from "./components/AuditLogDrawer";
import ExcelUpload from "./components/ExcelUpload";



export default function App() {

  const dispatch = useAppDispatch()
  const { selectedContract } =
    useAppSelector((state) => state.contracts)
  const [viewState, setViewState] = useState<ViewState>("dashboard");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [openAudit, setOpenAudit] = useState<boolean>(false);
  const [openExcel, setOpenExcel] = useState<boolean>(false);



  // Step navigation management
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrevious,
    handleSaveLater,
    handleCancel,
    handleCurrentStep,
    reset: resetStepper,
    goToStep,
  } = useStepNavigation({
    totalSteps: WORKFLOW_STEPS.length,
    onCancel: () => {
      setViewState("dashboard");
      dispatch(setSelectedContract(null));
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
    dispatch(setSelectedContract(contract));
    resetStepper(); // Reset to step 0
    setViewState("stepper-view");
    setIsEdit(false);
  };
  /**
   * Handle edit contract action
   */
  const handleEditContract = (contract: Contract) => {
    dispatch(setSelectedContract(contract));
    resetStepper(); // Reset to step 0
    setViewState("stepper-form");
    setIsEdit(true);
    if (contract.currentStep && contract.currentStep > 0 && WORKFLOW_STEPS.length > contract.currentStep) {
      handleCurrentStep(contract.currentStep)
    }
  };


  return (
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
                setOpenExcel={() => setOpenExcel(true)}
                showAuditLog={(contract) => {
                  dispatch(setSelectedContract(contract));
                  setOpenAudit(true);
                }}
              />
            )}

            {viewState === "stepper-form" && (
              <StepperFormView
                currentStep={currentStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                onBackToDashboard={handleBackToDashboard}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSaveLater={handleSaveLater}
                contractData={selectedContract}
                isEdit={isEdit}
                goToStep={goToStep}
              />
            )}
            {viewState === "stepper-view" && (
              <StepperFormView
                currentStep={currentStep}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                onBackToDashboard={handleBackToDashboard}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSaveLater={() => { }}
                viewMode={true}
                contractData={selectedContract}
                goToStep={goToStep}
              />
            )}
          </div>
          {openAudit && selectedContract && (
            <AuditLogDrawer contractId={selectedContract.id} onClose={() => {
              setOpenAudit(false);
              dispatch(clearAuditLogs())
            }} />
          )}
             {openExcel && (
            <ExcelUpload  onClose={() => {
              setOpenExcel(false);
              // dispatch(clearAuditLogs())
            }} />
          )}
        </ContractApp>
  );
}