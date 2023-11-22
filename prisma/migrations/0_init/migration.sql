-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
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
    "noteId" SERIAL NOT NULL,
    "info" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "dateId" INTEGER,

    CONSTRAINT "note_pkey" PRIMARY KEY ("noteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "data"("id") ON DELETE SET NULL ON UPDATE CASCADE;

