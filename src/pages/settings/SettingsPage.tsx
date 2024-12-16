import React from 'react';
import { Cog, User, Bell, Shield, Key } from 'lucide-react';
import { SettingsTabs } from '../../components/settings/SettingsTabs';
import { ProfileSettings } from '../../components/settings/ProfileSettings';
import { SecuritySettings } from '../../components/settings/SecuritySettings';
import { NotificationSettings } from '../../components/settings/NotificationSettings';

const tabs = [
  { id: 'profile', name: 'Profile', icon: User, component: ProfileSettings },
  { id: 'security', name: 'Security', icon: Shield, component: SecuritySettings },
  { id: 'notifications', name: 'Notifications', icon: Bell, component: NotificationSettings },
];

export function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <SettingsTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}