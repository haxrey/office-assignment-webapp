/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `currentOccupancy` on the `offices` table. All the data in the column will be lost.
  - You are about to drop the column `distanceFromNearest` on the `offices` table. All the data in the column will be lost.
  - Made the column `location` on table `offices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "departmentId" TEXT,
    CONSTRAINT "staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_offices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "officeNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "floor" INTEGER NOT NULL DEFAULT 1,
    "departmentId" TEXT,
    CONSTRAINT "offices_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_offices" ("capacity", "departmentId", "floor", "id", "location", "officeNumber") SELECT "capacity", "departmentId", "floor", "id", "location", "officeNumber" FROM "offices";
DROP TABLE "offices";
ALTER TABLE "new_offices" RENAME TO "offices";
CREATE UNIQUE INDEX "offices_officeNumber_key" ON "offices"("officeNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
