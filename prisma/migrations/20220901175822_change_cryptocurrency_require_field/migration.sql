-- AlterTable
ALTER TABLE "Cryptocurrency" ADD COLUMN     "priceUpdateAt" TIMESTAMP(3),
ALTER COLUMN "imgPath" DROP NOT NULL,
ALTER COLUMN "latestPrice" DROP NOT NULL;
