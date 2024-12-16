import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Download } from "lucide-react";
import { downloadExcel } from "../../lib/utils";
import { deletePayment, getPayments } from "../../lib/api/payment";

export function PaymentList() {
  const [filters, setFilters] = useState({
    company_name: "",
    startDate: "",
    endDate: ""
  });

  // Fetching payments
  const {
    data: entries,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["payments", filters],
    queryFn: () => getPayments(filters) // Fetch payments with filters
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await deletePayment(id); // Delete payment
        refetch(); // Refresh data after deletion
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const handleExport = () => {
    if (!entries) return;

    const exportData = entries.map((entry) => ({
      "Entry Date": entry.entry_date,
      "Company Name": entry.cargo.customer.name,
      "Payment Amount": entry.payment_amount,
      "Payment Type": entry.payment_type,
      "Yard Location": entry.yard_location,
      "Movement Type": entry.movement_type,
      "Movement Date": entry.movement_date,
      Notes: entry.notes
    }));

    downloadExcel(exportData, "payments");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Payment List</h1>
          <p className="mt-2 text-sm text-gray-700">
            Search and manage payment entries by company name or date range.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <Link
            to="/payment/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="company_name"
              className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={filters.company_name}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : entries?.payment?.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Entry Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Company Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Payment Amount
                </th>
                <th scope="col" className="relative px-6 py-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(entry.entry_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.cargo.customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.payment_amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-sm text-gray-500">No payments found.</p>
        )}
      </div>
    </div>
  );
}
