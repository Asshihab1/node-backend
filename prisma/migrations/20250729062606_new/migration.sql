-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_productId_fkey`;

-- DropIndex
DROP INDEX `orders_productId_fkey` ON `orders`;

-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `quantity` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `category` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `myapps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `myapp` VARCHAR(191) NULL,
    `gggg` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `myapp_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `myappId` INTEGER NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
