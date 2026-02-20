/**
 * Custom hook for managing contract state and operations
 */

import { useState, useCallback } from "react";
import type { Contract, CMOFormData } from "../types";
import { logger } from "../utils/logger";
import contractsData from "../../data/contracts.json";

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Add a new contract to the list
   */
  const addContract = useCallback((data: CMOFormData) => {
    const newContract: Contract = {
      id: contracts.length + 1,
      cmoParent: data.cmoParent || "",
      yearSpend: data.yearSpend || "",
      cmoName: data.cmoName || "",
      signingEntity1: data.signingEntity1 || "",
      supplierEntity2: data.supplierEntity2 || "",
      supplierEntity3: data.supplierEntity3 || "",
      location: data.location || "",
      relationshipOwner: data.relationshipOwner || "",
      territory: data.territory || "",
      status: "Active",
      progress: 0,
    };

    setContracts((prev) => [...prev, newContract]);
    logger.info("Contract added successfully", newContract);
    return newContract;
  }, [contracts.length]);

  /**
   * Update an existing contract
   */
  const updateContract = useCallback((id: number, updates: Partial<Contract>) => {
    setContracts((prev) =>
      prev.map((contract) =>
        contract.id === id ? { ...contract, ...updates } : contract
      )
    );
  }, []);

  /**
   * Delete a contract
   */
  const deleteContract = useCallback((id: number) => {
    setContracts((prev) => prev.filter((contract) => contract.id !== id));
  }, []);

  /**
   * Select a contract for viewing/editing
   */
  const selectContract = useCallback((contract: Contract | null) => {
    setSelectedContract(contract);
  }, []);

  /**
   * Reload contracts data
   */
  const reloadContracts = useCallback((delay: number = 1000) => {
    setLoading(true);
    setTimeout(() => {
      setContracts(contractsData);
      setLoading(false);
    }, delay);
  }, []);

  return {
    contracts,
    selectedContract,
    loading,
    addContract,
    updateContract,
    deleteContract,
    selectContract,
    reloadContracts,
  };
};