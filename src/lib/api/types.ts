// Add to existing types
export type UserRole = 'admin' | 'manager' | 'cashier';

export interface CargoRegistration {
  container_serial: string;
  capacity_id: string;
  logistic_id: string;
  // ... other container registration fields
}

export interface FieldRegistration {
  wagon_number?: string;
  shipment_number?: string;
  station?: string;
  transport_route?: string;
  cargo_type?: string;
  net_weight?: number;
  weight?: number;
  recipient_name?: string;
  recipient_phone?: string;
}

export interface CargoExtension {
  extension_date: string;
  reason: string;
  approved_by: string;
}

export interface CargoIssuance {
  issuance_date: string;
  issued_by: string;
  notes?: string;
}

export interface WagonIssuance {
  wagon_number: string;
  issuance_date: string;
  destination: string;
  issued_by: string;
}

export interface DebitReport {
  report_date: string;
  customer_id: string;
  total_amount: number;
  details: string;
}