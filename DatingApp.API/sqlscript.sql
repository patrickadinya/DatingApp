CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(95) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
);

CREATE TABLE `Users` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Username` longtext CHARACTER SET utf8mb4 NULL,
    `KnownAs` longtext CHARACTER SET utf8mb4 NULL,
    `PasswordHash` longblob NULL,
    `PasswordSalt` longblob NULL,
    `Gender` longtext CHARACTER SET utf8mb4 NULL,
    `DateOfBirth` datetime(6) NOT NULL,
    `Created` datetime(6) NOT NULL,
    `LastActive` datetime(6) NOT NULL,
    `Introduction` longtext CHARACTER SET utf8mb4 NULL,
    `LookingFor` longtext CHARACTER SET utf8mb4 NULL,
    `Interests` longtext CHARACTER SET utf8mb4 NULL,
    `City` longtext CHARACTER SET utf8mb4 NULL,
    `Country` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_Users` PRIMARY KEY (`Id`)
);

CREATE TABLE `Values` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext CHARACTER SET utf8mb4 NULL,
    CONSTRAINT `PK_Values` PRIMARY KEY (`Id`)
);

CREATE TABLE `Likes` (
    `LikerId` int NOT NULL,
    `LikeeId` int NOT NULL,
    CONSTRAINT `PK_Likes` PRIMARY KEY (`LikerId`, `LikeeId`),
    CONSTRAINT `FK_Likes_Users_LikeeId` FOREIGN KEY (`LikeeId`) REFERENCES `Users` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_Likes_Users_LikerId` FOREIGN KEY (`LikerId`) REFERENCES `Users` (`Id`) ON DELETE RESTRICT
);

CREATE TABLE `Messages` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `SenderId` int NOT NULL,
    `RecipientId` int NOT NULL,
    `Content` longtext CHARACTER SET utf8mb4 NULL,
    `IsRead` tinyint(1) NOT NULL,
    `DateRead` datetime(6) NULL,
    `MessageSent` datetime(6) NOT NULL,
    `SenderDeleted` tinyint(1) NOT NULL,
    `RecipientDeleted` tinyint(1) NOT NULL,
    CONSTRAINT `PK_Messages` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Messages_Users_RecipientId` FOREIGN KEY (`RecipientId`) REFERENCES `Users` (`Id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_Messages_Users_SenderId` FOREIGN KEY (`SenderId`) REFERENCES `Users` (`Id`) ON DELETE RESTRICT
);

CREATE TABLE `Photos` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Url` longtext CHARACTER SET utf8mb4 NULL,
    `Description` longtext CHARACTER SET utf8mb4 NULL,
    `DateAdded` datetime(6) NOT NULL,
    `IsMain` tinyint(1) NOT NULL,
    `PublicId` longtext CHARACTER SET utf8mb4 NULL,
    `UserId` int NOT NULL,
    CONSTRAINT `PK_Photos` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Photos_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
);

CREATE INDEX `IX_Likes_LikeeId` ON `Likes` (`LikeeId`);

CREATE INDEX `IX_Messages_RecipientId` ON `Messages` (`RecipientId`);

CREATE INDEX `IX_Messages_SenderId` ON `Messages` (`SenderId`);

CREATE INDEX `IX_Photos_UserId` ON `Photos` (`UserId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20200726183613_MySqlInitial', '3.1.0');

