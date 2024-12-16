import React from 'react';
import { useAuth } from '../../lib/auth';

export function SidebarProfile() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900">
      <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-500">
          {user.email?.[0].toUpperCase()}
        </span>
      </div>
      <div className="flex-1">
        <span className="sr-only">Your profile</span>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
      <button
        onClick={() => signOut()}
        className="text-xs text-red-600 hover:text-red-700"
      >
        Logout
      </button>
    </div>
  );
}