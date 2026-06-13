# Pokédex API 🔥

> "Com grandes poderes vêm grandes responsabilidades de configurar variáveis de ambiente."

API REST em Node.js + Express com Firebase Firestore. É ela que guarda seus pokémons quando o app fecha.

---

## Tecnologias

- **Node.js** >= 18
- **Express** — servidor HTTP
- **Firebase Admin SDK** — acesso ao Firestore
- **dotenv** — pra você não commitar sua chave privada (por favor, não comite)

---

## Estrutura

```
backend/
├── index.js                  ← ponto de entrada
└── src/
    ├── config/
    │   └── firebase.js       ← inicializa o Firebase
    ├── models/
    │   └── pokemon.model.js  ← fala com o Firestore
    ├── controllers/
    │   └── pokemon.controller.js  ← lógica de negócio
    ├── routes/
    │   └── pokemon.routes.js ← define as rotas
    └── middleware/
        └── errorHandler.js   ← captura os erros antes que virem choro
```

---

## Instalação

```bash
npm install
```

---

## Configuração do Firebase

Você precisa de uma **Service Account** do seu projeto Firebase.  
Acesse: **Console Firebase → Configurações do projeto → Contas de serviço → Gerar nova chave privada**

**Opção 1 — arquivo local** (desenvolvimento):

Coloque o arquivo baixado como `service-account.json` na raiz de `backend/`. Ele já está no `.gitignore`, então pode ficar tranquilo.

**Opção 2 — variável de ambiente** (produção / Render):

Crie um `.env` baseado no `.env.example`:

```env
PORT=3000
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

> O JSON precisa estar em **uma única linha**. Quebra de linha = quebra de produção.

---

## Execução

```bash
# Produção
npm start

# Desenvolvimento (reinicia sozinho a cada salvamento desesperado)
npm run dev
```

Acesse `http://localhost:3000/health` — se receber `{"status":"ok"}`, você é um mestre pokémon.

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Verifica se o servidor está vivo |
| GET | `/api/pokemons` | Lista todos os pokémons |
| GET | `/api/pokemons/:id` | Busca um pokémon pelo ID |
| POST | `/api/pokemons` | Cadastra um novo pokémon |
| PUT | `/api/pokemons/:id` | Atualiza um pokémon existente |
| DELETE | `/api/pokemons/:id` | Remove um pokémon sem chances de defesa |

### Corpo esperado (POST / PUT)

```json
{
  "name": "Pikachu",
  "description": "Um ratinho elétrico mal-humorado.",
  "imageUrl": "https://..."
}
```

`imageUrl` é opcional. `name` e `description` são obrigatórios, sem desculpas.

---

## Deploy no Render

1. Suba a pasta `backend/` no GitHub
2. Crie um **Web Service** no [Render](https://render.com)
3. Configure:
   - **Build command:** `npm install`
   - **Start command:** `node index.js`
4. Adicione a variável de ambiente `FIREBASE_SERVICE_ACCOUNT` com o JSON em uma linha
5. Faça o deploy e reze um pouco

> O plano free hiberna após 15 min sem requisições. A primeira chamada após hibernação leva ~30s. É normal. O Snorlax também demora pra acordar.
