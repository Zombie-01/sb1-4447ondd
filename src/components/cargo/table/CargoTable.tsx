import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import { useTranslation } from "../../../hooks/useTranslation";
import { getCargo } from "../../../lib/api/cargo";
import type { CargoWithDetails } from "../../../lib/api/cargo";
import { cn } from "../../../lib/utils";

interface CargoTableProps {
  onSelect: (cargo: CargoWithDetails) => void;
  selectedId?: string;
}

export function CargoTable({ onSelect, selectedId }: CargoTableProps) {
  const { t } = useTranslation();
  const { data: cargo, isLoading } = useQuery({
    queryKey: ["cargo"],
    queryFn: () => {}
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              cargo.containerSerial
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              cargo.customer
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              cargo.status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* {cargo &&
            cargo?.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className={cn(
                  "cursor-pointer hover:bg-gray-50",
                  selectedId === item.id && "bg-indigo-50"
                )}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">
                      {item.container_serial}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {item.customer?.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            ))} */}
        </tbody>
      </table>
    </div>
  );
}
