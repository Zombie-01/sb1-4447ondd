import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getUsers, deleteUser } from "../../lib/api/users";
import { getRoles } from "../../lib/api/roles";

export function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", { searchTerm, role, page, limit }],
    queryFn: () => getUsers({ searchTerm, role, page, limit }) // Pass the query parameters correctly
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        // Invalidate and refetch queries
        // queryClient.invalidateQueries({ queryKey: ['users'] });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users in the system including their name, role, and
            status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/users/new"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-3  w-full sm:w-1/3"
        />
        <div className="flex items-center justify-between mt-4">
          <div>Role</div>
          <div className="flex items-center">
            <label htmlFor="role" className="mr-2 text-sm text-gray-700">
              Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)} // Set the role state
              className="block border rounded px-3 py-2 w-full focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">All</option>
              {roles?.map((role: any) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Login
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {isLoading ? (
                    <div className="flex w-full justify-center items-center h-48">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                  ) : (
                    users?.customers?.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="font-medium text-gray-900">
                            {user.firstname} {user.lastname}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.roles?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.last_login
                            ? new Date(user.last_login).toLocaleDateString()
                            : "Never"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            to={`/users/${user.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4">
                            <Pencil className="h-4 w-4 inline-block" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4 inline-block" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center justify-between mt-4">
          <div>
            Showing {users?.customers.length} of {users?.total} customers
          </div>
          <div className="flex items-center">
            <label htmlFor="limit" className="mr-2 text-sm text-gray-700">
              Show:
            </label>
            <select
              id="limit"
              value={limit} // bind this to your limit state
              onChange={(e) => setLimit(Number(e.target.value))} // update the limit state on change
              className="block border rounded px-3 py-2 w-full  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50">
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={(users?.customers?.length || 0) < limit}
            className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
