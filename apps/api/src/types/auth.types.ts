export type JwtAuthPayload = {
  exp: number;
  userId: string;
  sessionId: string;
};
