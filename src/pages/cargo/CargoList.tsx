import React from 'react';
import { useUserRole } from '../../hooks/useUserRole';
import { AdminCargoView } from './views/AdminCargoView';
import { ManagerCargoView } from './views/ManagerCargoView';
import { CashierCargoView } from './views/CashierCargoView';

export function CargoList() {
  const userRole = useUserRole();

  switch (userRole) {
    case 'admin':
      return <AdminCargoView />;
    case 'manager':
      return <ManagerCargoView />;
    case 'cashier':
      return <CashierCargoView />;
    default:
      return <div>Access Denied</div>;
  }
}