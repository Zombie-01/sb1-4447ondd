import React from "react";
import { useForm } from "react-hook-form";
import { LogisticInput } from "../../lib/api/logistic";

interface logisticFormProps {
  defaultValues?: Partial<LogisticInput>;
  onSubmit: (data: LogisticInput) => Promise<void>;
  isLoading?: boolean;
}

export function LogisticForm({
  defaultValues,
  onSubmit,
  isLoading
}: logisticFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LogisticInput>({
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700">
          Company key Name
        </label>
        <input
          type="text"
          {...register("name", { required: "Company name is required" })}
          className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="company_name"
          className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          {...register("company_name", {
            required: "Company name is required"
          })}
          className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.company_name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          {...register("phone", { required: "Phone number is required" })}
          className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="account"
          className="block text-sm font-medium text-gray-700">
          Account
        </label>
        <input
          type="number"
          {...register("account", { required: "Account is required" })}
          className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.account.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          {...register("notes")}
          rows={3}
          className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

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
