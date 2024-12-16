import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CashierEntryForm } from '../../components/cashier/CashierEntryForm';
import { getCashierEntry, updateCashierEntry } from '../../lib/api/cashier';
import type { CashierEntry } from '../../lib/api/cashier';

export function EditCashierEntry() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: entry, isLoading: isLoadingEntry } = useQuery({
    queryKey: ['cashier-entries', id],
    queryFn: () => getCashierEntry(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data: Omit<CashierEntry, 'id' | 'created_at' | 'updated_at'>) => 
      updateCashierEntry(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashier-entries'] });
      navigate('/cashier');
    },
  });

  const handleSubmit = async (data: Omit<CashierEntry, 'id' | 'created_at' | 'updated_at'>) => {
    await mutation.mutateAsync(data);
  };

  if (isLoadingEntry) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Edit Cashier Entry</h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <CashierEntryForm
            defaultValues={entry}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}