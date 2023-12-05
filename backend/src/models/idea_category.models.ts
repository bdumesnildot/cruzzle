import { PrismaClient } from "@prisma/client";
import { IdeaCategory } from "../interfaces/idea_category.interface";

const prisma = new PrismaClient();

const createCategoryByIdea = async (arrayOfCategory: IdeaCategory[]) => {
  try {
    const data = await prisma.idea_category.createMany({
      data: arrayOfCategory,
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const getCategoryByIdeaId = async (id: number) => {
  try {
    const data = await prisma.idea_category.findMany({
      where: { idea_id: id },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const deleteCategoriesByIdeaId = async (id: number) => {
  try {
    const data = await prisma.idea_category.deleteMany({
      where: { idea_id: id },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const countCategoryUsage = async () => {
  try {
    const data = await prisma.category.findMany({
      select: {
        id: true,
        label: true,
        color: true,
        _count: {
          select: {
            idea_category: true,
          },
        },
      },
      orderBy: {
        idea_category: {
          _count: "desc",
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

export {
  createCategoryByIdea,
  getCategoryByIdeaId,
  deleteCategoriesByIdeaId,
  countCategoryUsage,
};
