# 📋 Nest Task Manager - API de Gerenciamento de Tarefas

## 🎯 Objetivo de Aprendizado
Projeto desenvolvido para estudar **NestJS** e **arquitetura modular**, implementando uma API completa de gerenciamento de tarefas com autenticação JWT, validações, documentação Swagger e testes automatizados.

## 🛠️ Tecnologias Utilizadas
- **Framework:** NestJS (Node.js)
- **Linguagem:** TypeScript
- **Banco de Dados:** MySQL com TypeORM
- **Autenticação:** JWT (JSON Web Tokens)
- **Documentação:** Swagger/OpenAPI
- **Validação:** Class Validator, Class Transformer
- **Testes:** Jest (unit + e2e)
- **Conceitos estudados:**
  - Arquitetura modular do NestJS
  - Dependency Injection
  - Guards e Middlewares
  - DTOs e validação de dados
  - Relacionamentos de banco de dados
  - Autenticação e autorização

## 🚀 Demonstração
```bash
# Iniciar aplicação
npm run start:dev

# Acessar Swagger
http://localhost:4000/swagger

# Endpoints principais
POST /auth/register    # Registro de usuário
POST /auth/login       # Login e obtenção de JWT
GET  /tasks           # Listar tarefas (protegido)
POST /tasks           # Criar tarefa (protegido)
```

## 💡 Principais Aprendizados

### 🏢 Arquitetura Modular NestJS
- **Módulos:** Organização em módulos independentes (Auth, User, Task, Project)
- **Controllers:** Gerenciamento de rotas e endpoints REST
- **Services:** Lógica de negócio e regras da aplicação
- **Providers:** Injeção de dependência e IoC container

### 🔐 Autenticação e Segurança
- **JWT Strategy:** Implementação de autenticação com tokens
- **Guards:** Proteção de rotas com AuthGuard
- **Passport:** Integração com estratégias de autenticação
- **Bcrypt:** Hash de senhas para segurança

### 📊 Banco de Dados e ORM
- **TypeORM:** Mapeamento objeto-relacional
- **Relacionamentos:** One-to-Many, Many-to-One
- **Migrations:** Controle de versão do schema
- **Entities:** Modelagem de dados com decorators

## 🧠 Conceitos Técnicos Estudados

### 1. **Dependency Injection**
```typescript
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}
```

### 2. **DTOs e Validação**
```typescript
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
```

### 3. **Guards e Autenticação**
```typescript
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  @Get()
  @ApiBearerAuth()
  async findAll(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.findAllByUser(user.id);
  }
}
```

## 📁 Estrutura do Projeto
```
src/
├── auth/                    # Módulo de autenticação (JWT e estratégias)
├── user/                    # Módulo de usuários (CRUD e validações)
├── task/                    # Módulo de tarefas
├── project/                 # Módulo de projetos
├── main.ts                  # Ponto de entrada da aplicação
└── ...                      # Outros módulos e configurações
test/
└── ...                      # Testes e2e da aplicação
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js (v14 ou superior)
- NestJS CLI (`npm i -g @nestjs/cli`)
- MySQL

### Passos
1. Clone o repositório:
```bash
git clone <repo-url>
cd nest-taskmanager-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```env
JWT_SECRET='sua_chave_secreta'
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=dev-user
DB_PASSWORD=dev-pass
DB_DATABASE=db_taskmanager
```

4. Execute a aplicação:
```bash
npm run start:dev
```

## 🚧 Desafios Enfrentados
1. **Arquitetura modular:** Organizar código em módulos coesos
2. **Injeção de dependência:** Entender IoC container do NestJS
3. **TypeORM:** Configurar relacionamentos e migrations
4. **JWT:** Implementar autenticação stateless
5. **Validação:** Usar decorators para validação de DTOs

## 📚 Recursos Utilizados
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [JWT.io](https://jwt.io/) - Entendimento de tokens JWT
- [Swagger/OpenAPI](https://swagger.io/docs/)
- [Class Validator](https://github.com/typestack/class-validator)

## 📈 Próximos Passos
- [ ] Implementar sistema de notificações
- [ ] Adicionar filtros avançados de busca
- [ ] Criar dashboard com métricas
- [ ] Implementar WebSockets para updates real-time
- [ ] Adicionar sistema de permissões (RBAC)
- [ ] Integrar com frontend React

## 🔗 Projetos Relacionados
- [React Task Manager](../react-taskmanager-app/) - Frontend da aplicação
- [Front Task Manager](../front-task-manager/) - Interface HTML/CSS/JS
- [Node Task Manager](../node-task-manager/) - Versão com Node.js puro

---

**Desenvolvido por:** Felipe Macedo  
**Contato:** contato.dev.macedo@gmail.com  
**GitHub:** [FelipeMacedo](https://github.com/felipemacedo1)  
**LinkedIn:** [felipemacedo1](https://linkedin.com/in/felipemacedo1)

> 💡 **Reflexão:** Este projeto foi essencial para dominar NestJS e arquiteturas enterprise em Node.js. A experiência com dependency injection, guards e TypeORM estabeleceu bases sólidas para desenvolvimento backend moderno.