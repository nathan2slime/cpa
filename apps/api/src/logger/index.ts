import pino from 'pino';

export const logger = pino({
  name: '@cpa/api',
  timestamp: true,
});