import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCashierEntry } from '../../lib/api/cashier';
import type { CashierEntry } from '../../lib/api/cashier';

export function CreateCashierEntry() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCashierEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashier-entries'] });
      navigate('/cashier');
    },
  });

  const handleSubmit = async (data: Omit<PaymentsEntry, 'id' | 'created_at' | 'updated_at'>) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create Cashier Entry</h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <PaymentsEntryForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
        </div>
      </div>
    </div>
  );
}