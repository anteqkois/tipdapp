/*
  Warnings:

  - You are about to drop the column `linkToDonate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `widgetId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STREAMER', 'CHARITY', 'SHOP');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_widgetId_fkey";

-- DropIndex
DROP INDEX "User_widgetId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "linkToDonate",
DROP COLUMN "widgetId",
ADD COLUMN     "description" VARCHAR(150) NOT NULL DEFAULT '',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STREAMER',
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Widget" ADD COLUMN     "userWalletAddress" VARCHAR(42);

-- AddForeignKey
ALTER TABLE "Widget" ADD CONSTRAINT "Widget_userWalletAddress_fkey" FOREIGN KEY ("userWalletAddress") REFERENCES "User"("walletAddress") ON DELETE SET NULL ON UPDATE CASCADE;
