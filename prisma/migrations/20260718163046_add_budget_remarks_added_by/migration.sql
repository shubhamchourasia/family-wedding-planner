/*
  Warnings:

  - You are about to drop the column `vendorId` on the `BudgetItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BudgetAddedBy" AS ENUM ('SHUBHAM', 'AAKRITI', 'MUSKAN', 'ANKITA', 'SOURAV');

-- DropForeignKey
ALTER TABLE "BudgetItem" DROP CONSTRAINT "BudgetItem_vendorId_fkey";

-- AlterTable
ALTER TABLE "BudgetItem" DROP COLUMN "vendorId",
ADD COLUMN     "addedBy" "BudgetAddedBy" NOT NULL DEFAULT 'SHUBHAM',
ADD COLUMN     "remarks" TEXT;
