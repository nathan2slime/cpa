'use client';

import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { usePathname, useRouter } from 'next/navigation';

import { AppChildren } from '@/types';
import { authService } from '@/services/auth.services';
import { authState } from '@/store/auth.state';

export const AuthProvider = ({ children }: AppChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const { logged, loading } = useSnapshot(authState);

  useEffect(() => {
    onLoadAuth();
  }, []);

  useEffect(() => {
    if (logged && pathname.includes('/signing')) return router.push('/');

    if (loading || logged) return;

    if (pathname.includes('/signing')) return;

    router.push('/auth/signing');
  }, [loading]);

  const onLoadAuth = async () => {
    const res = await authService();

    authState.data = res || null;
    authState.logged = !!res;
    authState.loading = false;
  };

  return <>{loading ? children : <div></div>}</>;
};