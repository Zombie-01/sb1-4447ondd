import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { UserInput } from "../../lib/api/users";
import { getRoles } from "../../lib/api/roles";
import { Camera } from "lucide-react";

interface UserFormProps {
  defaultValues?: Partial<UserInput>;
  onSubmit: (data: UserInput & { avatar?: File }) => Promise<void>;
  isLoading?: boolean;
}

export function UserForm({
  defaultValues,
  onSubmit,
  isLoading
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<UserInput & { avatar?: File }>({
    defaultValues
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles
  });

  // Watch for the selected file to display preview
  const avatarFile = watch("avatar");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="relative">
        <label
          htmlFor="avatar"
          className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50 cursor-pointer">
          <Camera className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Change avatar</span>
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="hidden"
          {...register("avatar")}
          onChange={handleFileChange}
        />
        {avatarFile && (
          <img
            src={URL.createObjectURL(avatarFile)}
            alt="Avatar Preview"
            className="rounded-full w-24 h-24 object-cover mx-auto"
          />
        )}
      </div>

      <div>
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          {...register("firstname", { required: "First name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.firstname && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstname.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          {...register("lastname", { required: "Last name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.lastname && (
          <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700">
          Phone number
        </label>
        <input
          type="tel"
          {...register("phone", { required: "Phone number is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="role_id"
          className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          {...register("role_id", { required: "Role is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
