import React from 'react';
import { useAuth } from '../../lib/auth';
import { ProfileForm } from './ProfileForm';
import { ProfileAvatar } from './ProfileAvatar';

export function ProfileSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information and profile settings.
        </p>
      </div>

      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <ProfileAvatar />
        </div>

        <div className="flex-1">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}