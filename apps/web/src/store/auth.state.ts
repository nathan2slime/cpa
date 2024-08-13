import { proxy } from 'valtio';

import { AuthData } from '@/types/auth.types';

export type AuthState = {
  logged: boolean;
  data: AuthData | null;
  loading: boolean;
};

export const storageKey = '@cpa/web';

const INITIAL: AuthState = {
  logged: false,
  loading: true,
  data: null,
};
export const authState = proxy<AuthState>(INITIAL);
