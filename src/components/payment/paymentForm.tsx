import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getLogistics } from "../../lib/api/logistic";

interface PaymentFormProps {
  onSubmit: (data: {
    customer_id: string;
    date: string;
    value: number;
  }) => Promise<void>;
  isLoading?: boolean;
  buttonIcon?: React.ReactNode; // Allows passing an icon for the button
  defaultValues?: {
    customer_id?: string;
    date?: string;
    value?: number;
  };
}

export function PaymentFormModal({
  onSubmit,
  isLoading,
  buttonIcon,
  defaultValues = {
    date: new Date().toISOString().split("T")[0] // Default date to today
  }
}: PaymentFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  });
  const { data: customersList } = useQuery({
    queryKey: ["logistics"],
    queryFn: () => getLogistics({})
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-md border bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {buttonIcon ? buttonIcon : "Open Payment Form"}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{ marginLeft: 0 }}
          className="fixed inset-0 ml-0 space-x-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Payment Form
            </h2>
            <form
              onSubmit={handleSubmit(async (data) => {
                await onSubmit(data);
                closeModal();
              })}
              className="space-y-6">
              {/* Select Customer */}
              <div>
                <label
                  htmlFor="customer_id"
                  className="block text-sm font-medium text-gray-700">
                  Customer
                </label>
                <select
                  {...register("customer_id", {
                    required: "Customer is required"
                  })}
                  className="mt-1 block px-3 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option value="">Select Customer</option>
                  {customersList?.customers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.email}
                    </option>
                  ))}
                </select>
                {errors.customer_id && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.customer_id.message}
                  </p>
                )}
              </div>

              {/* Payment Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700">
                  Payment Date
                </label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Payment date is required"
                  })}
                  className="mt-1 block px-3 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Payment Amount */}
              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700">
                  Payment Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("value", {
                    required: "Payment amount is required",
                    min: { value: 0, message: "Amount must be positive" }
                  })}
                  className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.value && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.value.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
