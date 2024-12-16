import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { getCashierEntries, deleteCashierEntry } from '../../lib/api/cashier';
import { CashierEntryTable } from '../../components/cashier/CashierEntryTable';
import { CashierEntryFilters } from '../../components/cashier/CashierEntryFilters';
import { CashierStats } from '../../components/cashier/CashierStats';
import { downloadExcel } from '../../lib/utils';

export function CashierDashboard() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    paymentType: '',
    movementType: '',
  });

  const { data: entries, isLoading } = useQuery({
    queryKey: ['cashier-entries', filters],
    queryFn: () => getCashierEntries(),
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteCashierEntry(id);
        // Query will automatically refresh
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
  };

  const handleExport = () => {
    if (!entries) return;

    const exportData = entries.map((entry) => ({
      'Entry Date': entry.entry_date,
      'Container Number': entry.container_number,
      Customer: entry.cargo.customer.name,
      'Payment Amount': entry.payment_amount,
      'Payment Type': entry.payment_type,
      'Yard Location': entry.yard_location,
      'Movement Type': entry.movement_type,
      'Movement Date': entry.movement_date,
      Notes: entry.notes,
    }));

    downloadExcel(exportData, 'cashier-entries');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Cashier Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage cargo entries, payments, and yard movements
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <Link
            to="/cashier/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Link>
        </div>
      </div>

      {entries && <CashierStats entries={entries} />}

      <CashierEntryFilters onFilter={setFilters} />

      {entries && (
        <CashierEntryTable entries={entries} onDelete={handleDelete} />
      )}
    </div>
  );
}
