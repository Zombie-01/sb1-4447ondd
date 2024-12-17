import React, { useState } from "react";
import type { CargoWithDetails } from "../../../lib/api/cargo";
import { CargoDetails } from "../details/CargoDetails";
import { CargoFilters } from "../filters/CargoFilters";
import { CargoTable } from "../table/CargoTable";
import { useRegistrationModal } from "../../../hooks/useRegistrationModal";
import { CargoRegistration, FieldRegistration } from "../../../lib/api/types";
import { RegistrationModal } from "../modals/RegistrationModal";
import { ContainerRegistrationForm } from "../forms/ContainerRegistrationForm";
import { FieldRegistrationForm } from "../forms/FieldRegistrationForm";

export function CargoPageLayout() {
  const { modalType, openModal, closeModal, isOpen } = useRegistrationModal();
  const [selectedCargo, setSelectedCargo] = useState<CargoWithDetails | null>(
    null
  );

  const handleContainerSubmit = async (data: CargoRegistration) => {
    try {
      // Handle container registration logic
      closeModal();
    } catch (error) {
      console.error("Error registering container:", error);
    }
  };

  const handleFieldSubmit = async (data: FieldRegistration) => {
    try {
      // Handle field registration logic
      closeModal();
    } catch (error) {
      console.error("Error registering field:", error);
    }
  };

  return (
    <div className="h-full w-full">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Cargo Management
        </h1>
      </div>

      {/* Buttons to Open Modals */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => openModal("container")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Register Container
        </button>
        <button
          onClick={() => openModal("field")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Register Field
        </button>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isOpen}
        onClose={closeModal}
        title={
          modalType === "container"
            ? "Container Registration"
            : "Field Registration"
        }>
        {modalType === "container" ? (
          <ContainerRegistrationForm
            onSubmit={handleContainerSubmit}
            onCancel={closeModal}
          />
        ) : (
          <FieldRegistrationForm
            onSubmit={handleFieldSubmit}
            onCancel={closeModal}
          />
        )}
      </RegistrationModal>

      {/* Filters Section */}
      <div className="mb-6">
        <CargoFilters />
      </div>

      {/* Table and Details Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Cargo Table */}
        <div className="col-span-7">
          <CargoTable
            onSelect={setSelectedCargo}
            selectedId={selectedCargo?.id}
          />
        </div>

        {/* Cargo Details */}
        <div className="col-span-5">
          {selectedCargo ? (
            <CargoDetails cargo={selectedCargo} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a cargo item to see details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
