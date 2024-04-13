import  { Prisma, User } from "@prisma/client"

export interface IUserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByInviteId(id: number): Promise<User | null>;
  deleteById(id: string): Promise<void>;
  restoreById(id: string): Promise<void>;
  list(): Promise<User[]>;
  listUserFriends(userId: string): Promise<User[]>;
  userCount(): Promise<number>;
  addFriend(userId: string, friendId: string): Promise<Boolean>;
  countFriends(user: User): Promise<number>;
}