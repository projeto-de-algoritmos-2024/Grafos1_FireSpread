/*
  Warnings:

  - A unique constraint covering the columns `[inviteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_inviteId_key" ON "User"("inviteId");
