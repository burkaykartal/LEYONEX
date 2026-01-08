-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GUEST', 'CLIENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "FairStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('PENDING', 'REVIEWED', 'APPROVED', 'REJECTED', 'CONVERTED');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('DEADLINE', 'PAYMENT', 'DOCUMENT', 'PREPARATION', 'GENERAL');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('CONTRACT', 'INVOICE', 'FLOOR_PLAN', 'DESIGN', 'PHOTO', 'VIDEO', 'OTHER');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('NEW', 'READ', 'REPLIED', 'RESOLVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'GUEST',
    "hasCompletedProfile" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT,
    "sector" TEXT NOT NULL,
    "annualFairCount" INTEGER NOT NULL DEFAULT 0,
    "productivityScore" INTEGER NOT NULL DEFAULT 5,
    "status" "CompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fair" (
    "id" TEXT NOT NULL,
    "name_tr" TEXT NOT NULL,
    "name_en" TEXT,
    "name_it" TEXT,
    "name_ar" TEXT,
    "name_ru" TEXT,
    "name_de" TEXT,
    "name_es" TEXT,
    "name_fr" TEXT,
    "name_zh" TEXT,
    "description_tr" TEXT NOT NULL,
    "description_en" TEXT,
    "description_it" TEXT,
    "description_ar" TEXT,
    "description_ru" TEXT,
    "description_de" TEXT,
    "description_es" TEXT,
    "description_fr" TEXT,
    "description_zh" TEXT,
    "sector" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "venue" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "FairStatus" NOT NULL DEFAULT 'UPCOMING',
    "websiteUrl" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "fairId" TEXT,
    "fairName" TEXT NOT NULL,
    "fairDate" TEXT,
    "requestDetails" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "quotedAmount" DOUBLE PRECISION,
    "quotedCurrency" TEXT DEFAULT 'EUR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFair" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "fairId" TEXT NOT NULL,
    "contractStatus" "ContractStatus" NOT NULL DEFAULT 'PENDING',
    "contractDate" TIMESTAMP(3),
    "agreedServices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contractAmount" DOUBLE PRECISION,
    "contractCurrency" TEXT DEFAULT 'EUR',
    "operationalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FairPreparation" (
    "id" TEXT NOT NULL,
    "userFairId" TEXT NOT NULL,
    "checklistItems" JSONB NOT NULL DEFAULT '[]',
    "score" INTEGER NOT NULL DEFAULT 0,
    "completedItems" INTEGER NOT NULL DEFAULT 0,
    "totalItems" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FairPreparation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userFairId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ReminderType" NOT NULL DEFAULT 'GENERAL',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isNotified" BOOLEAN NOT NULL DEFAULT false,
    "notifiedAt" TIMESTAMP(3),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FairEvaluation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userFairId" TEXT NOT NULL,
    "organizationRating" INTEGER,
    "communicationRating" INTEGER,
    "timelinessRating" INTEGER,
    "valueRating" INTEGER,
    "overallRating" INTEGER,
    "positiveAspects" TEXT,
    "improvementAreas" TEXT,
    "additionalComments" TEXT,
    "leadCount" INTEGER,
    "contractCount" INTEGER,
    "wouldRecommend" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FairEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userFairId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "category" "DocumentCategory" NOT NULL DEFAULT 'OTHER',
    "description" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "preferredContact" TEXT NOT NULL,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'NEW',
    "adminResponse" TEXT,
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_companyId_idx" ON "User"("companyId");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Company_sector_idx" ON "Company"("sector");

-- CreateIndex
CREATE INDEX "Company_country_idx" ON "Company"("country");

-- CreateIndex
CREATE INDEX "Fair_sector_idx" ON "Fair"("sector");

-- CreateIndex
CREATE INDEX "Fair_country_idx" ON "Fair"("country");

-- CreateIndex
CREATE INDEX "Fair_city_idx" ON "Fair"("city");

-- CreateIndex
CREATE INDEX "Fair_startDate_idx" ON "Fair"("startDate");

-- CreateIndex
CREATE INDEX "Fair_status_idx" ON "Fair"("status");

-- CreateIndex
CREATE INDEX "QuoteRequest_userId_idx" ON "QuoteRequest"("userId");

-- CreateIndex
CREATE INDEX "QuoteRequest_companyId_idx" ON "QuoteRequest"("companyId");

-- CreateIndex
CREATE INDEX "QuoteRequest_fairId_idx" ON "QuoteRequest"("fairId");

-- CreateIndex
CREATE INDEX "QuoteRequest_status_idx" ON "QuoteRequest"("status");

-- CreateIndex
CREATE INDEX "UserFair_userId_idx" ON "UserFair"("userId");

-- CreateIndex
CREATE INDEX "UserFair_companyId_idx" ON "UserFair"("companyId");

-- CreateIndex
CREATE INDEX "UserFair_fairId_idx" ON "UserFair"("fairId");

-- CreateIndex
CREATE INDEX "UserFair_contractStatus_idx" ON "UserFair"("contractStatus");

-- CreateIndex
CREATE UNIQUE INDEX "UserFair_userId_fairId_key" ON "UserFair"("userId", "fairId");

-- CreateIndex
CREATE INDEX "FairPreparation_userFairId_idx" ON "FairPreparation"("userFairId");

-- CreateIndex
CREATE INDEX "FairPreparation_score_idx" ON "FairPreparation"("score");

-- CreateIndex
CREATE INDEX "Reminder_userId_idx" ON "Reminder"("userId");

-- CreateIndex
CREATE INDEX "Reminder_userFairId_idx" ON "Reminder"("userFairId");

-- CreateIndex
CREATE INDEX "Reminder_dueDate_idx" ON "Reminder"("dueDate");

-- CreateIndex
CREATE INDEX "Reminder_isCompleted_idx" ON "Reminder"("isCompleted");

-- CreateIndex
CREATE UNIQUE INDEX "FairEvaluation_userFairId_key" ON "FairEvaluation"("userFairId");

-- CreateIndex
CREATE INDEX "FairEvaluation_userId_idx" ON "FairEvaluation"("userId");

-- CreateIndex
CREATE INDEX "FairEvaluation_userFairId_idx" ON "FairEvaluation"("userFairId");

-- CreateIndex
CREATE INDEX "FairEvaluation_overallRating_idx" ON "FairEvaluation"("overallRating");

-- CreateIndex
CREATE INDEX "Document_userId_idx" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "Document_companyId_idx" ON "Document"("companyId");

-- CreateIndex
CREATE INDEX "Document_userFairId_idx" ON "Document"("userFairId");

-- CreateIndex
CREATE INDEX "Document_category_idx" ON "Document"("category");

-- CreateIndex
CREATE INDEX "ContactMessage_userId_idx" ON "ContactMessage"("userId");

-- CreateIndex
CREATE INDEX "ContactMessage_companyId_idx" ON "ContactMessage"("companyId");

-- CreateIndex
CREATE INDEX "ContactMessage_status_idx" ON "ContactMessage"("status");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_fairId_fkey" FOREIGN KEY ("fairId") REFERENCES "Fair"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFair" ADD CONSTRAINT "UserFair_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFair" ADD CONSTRAINT "UserFair_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFair" ADD CONSTRAINT "UserFair_fairId_fkey" FOREIGN KEY ("fairId") REFERENCES "Fair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FairPreparation" ADD CONSTRAINT "FairPreparation_userFairId_fkey" FOREIGN KEY ("userFairId") REFERENCES "UserFair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userFairId_fkey" FOREIGN KEY ("userFairId") REFERENCES "UserFair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FairEvaluation" ADD CONSTRAINT "FairEvaluation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FairEvaluation" ADD CONSTRAINT "FairEvaluation_userFairId_fkey" FOREIGN KEY ("userFairId") REFERENCES "UserFair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userFairId_fkey" FOREIGN KEY ("userFairId") REFERENCES "UserFair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
