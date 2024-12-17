// Add to existing types
export type UserRole = "admin" | "manager" | "cashier";

export interface ContainerRegistration {
  container_serial: string;
  logistic_id: string;
  customer_id: string;
  capacity_id: string;
  route: string;
  direction: number;
  info_date: string;
  cargo_name: string;
  receiver_name: string
  receiver_phone: string;
  transport_cost: number;
  currency_id: string;
  payment_method: string;
  additional_fees: string;
  transfer_fee: string;
  payment_responsible: string;
  recipient: string;
  phone_number: number;

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
