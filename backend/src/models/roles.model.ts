import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.role.findMany({
      select: {
        name: true,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const data = await prisma.role.findUnique({
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
