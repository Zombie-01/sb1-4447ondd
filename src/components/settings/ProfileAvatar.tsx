import React from 'react';
import { useAuth } from '../../lib/auth';
import { Camera } from 'lucide-react';

export function ProfileAvatar() {
  const { user } = useAuth();
  const initials = user?.email?.[0].toUpperCase() || '?';

  return (
    <div className="relative">
      <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600">
        {initials}
      </div>
      <button
        type="button"
        className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50"
      >
        <Camera className="h-5 w-5 text-gray-500" />
        <span className="sr-only">Change avatar</span>
      </button>
    </div>
  );
}