import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { CreateUser } from "../interfaces/users.interface";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        mail: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        firstname: true,
        lastname: true,
        agency: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
          },
        },
        joined_at: true,
        created_at: true,
        is_active: true,
        position: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const createByAdmin = async (newUser: CreateUser) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        mail: newUser.mail,
      },
    });

    if (existingUser) {
      return { status: "conflict", message: "Email not available" };
    }

    const createdUser = await prisma.user.create({
      data: {
        mail: newUser.mail,
        hashed_password: newUser.hashed_password,
        role: {
          connect: {
            id: newUser.role_id,
          },
        },
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        agency: {
          connect: {
            id: newUser.agency_id,
          },
        },
        joined_at: dayjs(newUser.joined_at).toISOString(),
        position: {
          connect: {
            id: newUser.position_id,
          },
        },
        is_active: true,
      },
    });

    return {
      status: "success",
      message: "User created successfully.",
      user: createdUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user.");
  } finally {
    await prisma.$disconnect();
  }
};

const updateByIdByAdmin = async (id: number, userUpdated: CreateUser) => {
  try {
    if (userUpdated.mail) {
      const existingUser = await prisma.user.findUnique({
        where: {
          mail: userUpdated.mail,
        },
      });

      if (existingUser) {
        return { status: "conflict", message: "Email not available" };
      }
    }

    const updatedData: CreateUser = { ...userUpdated };

    if (updatedData.joined_at) {
      updatedData.joined_at = dayjs(updatedData.joined_at).toISOString();
    }

    const createdUser = await prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    });

    return {
      status: "success",
      message: "User updated successfully.",
      user: createdUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAllByAdmin, createByAdmin, updateByIdByAdmin };
