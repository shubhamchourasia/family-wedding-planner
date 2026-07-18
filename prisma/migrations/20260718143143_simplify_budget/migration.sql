/*
  Warnings:

  - You are about to drop the column `budgetId` on the `BudgetItem` table. All the data in the column will be lost.
  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weddingId` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_weddingId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_budgetId_fkey";

-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "budgetId",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weddingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "overallBudget" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Budget";

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
