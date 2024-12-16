import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { CargoList } from "./pages/cargo/CargoList";
import { CustomerList } from "./pages/customers/CustomerList";
import { CreateCustomer } from "./pages/customers/CreateCustomer";
import { EditCustomer } from "./pages/customers/EditCustomer";
import { UserList } from "./pages/users/UserList";
import { CreateUser } from "./pages/users/CreateUser";
import { EditUser } from "./pages/users/EditUser";
import { CashierDashboard } from "./pages/cashier/CashierDashboard";
import { CreateCashierEntry } from "./pages/cashier/CreateCashierEntry";
import { EditCashierEntry } from "./pages/cashier/EditCashierEntry";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { PaymentList } from "./pages/payments/paymentList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="cargo" element={<CargoList />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="Payments" element={<PaymentList />} />
              <Route path="customers/new" element={<CreateCustomer />} />
              <Route path="customers/:id/edit" element={<EditCustomer />} />
              <Route path="users" element={<UserList />} />
              <Route path="users/new" element={<CreateUser />} />
              <Route path="users/:id/edit" element={<EditUser />} />
              <Route path="cashier" element={<CashierDashboard />} />
              <Route path="cashier/new" element={<CreateCashierEntry />} />
              <Route path="cashier/:id/edit" element={<EditCashierEntry />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
