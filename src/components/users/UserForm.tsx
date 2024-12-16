import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { UserInput } from '../../lib/api/users';
import { getRoles } from '../../lib/api/roles';

interface UserFormProps {
  defaultValues?: Partial<UserInput>;
  onSubmit: (data: UserInput) => Promise<void>;
  isLoading?: boolean;
}

export function UserForm({ defaultValues, onSubmit, isLoading }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>({
    defaultValues,
  });

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          {...register('firstname', { required: 'First name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.firstname && (
          <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          {...register('lastname', { required: 'Last name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.lastname && (
          <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          {...register('role_id', { required: 'Role is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a role</option>
          {roles?.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.role_id && (
          <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>
        )}
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