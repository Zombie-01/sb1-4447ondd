import React from 'react';
import { useForm } from 'react-hook-form';

interface FilterValues {
  startDate: string;
  endDate: string;
  paymentType?: string;
  movementType?: string;
}

interface CashierEntryFiltersProps {
  onFilter: (filters: FilterValues) => void;
}

export function CashierEntryFilters({ onFilter }: CashierEntryFiltersProps) {
  const { register, handleSubmit, reset } = useForm<FilterValues>();

  return (
    <form onSubmit={handleSubmit(onFilter)} className="space-y-4 mb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            {...register('startDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            {...register('endDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">
            Payment Type
          </label>
          <select
            {...register('paymentType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div>
          <label htmlFor="movementType" className="block text-sm font-medium text-gray-700">
            Movement Type
          </label>
          <select
            {...register('movementType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Reset
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}