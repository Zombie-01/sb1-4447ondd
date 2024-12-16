import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface Tab {
  id: string;
  name: string;
  component: React.ComponentType;
}

interface TabsProps {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const CurrentTabComponent = tabs.find(tab => tab.id === currentTab)?.component;

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={cn(
                tab.id === currentTab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        {CurrentTabComponent && <CurrentTabComponent />}
      </div>
    </div>
  );
}