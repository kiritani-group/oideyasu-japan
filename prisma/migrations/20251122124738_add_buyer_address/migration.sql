/*
  Warnings:

  - Added the required column `buyerAddressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `buyerPhone` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shippingAddressId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "buyerAddressId" TEXT NOT NULL,
ALTER COLUMN "buyerPhone" SET NOT NULL,
ALTER COLUMN "shippingAddressId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerAddressId_fkey" FOREIGN KEY ("buyerAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
