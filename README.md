<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Nest Task Manager App

Este projeto é uma API para gerenciamento de tarefas e projetos, construída com NestJS. A aplicação permite o gerenciamento de tarefas e projetos e oferece autenticação via JWT. O projeto possui rotas protegidas, acessíveis apenas por usuários autenticados, e está configurado para usar Swagger para documentação de API.

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
- [Instalação](#instalação)
- [Scripts disponíveis](#scripts-disponíveis)
- [Autenticação e Autorização](#autenticação-e-autorização)
- [Swagger e Documentação da API](#swagger-e-documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)

---

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **NestJS CLI** (instale com `npm i -g @nestjs/cli`)
- Banco de dados MySQL (ou outro compatível com TypeORM)

### Configuração

Crie um arquivo `.env` na raiz do projeto seguindo o exemplo de `.env.example` abaixo:

```plaintext
# Exemplo de chave JWT
JWT_SECRET='sua_chave_secreta'
```
<!--
Além disso, configure as variáveis de ambiente necessárias para o banco de dados.
-->
Alem disso, Serão configuradas em breve as variaveis de ambiente necessarias para o banco de dados.

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/felipemacedo1/nest-taskmanager-app.git
cd nest-taskmanager-app
npm install
```

### Scripts Disponíveis

- **`npm run start:dev`** - Inicia a aplicação em modo de desenvolvimento.
- **`npm run test:e2e`** - Executa os testes end-to-end.
- **`npm run lint`** - Linter para o código.
- **`npm run format`** - Formata o código usando Prettier.

### Autenticação e Autorização

A autenticação no projeto é realizada via **JWT**. As rotas relacionadas a tarefas e projetos (`tasks` e `projects`) são protegidas e só podem ser acessadas por usuários autenticados. Abaixo está um exemplo de fluxo de autenticação:

1. **Registro** - Endpoint para registro de um novo usuário.
2. **Login** - Gera um token JWT, que deve ser incluído no header das requisições protegidas como `Bearer {token}`.
3. **Validação do Token** - Realizada automaticamente nas rotas protegidas com `JwtStrategy`.

### Swagger e Documentação da API

A documentação da API pode ser acessada pelo Swagger:

- Rota Swagger: `/swagger`

Para obter uma coleção dos endpoints disponíveis, baixe a **Swagger Collection JSON** para uso em ferramentas como o Postman.

### Estrutura do Projeto

A estrutura básica do projeto é organizada conforme o padrão de módulos do NestJS:

```plaintext
src/
├── auth/                    # Módulo de autenticação (JWT e estratégias de login)
├── user/                    # Módulo de usuários (CRUD e validações)
├── task/                    # Módulo de tarefas
├── project/                 # Módulo de projetos
├── main.ts                  # Ponto de entrada da aplicação
└── ...                      # Outros módulos e arquivos de configuração
test/
└──                          # Testes e2e da aplicação 
```

### Testes

Para executar os testes, utilize o comando:

```bash
npm run test:e2e
```

Para cobertura de testes, use:

```bash
npm run test:cov
```

---

## Licença

Este projeto está sob a licença UNLICENSED.
