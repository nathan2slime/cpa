import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

(async () => {
  const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

  const user = await prisma.user.create({
    data: {
      login: process.env.ROOT_LOGIN,
      roles: [Role.ADMIN],
      password: await hash(process.env.ROOT_PASSWORD || 'root', 10),
    },
  });
})();
