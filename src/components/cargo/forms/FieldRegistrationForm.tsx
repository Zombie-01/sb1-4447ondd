import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../../hooks/useTranslation";
import type { FieldRegistration } from "../../../lib/api/types";

interface FieldRegistrationFormProps {
  onSubmit: (data: FieldRegistration) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function FieldRegistrationForm({
  onSubmit,
  onCancel,
  isLoading
}: FieldRegistrationFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldRegistration>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="wagon_number"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.wagonNumber")}
          </label>
          <input
            type="text"
            {...register("wagon_number", {
              required: t("validation.required", {
                field: t("cargo.wagonNumber")
              })
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.wagon_number && (
            <p className="mt-1 text-sm text-red-600">
              {errors.wagon_number.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="shipment_number"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.shipmentNumber")}
          </label>
          <input
            type="text"
            {...register("shipment_number")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="station"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.station")}
          </label>
          <input
            type="text"
            {...register("station")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="transport_route"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.transportRoute")}
          </label>
          <input
            type="text"
            {...register("transport_route")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="cargo_type"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.type")}
          </label>
          <input
            type="text"
            {...register("cargo_type")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="net_weight"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.netWeight")}
          </label>
          <input
            type="number"
            step="0.01"
            {...register("net_weight", {
              valueAsNumber: true,
              min: { value: 0, message: t("validation.min", { value: 0 }) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.net_weight && (
            <p className="mt-1 text-sm text-red-600">
              {errors.net_weight.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.weight")}
          </label>
          <input
            type="number"
            step="0.01"
            {...register("weight", {
              valueAsNumber: true,
              min: { value: 0, message: t("validation.min", { value: 0 }) }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="recipient_name"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.recipientName")}
          </label>
          <input
            type="text"
            {...register("recipient_name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="recipient_phone"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.recipientPhone")}
          </label>
          <input
            type="tel"
            {...register("recipient_phone")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
          {isLoading ? t("common.saving") : t("common.save")}
        </button>
      </div>
    </form>
  );
}
