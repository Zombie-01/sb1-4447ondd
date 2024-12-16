import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerForm } from '../../components/customers/CustomerForm';
import {
  getCustomer,
  updateCustomer,
  CustomerInput,
} from '../../lib/api/customers';

export function EditCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: customer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ['customers', id],
    queryFn: () => getCustomer(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: CustomerInput) => updateCustomer(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/customers');
    },
  });

  const handleSubmit = async (data: CustomerInput) => {
    await mutation.mutateAsync(data);
  };

  if (isLoadingCustomer) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Edit Customer
      </h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <CustomerForm
            defaultValues={customer}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
