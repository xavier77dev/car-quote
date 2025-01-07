/*
  Warnings:

  - You are about to drop the column `modelCar` on the `Quotation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,modelId]` on the table `Quotation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modelId` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Made the column `cityId` on table `Quotation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_cityId_fkey";

-- AlterTable
ALTER TABLE "Quotation" DROP COLUMN "modelCar",
ADD COLUMN     "modelId" INTEGER NOT NULL,
ALTER COLUMN "cityId" SET NOT NULL;

-- DropEnum
DROP TYPE "Model";

-- CreateTable
CREATE TABLE "Auto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Auto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_email_modelId_key" ON "Quotation"("email", "modelId");

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Auto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
