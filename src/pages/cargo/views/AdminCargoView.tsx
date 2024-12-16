import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCargo } from '../../../lib/api/cargo';
import { CargoTable } from '../../../components/cargo/CargoTable';
import { CargoFilters } from '../../../components/cargo/CargoFilters';

export function AdminCargoView() {
  const { data: cargo, isLoading } = useQuery({
    queryKey: ['cargo'],
    queryFn: getCargo,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">All Cargo</h1>
      <CargoFilters />
      <CargoTable cargo={cargo} showAllColumns />
    </div>
  );
}