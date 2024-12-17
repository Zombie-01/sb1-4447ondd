import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createForeignLogistic,
  ForeignLogisticInput
} from "../../lib/api/foreignLogistic";
import { ForeignLogisticForm } from "../../components/foreignLogistic/foreignLogisticForm";

export function CreateForeignLogistic() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createForeignLogistic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foreign_logistics"] });
      navigate("/logistic");
    }
  });

  const handleSubmit = async (data: ForeignLogisticInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Create Logistic
      </h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <ForeignLogisticForm
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
