import { IUserRepository } from "../repositories/IUserRepository";

interface IQueueItem {
  id: string;
  parent: string | null;
}
interface IResponse {
  nodes: {
    id: string;
  }[];
  links: {
    source: string;
    target: string;
  }[]
}

export class GenerateUserConnectionsTree {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IResponse> {
    const fila: IQueueItem[] = [{id: userId, parent: null}];
    const visited = new Set();
    const tree: IResponse = {
      nodes: [],
      links: []
    };

    while (fila.length > 0) {
      const currentNode = fila.shift();

      if (!currentNode) {
        continue;
      }

      const { id: currentUserId, parent: currentParent } = currentNode;

      if (!visited.has(currentUserId)) {
        visited.add(currentUserId);

        if(tree.nodes.findIndex(node => node.id === currentUserId) === -1) {
          tree.nodes.push({id: currentUserId});
        }

        if (currentParent !== null) {
          tree.links.push({source: currentParent, target: currentUserId});
        }
        
        const friends = await this.userRepository.listUserFriends(currentUserId);
        for (const friend of friends) {
          fila.push({ id: friend.id, parent: currentUserId });
        }
      }
    }
    return tree;
  }
}