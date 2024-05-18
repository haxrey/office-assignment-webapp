-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_offices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "officeNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "floor" INTEGER NOT NULL DEFAULT 1,
    "departmentId" TEXT,
    "currentOccupancy" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "offices_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_offices" ("capacity", "departmentId", "floor", "id", "location", "officeNumber") SELECT "capacity", "departmentId", "floor", "id", "location", "officeNumber" FROM "offices";
DROP TABLE "offices";
ALTER TABLE "new_offices" RENAME TO "offices";
CREATE UNIQUE INDEX "offices_officeNumber_key" ON "offices"("officeNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
