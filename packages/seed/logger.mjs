import { createLogger } from 'bunyan'

export const logger = createLogger({
  name: '@cpa/seed',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      path: 'debug.log'
    }
  ]
})
