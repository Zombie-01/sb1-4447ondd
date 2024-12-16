import { useAuth } from '../lib/auth';
import type { UserRole } from '../lib/api/types';

export function useUserRole() {
  const { user } = useAuth();
  return user?.user_metadata?.role as UserRole;
}