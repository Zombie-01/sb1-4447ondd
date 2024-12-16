import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getCargo } from '../../lib/api/cargo';

interface CashierEntryFormProps {
  defaultValues?: Partial<any>;
  onSubmit: (data: Omit<any, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  isLoading?: boolean;
}

export function CashierEntryForm({ defaultValues, onSubmit, isLoading }: CashierEntryFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  const { data: cargoList } = useQuery({
    queryKey: ['cargo'],
    queryFn: getCargo,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="cargo_id" className="block text-sm font-medium text-gray-700">
          Cargo
        </label>
        <select
          {...register('cargo_id', { required: 'Cargo is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select cargo</option>
          {cargoList?.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.container_serial} - {cargo.cargo_name}
            </option>
          ))}
        </select>
        {errors.cargo_id && (
          <p className="mt-1 text-sm text-red-600">{errors.cargo_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="entry_date" className="block text-sm font-medium text-gray-700">
          Entry Date
        </label>
        <input
          type="date"
          {...register('entry_date', { required: 'Entry date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.entry_date && (
          <p className="mt-1 text-sm text-red-600">{errors.entry_date.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="container_number" className="block text-sm font-medium text-gray-700">
          Container Number
        </label>
        <input
          type="text"
          {...register('container_number', { required: 'Container number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.container_number && (
          <p className="mt-1 text-sm text-red-600">{errors.container_number.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="payment_amount" className="block text-sm font-medium text-gray-700">
          Payment Amount
        </label>
        <input
          type="number"
          step="0.01"
          {...register('payment_amount', { 
            required: 'Payment amount is required',
            min: { value: 0, message: 'Amount must be positive' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.payment_amount && (
          <p className="mt-1 text-sm text-red-600">{errors.payment_amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="payment_type" className="block text-sm font-medium text-gray-700">
          Payment Type
        </label>
        <select
          {...register('payment_type', { required: 'Payment type is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select payment type</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="transfer">Transfer</option>
        </select>
        {errors.payment_type && (
          <p className="mt-1 text-sm text-red-600">{errors.payment_type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="yard_location" className="block text-sm font-medium text-gray-700">
          Yard Location
        </label>
        <input
          type="text"
          {...register('yard_location', { required: 'Yard location is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.yard_location && (
          <p className="mt-1 text-sm text-red-600">{errors.yard_location.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="movement_type" className="block text-sm font-medium text-gray-700">
          Movement Type
        </label>
        <select
          {...register('movement_type', { required: 'Movement type is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select movement type</option>
          <option value="in">In</option>
          <option value="out">Out</option>
        </select>
        {errors.movement_type && (
          <p className="mt-1 text-sm text-red-600">{errors.movement_type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="movement_date" className="block text-sm font-medium text-gray-700">
          Movement Date
        </label>
        <input
          type="date"
          {...register('movement_date', { required: 'Movement date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.movement_date && (
          <p className="mt-1 text-sm text-red-600">{errors.movement_date.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}