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
      throw new Error('User not found');
    }
    const fila: IQueueItem[] = [{id: userId, birthday: user?.birthday, parent: null, level: 0}];
    let pointer = 0;
    const visited = new Set();
    let response: IResponse = {
        id: '',
        distance: 0
    };

    while (pointer < fila.length) {
      const currentNode = fila[pointer++];

      if (!currentNode) {
        continue;
      }

      const { id: currentUserId, birthday: currentBirthday, parent: currentParent } = currentNode;
      if (user.birthday == currentBirthday) {
        return {id: currentUserId, distance: currentNode.level}; 
      }

      if (!visited.has(currentUserId)) {
        visited.add(currentUserId);


        
        const friends = await this.userRepository.listUserFriends(currentUserId);
        for (const friend of friends) {
          fila.push({ id: friend.id, birthday:friend.birthday, parent: currentUserId, level: currentNode.level + 1});
        }
      }
    }
    return response;
  }
}