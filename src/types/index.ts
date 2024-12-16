export interface User {
  id: string;
  firstname: string;
  lastname: string;
  role_id: string;
  last_login?: Date;
  ip?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Cargo {
  id: string;
  container_serial: string;
  capacity_id: string;
  logistic_id: string;
  route?: string;
  direction?: number;
  info_date?: number;
  cargo_name?: string;
  receiver_name?: string;
  receiver_phone?: string;
  transport_cost?: number;
  currency_id?: string;
  customer_id?: string;
  payment_method_id?: string;
  note?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Customer {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}