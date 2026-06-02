import "dotenv/config";

import { PrismaClient, Prisma } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_DIRECT!,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.TodoCreateInput[] = [
  {
    title: "Learn Hono2",
  },
  {
    title: "Learn Bun2",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.todo.create({ data: u });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
