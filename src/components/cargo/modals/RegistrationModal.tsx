import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function RegistrationModal({
  isOpen,
  onClose,
  title,
  children
}: RegistrationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full rounded-lg bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {title}
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-4 py-5">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
