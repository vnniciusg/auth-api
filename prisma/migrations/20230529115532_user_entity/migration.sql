-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "role" "RoleEnumType" DEFAULT 'user',
    "password" TEXT NOT NULL,
    "verificationCode" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_verificationCode_key" ON "user"("verificationCode");

-- CreateIndex
CREATE INDEX "user_email_verificationCode_idx" ON "user"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_verificationCode_key" ON "user"("email", "verificationCode");
