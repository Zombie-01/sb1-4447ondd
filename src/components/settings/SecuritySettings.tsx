import React from 'react';
import { PasswordForm } from './PasswordForm';
import { TwoFactorSettings } from './TwoFactorSettings';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Security</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage your password and security preferences.
        </p>
      </div>

      <div className="space-y-8">
        <PasswordForm />
        <TwoFactorSettings />
      </div>
    </div>
  );
}