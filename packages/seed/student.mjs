import { faker } from '@faker-js/faker/locale/en'
import bcryptjs from 'bcryptjs'

import { prisma } from './database.mjs'
import { logger } from './logger.mjs'

const isDev = process.env.NODE_ENV === 'development'

export const student = async () => {
  const password = faker.internet.password({ length: 6, memorable: true })
  const data = {
    login: 'student',
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    password
  }

  const exist = await prisma.user.findFirst({ where: { login: data.login } })
  data.password = await bcryptjs.hash(password, 10)

  if (exist) {
    isDev &&
      (await prisma.user.update({
        data: {
          password: data.password
        },
        where: {
          login: data.login
        }
      }))
  } else {
    await prisma.user.create({
      data
    })
  }

  data.password = password

  logger.info(data)
}
