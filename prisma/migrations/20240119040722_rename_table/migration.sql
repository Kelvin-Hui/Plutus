/*
  Warnings:

  - You are about to drop the `PortfolioItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PortfolioValue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PortfolioItem" DROP CONSTRAINT "PortfolioItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "PortfolioValue" DROP CONSTRAINT "PortfolioValue_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "WatchListItem" DROP CONSTRAINT "WatchListItem_userId_fkey";

-- renameTable
ALTER TABLE "PortfolioItem" RENAME TO "PortfolioItem";

-- renameTable
ALTER TABLE "PortfolioValue" RENAME TO "PortfolioValue";


-- CreateIndex
CREATE UNIQUE INDEX "PortfolioItem_userId_symbol_key" ON "PortfolioItem"("userId", "symbol");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioValue_userId_createdAt_key" ON "PortfolioValue"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "WatchListItem" ADD CONSTRAINT "WatchListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioItem" ADD CONSTRAINT "PortfolioItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioValue" ADD CONSTRAINT "PortfolioValue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
