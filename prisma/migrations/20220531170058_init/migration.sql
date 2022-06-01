-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "nonce" TEXT,
    "linkToDonate" TEXT,
    "avatarPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "tokenAddress" TEXT,
    "widgetId" TEXT,
    "allDonateCount" INTEGER NOT NULL DEFAULT 0,
    "allDonateValue" INTEGER NOT NULL DEFAULT 0,
    "allDonateWithdraw" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "Tip" (
    "txHash" TEXT NOT NULL,
    "tokenAmount" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "displayed" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userWalletAddress" TEXT NOT NULL,
    "cryptocurrencyAddress" TEXT NOT NULL,
    "tipperWalletAddress" TEXT NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("txHash")
);

-- CreateTable
CREATE TABLE "Cryptocurrency" (
    "address" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "imgPath" TEXT NOT NULL,
    "latestPrice" INTEGER NOT NULL,
    "userWalletAddress" TEXT,

    CONSTRAINT "Cryptocurrency_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Token" (
    "address" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Tipper" (
    "walletAddress" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "nonce" TEXT,
    "allTipsValue" INTEGER NOT NULL,

    CONSTRAINT "Tipper_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "Widget" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "songPath" TEXT NOT NULL,
    "backgroundPath" TEXT NOT NULL,
    "nickColor" TEXT NOT NULL,
    "messageColor" TEXT NOT NULL,
    "valueColor" TEXT NOT NULL,
    "showTime" INTEGER NOT NULL,
    "filterProfanity" BOOLEAN NOT NULL,
    "voiceMessage" BOOLEAN NOT NULL,

    CONSTRAINT "Widget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdraw" (
    "id" TEXT NOT NULL,
    "userWalletAddress" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cryptocurrencyAddress" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "txHash" TEXT NOT NULL,

    CONSTRAINT "Withdraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nick_key" ON "User"("nick");

-- CreateIndex
CREATE UNIQUE INDEX "User_widgetId_key" ON "User"("widgetId");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_address_key" ON "Cryptocurrency"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_symbol_key" ON "Cryptocurrency"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Cryptocurrency_name_key" ON "Cryptocurrency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Token_symbol_key" ON "Token"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Token_name_key" ON "Token"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tipper_walletAddress_key" ON "Tipper"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Tipper_nick_key" ON "Tipper"("nick");

-- CreateIndex
CREATE UNIQUE INDEX "Withdraw_txHash_key" ON "Withdraw"("txHash");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tokenAddress_fkey" FOREIGN KEY ("tokenAddress") REFERENCES "Token"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
