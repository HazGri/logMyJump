-- CreateTable
CREATE TABLE "Jump" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "aircraft" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "jumpType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jump_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jump" ADD CONSTRAINT "Jump_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
