import {
  PrismaClient,
  UserRole,
} from "@prisma/client";


const prisma = new PrismaClient();


async function main() {

  await prisma.user.upsert({

    where: {
      email: "admin@test.com",
    },

    update: {},

    create: {

      email: "admin@test.com",

      fullName:
        "Shubham Chourasia",

      username:
        "shubham",

      role:
        UserRole.ADMIN,

    },

  });


  console.log(
    "Seed completed"
  );

}


main()
  .catch((e)=>{

    console.error(e);

    process.exit(1);

  })
  .finally(async()=>{

    await prisma.$disconnect();

  });