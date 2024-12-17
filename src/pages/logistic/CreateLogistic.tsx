import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogisticForm } from "../../components/logistic/logisticForm";
import { createLogistic, LogisticInput } from "../../lib/api/logistic";

export function CreateLogistic() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLogistic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("/logistic");
    }
  });

  const handleSubmit = async (data: LogisticInput) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Create Logistic
      </h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <LogisticForm
            onSubmit={handleSubmit}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
