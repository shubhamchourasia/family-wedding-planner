import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


async function main() {

  await prisma.user.upsert({

    where: {
      email: "demo@wedding.com",
    },


    update: {},


    create: {
      id: "development-user-id",

      email: "demo@wedding.com",

      fullName: "Demo User",

      role: "ADMIN",
    },

  });


  console.log(
    "Development user created"
  );

}


main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (error) => {

    console.error(error);

    await prisma.$disconnect();

    process.exit(1);

  });