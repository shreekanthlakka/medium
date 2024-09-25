-- CreateTable
CREATE TABLE "Favoriate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favoriate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomListBlogs" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "customListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomListBlogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favoriate" ADD CONSTRAINT "Favoriate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favoriate" ADD CONSTRAINT "Favoriate_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomList" ADD CONSTRAINT "CustomList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomListBlogs" ADD CONSTRAINT "CustomListBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomListBlogs" ADD CONSTRAINT "CustomListBlogs_customListId_fkey" FOREIGN KEY ("customListId") REFERENCES "CustomList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
