/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from "@prisma/client";
import Agency from "../interfaces/agencies.interface";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.agency.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const updateByIdByAdmin = async (id: number, agencyUpdated: Agency) => {
  try {
    const data = await prisma.agency.update({
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
