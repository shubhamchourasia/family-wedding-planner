-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'FAMILY', 'VIEWER');

-- CreateEnum
CREATE TYPE "GuestSide" AS ENUM ('BRIDE', 'GROOM', 'BOTH');

-- CreateEnum
CREATE TYPE "RSVPStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "FoodPreference" AS ENUM ('VEG', 'NON_VEG', 'JAIN', 'VEGAN');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ENGAGEMENT', 'HALDI', 'MEHENDI', 'SANGEET', 'WEDDING', 'RECEPTION', 'COCKTAIL', 'OTHER');

-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('VENUE', 'CATERING', 'DECOR', 'PHOTOGRAPHY', 'VIDEOGRAPHY', 'MUSIC', 'HOTEL', 'TRANSPORT', 'MAKEUP', 'OTHER');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('VENUE', 'FOOD', 'DECOR', 'PHOTOGRAPHY', 'HOTEL', 'TRANSPORT', 'GIFTS', 'CLOTHES', 'JEWELLERY', 'OTHER');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT');

-- CreateEnum
CREATE TYPE "BudgetAddedBy" AS ENUM ('SHUBHAM', 'AAKRITI', 'MUSKAN', 'ANKITA', 'SOURAV');

-- CreateEnum
CREATE TYPE "TaskAddedBy" AS ENUM ('SHUBHAM', 'AAKRITI', 'MUSKAN', 'ANKITA', 'SOURAV');

-- CreateEnum
CREATE TYPE "TaskCategory" AS ENUM ('GENERAL', 'VENUE', 'FOOD', 'DECOR', 'GUEST', 'TRAVEL', 'DOCUMENT', 'PAYMENT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'FAMILY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wedding" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "groomName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,
    "overallBudget" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "location" TEXT,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "TaskList" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskListId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "TaskCategory" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "remarks" TEXT,
    "addedBy" "TaskAddedBy" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weddingId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "side" "GuestSide" NOT NULL DEFAULT 'BOTH',
    "food" "FoodPreference",
    "invitationSent" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "accommodationRequired" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "familyId" TEXT,
    "giftReceived" BOOLEAN NOT NULL DEFAULT false,
    "invitationDelivered" BOOLEAN NOT NULL DEFAULT false,
    "relation" TEXT,
    "transportRequired" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "venue" TEXT,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "BudgetItem" (
    "id" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "BudgetCategory" NOT NULL,
    "estimated" DOUBLE PRECISION NOT NULL,
    "actual" DOUBLE PRECISION,
    "paid" DOUBLE PRECISION,
    "remarks" TEXT,
    "addedBy" "BudgetAddedBy" NOT NULL DEFAULT 'SHUBHAM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "weddingId" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "category" "VendorCategory" NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GuestEvent_guestId_eventId_key" ON "GuestEvent"("guestId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestCustomValue_guestId_fieldId_key" ON "GuestCustomValue"("guestId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetCustomValue_budgetItemId_fieldId_key" ON "BudgetCustomValue"("budgetItemId", "fieldId");

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskList" ADD CONSTRAINT "TaskList_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskListId_fkey" FOREIGN KEY ("taskListId") REFERENCES "TaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestEvent" ADD CONSTRAINT "GuestEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestEvent" ADD CONSTRAINT "GuestEvent_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCustomField" ADD CONSTRAINT "GuestCustomField_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCustomValue" ADD CONSTRAINT "GuestCustomValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "GuestCustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestCustomValue" ADD CONSTRAINT "GuestCustomValue_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCustomField" ADD CONSTRAINT "BudgetCustomField_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCustomValue" ADD CONSTRAINT "BudgetCustomValue_budgetItemId_fkey" FOREIGN KEY ("budgetItemId") REFERENCES "BudgetItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetCustomValue" ADD CONSTRAINT "BudgetCustomValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "BudgetCustomField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
