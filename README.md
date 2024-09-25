tech stack used
  prisma for orm
  postgres for db
    u can pull the postgres image by using the command
    docker run -d -e POSTGRES_PASSWORD=sreekanth -p 5432:5432 postgres
  setting up db
    npx prisma init
    npx prisma migrate dev --name init ==> to migrate the db to postgres
    npx prisma generate ==> for generating the client 
