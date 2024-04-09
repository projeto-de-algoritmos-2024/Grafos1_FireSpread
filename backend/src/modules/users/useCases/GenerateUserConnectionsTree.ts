import { IUserRepository } from "../repositories/IUserRepository";

interface IQueueItem {
  id: string;
  parent: string | null;
}
interface ITreeNode {
  parent: string | null;
  children: string[];
}

export class GenerateUserConnectionsTree {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<Record<string, ITreeNode>> {
    const fila: IQueueItem[] = [{id: userId, parent: null}];
    const visited = new Set();
    const tree: Record<string, ITreeNode> = {};

    while (fila.length > 0) {
      const currentNode = fila.shift();

      if (!currentNode) {
        continue;
      }

      const { id: currentUserId, parent: currentParent } = currentNode;

      if (!visited.has(currentUserId)) {
        visited.add(currentUserId);
        if (!tree[currentUserId]) {
          tree[currentUserId] = {parent: currentParent, children: []};
          
        }
        if (currentParent !== null && tree[currentParent]) {
          tree[currentParent].children.push(currentUserId);
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