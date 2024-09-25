-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "published" DROP NOT NULL,
ALTER COLUMN "published" SET DEFAULT false;
