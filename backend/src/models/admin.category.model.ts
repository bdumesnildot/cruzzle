import { PrismaClient } from "@prisma/client";
import Category from "../interfaces/categories.interface";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
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
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const createByAdmin = async (item: Category) => {
  try {
    const createditem = await prisma.category.create({
      data: {
        label: item.label,
        color: item.color,
      },
    });
    return createditem;
  } catch (error) {
    throw new Error("Error creating role.");
  } finally {
    await prisma.$disconnect();
  }
};

const updateByIdByAdmin = async (id: number, updatedItem: Category) => {
  try {
    const data = await prisma.category.update({
      where: {
        id,
      },
      data: {
        label: updatedItem.label,
        color: updatedItem.color,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error updating role.");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteByIdByAdmin = async (id: number) => {
  try {
    await prisma.idea_category.deleteMany({
      where: {
        category_id: id,
      },
    });

    const data = await prisma.category.delete({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("Error deleting category.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAllByAdmin, createByAdmin, updateByIdByAdmin, deleteByIdByAdmin };
