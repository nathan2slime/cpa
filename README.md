### CPA

#### Scripts

| Script | Descrição |
|---|---|
| `build` | Constrói a aplicação para produção. |
| `test` | Executa testes unitários. |
| `clean` | Remove o diretório `node_modules`. |
| `start` | Inicia a aplicação no modo produção. |
| `dev` | Inicia a aplicação no modo desenvolvimento. |
| `prod` | Inicia a aplicação no modo produção. |
| `prepare` | Instala o Husky para hooks do Git. |
| `format` | Formata o código usando o Prettier. |
| `migrate:dev` | Cria uma nova migração Prisma. |
| `migrate:deploy` | Implanta as migrações Prisma no banco de dados. |
| `seed` | Semeia o banco de dados com dados iniciais. |
| `generate` | Gera o código do cliente Prisma. |
| `migrate:reset` | Reinicia o banco de dados para o estado inicial. |
| `commit` | Abre um editor de mensagem de commit usando `git-cz`. |


#### Enviroments

| Variável | Descrição | Valor (Exemplo) |
|---|---|---|
| `POSTGRES_USER` | Usuário do PostgreSQL | `root` |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL | `root` |
| `POSTGRES_DB` | Banco de dados do PostgreSQL | `root` |
| `POSTGRES_HOST` | Host do PostgreSQL | `postgres` |
| `POSTGRES_PORT` | Porta do PostgreSQL | `5432` |
| `API_PORT` | Porta da API | `9292` |
| `DATABASE_URL` | URL de conexão com o banco de dados | `postgresql://root:root@localhost:5432/root?schema=public` |
| `SECRET_KEY` | Chave secreta para JWT | `32198302132` |
| `ACCESS_TOKEN_EXPIRES_IN` | Tempo de expiração do token de acesso | `3d` |
| `REFRESH_TOKEN_EXPIRES_IN` | Tempo de expiração do token de atualização | `30d` |
| `ROOT_LOGIN` | Login do usuário root | `root` |
| `ROOT_PASSWORD` | Senha do usuário root | `root` |
| `NEXT_PUBLIC_API_URL` | URL da API para o frontend | `http://localhost:9292` |
| `NEXT_PUBLIC_WEB_URL` | URL da web para o frontend | `http://localhost:3000` |
