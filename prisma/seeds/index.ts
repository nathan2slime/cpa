import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

(async () => {
  const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
  const login = process.env.ROOT_LOGIN || 'root';
  const password = process.env.ROOT_PASSWORD || 'root';
  const hasRoot = await prisma.user.findUnique({ where: { login } });

  if (hasRoot) return;

  const user = await prisma.user.create({
    data: {
      login,
      roles: [Role.ADMIN],
      password: await hash(password, 10),
    },
  });
})();
