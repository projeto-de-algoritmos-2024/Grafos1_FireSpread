const { PrismaClient } = require('@prisma/client');
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const userData = [
    { name: "Alice", email: "alice@email.com", password: "password123", birthday: new Date(), enrollment: "001", inviteId: 1001 },
    { name: "Bob", email: "bob@email.com", password: "password123", birthday: new Date(), enrollment: "002", inviteId: 1002 },
    { name: "Carol", email: "carol@email.com", password: "password123", birthday: new Date(), enrollment: "003", inviteId: 1003 },
    { name: "Dave", email: "dave@email.com", password: "password123", birthday: new Date(), enrollment: "004", inviteId: 1004 },
    { name: "Eve", email: "eve@email.com", password: "password123", birthday: new Date(), enrollment: "005", inviteId: 1005 },

  ];
  for (let i = 0; i < 10; i++) {
    const fakeUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthday: faker.date.past(),
      enrollment: faker.string.numeric({
        length: 3,
      }),
      inviteId: faker.number.int({
        min: 1000,
        max: 9999,
      }),
    };
    userData.push(fakeUser);
  }

  for (let user of userData) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true, 
  });

  const users = await prisma.user.findMany();

  for (let i = 0; i < userData.length; i++) {
    for (let j = i + 1; j < userData.length; j++) {
      await prisma.user.update({
        where: { enrollment: userData[i].enrollment },
        data: {
          friends: {
            connect: { enrollment: userData[j].enrollment }
          }
        }
      });

      await prisma.user.update({
        where: { enrollment: users[j].enrollment },
        data: {
          friends: {
            connect: { enrollment: users[i].enrollment }
          }
        }
      });
    }
  }
  const userData2 = []

  for (let i = 0; i < 10; i++) {
    const fakeUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birthday: faker.date.past(),
      enrollment: faker.string.numeric({
        length: 3,
      }),
      inviteId: faker.number.int({
        min: 1000,
        max: 9999,
      }),
    };
    userData2.push(fakeUser);
  }
  
  for (let user of userData2) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  await prisma.user.createMany({
    data: userData2,
    skipDuplicates: true, 
  });

  for (let i = 0; i < userData2.length; i++) {
    for (let j = 0; j < userData2.length; j++) {
      await prisma.user.update({
        where: { enrollment: userData2[i].enrollment },
        data: {
          friends: {
            connect: { enrollment: userData2[j].enrollment }
          }
        }
      });

      await prisma.user.update({
        where: { enrollment: userData2[j].enrollment },
        data: {
          friends: {
            connect: { enrollment: userData2[i].enrollment }
          }
        }
      });
    }
  }

}




main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
