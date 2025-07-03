# 🚀 API de Agendamento de Tarefas

Bem-vindo a **API de Agendamento de Tarefas** – solução profissional para agendamento de tarefas com notificações automatizadas via webhook, backend robusto em Node.js/TypeScript, frontend moderno em React + Tailwind, filas assíncronas com BullMQ/Redis, documentação via Swagger e deploy simplificado via Docker Compose.

---

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Requisitos Atendidos](#requisitos-atendidos)
- [Stack e Arquitetura](#stack-e-arquitetura)
- [Como Rodar (Docker Compose)](#como-rodar-docker-compose)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Testes Manuais de API](#testes-manuais-de-api)
- [Frontend (UI)](#frontend-ui)
- [Decisões de Arquitetura](#decisões-de-arquitetura)
- [Observações e Melhorias Futuras](#observações-e-melhorias-futuras)
- [Contato](#contato)

---

## 📋 Descrição do Projeto

- **Jet Task API** permite **cadastrar tarefas** com título, descrição, data/hora de execução e um endpoint de webhook.
- **Listagem de tarefas** cadastradas, ordenadas por data.
- **Notificação automática:** 5 minutos antes do horário agendado, a API envia um POST para o webhook informado, via fila BullMQ/Redis.
- **Autenticação JWT** obrigatória para cadastrar tarefas.
- **Interface React** elegante e fácil de usar.
- **Deploy rápido:** Tudo sobe com `docker compose up`.

---

## ✅ Requisitos Atendidos

| Requisito                                     | Status     |
| --------------------------------------------- | ---------- |
| Cadastro de tarefas via API                   | ✅ OK      |
| Listagem de tarefas via API                   | ✅ OK      |
| Notificação assíncrona por webhook (BullMQ)   | ✅ OK      |
| Autenticação JWT para cadastro                | ✅ OK      |
| Testes manuais via Swagger                    | ✅ OK      |
| Deploy com Docker Compose (API + Redis)       | ✅ OK      |
| Frontend moderno em React + Tailwind          | ✅ OK      |
| Organização de código, clean code/arquitetura | ✅ OK      |
| Documentação clara e objetiva                 | ✅ OK      |

---

## 🏗 Stack e Arquitetura

- **Backend:** Node.js, TypeScript, Express, TypeORM (SQLite), BullMQ (filas), Redis
- **Frontend:** React, Vite, Tailwind CSS, Shadcn/UI
- **Autenticação:** JWT (rota de cadastro de tarefas)
- **Documentação:** Swagger (endpoint `/docs`)
- **Banco de dados:** SQLite (persistência local, simples para avaliação)
- **Fila de notificações:** BullMQ + Redis (via Docker)
- **Deploy:** Docker Compose (API + Redis)

---

## 🚦 Como Rodar (Docker Compose)

### **Pré-requisitos**
- Docker e Docker Compose instalados

### **1. Clone o repositório**
<pre>git clone https://github.com/seu-usuario/jet-task-api.git
cd jet-task-api/backend </pre>
### 2. Crie o arquivo .env
Exemplo de .env:
<pre>
ini
Copiar
Editar
JWT_SECRET=sua_chave_secreta
REDIS_HOST=redis
REDIS_PORT=6379
DB_PATH=./data/database.sqlite</pre>
### 3. Suba a API e o Redis
<pre>sh
Copiar
Editar
docker compose up --build
API disponível em: http://localhost:3000
Swagger docs: http://localhost:3000/docs
</pre>
### 4. Rodar frontend
Em outro terminal:
<pre>
sh
Copiar
Editar
cd ../frontend/jet-task-ui
npm install
npm run dev
Acesse: http://localhost:5173
</pre>
## 🔐 Variáveis de Ambiente 
<pre>
Variável	Exemplo	Descrição
JWT_SECRET	minhaChaveSuperSecreta	Chave usada para assinar/verificar tokens
REDIS_HOST	redis	Host do Redis (use redis no Docker)
REDIS_PORT	6379	Porta do Redis
DB_PATH	./data/database.sqlite	Caminho do banco SQLite (persistência)
</pre>
## 🧪 Testes Manuais de API (via Swagger)

-Acesse http://localhost:3000/docs

1. Login (POST /auth/login)
```
Envie:

json
Copiar
Editar
{
  "username": "admin",
  "password": "123456"
}
  
Recebe:

json
Copiar
Editar
{ "token": "JWT..." 
```

2. Cadastro de tarefa (POST /tasks)
Autentique-se com o Bearer Token do login!
```
Exemplo:

json
Copiar
Editar
{
  "title": "Teste Webhook",
  "description": "Exemplo de integração",
  "executeAt": "2025-07-01T20:00:00.000Z",
  "webhookUrl": "https://webhook.site/seu-endpoint-ou-n8n"
}
Só aceita datas futuras.
```
3. Listagem de tarefas (GET /tasks)
```
Retorna todas as tarefas cadastradas, ordenadas pela data.
```
## 🖥 Frontend (UI)
- Interface moderna, intuitiva, responsiva, com feedback visual.

- Faça login para ver/cadastrar tarefas.

- Listagem elegante, inputs com validação, feedbacks de erro e sucesso.

- Consome a API diretamente.

- Desenvolvido com React, TailwindCSS, Shadcn.

## ⚙️ Decisões de Arquitetura
- Clean Architecture: Separação clara (controllers, services, entidades, middlewares)

- Clean Code: Nomes autoexplicativos, funções pequenas, tratamento de erros, validação.

- BullMQ: Agendamento e retry de notificações desacoplados do request do usuário.

- Redis: Backend robusto para filas.

- Swagger: Facilita testes manuais para banca.

- Docker Compose: Torna a subida do projeto confiável e fácil em qualquer ambiente.

## 🔧 Solução de Problemas Docker, Node.js, SQLite e Node Modules

### 1. “Meu container não sobe / ‘tsc: not found’ / ‘sqlite3 not found’”

- **Como corrigir:**  
  Sempre rode o build do container do zero:
  ```bash
  docker compose down --volumes
  docker compose build --no-cache
  docker compose up
  ```
### 2. “sqlite3: invalid ELF header” ou “sqlite3 not installed”
- Como corrigir:

Nunca copie sua pasta node_modules local para dentro do container.

Certifique-se que seu Dockerfile sempre executa npm install dentro do container.

Se já copiou ou sincronizou node_modules local, apague:
```
bash
Copiar
Editar
rm -rf node_modules
docker compose down --volumes
docker compose build --no-cache
docker compose up
Se der erro ainda:
```
Confira se o Dockerfile tem o comando correto:
```
Dockerfile
Copiar
Editar
RUN npm install
Nunca use npm ci se não estiver com o lockfile atualizado.
```
### 3. “Cannot connect to the Docker daemon…”
- Como corrigir:

No Mac/Windows: abra o Docker Desktop.

No Linux:
```
bash
Copiar
Editar
sudo systemctl start docker

Teste:

bash
Copiar
Editar
docker info
```
Deve exibir as infos do Docker rodando.

### 4. “Error: Cannot find module ‘../queue/notificationQueue’”
- Como corrigir:

- Confirme a estrutura e os nomes:
```
cpp
Copiar
Editar
src/
  queue/
    notificationQueue.ts
```
- No seu arquivo de entrada:
```
ts
Copiar
Editar
import "./queue/notificationQueue";
```
- Não coloque .js na importação – apenas o nome relativo.

### 5. “Module ‘bullmq’ has no exported member ‘QueueScheduler’”
- Como corrigir:

Atualize para a versão mais recente do BullMQ, ou remova o uso do QueueScheduler caso esteja causando erro.

Para rodar local/dev, só Queue e Worker já são suficientes!

### 6. “Task property has no initializer and is not definitely assigned…”
- Como corrigir:

Adicione o operador ! para dizer ao TypeScript que será inicializado pelo ORM:
```
ts
Copiar
Editar
id!: number;
title!: string;
Ou defina valores padrão.
```
### 7. “Conflitos de branch/git pull/git push no projeto”
Como corrigir:
```
bash
Copiar
Editar
git pull origin main --allow-unrelated-histories
# ou resolva conflitos manualmente nos arquivos
# commit e siga normalmente
```
### 8. “Redis connection refused” / “ECONNREFUSED 127.0.0.1:6379”
- Como corrigir:

Confira se o container redis está rodando:
```
bash
Copiar
Editar
docker compose ps
```
- Rode docker compose up e veja os logs do Redis subindo.

### 9. “Swagger: Could not resolve pointer: /components/schemas/Task does not exist in document”
- Como corrigir:

Certifique-se que a propriedade schemas está em components dentro de definition no swaggerOptions:
```
ts
Copiar
Editar
definition: {
  // ...
  components: {
    schemas: {
      Task: { /* ... */ }
    }
  }
}
```
Nos arquivos de rota, aponte para o schema corretamente com:
```
bash
Copiar
Editar
$ref: '#/components/schemas/Task'
```
### 💡 DICA DE OURO: Para “resetar tudo” do projeto
Se nada funcionar e você quiser garantir um ambiente limpo:
```
bash
Copiar
Editar
rm -rf node_modules
rm -rf dist
rm package-lock.json
docker compose down --volumes
docker compose build --no-cache
docker compose up
```
- Nunca copie seu node_modules local para o container.

- Sempre rode docker compose build --no-cache se der erro estranho.

- Leia o log do Docker: ele indica qual container deu problema.

## 💡 Observações e Melhorias Futuras
- Prod: Para produção, adotar Postgres/MySQL, segredos seguros e escalabilidade Redis.

- QueueScheduler: Em produção, adicione o QueueScheduler do BullMQ para máxima robustez.

- Webhooks: Pode ser integrado a qualquer sistema (ex: n8n, Slack, e-mail, etc).

- Testes automatizados: Próximo passo para CI/CD.

- Logs/Monitoramento: Adicionar dashboard BullMQ e monitoramento de falhas.

- Permitir editar/cancelar tarefas agendadas.

## 📩 Contato
- Desenvolvido por Anne Siqueira
- LinkedIn: linkedin.com/in/annesiqueiradev
- E-mail: anne.epde05@gmail.com

