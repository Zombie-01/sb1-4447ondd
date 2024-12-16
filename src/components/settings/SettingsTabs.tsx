import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

interface SettingsTabsProps {
  tabs: Tab[];
}

export function SettingsTabs({ tabs }: SettingsTabsProps) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  const CurrentTabComponent = tabs.find(tab => tab.id === currentTab)?.component;

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={currentTab}
          onChange={(e) => setCurrentTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={cn(
                    tab.id === currentTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                >
                  <Icon
                    className={cn(
                      tab.id === currentTab
                        ? 'text-indigo-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                  />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mt-8">
        {CurrentTabComponent && <CurrentTabComponent />}
      </div>
    </div>
  );
}