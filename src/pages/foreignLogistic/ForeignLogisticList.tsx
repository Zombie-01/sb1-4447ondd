import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import {
  deleteForeignLogistic,
  getForeignLogistics,
  toggleForeignLogisticActive
} from "../../lib/api/foreignLogistic";

export function ForeignLogisticList() {
  const queryClient = useQueryClient();

  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch logistic with filters and pagination
  const { data, isLoading } = useQuery({
    queryKey: [
      "foreign_logistic",
      { searchTerm, startDate, endDate, page, limit }
    ],
    queryFn: () =>
      getForeignLogistics({ searchTerm, startDate, endDate, page, limit })
  });

  const { mutate: toggleActive } = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      toggleForeignLogisticActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foreign_logistic"] });
    },
    onError: (error) => {
      console.error("Failed to toggle active state:", error);
    }
  });

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this foreign logistic?")
    ) {
      try {
        await deleteForeignLogistic(id);
        queryClient.invalidateQueries({ queryKey: ["foreign_logistic"] });
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    toggleActive({ id, isActive });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleDateChange = (type: "start" | "end", value: string) => {
    if (type === "start") setStartDate(value);
    else setEndDate(value);
    setPage(1); // Reset to first page on date filter change
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Foreign logistic
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/foreign/logistic/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            <Plus className="h-4 w-4 mr-2" />
            Add Foreign Logistic
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-3 py-2 w-full sm:w-1/3"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleDateChange("end", e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Company
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>

                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Active
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 w-full bg-white">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="flex w-full justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                      </td>
                    </tr>
                  ) : (
                    data?.foreign_logistics.map((logistic) => (
                      <tr key={logistic.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="font-medium text-gray-900">
                            {logistic.name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                            <div className="font-medium text-gray-900">
                              {logistic.company_name}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div>{logistic.email}</div>
                          <div>{logistic.phone}</div>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            onClick={() =>
                              handleToggleActive(
                                logistic.id,
                                logistic.is_active
                              )
                            }
                            className={`px-2 py-1 rounded ${
                              logistic.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                            {logistic.is_active ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/foreign/logistic/${logistic.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <Pencil className="h-4 w-4 inline-block" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(logistic.id)}
                            className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4 inline-block" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center justify-between mt-4">
          <div>
            Showing {data?.foreign_logistics.length} of {data?.total} logistic
          </div>
          <div className="flex items-center">
            <label htmlFor="limit" className="mr-2 text-sm text-gray-700">
              Show:
            </label>
            <select
              id="limit"
              value={limit} // bind this to your limit state
              onChange={(e) => setLimit(Number(e.target.value))} // update the limit state on change
              className="block border rounded px-3 py-2 w-full  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50">
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={(data?.foreign_logistics?.length || 0) < limit}
            className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
