import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import type { CargoRegistration } from '../../lib/api/types';
import { getCapacities } from '../../lib/api/capacities';
import { getLogistics } from '../../lib/api/logistics';

export function ContainerRegistration() {
  const { register, handleSubmit, formState: { errors } } = useForm<CargoRegistration>();
  
  const { data: capacities } = useQuery({
    queryKey: ['capacities'],
    queryFn: getCapacities,
  });

  const { data: logistics } = useQuery({
    queryKey: ['logistics'],
    queryFn: getLogistics,
  });

  const onSubmit = async (data: CargoRegistration) => {
    try {
      // Handle container registration
      console.log('Registering container:', data);
    } catch (error) {
      console.error('Error registering container:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="container_serial" className="block text-sm font-medium text-gray-700">
          Container Serial
        </label>
        <input
          type="text"
          {...register('container_serial', { required: 'Container serial is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.container_serial && (
          <p className="mt-1 text-sm text-red-600">{errors.container_serial.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="capacity_id" className="block text-sm font-medium text-gray-700">
          Capacity
        </label>
        <select
          {...register('capacity_id', { required: 'Capacity is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select capacity</option>
          {capacities?.map((capacity) => (
            <option key={capacity.id} value={capacity.id}>
              {capacity.name}
            </option>
          ))}
        </select>
        {errors.capacity_id && (
          <p className="mt-1 text-sm text-red-600">{errors.capacity_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="logistic_id" className="block text-sm font-medium text-gray-700">
          Logistics Provider
        </label>
        <select
          {...register('logistic_id', { required: 'Logistics provider is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select logistics provider</option>
          {logistics?.map((logistic) => (
            <option key={logistic.id} value={logistic.id}>
              {logistic.name}
            </option>
          ))}
        </select>
        {errors.logistic_id && (
          <p className="mt-1 text-sm text-red-600">{errors.logistic_id.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register Container
        </button>
      </div>
    </form>
  );
}