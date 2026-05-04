import { memo, useEffect, useState } from "react";
import { SecondaryActionBar } from "../SecondaryActionBar";
import { DropdownTypeSidebar } from "./DropdownTypeSidebar";
import { DropdownManagementPage } from "./DropdownManagementPage";
import { useAppDispatch } from "@/app/store/hooks";
import { fetchDropdownOptions } from "@/app/store/dropdowns/dropdownThunks";

const TYPES = [
  { key: "territory", label: "Territory" },
  { key: "typeOfAgreement", label: "Type of Agreement" },
  { key: "initialTerm", label: "Initial Term" },
  { key: "autoRenewTerms", label: "Auto Renew Terms" },
  { key: "paymentTerms", label: "Payment Terms" },
  { key: "deliveryTermsG2S", label: "Delivery Terms (Gilead → Supplier)" },
  { key: "deliveryTermsS2G", label: "Delivery Terms (Supplier → Gilead)" },
];


export const DropdownPage = memo(() => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState(TYPES[0].key);

  useEffect(() => {
    dispatch(fetchDropdownOptions({ type }));
  }, [type, dispatch]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <SecondaryActionBar onBackClick={handleBack} />

      <div className="mx-auto px-4 py-4">
        <div className="stepper-layout-container flex gap-4">
          <div className="flex-shrink-0 flex">
            <DropdownTypeSidebar
              selected={type}
              onSelect={setType}
              options={TYPES}
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="stepper-content-area flex flex-col flex-1">
            <DropdownManagementPage type={type} />
          </div>
        </div>
      </div>
    </>
  );
});

DropdownPage.displayName = "DropdownPage";