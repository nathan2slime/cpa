export type AuthData = {
  id: string;
  refreshToken: string;
  accessToken: string;
  isExpired: boolean;
  userId: string;
  createdAt: string;
  deletedAt: null;
  updatedAt: string;
  user: UserData;
};

export type UserData = {
  id: string;
  login: string;
  roles: string[];
  createdAt: string;
};
