import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    name: "moosh",
    email: "moosh@prisma.io",
    password: " guess",
    queues: {
      create: [
        {
          title: "flowers",
          content: {
            create: [
              {
                id: "bartsneio",
                name: "sunshine on mym bouldrs",
                artists: ["john denver"],
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "jared",
    email: "jared@prisma.io",
    password: " guess",
    queues: {
      create: [
        {
          title: "house *",
          content: {
            create: [
              { id: "arstneio", name: "doja bat", artists: ["dojba", "cat"] },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`start seeding`);
  for (const u of data) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`created user ${user.id} with name ${user.name}`);
  }
  console.log("seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
