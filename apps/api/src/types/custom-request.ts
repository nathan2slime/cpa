import { Session } from '@prisma/client';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: Session
}