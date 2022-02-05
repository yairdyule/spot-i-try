/*
  Warnings:

  - You are about to drop the column `published` on the `Queue` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "published",
ADD COLUMN     "recipientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
