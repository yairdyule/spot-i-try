import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

describe("Database integration", () => {
  it("Should return arrays from queries", async () => {
    const users = await db.user.findMany();
    const profiles = await db.profile.findMany();
    const queues = await db.queue.findMany();
    const results = [users, profiles, queues];
    expect(results.filter((res) => !Array.isArray(res)).length).toBe(0);
  });

  it("Should find the user 'baby_bobo'", async () => {
    const bobo = await db.user.findFirst({
      where: {
        name: "baby_bobo",
      },
    });
    expect(bobo).toBeTruthy();
    expect(bobo?.name).toEqual("baby_bobo");
  });
});
