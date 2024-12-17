import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCashierEntry } from "../../lib/api/cashier";
import { PaymentFormModal } from "../../components/payment/paymentForm";
import { createPayment } from "../../lib/api/payment";

export function CreatePayment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashier-entries"] });
    }
  });

  const handleSubmit = async (
    data: Omit<any, "id" | "created_at" | "updated_at">
  ) => {
    await mutation.mutateAsync(data);
  };

  return (
    <PaymentFormModal onSubmit={handleSubmit} isLoading={mutation.isPending} />
  );
}
