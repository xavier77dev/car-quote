/*
  Warnings:

  - You are about to drop the `Auto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_modelId_fkey";

-- DropTable
DROP TABLE "Auto";

-- CreateTable
CREATE TABLE "autos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "speed" TEXT NOT NULL,
    "acceleration" TEXT NOT NULL,
    "maxSpeed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "autos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "autos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
