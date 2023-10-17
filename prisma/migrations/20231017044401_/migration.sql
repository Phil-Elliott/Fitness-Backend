/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "clerkId" TEXT;

-- DropTable
DROP TABLE "Auth";

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
