/*
  Warnings:

  - Added the required column `cityName` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "cityName" TEXT NOT NULL,
ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
