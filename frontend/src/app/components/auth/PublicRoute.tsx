/**
 * Public Route Component
 * Redirects to dashboard if user is already authenticated
 */

import { Navigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { fetchUserInfo } from '@/app/store/auth/authThunks';

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { userFetching, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [])

  if (userFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}