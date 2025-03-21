import { Session } from '@cpa/database'
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
  user: Session
}
