/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from "@prisma/client";
import Position from "../interfaces/positions.interface";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.position.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const updateByIdByAdmin = async (id: number, agencyUpdated: Position) => {
  try {
    const data = await prisma.position.update({
      where: {
        id,
      },
      data: agencyUpdated,
    });
    return data;
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAllByAdmin, updateByIdByAdmin };
