import React from 'react';
import { Switch } from '@headlessui/react';
import { cn } from '../../lib/utils';

export function TwoFactorSettings() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div>
      <div>
        <h4 className="text-base font-medium text-gray-900">Two-Factor Authentication</h4>
        <p className="mt-1 text-sm text-gray-500">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
      </div>

      <div className="mt-4">
        <Switch.Group as="div" className="flex items-center justify-between">
          <Switch.Label as="span" className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Enable 2FA</span>
            <span className="text-sm text-gray-500">
              Use an authenticator app to generate one-time codes
            </span>
          </Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={cn(
              enabled ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
          >
            <span
              className={cn(
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
        </Switch.Group>
      </div>
    </div>
  );
}