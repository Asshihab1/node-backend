/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `totalPrice`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`;
