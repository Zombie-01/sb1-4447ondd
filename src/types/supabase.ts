export interface Database {
  public: {
    Tables: {
      cargo: {
        Row: {
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
          shift_cost?: number;
          foreign_agent_id?: string;
          debtor_name?: string;
          f_is_sell: boolean;
          f_sell_price?: number;
          f_arrived_date?: string;
          f_unpacked_date?: string;
          f_released_date?: string;
          f_departured_date?: string;
          f_returned_date?: string;
          f_shipment_date?: string;
          d_wagon_number?: string;
          d_shipment_number?: string;
          d_station?: string;
          d_transport_route?: string;
          d_cargo_type?: string;
          d_net_weight?: number;
          d_weight?: number;
          d_recipient_name?: string;
          d_recipient_phone?: string;
          p_bill_number?: string;
          p_bill_date?: string;
          p_category_id?: string;
          p_cargo_weight?: number;
          p_bill_HY_number?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cargo']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['cargo']['Row'], 'id'>>;
      };
      cashier_entries: {
        Row: {
          id: string;
          cargo_id: string;
          entry_date: string;
          container_number: string;
          payment_amount: number;
          payment_type: string;
          yard_location: string;
          movement_type: string;
          movement_date: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cashier_entries']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['cashier_entries']['Row'], 'id'>>;
      };
      // Add other table definitions as needed...
    };
  };
}