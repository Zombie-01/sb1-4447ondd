import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserForm } from "../../components/users/UserForm";
import { createUser, UserInput } from "../../lib/api/users";

export function CreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
    onError: (error: unknown) => {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  });

  const handleSubmit = async (data: UserInput & { avatar: File | null }) => {
    try {
      console.log("daa", data);
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Create User</h1>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <UserForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
        </div>
      </div>
    </div>
  );
}
