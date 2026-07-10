/*
  Warnings:

  - You are about to drop the column `guestListId` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `hotelRequired` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `pickupRequired` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `rsvp` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the `GuestList` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `category` on the `BudgetItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weddingId` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Vendor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ENGAGEMENT', 'HALDI', 'MEHENDI', 'SANGEET', 'WEDDING', 'RECEPTION', 'COCKTAIL', 'OTHER');

-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('VENUE', 'CATERING', 'DECOR', 'PHOTOGRAPHY', 'VIDEOGRAPHY', 'MUSIC', 'HOTEL', 'TRANSPORT', 'MAKEUP', 'OTHER');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('VENUE', 'FOOD', 'DECOR', 'PHOTOGRAPHY', 'HOTEL', 'TRANSPORT', 'GIFTS', 'CLOTHES', 'JEWELLERY', 'OTHER');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT');

-- DropForeignKey
ALTER TABLE "Guest" DROP CONSTRAINT "Guest_guestListId_fkey";

-- DropForeignKey
ALTER TABLE "GuestList" DROP CONSTRAINT "GuestList_weddingId_fkey";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "BudgetItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vendorId" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" "BudgetCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "EventType" NOT NULL;

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "guestListId",
DROP COLUMN "hotelRequired",
DROP COLUMN "pickupRequired",
DROP COLUMN "rsvp",
ADD COLUMN     "accommodationRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "familyId" TEXT,
ADD COLUMN     "giftReceived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invitationDelivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "relation" TEXT,
ADD COLUMN     "transportRequired" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weddingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM';

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "address" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT,
DROP COLUMN "category",
ADD COLUMN     "category" "VendorCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT;

-- DropTable
DROP TABLE "GuestList";

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "city" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestEvent" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "rsvp" "RSVPStatus" NOT NULL DEFAULT 'PENDING',
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "mealTaken" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestCustomField" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,

    CONSTRAINT "GuestCustomField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestCustomValue" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "GuestCustomValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCustomField" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,

    CONSTRAINT "BudgetCustomField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetCustomValue" (
    "id" TEXT NOT NULL,
    "budgetItemId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "BudgetCustomValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestEvent_guestId_eventId_key" ON "GuestEvent"("guestId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestCustomValue_guestId_fieldId_key" ON "GuestCustomValue"("guestId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetCustomValue_budgetItemId_fieldId_key" ON "BudgetCustomValue"("budgetItemId", "fieldId");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestEvent" ADD CONSTRAINT "GuestEvent_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestEvent" ADD CONSTRAINT "GuestEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCustomField" ADD CONSTRAINT "GuestCustomField_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCustomValue" ADD CONSTRAINT "GuestCustomValue_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCustomValue" ADD CONSTRAINT "GuestCustomValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "GuestCustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCustomField" ADD CONSTRAINT "BudgetCustomField_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCustomValue" ADD CONSTRAINT "BudgetCustomValue_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "BudgetItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCustomValue" ADD CONSTRAINT "BudgetCustomValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "BudgetCustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
