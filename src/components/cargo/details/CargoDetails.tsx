import React from "react";
import { Package, Truck, User, Calendar } from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";
import type { CargoWithDetails } from "../../../lib/api/cargo";
import { formatDate } from "../../../lib/utils";

interface CargoDetailsProps {
  cargo: CargoWithDetails;
}

export function CargoDetails({ cargo }: CargoDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {t("cargo.details")}
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Package className="mr-2 h-4 w-4" />
              {t("cargo.containerSerial")}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {cargo.container_serial}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <User className="mr-2 h-4 w-4" />
              {t("cargo.customer")}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {cargo.customer?.name}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              {t("cargo.logisticsProvider")}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {cargo.logistic?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {t("cargo.dates")}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div className="space-y-2">
                {cargo.f_arrived_date && (
                  <div>
                    <span className="font-medium">
                      {t("cargo.arrivedDate")}:
                    </span>{" "}
                    {formatDate(cargo.f_arrived_date)}
                  </div>
                )}
                {cargo.f_unpacked_date && (
                  <div>
                    <span className="font-medium">
                      {t("cargo.unpackedDate")}:
                    </span>{" "}
                    {formatDate(cargo.f_unpacked_date)}
                  </div>
                )}
                {cargo.f_released_date && (
                  <div>
                    <span className="font-medium">
                      {t("cargo.releasedDate")}:
                    </span>{" "}
                    {formatDate(cargo.f_released_date)}
                  </div>
                )}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
