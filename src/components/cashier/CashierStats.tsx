import React from 'react';
import { CreditCard, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import type { CashierEntryWithDetails } from '../../lib/api/cashier';

interface CashierStatsProps {
  entries: CashierEntryWithDetails[];
}

export function CashierStats({ entries }: CashierStatsProps) {
  const totalPayments = entries.reduce((sum, entry) => sum + entry.payment_amount, 0);
  const inMovements = entries.filter(entry => entry.movement_type === 'in').length;
  const outMovements = entries.filter(entry => entry.movement_type === 'out').length;
  
  const cashPayments = entries
    .filter(entry => entry.payment_type === 'cash')
    .reduce((sum, entry) => sum + entry.payment_amount, 0);

  const stats = [
    {
      name: 'Total Payments',
      value: formatCurrency(totalPayments),
      icon: CreditCard,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Cash Payments',
      value: formatCurrency(cashPayments),
      icon: TrendingUp,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Inbound Movements',
      value: inMovements,
      icon: ArrowDownRight,
      change: '-1.39%',
      changeType: 'negative',
    },
    {
      name: 'Outbound Movements',
      value: outMovements,
      icon: ArrowUpRight,
      change: '+10.18%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}