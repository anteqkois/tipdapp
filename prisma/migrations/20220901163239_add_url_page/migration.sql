/*
  Warnings:

  - You are about to drop the column `link` on the `Widget` table. All the data in the column will be lost.
  - Added the required column `urlPage` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Widget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "urlPage" VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "link",
ADD COLUMN     "url" TEXT NOT NULL;
