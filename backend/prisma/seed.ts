import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data = [
  {
    id: 4,
    name: "moosh",
    email: "moosh@bobo.io",
    password: "bobo",
    profile: {
      create: {
        bio: "omg omg omgo m i'm MOOSH",
      },
    },
  },
  {
    id: 3,
    name: "preston",
    email: "preston@bobo.io",
    password: "bobo",
    profile: {
      create: {
        bio: "omg omg omgo m i'm presotno",
      },
    },
  },
  {
    id: 2,
    name: "bobo",
    email: "bobo@bobo.io",
    password: "bobo",
    profile: {
      create: {
        bio: "meow! i'm bobo!",
      },
    },
  },
  {
    id: 1,
    name: "jared",
    email: "jared@bobo.io",
    password: "bobo",
    profile: {
      create: {
        bio: "really making someprogress on this'ere website",
      },
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
