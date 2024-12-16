import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { ThickeningWithDetails } from '../../lib/api/thickenings';
import { formatDate, formatCurrency } from '../../lib/utils';

interface ThickeningTableProps {
  thickenings: ThickeningWithDetails[];
  onSelect: (thickening: ThickeningWithDetails) => void;
  onDelete: (id: string) => void;
}

export function ThickeningTable({ thickenings, onSelect, onDelete }: ThickeningTableProps) {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Company
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              First Payment
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Last Payment
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Debt
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Remaining
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Dans
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Account
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {thickenings.map((thickening) => (
            <tr
              key={thickening.id}
              onClick={() => onSelect(thickening)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {thickening.customers.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {thickening.first_payment_date && formatDate(thickening.first_payment_date)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {thickening.last_payment_date && formatDate(thickening.last_payment_date)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatCurrency(thickening.customers.debt)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatCurrency(thickening.customers.remaining_balance)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                {thickening.payment_type.replace('_', ' ')}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {thickening.account_number}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link
                  to={`/thickenings/${thickening.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="h-4 w-4 inline-block" />
                  <span className="sr-only">Edit</span>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(thickening.id);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4 inline-block" />
                  <span className="sr-only">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}