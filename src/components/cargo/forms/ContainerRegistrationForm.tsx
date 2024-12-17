import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "../../../hooks/useTranslation";
import type { ContainerRegistration } from "../../../lib/api/types";
import { getLogistics } from "../../../lib/api/logistic";

interface ContainerRegistrationFormProps {
  onSubmit: (data: ContainerRegistration) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ContainerRegistrationForm({
  onSubmit,
  onCancel,
  isLoading
}: ContainerRegistrationFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContainerRegistration>();

  const { data: customersList } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getLogistics({})
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 grid grid-cols-2 gap-6">
      {/* Cargo Information Section */}
      <div className="shadow rounded-lg p-6 bg-white">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("cargo.information")}
        </h3>

        <div>
          <label
            htmlFor="container_serial"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.containerSerial")}
          </label>
          <input
            type="text"
            {...register("container_serial", {
              required: t("validation.required", {
                field: t("cargo.containerSerial")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.container_serial && (
            <p className="mt-1 text-sm text-red-600">
              {errors.container_serial.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customer_id"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.customer")}
          </label>
          <select
            {...register("customer_id", {
              required: t("validation.required", {
                field: t("cargo.customer")
              })
            })}
            className="mt-1 block px-3 py-2 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">{t("common.select")}</option>
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

        <div>
          <label
            htmlFor="logistic_id"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.logisticsProvider")}
          </label>
          {/* Uncomment and update the select for logistics providers when ready */}
          {/* <select
            {...register("logistic_id", {
              required: t("validation.required", {
                field: t("cargo.logisticsProvider")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option value="">{t("common.select")}</option>
            {logistics?.map((logistic) => (
              <option key={logistic.id} value={logistic.id}>
                {logistic.name}
              </option>
            ))}
          </select> */}
          {errors.logistic_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.logistic_id.message}
            </p>
          )}
        </div>
      </div>

      {/* Financial Information Section */}
      <div className="shadow rounded-lg p-6 bg-white mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("financial.information")}
        </h3>

        <div>
          <label
            htmlFor="freight_cost"
            className="block text-sm font-medium text-gray-700">
            {t("financial.freightCost")}
          </label>
          <input
            type="number"
            {...register("freight_cost", {
              required: t("validation.required", {
                field: t("financial.freightCost")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.freight_cost && (
            <p className="mt-1 text-sm text-red-600">
              {errors.freight_cost.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700">
            {t("financial.currency")}
          </label>
          <input
            type="text"
            {...register("currency", {
              required: t("validation.required", {
                field: t("financial.currency")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.currency && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currency.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="payment_method"
            className="block text-sm font-medium text-gray-700">
            {t("financial.paymentMethod")}
          </label>
          <input
            type="text"
            {...register("payment_method", {
              required: t("validation.required", {
                field: t("financial.paymentMethod")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.payment_method && (
            <p className="mt-1 text-sm text-red-600">
              {errors.payment_method.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="additional_fees"
            className="block text-sm font-medium text-gray-700">
            {t("financial.additionalFees")}
          </label>
          <input
            type="text"
            {...register("additional_fees")}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="transfer_fee"
            className="block text-sm font-medium text-gray-700">
            {t("financial.transferFee")}
          </label>
          <input
            type="number"
            {...register("transfer_fee")}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="payment_responsible"
            className="block text-sm font-medium text-gray-700">
            {t("financial.paymentResponsible")}
          </label>
          <input
            type="text"
            {...register("payment_responsible")}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Cargo Contact Information Section */}
      <div className="shadow rounded-lg p-6 bg-white mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t("cargo.contactInformation")}
        </h3>

        <div>
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.recipient")}
          </label>
          <input
            type="text"
            {...register("recipient", {
              required: t("validation.required", {
                field: t("cargo.recipient")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.recipient && (
            <p className="mt-1 text-sm text-red-600">
              {errors.recipient.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700">
            {t("cargo.phoneNumber")}
          </label>
          <input
            type="tel"
            {...register("phone_number", {
              required: t("validation.required", {
                field: t("cargo.phone")
              })
            })}
            className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone_number.message}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div>
        <div className="flex justify-end space-x-3 mt-6">
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
      </div>
    </form>
  );
}
