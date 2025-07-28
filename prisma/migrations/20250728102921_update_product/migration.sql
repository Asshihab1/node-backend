/*
  Warnings:

  - You are about to drop the `Clientapp` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `cartId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `description` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Clientapp`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
