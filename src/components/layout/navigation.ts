import {
  BarChart3,
  Package,
  Users,
  CreditCard,
  User,
  Settings,
  type LucideIcon
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Cargo', href: '/cargo', icon: Package },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Cashier', href: '/cashier', icon: CreditCard },
  { name: 'Users', href: '/users', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];