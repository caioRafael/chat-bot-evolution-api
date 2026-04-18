# Evolution API - Setup com Docker

Guia completo para subir a Evolution API com PostgreSQL e Redis usando Docker.

## Pré-requisitos

- Docker instalado
- Docker Compose (v2+)

Verifique:

```bash
docker -v
docker compose version
```

---

## Estrutura

- `docker-compose.yml` → API
- `database/postegres/docker-compose.yml` → PostgreSQL
- `database/redis/docker-compose.yml` → Redis
- `.env` → configurações da aplicação

---

## Passo 1 - Subir banco de dados

```bash
docker compose -f database/postegres/docker-compose.yml up -d
```

Verificar:

```bash
docker ps | grep postgres
```

---

## Passo 2 - Subir Redis

```bash
docker compose -f database/redis/docker-compose.yml up -d
```

Verificar:

```bash
docker ps | grep redis
```

---

## Passo 3 - Subir Evolution API

```bash
docker compose up -d
```

Verificar:

```bash
docker ps | grep evolution_api
```

---

## Acesso

- API: http://localhost:8080
- PgAdmin: http://localhost:4000

Credenciais PgAdmin:
- Email: admin
- Senha: admin123

---

## Configuração do Banco

Host: `postgres`
Porta: `5432`
Banco: `evolution`
Usuário: `admin`
Senha: `admin123`

---

## Configuração do Redis

Host: `redis`
Porta: `6379`

---

## Testes de conexão

Testar dentro do container da API:

```bash
docker exec -it evolution_api ping postgres
docker exec -it evolution_api ping redis
```

---

## Problemas comuns

- Erro de conexão com banco:
  - verifique `.env`
  - verifique se o container `postgres` está rodando

- Redis não conecta:
  - confirme `CACHE_REDIS_URI=redis://redis:6379/6`

- Rede não encontrada:
  ```bash
  docker network create evolution-net
  ```

---

## Reiniciar tudo

```bash
docker compose down
docker compose -f database/postegres/docker-compose.yml down
docker compose -f database/redis/docker-compose.yml down

docker compose -f database/postegres/docker-compose.yml up -d
docker compose -f database/redis/docker-compose.yml up -d
docker compose up -d
```

---

## Logs

```bash
docker logs -f evolution_api
docker logs -f postgres
docker logs -f redis
```

---

## Observações

- Todos os serviços compartilham a rede `evolution-net`
- Os nomes dos containers são usados como host (DNS interno do Docker)
- Não use `localhost` dentro dos containers
