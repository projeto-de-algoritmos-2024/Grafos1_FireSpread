import { IUserRepository } from "../repositories/IUserRepository";

interface IQueueItem {
  id: string;
  parent: string | null;
  name: string;
}
interface IResponse {
  nodes: {
    id: string;
    name: string;
  }[];
  links: {
    source: string;
    target: string;
  }[]
}

export class GenerateUserConnectionsTree {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IResponse> {
    const fila: IQueueItem[] = [{id: userId, parent: null, name: 'Você'}];
    let pointer = 0;
    const visited = new Set();
    const tree: IResponse = {
      nodes: [],
      links: []
    };

    while (pointer < fila.length) {
      const currentNode = fila[pointer++];

      if (!currentNode) {
        continue;
      }

      const { id: currentUserId, parent: currentParent, name: currentName } = currentNode;

      if (!visited.has(currentUserId)) {
        visited.add(currentUserId);

        if(tree.nodes.findIndex(node => node.id === currentUserId) === -1) {
          tree.nodes.push({id: currentUserId, name: currentName});
        }

        if (currentParent !== null) {
          tree.links.push({source: currentParent, target: currentUserId});
        }
        
        const friends = await this.userRepository.listUserFriends(currentUserId);
        for (const friend of friends) {
          fila.push({ id: friend.id, parent: currentUserId, name: friend.name.split(' ')[0]});
        }
      }
    }
    return tree;
  }
}