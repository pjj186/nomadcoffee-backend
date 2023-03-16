/*
  Warnings:

  - You are about to drop the column `categoryId` on the `CoffeeShop` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "categoryId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
