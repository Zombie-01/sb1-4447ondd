import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { ThickeningWithDetails } from '../../lib/api/thickenings';
import { formatDate } from '../../lib/utils';

interface ThickeningModalProps {
  thickening: ThickeningWithDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function ThickeningModal({ thickening, isOpen, onClose }: ThickeningModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-medium">
              Thickening Details
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Date</label>
              <div className="mt-1 text-sm">{formatDate(thickening.date)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Account</label>
              <div className="mt-1 text-sm">{thickening.account_number}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Payment Type</label>
              <div className="mt-1 text-sm capitalize">{thickening.payment_type.replace('_', ' ')}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Customer</label>
              <div className="mt-1 text-sm">{thickening.customers.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Processed By</label>
              <div className="mt-1 text-sm">
                {thickening.users.firstname} {thickening.users.lastname}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Amount</label>
              <div className="mt-1 text-sm">${thickening.amount.toFixed(2)}</div>
            </div>

            {thickening.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Notes</label>
                <div className="mt-1 text-sm">{thickening.notes}</div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}