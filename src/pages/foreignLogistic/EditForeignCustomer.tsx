import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ForeignLogisticForm } from "../../components/foreignLogistic/foreignLogisticForm";
import {
  ForeignLogisticInput,
  getForeignLogistic,
  updateForeignLogistic
} from "../../lib/api/foreignLogistic";

export function EditForeignLogistic() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: customer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ["foreign_logistics", id],
    queryFn: () => getForeignLogistic(id!),
    enabled: !!id
  });

  const mutation = useMutation({
    mutationFn: (data: ForeignLogisticInput) =>
      updateForeignLogistic(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foreign_logistics"] });
      navigate("/logistic");
    }
  });

  const handleSubmit = async (data: ForeignLogisticInput) => {
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
        Edit Foreign Logistic
      </h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ForeignLogisticForm
            defaultValues={customer}
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
