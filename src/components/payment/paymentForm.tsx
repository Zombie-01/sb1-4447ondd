import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../lib/api/customers";

interface PaymentFormProps {
  onSubmit: (data: {
    customer_id: string;
    payment_date: string;
    payment_amount: number;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function PaymentForm({ onSubmit, isLoading }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      payment_date: new Date().toISOString().split("T")[0] // Set default date to today
    }
  });

  const { data: customersList } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers({}) // Ensure getcustomers fetches the list of customers
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Select customer */}
      <div>
        <label
          htmlFor="customer_id"
          className="block text-sm font-medium text-gray-700">
          customer
        </label>
        <select
          {...register("customer_id", { required: "customer is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="">Select customer</option>
          {customersList?.map((customer) => (
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
          htmlFor="payment_date"
          className="block text-sm font-medium text-gray-700">
          Payment Date
        </label>
        <input
          type="date"
          {...register("payment_date", {
            required: "Payment date is required"
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.payment_date && (
          <p className="mt-1 text-sm text-red-600">
            {errors.payment_date.message}
          </p>
        )}
      </div>

      {/* Payment Amount */}
      <div>
        <label
          htmlFor="payment_amount"
          className="block text-sm font-medium text-gray-700">
          Payment Amount
        </label>
        <input
          type="number"
          step="0.01"
          {...register("payment_amount", {
            required: "Payment amount is required",
            min: { value: 0, message: "Amount must be positive" }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.payment_amount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.payment_amount.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
