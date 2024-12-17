import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/auth/AuthProvider";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { CargoList } from "./pages/cargo/CargoList";
import { UserList } from "./pages/users/UserList";
import { CreateUser } from "./pages/users/CreateUser";
import { EditUser } from "./pages/users/EditUser";
import { CashierDashboard } from "./pages/cashier/CashierDashboard";
import { CreateCashierEntry } from "./pages/cashier/CreateCashierEntry";
import { EditCashierEntry } from "./pages/cashier/EditCashierEntry";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { PaymentList } from "./pages/payments/paymentList";
import { CreatePayment } from "./pages/payments/CreatePayment";
import { CargoPageLayout } from "./components/cargo/layout/CargoPageLayout";
import { LogisticList } from "./pages/logistic/LogisticList";
import { CreateLogistic } from "./pages/logistic/CreateLogistic";
import { EditLogistic } from "./pages/logistic/EditCustomer";
import { EditForeignLogistic } from "./pages/foreignLogistic/EditForeignCustomer";
import { CreateForeignLogistic } from "./pages/foreignLogistic/CreateForeignLogistic";
import { ForeignLogisticList } from "./pages/foreignLogistic/ForeignLogisticList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="cargo" element={<CargoPageLayout />} />
              <Route
                path="logistic"
                element={
                  <div className="flex flex-col gap-10">
                    <LogisticList />
                    <ForeignLogisticList />
                  </div>
                }
              />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="payments" element={<PaymentList />} />
              <Route path="payment/new" element={<CreatePayment />} />
              <Route path="logistic/new" element={<CreateLogistic />} />
              <Route
                path="foreign/logistic/new"
                element={<CreateForeignLogistic />}
              />
              <Route path="logistic/:id/edit" element={<EditLogistic />} />
              <Route
                path="foreign/logistic/:id/edit"
                element={<EditForeignLogistic />}
              />
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
