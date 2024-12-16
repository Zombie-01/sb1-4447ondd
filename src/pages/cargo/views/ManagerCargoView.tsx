import React from 'react';
import { Tabs } from '../../../components/ui/Tabs';
import { ContainerRegistration } from '../../../components/cargo/ContainerRegistration';
import { FieldRegistration } from '../../../components/cargo/FieldRegistration';

const tabs = [
  { id: 'container', name: 'Container Registration', component: ContainerRegistration },
  { id: 'field', name: 'Field Registration', component: FieldRegistration },
];

export function ManagerCargoView() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Cargo Management</h1>
      <div className="mt-4">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}