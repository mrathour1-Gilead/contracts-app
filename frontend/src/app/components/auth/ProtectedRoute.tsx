/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */

import { Navigate } from 'react-router';
import { useAppSelector } from '../../store/hooks';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}