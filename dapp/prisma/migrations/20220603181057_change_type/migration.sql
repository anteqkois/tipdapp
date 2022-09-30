/*
  Warnings:

  - The primary key for the `Cryptocurrency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `address` on the `Cryptocurrency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `userWalletAddress` on the `Cryptocurrency` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - The primary key for the `Tip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `txHash` on the `Tip` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(48)`.
  - You are about to alter the column `userWalletAddress` on the `Tip` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `cryptocurrencyAddress` on the `Tip` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `tipperWalletAddress` on the `Tip` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - The primary key for the `Tipper` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `walletAddress` on the `Tipper` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `address` on the `Token` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `walletAddress` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `tokenAddress` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `userWalletAddress` on the `Withdraw` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `cryptocurrencyAddress` on the `Withdraw` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(42)`.
  - You are about to alter the column `txHash` on the `Withdraw` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(48)`.

*/
-- DropForeignKey
ALTER TABLE "Cryptocurrency" DROP CONSTRAINT "Cryptocurrency_userWalletAddress_fkey";

-- DropForeignKey
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_cryptocurrencyAddress_fkey";

-- DropForeignKey
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_tipperWalletAddress_fkey";

-- DropForeignKey
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_userWalletAddress_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_tokenAddress_fkey";

-- DropForeignKey
ALTER TABLE "Withdraw" DROP CONSTRAINT "Withdraw_cryptocurrencyAddress_fkey";

-- DropForeignKey
ALTER TABLE "Withdraw" DROP CONSTRAINT "Withdraw_userWalletAddress_fkey";

-- AlterTable
ALTER TABLE "Cryptocurrency" DROP CONSTRAINT "Cryptocurrency_pkey",
ALTER COLUMN "address" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "latestPrice" SET DATA TYPE DECIMAL(78,0),
ALTER COLUMN "userWalletAddress" SET DATA TYPE VARCHAR(42),
ADD CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("address");

-- AlterTable
ALTER TABLE "Tip" DROP CONSTRAINT "Tip_pkey",
ALTER COLUMN "txHash" SET DATA TYPE VARCHAR(48),
ALTER COLUMN "tokenAmount" SET DATA TYPE DECIMAL(78,0),
ALTER COLUMN "value" SET DATA TYPE DECIMAL(78,0),
ALTER COLUMN "userWalletAddress" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "cryptocurrencyAddress" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "tipperWalletAddress" SET DATA TYPE VARCHAR(42),
ADD CONSTRAINT "Tip_pkey" PRIMARY KEY ("txHash");

-- AlterTable
ALTER TABLE "Tipper" DROP CONSTRAINT "Tipper_pkey",
ALTER COLUMN "walletAddress" SET DATA TYPE VARCHAR(42),
ADD CONSTRAINT "Tipper_pkey" PRIMARY KEY ("walletAddress");

-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ALTER COLUMN "address" SET DATA TYPE VARCHAR(42),
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("address");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "walletAddress" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "tokenAddress" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "allDonateValue" DROP DEFAULT,
ALTER COLUMN "allDonateValue" SET DATA TYPE DECIMAL(78,0),
ALTER COLUMN "allDonateWithdraw" DROP DEFAULT,
ALTER COLUMN "allDonateWithdraw" SET DATA TYPE DECIMAL(78,0),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress");

-- AlterTable
ALTER TABLE "Withdraw" ALTER COLUMN "userWalletAddress" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(78,0),
ALTER COLUMN "cryptocurrencyAddress" SET DATA TYPE VARCHAR(42),
ALTER COLUMN "txHash" SET DATA TYPE VARCHAR(48);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "Token"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_userWalletAddress_fkey" FOREIGN KEY ("userWalletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_cryptocurrencyAddress_fkey" FOREIGN KEY ("cryptocurrencyAddress") REFERENCES "Cryptocurrency"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_tipperWalletAddress_fkey" FOREIGN KEY ("tipperWalletAddress") REFERENCES "Tipper"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cryptocurrency" ADD CONSTRAINT "Cryptocurrency_userWalletAddress_fkey" FOREIGN KEY ("userWalletAddress") REFERENCES "User"("walletAddress") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdraw" ADD CONSTRAINT "Withdraw_userWalletAddress_fkey" FOREIGN KEY ("userWalletAddress") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdraw" ADD CONSTRAINT "Withdraw_cryptocurrencyAddress_fkey" FOREIGN KEY ("cryptocurrencyAddress") REFERENCES "Cryptocurrency"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
