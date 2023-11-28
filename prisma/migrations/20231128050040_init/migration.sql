/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `SDD` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId]` on the table `SRS` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "objectives" SET DEFAULT 'No objectives',
ALTER COLUMN "project_manager" SET DEFAULT 'No project manager',
ALTER COLUMN "budget" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "SDD_projectId_key" ON "SDD"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "SRS_projectId_key" ON "SRS"("projectId");
