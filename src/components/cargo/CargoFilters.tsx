import React from 'react';
import { useForm } from 'react-hook-form';
import type { CargoFilters as FilterValues } from '../../lib/api/cargo';

interface CargoFiltersProps {
  onFilter?: (filters: FilterValues) => void;
}

export function CargoFilters({ onFilter }: CargoFiltersProps) {
  const { register, handleSubmit } = useForm<FilterValues>();

  return (
    <form onSubmit={handleSubmit(data => onFilter?.(data))} className="space-y-4 mt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="arrived">Arrived</option>
            <option value="unpacked">Unpacked</option>
            <option value="released">Released</option>
            <option value="departed">Departed</option>
            <option value="returned">Returned</option>
          </select>
        </div>

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
          <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            {...register('searchTerm')}
            placeholder="Search cargo..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}