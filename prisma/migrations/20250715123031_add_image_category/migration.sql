-- AlterTable
ALTER TABLE `Product` ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `stock` INTEGER NULL;
