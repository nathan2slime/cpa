# SAI UNIFACEMA — Documentação Técnica (CPA)

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Schema do Banco de Dados](#schema-do-banco-de-dados)
- [Diagrama de Relacionamentos](#diagrama-de-relacionamentos)
- [Módulos da API (Backend)](#módulos-da-api-backend)
- [Estrutura do Frontend (Web)](#estrutura-do-frontend-web)
- [Fluxo de Autenticação](#fluxo-de-autenticação)
- [Caso de Uso: Fluxo Completo de um Evento CPA](#caso-de-uso-fluxo-completo-de-um-evento-cpa)
- [Roles e Permissões](#roles-e-permissões)
- [Endpoints da API](#endpoints-da-api)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy (Docker)](#deploy-docker)

---

## Visão Geral

O **SAI (Sistema de Avaliação Institucional)** é uma aplicação web da CPA (Comissão Própria de Avaliação) da UNIFACEMA. O sistema permite:

1. **Criar formulários** de avaliação com perguntas de múltipla escolha, texto ou mistas.
2. **Criar eventos** (avaliações) que vinculam um formulário a cursos dentro de um período de datas.
3. **Alunos respondem** aos formulários dos eventos ativos que pertencem ao seu curso.
4. **Relatórios e dashboard** para acompanhar respostas e métricas dos eventos.

---

## Arquitetura do Projeto

Monorepo gerenciado com **Turborepo** e **pnpm workspaces**.

```
sai_unifacema/
├── apps/
│   ├── api/          ← Backend (NestJS + Prisma)
│   └── web/          ← Frontend (Next.js + React)
├── packages/
│   ├── database/     ← Schema Prisma + Prisma Client gerado
│   ├── env/          ← Variáveis de ambiente tipadas (validação com Zod)
│   └── seed/         ← Seed do banco de dados
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

| Camada    | Tecnologia                       | Porta padrão |
|-----------|----------------------------------|:------------:|
| Frontend  | Next.js 15, React 18, Tailwind   | `3000`       |
| Backend   | NestJS, Prisma, Passport JWT     | `5400`       |
| Banco     | PostgreSQL 15                    | `5432`       |

---

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** >= 18
- **pnpm** 10.x (`npm i -g pnpm`)
- **Docker Desktop** (para o banco PostgreSQL)
- **Modo de Desenvolvedor do Windows** ativo (para symlinks do pnpm)

### Passo a passo

```bash
# 1. Instalar dependências
pnpm install

# 2. Subir o banco de dados PostgreSQL via Docker
docker compose up postgres -d

# 3. Configurar variáveis de ambiente
# Copiar .env.example para .env e ajustar DATABASE_URL, SESSION_KEY, etc.
cp .env.example .env

# 4. Gerar o Prisma Client
pnpm db:generate

# 5. Rodar as migrations
pnpm db:migrate:dev

# 6. (Opcional) Popular o banco com dados iniciais
pnpm db:seed

# 7. Rodar em modo de desenvolvimento
pnpm dev
# Isso inicia o frontend (localhost:3000) e a API (localhost:5400) simultaneamente

# 8. Abrir o Prisma Studio (interface visual do banco)
pnpm studio
```

### Scripts disponíveis (raiz)

| Script               | Descrição                                   |
|----------------------|---------------------------------------------|
| `pnpm dev`           | Roda API + Web em modo dev                  |
| `pnpm build`         | Build de produção                           |
| `pnpm studio`        | Abre o Prisma Studio                        |
| `pnpm db:migrate:dev`| Cria/aplica migrations                      |
| `pnpm db:seed`       | Popula o banco com dados de teste           |
| `pnpm db:generate`   | Gera o Prisma Client                        |
| `pnpm lint`          | Verifica o código com Biome                 |

---

## Schema do Banco de Dados

O banco utiliza **PostgreSQL** com **Prisma ORM**. Abaixo, cada tabela (model) explicada:

### User (Usuário)

| Campo     | Tipo       | Descrição                                    |
|-----------|------------|----------------------------------------------|
| id        | UUID       | Identificador único                          |
| login     | String     | Login único (ex: matrícula do aluno)         |
| password  | String     | Senha hashada com bcrypt                     |
| name      | String?    | Nome do usuário                              |
| surname   | String?    | Sobrenome                                    |
| roles     | Role[]     | Papéis: `ADMIN`, `MANAGER`, `USER`           |
| courseId   | UUID?      | Curso ao qual pertence                       |

### Course (Curso)

| Campo | Tipo       | Descrição                                   |
|-------|------------|---------------------------------------------|
| id    | UUID       | Identificador único                         |
| name  | String     | Nome do curso (ex: "ADS", "Enfermagem")     |
| type  | CourseType | Tipo: `TECH`, `HUMAN` ou `HEALTH`           |

### Form (Formulário)

| Campo | Tipo   | Descrição                           |
|-------|--------|-------------------------------------|
| id    | UUID   | Identificador único                 |
| title | String | Título do formulário                |

Um formulário contém **N perguntas** (`Question`).

### Question (Pergunta)

| Campo     | Tipo         | Descrição                                           |
|-----------|--------------|-----------------------------------------------------|
| id        | UUID         | Identificador único                                 |
| title     | String       | Texto da pergunta                                   |
| type      | QuestionType | `TEXT`, `CHOOSE` ou `CHOOSE_AND_TEXT`                |
| order     | Int          | Ordem de exibição                                   |
| mandatory | Boolean      | Se é obrigatória                                    |
| formId    | UUID         | Formulário ao qual pertence                         |

### QuestionOption (Opção de Resposta)

| Campo      | Tipo   | Descrição                            |
|------------|--------|--------------------------------------|
| id         | UUID   | Identificador único                  |
| title      | String | Texto da opção                       |
| order      | Int    | Ordem de exibição                    |
| questionId | UUID   | Pergunta à qual pertence             |

### Event (Evento / Avaliação)

| Campo       | Tipo      | Descrição                                         |
|-------------|-----------|---------------------------------------------------|
| id          | UUID      | Identificador único                               |
| title       | String    | Título do evento                                  |
| description | String    | Descrição                                         |
| responsible | String    | Responsável pelo evento                           |
| active      | Boolean   | Se está ativo                                     |
| formId      | UUID      | Formulário vinculado                              |
| startDate   | DateTime? | Data de início                                    |
| endDate     | DateTime? | Data de encerramento                              |

Um evento **vincula** um formulário a N cursos através da tabela `CourseEvent`.

### CourseEvent (Vínculo Curso ↔ Evento)

Tabela de junção N:N entre `Course` e `Event`.

| Campo    | Tipo | Descrição            |
|----------|------|----------------------|
| id       | UUID | Identificador único  |
| courseId  | UUID | Curso vinculado      |
| eventId  | UUID | Evento vinculado     |

### Answer (Resposta)

Cada vez que um aluno responde um evento, é criado **um** registro `Answer`.

| Campo   | Tipo | Descrição                         |
|---------|------|-----------------------------------|
| id      | UUID | Identificador único               |
| userId  | UUID | Aluno que respondeu               |
| eventId | UUID | Evento respondido                 |
| formId  | UUID | Formulário do evento              |

### QuestionAnswer (Resposta por Pergunta)

Cada pergunta respondida cria um `QuestionAnswer` vinculado ao `Answer`.

| Campo            | Tipo   | Descrição                                  |
|------------------|--------|---------------------------------------------|
| id               | UUID   | Identificador único                         |
| value            | String?| Resposta em texto (para perguntas TEXT)      |
| questionId       | UUID   | Pergunta respondida                         |
| questionOptionId | UUID?  | Opção selecionada (para CHOOSE)             |
| answerId         | UUID   | Answer ao qual pertence                     |

### Session (Sessão)

| Campo        | Tipo    | Descrição                     |
|--------------|---------|-------------------------------|
| id           | UUID    | Identificador                 |
| accessToken  | String? | JWT de acesso                 |
| refreshToken | String? | JWT de refresh                |
| isExpired    | Boolean | Se a sessão foi expirada      |
| userId       | UUID?   | Usuário dono da sessão        |

### Tag + TagOnEvent + TagOnForm

Tags são categorias/etiquetas que podem ser associadas a Eventos ou Formulários para facilitar a filtragem.

---

## Diagrama de Relacionamentos

```
┌──────────┐       ┌─────────────┐       ┌───────────┐
│   User   │──────▸│   Course    │◂──────│CourseEvent│
│          │  N:1  │             │  1:N   │           │
│ roles[]  │       │ type        │       │           │
│ login    │       │ name        │       │ courseId   │
│ password │       └─────────────┘       │ eventId   │
└────┬─────┘                             └─────┬─────┘
     │ 1:N                                     │ N:1
     ▼                                         ▼
┌──────────┐                             ┌───────────┐
│  Answer  │────────────────────────────▸│   Event   │
│          │  N:1                        │           │
│ userId   │                             │ title     │
│ eventId  │                             │ formId ───┼──▸┌──────────┐
│ formId   │                             │ startDate │   │   Form   │
└────┬─────┘                             │ endDate   │   │          │
     │ 1:N                               │ active    │   │ title    │
     ▼                                   └───────────┘   └────┬─────┘
┌──────────────┐                                              │ 1:N
│QuestionAnswer│                                              ▼
│              │                                    ┌──────────────┐
│ value        │                                    │   Question   │
│ questionId ──┼───────────────────────────────────▸│              │
│ optionId ────┼──▸┌────────────────┐               │ title        │
│ answerId     │   │ QuestionOption │               │ type         │
└──────────────┘   │                │               │ order        │
                   │ title          │               │ mandatory    │
                   │ order          │◂──────────────│ formId       │
                   └────────────────┘    1:N        └──────────────┘
```

**Resumo das relações:**

- `User` pertence a 1 `Course` (N:1)
- `Course` participa de N `Event` via `CourseEvent` (N:N)
- `Event` usa 1 `Form` (N:1)
- `Form` tem N `Question` (1:N)
- `Question` tem N `QuestionOption` (1:N) — para tipo CHOOSE
- `User` cria N `Answer` (1:N)
- `Answer` pertence a 1 `Event` e 1 `User`
- `Answer` tem N `QuestionAnswer` — uma por pergunta respondida

---

## Módulos da API (Backend)

A API usa **NestJS** com arquitetura modular. Prefixo global: `/api`. Swagger em `/api/docs`.

### Auth (Autenticação)
- `POST /api/auth/signin` — Login com login + senha → retorna sessão com JWT (cookie httpOnly)
- `POST /api/auth/signout` — Encerra sessão
- `PATCH /api/auth/refresh` — Renova o accessToken usando refreshToken
- `GET /api/auth` — Retorna sessão atual (autenticado)

**Mecanismo:** Passport JWT + bcrypt. Tokens armazenados em cookies httpOnly com SameSite=none + Secure.

### Session (Sessão)
- Gerencia criação, renovação e expiração de sessões JWT
- `accessToken` tem expiração curta, `refreshToken` tem expiração longa
- Ambos assinados com `SESSION_KEY` do `.env`

### User (Usuário)
- `getByLogin` — Busca usuário por login
- `getPassword` — Busca id + senha (para autenticação)
- `getByIdUpdate` — Atualiza perfil do usuário

### User Import (Importação de Alunos via CSV)
- `POST /api/user-import` — Upload de arquivo CSV para importar alunos em massa
- Formato CSV: `login, password, name, surname, targetAudience`
- Cria cursos automaticamente se não existirem
- Opção de deletar (soft delete) alunos existentes do mesmo curso antes da importação
- Usa transação do Prisma para garantir consistência

### Course (Curso)
- `POST /api/course/create` — Criar curso
- `GET /api/course/show` — Listar todos os cursos
- `GET /api/course/show/:id` — Buscar curso por ID
- `PUT /api/course/update/:id` — Atualizar curso
- `DELETE /api/course/delete/:id` — Remover (soft delete)

### Form (Formulário)
- `POST /api/form/create` — Criar formulário
- `GET /api/form/show` — Listar com paginação e filtro por tag/nome
- `GET /api/form/show/:id` — Buscar por ID (inclui perguntas)
- `GET /api/form/full/:eventId` — Buscar formulário completo para responder (valida se já respondeu)
- `PUT /api/form/update/:id` — Atualizar título
- `DELETE /api/form/delete/:id` — Remover (soft delete)
- `POST /api/form/duplicate/:id` — Duplicar formulário (cópia com todas perguntas e opções)

### Question (Pergunta)
- `POST /api/question/create` — Criar pergunta vinculada a um formulário
- `GET /api/question/show?form=ID` — Listar perguntas de um formulário (ordenadas)
- `PUT /api/question/update/:id` — Atualizar
- `DELETE /api/question/delete/:id` — Remover (soft delete)
- `POST /api/question/duplicate/:id` — Duplicar pergunta (com opções)
- `PUT /api/question/reorder` — Reordenar perguntas (drag & drop)

**Tipos de pergunta:**
- `TEXT` — Resposta em texto livre
- `CHOOSE` — Múltipla escolha (selecionar uma `QuestionOption`)
- `CHOOSE_AND_TEXT` — Múltipla escolha + campo de texto

### Question Option (Opções de Pergunta)
- CRUD de opções vinculadas a perguntas do tipo CHOOSE/CHOOSE_AND_TEXT

### Event (Evento / Avaliação)
- `POST /api/event/create` — Criar evento (vincula form + cursos + datas)
  - `courses` pode ser um array de IDs ou `"ALL"` para todos os cursos
- `GET /api/event/show` — Listar com paginação + filtro por tag, nome, curso, status
  - Status calculado automaticamente: `"agendado"` | `"em andamento"` | `"encerrado"`
- `GET /api/event/show/:id` — Buscar por ID (inclui formulário completo + IDs dos cursos)
- `PUT /api/event/update/:id` — Atualizar evento
- `PUT /api/event/toggle-active/:id` — Ativar/desativar
- `DELETE /api/event/delete/:id` — Remover (soft delete)

### Answer (Resposta)
- `GET /api/answer/canAnswer/:eventId` — Verifica se o aluno pode responder:
  - Evento existe e está ativo?
  - Dentro do período (startDate ≤ now ≤ endDate)?
  - Aluno já respondeu?
  - Curso do aluno está vinculado ao evento?
- `POST /api/answer/event/:eventId` — Envia as respostas do aluno:
  - Cria um `Answer` e N `QuestionAnswer` (uma por pergunta)
  - Valida obrigatoriedade e tipo de cada pergunta
- `GET /api/answer/event/show/:eventId` — Relatório de respostas:
  - Retorna todas as perguntas com suas respostas agrupadas
  - Filtrável por curso
  - Inclui lista de respondentes

### Tags
- Tags podem ser associadas a Eventos ou Formulários
- `POST /api/tags/create` — Criar tag e vincular a evento ou formulário
- `GET /api/tags/show/event` — Listar tags de eventos
- `GET /api/tags/show/form` — Listar tags de formulários
- `GET /api/tags/show/event/:id` — Tags de um evento específico
- `DELETE /api/tags/delete/:id` — Remover tag

### Dashboard
- `GET /api/dashboard` — Retorna:
  - Quantidade de eventos abertos (ativos, não encerrados, criados no mês)
  - Quantidade de eventos do mês
  - Quantidade de respostas do mês
  - Respostas agrupadas por dia (para gráfico de barras)

### Health
- `GET /api/health` — Health check da API

---

## Estrutura do Frontend (Web)

O frontend é um **Next.js 15** App Router com **Tailwind CSS** e **shadcn/ui**.

### Route Groups

```
src/app/
├── auth/                      ← Páginas de autenticação (login)
├── (overview-pages)/          ← Páginas de visualização (com Sidebar + Navbar)
│   ├── layout.tsx             ← Layout com Navbar + Sidebar
│   ├── dashboard/             ← Dashboard principal
│   ├── events/                ← Listagem de eventos
│   ├── forms/                 ← Listagem de formulários
│   ├── reports/               ← Relatórios
│   └── configs/               ← Configurações
├── (management-pages)/        ← Páginas de gerenciamento (com layout diferente)
│   ├── layout.tsx             ← Layout de management
│   ├── event/                 ← Detalhes/edição de evento
│   ├── form/                  ← Detalhes/edição de formulário
│   ├── answer/                ← Página para aluno responder formulário
│   ├── new-event/             ← Criação de novo evento
│   └── report/                ← Relatório detalhado de um evento
└── layout.tsx                 ← Layout raiz (providers, fonts, etc.)
```

### Componentes Principais

- **Sidebar** — Menu lateral com navegação
- **Navbar** — Barra superior com logo e info do usuário
- **Card, Badge, Select, Table** — Componentes shadcn/ui
- **ChartContainer** — Wrapper para gráficos (recharts)

### Hooks de API (React Query)

Todos os hooks ficam em `src/hooks/api-hooks/` e usam **TanStack React Query**:

| Hook                   | Endpoint                          | Descrição                        |
|------------------------|-----------------------------------|----------------------------------|
| `useDashboard()`       | `GET /api/dashboard`              | Dados do dashboard               |
| `useEvents(page)`      | `GET /api/event/show`             | Listagem paginada de eventos     |
| `useEvent(id)`         | `GET /api/event/show/:id`         | Detalhes de um evento            |
| `useCreateEvent()`     | `POST /api/event/create`          | Criar evento                     |
| `useUpdateEvent()`     | `PUT /api/event/update/:id`       | Atualizar evento                 |
| `useDeleteEvent()`     | `DELETE /api/event/delete/:id`    | Deletar evento                   |
| `useToggleActiveEvent()`| `PUT /api/event/toggle-active/:id`| Ativar/desativar evento          |
| `useAnswers(eventId)`  | `GET /api/answer/event/show/:id`  | Respostas de um evento           |
| `useCanAnswer(eventId)`| `GET /api/answer/canAnswer/:id`   | Verifica se aluno pode responder |

### Gerenciamento de Estado

- **React Query** para estado do servidor (cache, revalidação)
- **Zustand** (store) para estado local (ex: curso selecionado no filtro)

---

## Fluxo de Autenticação

```
1. Usuário acessa /auth (login)
2. Envia POST /api/auth/signin { login, password }
3. Backend valida com bcrypt
4. Cria Session com accessToken + refreshToken (JWT)
5. Retorna tokens em cookie httpOnly (SameSite=none, Secure)
6. Frontend armazena sessão e redireciona

Em cada request autenticado:
  → Cookie enviado automaticamente
  → JwtAuthGuard extrai e valida o token
  → RoleGuard verifica se o usuário tem o papel necessário

Quando o accessToken expira:
  → Frontend chama PATCH /api/auth/refresh
  → Backend gera novo accessToken usando o refreshToken
```

---

## Caso de Uso: Fluxo Completo de um Evento CPA

### 1. Admin importa alunos

O admin faz upload de um **CSV** com os dados dos alunos:

```csv
login,password,name,surname,targetAudience
2024001,123456,João,Silva,Análise e Desenvolvimento de Sistemas
2024002,654321,Maria,Santos,Enfermagem
```

O sistema cria os cursos automaticamente e cadastra os alunos com hash bcrypt.

### 2. Admin cria um formulário

Na tela de **Formulários**, o admin cria um novo formulário (ex: "Avaliação Docente 2026.1") e adiciona perguntas:

- Pergunta 1 (CHOOSE): "Como você avalia seu professor?" → Opções: Ótimo, Bom, Regular, Ruim
- Pergunta 2 (TEXT): "Deixe um comentário sobre o curso"
- Pergunta 3 (CHOOSE_AND_TEXT): "A infraestrutura é adequada?" → Opções: Sim, Não + campo texto

### 3. Admin cria um evento

Na tela de **Eventos**, cria um evento:
- Título: "Avaliação Institucional Semestre 2026.1"
- Formulário: seleciona o formulário criado
- Cursos: `ALL` (todos) ou seleciona específicos
- Período: 01/03/2026 a 31/03/2026

### 4. Aluno responde

O aluno faz login, vê os eventos disponíveis, acessa o formulário do evento ativo e envia suas respostas. O sistema valida:
- Se o evento está dentro do período ✅
- Se o aluno pertence a um curso vinculado ✅
- Se o aluno já respondeu ❌ (impede duplicação)

### 5. Admin visualiza relatório

No **Dashboard**, o admin vê:
- Quantidade de eventos abertos e do mês
- Gráfico de respostas ao longo do tempo

Na tela de **Relatório** do evento, o admin vê:
- Total de respondentes
- Respostas agrupadas por pergunta
- Filtro por curso

---

## Roles e Permissões

| Role      | Pode fazer                                                            |
|-----------|-----------------------------------------------------------------------|
| `ADMIN`   | Tudo: gerenciar formulários, eventos, cursos, importar alunos, ver relatórios |
| `MANAGER` | Gerenciar eventos e formulários, ver relatórios                       |
| `USER`    | Responder formulários dos eventos do seu curso                        |

As permissões são verificadas pelo `RoleGuard` no backend e condicionalmente no frontend.

---

## Endpoints da API

Prefixo global: `/api`

| Método | Rota                               | Auth | Descrição                       |
|--------|-------------------------------------|------|---------------------------------|
| POST   | `/auth/signin`                     | ❌   | Login                           |
| POST   | `/auth/signout`                    | ✅   | Logout                          |
| PATCH  | `/auth/refresh`                    | 🔄   | Refresh token                   |
| GET    | `/auth`                            | ✅   | Sessão atual                    |
| GET    | `/dashboard`                       | ✅   | Dados do dashboard              |
| GET    | `/course/show`                     | ✅   | Listar cursos                   |
| POST   | `/course/create`                   | ✅   | Criar curso                     |
| GET    | `/event/show`                      | ✅   | Listar eventos (paginado)       |
| GET    | `/event/show/:id`                  | ✅   | Detalhes do evento              |
| POST   | `/event/create`                    | ✅   | Criar evento                    |
| PUT    | `/event/update/:id`                | ✅   | Atualizar evento                |
| PUT    | `/event/toggle-active/:id`         | ✅   | Ativar/desativar                |
| DELETE | `/event/delete/:id`                | ✅   | Remover evento                  |
| GET    | `/form/show`                       | ✅   | Listar formulários (paginado)   |
| GET    | `/form/show/:id`                   | ✅   | Detalhes do formulário          |
| GET    | `/form/full/:eventId`              | ✅   | Formulário completo p/ responder|
| POST   | `/form/create`                     | ✅   | Criar formulário                |
| POST   | `/form/duplicate/:id`              | ✅   | Duplicar formulário             |
| POST   | `/question/create`                 | ✅   | Criar pergunta                  |
| PUT    | `/question/reorder`                | ✅   | Reordenar perguntas             |
| POST   | `/question/duplicate/:id`          | ✅   | Duplicar pergunta               |
| GET    | `/answer/canAnswer/:eventId`       | ✅   | Verifica se pode responder      |
| POST   | `/answer/event/:eventId`           | ✅   | Envia respostas                 |
| GET    | `/answer/event/show/:eventId`      | ✅   | Relatório de respostas          |
| POST   | `/user-import`                     | ✅   | Importar alunos via CSV         |
| GET    | `/tags/show/event`                 | ✅   | Tags de eventos                 |
| GET    | `/tags/show/form`                  | ✅   | Tags de formulários             |
| POST   | `/tags/create`                     | ✅   | Criar tag                       |
| GET    | `/health`                          | ❌   | Health check                    |

---

## Variáveis de Ambiente

Arquivo `.env` na raiz:

| Variável                  | Descrição                                    | Exemplo                                  |
|---------------------------|----------------------------------------------|------------------------------------------|
| `DATABASE_URL`            | URL de conexão do PostgreSQL                 | `postgresql://user:pass@localhost:5432/db`|
| `SESSION_KEY`             | Chave secreta para assinar JWTs              | `uma-chave-secreta-forte`                |
| `CLIENT_URL`              | URL do frontend (CORS)                       | `http://localhost:3000`                  |
| `ACCESS_TOKEN_EXPIRES_IN` | Tempo de expiração do token de acesso        | `15m`                                    |
| `REFRESH_TOKEN_EXPIRES_IN`| Tempo de expiração do refresh token          | `7d`                                     |
| `NEXT_PUBLIC_API_URL`     | URL da API para o frontend                   | `http://localhost:5400`                  |

---

## Deploy (Docker)

O projeto possui um `docker-compose.yml` para deploy com 3 serviços:

```yaml
services:
  web:       # Frontend Next.js (porta 3000)
  api:       # Backend NestJS (porta 9292 em produção)
  postgres:  # Banco PostgreSQL (porta 5432)
```

```bash
# Build e deploy completo
docker compose up --build -d

# Apenas o banco (para desenvolvimento local)
docker compose up postgres -d
```

As variáveis de produção ficam no arquivo `.env.production`.

---

## Dicas para Novos Desenvolvedores

1. **Sempre gere o Prisma Client** após alterar o schema: `pnpm db:generate`
2. **Crie migrations** ao alterar o banco: `pnpm db:migrate:dev`
3. **Soft delete**: Quase todas as tabelas usam `deletedAt` em vez de exclusão real
4. **Swagger**: Acesse `http://localhost:5400/api/docs` para documentação interativa da API
5. **React Query**: Os dados são cacheados — use `invalidateQueries` ao mutar dados
6. **Biome**: Use `pnpm lint` para verificar formatação (substitui ESLint + Prettier)
7. **Commitizen**: Use `pnpm commit` para commits padronizados (Conventional Commits)
