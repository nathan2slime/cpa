import { faker } from '@faker-js/faker/locale/en'
import bcryptjs from 'bcryptjs'
import { Role } from '@cpa/database'

import { prisma } from './database.mjs'
import { logger } from './logger.mjs'

const isDev = process.env.NODE_ENV === 'development'

export const manager = async () => {
  const data = {
    login: 'root',
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    password: "root"
  }

  console.log(data);

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
      data: {
        ...data,
        roles: [Role.ADMIN]
      }
    })
  }

  data.password = password

  logger.info(data)
}
