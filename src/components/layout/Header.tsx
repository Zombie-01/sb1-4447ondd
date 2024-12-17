import React from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  User,
  Package,
  Users,
  CreditCard,
  BarChart3
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Cargo", href: "/cargo", icon: Package },
  { name: "Customers", href: "/logistic", icon: Users },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Users", href: "/users", icon: User }
];

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Truck className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Till</span>
            </div>
            <nav className="ml-6 flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
