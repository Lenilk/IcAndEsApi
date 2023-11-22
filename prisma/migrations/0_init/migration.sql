-- CreateTable
CREATE TABLE "user" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "data" (
    "Date" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "user" TEXT,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "noteId" INTEGER NOT NULL,
    "info" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "noteDate" TEXT,

    CONSTRAINT "note_pkey" PRIMARY KEY ("noteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "data_Date_key" ON "data"("Date");

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_noteDate_fkey" FOREIGN KEY ("noteDate") REFERENCES "data"("Date") ON DELETE SET NULL ON UPDATE CASCADE;

