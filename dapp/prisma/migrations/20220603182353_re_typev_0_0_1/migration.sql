/*
  Warnings:

  - The primary key for the `Tip` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_pkey",
ALTER COLUMN "txHash" SET DATA TYPE VARCHAR(66),
ADD CONSTRAINT "Tip_pkey" PRIMARY KEY ("txHash");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "allDonateValue" SET DEFAULT 0,
ALTER COLUMN "allDonateWithdraw" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Withdraw" ALTER COLUMN "txHash" SET DATA TYPE VARCHAR(66);
