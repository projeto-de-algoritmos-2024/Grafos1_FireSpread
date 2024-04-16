# Spread Fire

**Número da Lista**: 22<br>
**Conteúdo da Disciplina**: Grafos 1<br>

## Alunos

| Matrícula  | Aluno                      |
| ---------- | -------------------------- |
| 21/1031646 | Bruno Medeiros de Oliveira |
| 21/1031762 | Leonardo Lago Moreno       |

## Sobre

O fire spread é um site feito para a disciplina de projeto de algoritmos e foi inspirado pela teoria dos Seis Graus de Separação, cujo objetivo é verificar se conseguimos conectar todas as pessoas que usam a plataforma através de amizades de amigos de amigos. Atualmente a plataforma só aceita cadastros com emails universitários e além disso, para deixar as coisas um pouco mais difíceis, algumas pessoas precisam de código de amizade para criar sua conta.

## Screenshots

### tela 1 - login

![Captura de Tela 2024-04-15 às 22 11 23](https://github.com/projeto-de-algoritmos-2024/Grafos1_FireSpread/assets/56228340/376dbb71-240a-42ec-82b4-b9a7d8540eab)

### tela 2 - registro

![Captura de Tela 2024-04-15 às 22 11 36](https://github.com/projeto-de-algoritmos-2024/Grafos1_FireSpread/assets/56228340/ae0c0047-2e59-4619-84c4-f0288da35d07)

### tela 3 - home com menu fechado

![Captura de Tela 2024-04-15 às 22 15 42](https://github.com/projeto-de-algoritmos-2024/Grafos1_FireSpread/assets/56228340/a33bbb30-ec55-45a1-b3a6-4431d039cfbb)

### tela 4 - home com menu aberto

![Captura de Tela 2024-04-15 às 22 15 49](https://github.com/projeto-de-algoritmos-2024/Grafos1_FireSpread/assets/56228340/5053944f-5dda-4039-8c7a-ce44c6953d2b)


## Vídeo

[![Ver video](https://img.youtube.com/vi/cOn2AJeDg4w/0.jpg)](https://www.youtube.com/watch?v=cOn2AJeDg4w)

## Instalação

**Linguagem**: typescript<br>
**Framework**: react(frontend), fastify(backend) <br>

### pré-requisitos

- Node.js
- Docker
- yarn

### Como instalar

```bash
  git clone https://github.com/projeto-de-algoritmos-2024/Grafos1_FireSpread.git
```

#### Frontend

1 - entre na pasta do frontend e instale as dependências

```bash
  cd Grafos1_FireSpread/frontend
  yarn # instala as dependências
```

2 - crie o arquivo .env e adicione as variáveis de ambiente

```bash
  cp .env.example .env
```

3 - rode o frontend

```bash
  yarn dev
```

#### Backend

1 - entre na pasta do backend e instale as dependências

```bash
  cd Grafos1_FireSpread/backend
  yarn # instala as dependências
```

2 - crie o arquivo .env e adicione as variáveis de ambiente

```bash
  cp .env.example .env
```
obs: caso já tenha uma instância do postgres rodando em sua máquina é recomendável alterar a variável POSTGRES_PORT para 5433 ou alguma outra porta livre

3 - rode o banco de dados

```bash
  docker-compose up -d
```

4 - rode as migrations

```bash
  yarn prisma migrate dev
```

4 - rode o backend

```bash
  yarn dev
```

## Uso

### login e registro

Após seguir os passos de instalação, acesse o site em http://localhost:5173 onde o frontend estará rodando.

lá você poderá fazer login com uma conta que foi gerada pelo seed do banco de dados.

exemplo de conta:

```
email: alice@email.com
senha: password123
```

além disso, você pode registrar sua própria conta, mas para isso você precisará ter configurado as variáveis de ambiente do backend:

```
EMAIL
EMAIL_PASSWORD
EMAIL_REFRESH_TOKEN
EMAIL_REDIRECT_URI
```

com valores reais, o que pode ser um pouco trabalhoso, então recomendamos usar a conta de exemplo.

### tela home

Após logar, você será redirecionado para a tela home, onde você poderá ver as pessoas com quem você possui conexão direta e indireta.
Além disso, você pode adicionar amigos, visualizar curiosidades sobre a plataforma/sua conta e ver seu código de amizade.

## Outros

### Versão deployada

O projeto foi deployado na vercel e pode ser acessado em https://fire-spread.vercel.app/

### Aplicações de grafos

#### BFS a partir de um nó

Através de uma BFS(Busca em Largura) geramos a arvore de conexões de um usuário, onde cada nó é um usuário e cada aresta é uma conexão de amizade. Assim, conseguimos o componente conectado do usuário que é usado para mostrar suas conexões diretas e indiretas.

```typescript
export class GenerateUserConnectionsTree {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IResponse> {
    const fila: IQueueItem[] = [{ id: userId, parent: null, name: "Você" }];
    let pointer = 0;
    const visited = new Set();
    const tree: IResponse = {
      nodes: [],
      links: [],
    };

    while (pointer < fila.length) {
      const currentNode = fila[pointer++];

      if (!currentNode) {
        continue;
      }

      const {
        id: currentUserId,
        parent: currentParent,
        name: currentName,
      } = currentNode;

      if (!visited.has(currentUserId)) {
        visited.add(currentUserId);

        if (tree.nodes.findIndex((node) => node.id === currentUserId) === -1) {
          tree.nodes.push({ id: currentUserId, name: currentName });
        }

        if (currentParent !== null) {
          tree.links.push({ source: currentParent, target: currentUserId });
        }

        const friends = await this.userRepository.listUserFriends(
          currentUserId
        );
        for (const friend of friends) {
          fila.push({
            id: friend.id,
            parent: currentUserId,
            name: friend.name.split(" ")[0],
          });
        }
      }
    }
    return tree;
  }
}
```

##### BFS para menor distância entre dois usuários com a mesma data de aniversário

Outra funcionalidade da aplicação é a parte de curiosidades, uma das curiosidades é a menor distância entre dois usuários que possuem a mesma data de aniversário, para isso usamos uma BFS novamente. Aqui retornamos a menor distância entre dois usuários que possuem a mesma data de aniversário e o id do usuário que foi encontrado primeiro.

```typescript
import { IUserRepository } from "../repositories/IUserRepository";

interface IQueueItem {
  id: string;
  birthday: Date;
  parent: string | null;
  level: number;
}
interface IResponse {
  id: string;
  distance: number;
}

export class SearchUserConnection {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const fila: IQueueItem[] = [
      { id: userId, birthday: user?.birthday, parent: null, level: 0 },
    ];
    let pointer = 0;
    const visited = new Set();
    let response: IResponse = {
      id: "",
      distance: 0,
    };

    while (pointer < fila.length) {
      const currentNode = fila[pointer++];

      if (!currentNode) {
        continue;
      }

      const {
        id: currentUserId,
        birthday: currentBirthday,
        parent: currentParent,
      } = currentNode;
      if (user.birthday == currentBirthday) {
        return { id: currentUserId, distance: currentNode.level };
      }

      if (!visited.has(currentUserId)) {
        visited.add(currentUserId);

        const friends = await this.userRepository.listUserFriends(
          currentUserId
        );
        for (const friend of friends) {
          fila.push({
            id: friend.id,
            birthday: friend.birthday,
            parent: currentUserId,
            level: currentNode.level + 1,
          });
        }
      }
    }
    return response;
  }
}
```
