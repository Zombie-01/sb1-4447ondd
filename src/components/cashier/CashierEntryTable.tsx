import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { CashierEntryWithDetails } from '../../lib/api/cashier';
import { formatDate, formatCurrency } from '../../lib/utils';

interface CashierEntryTableProps {
  entries: CashierEntryWithDetails[];
  onDelete: (id: string) => void;
}

export function CashierEntryTable({ entries, onDelete }: CashierEntryTableProps) {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Entry Date
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Container
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Customer
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Payment
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Yard Location
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Movement
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                {formatDate(entry.entry_date)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {entry.container_number}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {entry.cargo.customer.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div>{formatCurrency(entry.payment_amount)}</div>
                <div className="text-xs text-gray-400 capitalize">{entry.payment_type}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {entry.yard_location}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  entry.movement_type === 'in' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {entry.movement_type.toUpperCase()}
                </span>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <Link
                  to={`/cashier/${entry.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <Pencil className="h-4 w-4 inline-block" />
                  <span className="sr-only">Edit</span>
                </Link>
                <button
                  onClick={() => onDelete(entry.id)}
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