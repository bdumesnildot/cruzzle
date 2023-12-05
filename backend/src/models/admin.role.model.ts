/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from "@prisma/client";
import Role from "../interfaces/roles.interface";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.role.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const updateByIdByAdmin = async (id: number, roleUpdated: Role) => {
  try {
    const data = await prisma.role.update({
      where: {
        id,
      },
      data: roleUpdated,
    });
    return data;
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAllByAdmin, updateByIdByAdmin };
