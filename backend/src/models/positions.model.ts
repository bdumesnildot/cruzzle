import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.position.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const data = await prisma.position.findUnique({
      where: {
        id,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findById };
