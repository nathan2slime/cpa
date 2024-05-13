## CPA

### Requisitos

> O que você precisa ter instalado no seu sistema

- Node.js 18 [https://github.com/nvm-sh/nvm]
- Git [https://git-scm.com/downloads]
- PostgreSQL [https://www.postgresql.org/download/]
- Yarn [https://yarnpkg.com/]

### Clonagem
> Clonagem do repositório Git
Configure uma SSH no GitHub, se não tiver feito isso o leia o blog abaixo
https://ryan.dev.br/2023-04-17-github-ssh-pt-br/index.html

Depois de tudo, rode o comando abaixo
```bash
git clone git@github.com:nathan2slime/cpa.git
```

### Configuração

> Instalação de dependências

Após a clonagem vamos instalar as dependências do projeto usando o genrenciador de pacotes **yarn**, para isso rode o comando abaixo

```bash
yarn install
```

### Ambiente

> Configure as variavéis de ambiente do projeto, leia mais sobre variavéis de ambiente nesse artigo https://kinsta.com/knowledgebase/what-is-an-environment-variable/

Primeiro copie o arquivo ``.env.example`` e substitua as variavéis de ambiente do projeto. Certifique-se que a URL  de conexão com banco de dados esteja com as mesmas informações de conexão do seu PostgreSQL local e que o banco de dados exista.

### Migrações

> Os comandos abaixo deverão ser executados no diretório root do projeto

Rode o comando abaixo para ORM gerar as definições de tipos das entidades para o TypeScript

```bash
yarn generate
```

Rode o comando abaixo para executar as migrações existentes

```bash
yarn migrate:deploy
```

Caso você precise criar um migração, rode o comando abaixo, mas isso não garante a execução da migração

```bash
name=example_name yarn migrate:dev
``` 


### Executando o APP

```
yarn dev --filter=@cpa/web
```

### Executando a API

```
yarn dev --filter=@cpa/api
```