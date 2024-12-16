import React from 'react';
import { BarChart3, Package, Truck, Users } from 'lucide-react';

const stats = [
  { name: 'Total Cargo', value: '2,651', icon: Package },
  { name: 'Active Shipments', value: '427', icon: Truck },
  { name: 'Customers', value: '156', icon: Users },
  { name: 'Monthly Revenue', value: '$35,621', icon: BarChart3 },
];

export function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h3>
            <div className="mt-6">
              <ul role="list" className="divide-y divide-gray-200">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Cargo #{item}234</h3>
                          <p className="text-sm text-gray-500">2h ago</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          Status updated to "In Transit"
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Create New Shipment
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}