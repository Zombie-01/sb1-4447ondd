import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { ThickeningInput } from '../../lib/api/thickenings';
import { getCustomers } from '../../lib/api/customers';

interface ThickeningFormProps {
  defaultValues?: Partial<ThickeningInput>;
  onSubmit: (data: ThickeningInput) => Promise<void>;
  isLoading?: boolean;
}

export function ThickeningForm({ defaultValues, onSubmit, isLoading }: ThickeningFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ThickeningInput>({
    defaultValues,
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          {...register('date', { required: 'Date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700">
          Customer
        </label>
        <select
          {...register('customer_id', { required: 'Customer is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a customer</option>
          {customers?.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {errors.customer_id && (
          <p className="mt-1 text-sm text-red-600">{errors.customer_id.message}</p>
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
          <option value="non_cash">Non-Cash</option>
        </select>
        {errors.payment_type && (
          <p className="mt-1 text-sm text-red-600">{errors.payment_type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { 
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="account_number" className="block text-sm font-medium text-gray-700">
          Account Number
        </label>
        <input
          type="text"
          {...register('account_number', { required: 'Account number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.account_number && (
          <p className="mt-1 text-sm text-red-600">{errors.account_number.message}</p>
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