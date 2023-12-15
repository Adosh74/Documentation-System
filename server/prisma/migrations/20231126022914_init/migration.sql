-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "objectives" TEXT NOT NULL,
    "project_manager" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'local',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SRS" (
    "id" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "intended_audience" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "use_case" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "SRS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SDD" (
    "id" TEXT NOT NULL,
    "uml" TEXT[],
    "projectId" TEXT NOT NULL,

    CONSTRAINT "SDD_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SRS" ADD CONSTRAINT "SRS_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SDD" ADD CONSTRAINT "SDD_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
