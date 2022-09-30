/*
  Warnings:

  - You are about to alter the column `tokenAmount` on the `Tip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(78,0)` to `Decimal(30,1)`.
  - You are about to alter the column `value` on the `Tip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(78,0)` to `Decimal(30,1)`.

*/
-- AlterTable
ALTER TABLE "Tip" ALTER COLUMN "tokenAmount" SET DATA TYPE DECIMAL(30,1),
ALTER COLUMN "value" SET DATA TYPE DECIMAL(30,1);
