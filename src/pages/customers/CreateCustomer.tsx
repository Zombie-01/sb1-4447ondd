import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerForm } from '../../components/customers/CustomerForm';
import { createCustomer, CustomerInput } from '../../lib/api/customers';

export function CreateCustomer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/customers');
    },
  });

  const handleSubmit = async (data: CustomerInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create Customer</h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <CustomerForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
        </div>
      </div>
    </div>
  );
}