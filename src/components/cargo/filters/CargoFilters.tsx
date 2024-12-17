import React from "react";
import { useForm } from "react-hook-form";
import { Search, Filter } from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";
import type { CargoFilters as FilterValues } from "../../../lib/api/cargo";

interface CargoFiltersProps {
  onFilter?: (filters: FilterValues) => void;
}

export function CargoFilters({ onFilter }: CargoFiltersProps) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FilterValues>();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <form
          onSubmit={handleSubmit((data) => onFilter?.(data))}
          className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                cargo.status
              </label>
              <select
                {...register("status")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option value="">common.all</option>
                <option value="pending">cargo.status.pending</option>
                <option value="in_transit">cargo.status.inTransit</option>
                <option value="arrived">cargo.status.arrived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                cargo.dateRange
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  {...register("startDate")}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  type="date"
                  {...register("endDate")}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                common.search
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  {...register("searchTerm")}
                  className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="cargo.searchPlaceholder"
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <Filter className="mr-2 h-4 w-4" />
                common.filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
