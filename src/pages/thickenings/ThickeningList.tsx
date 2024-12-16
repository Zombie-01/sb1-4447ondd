import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import { getThickenings, deleteThickening, ThickeningWithDetails } from '../../lib/api/thickenings';
import { ThickeningFilters } from '../../components/thickenings/ThickeningFilters';
import { ThickeningModal } from '../../components/thickenings/ThickeningModal';
import { ThickeningTable } from '../../components/thickenings/ThickeningTable';
import { downloadExcel } from '../../lib/utils';

export function ThickeningList() {
  const [selectedThickening, setSelectedThickening] = useState<ThickeningWithDetails | null>(null);
  const [filters, setFilters] = useState({ startDate: '', endDate: '' });
  const queryClient = useQueryClient();

  const { data: thickenings, isLoading } = useQuery({
    queryKey: ['thickenings', filters],
    queryFn: () => getThickenings(filters.startDate, filters.endDate),
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this thickening?')) {
      try {
        await deleteThickening(id);
        queryClient.invalidateQueries({ queryKey: ['thickenings'] });
      } catch (error) {
        console.error('Error deleting thickening:', error);
      }
    }
  };

  const handleExport = () => {
    if (!thickenings) return;
    
    const exportData = thickenings.map(t => ({
      Company: t.customers.name,
      'First Payment': t.first_payment_date,
      'Last Payment': t.last_payment_date,
      Debt: t.customers.debt,
      Remaining: t.customers.remaining_balance,
      Dans: t.payment_type,
      Account: t.account_number,
      Date: t.date,
      Amount: t.amount,
      Notes: t.notes
    }));

    downloadExcel(exportData, 'thickenings-export');
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
          <h1 className="text-2xl font-semibold text-gray-900">Thickenings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and track all thickening records
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
            to="/thickenings/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Thickening
          </Link>
        </div>
      </div>

      <ThickeningFilters onFilter={setFilters} />

      {thickenings && (
        <ThickeningTable
          thickenings={thickenings}
          onSelect={setSelectedThickening}
          onDelete={handleDelete}
        />
      )}

      {selectedThickening && (
        <ThickeningModal
          thickening={selectedThickening}
          isOpen={!!selectedThickening}
          onClose={() => setSelectedThickening(null)}
        />
      )}
    </div>
  );
}