import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NotificationIdea } from "../interfaces/notifications.interface";

const prisma = new PrismaClient();

const findAllByUserId = async (id: number) => {
  try {
    const data = await prisma.notification_idea.findMany({
      select: {
        id: true,
        type: true,
        idea: {
          select: {
            id: true,
            title: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          },
        },
        created_at: true,
        red_at: true,
      },
      where: {
        idea: {
          user: {
            id,
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const create = async (item: NotificationIdea) => {
  try {
    const createditem = await prisma.notification_idea.create({
      data: {
        idea_id: item.idea_id,
        user_id: item.user_id,
        type: item.type,
      },
    });
    return createditem;
  } catch (error) {
    throw new Error("Error creating role.");
  } finally {
    await prisma.$disconnect();
  }
};

const updateById = async (id: number, item: NotificationIdea) => {
  try {
    const data = await prisma.notification_idea.update({
      where: {
        id,
      },
      data: {
        idea_id: item.idea_id,
        user_id: item.user_id,
        type: item.type,
        red_at: item.red_at === null ? null : dayjs(item.red_at).toISOString(),
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error updating role.");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteRedNotificationByDate = async () => {
  try {
    const data = await prisma.notification_idea.deleteMany({
      where: {
        red_at: {
          lt: dayjs().subtract(30, "day").toDate(),
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("Error deleting notification.");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteById = async (id: number) => {
  try {
    const data = await prisma.notification_idea.deleteMany({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("Error deleting notification.");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteByIitem = async (item: NotificationIdea) => {
  try {
    const data = await prisma.notification_idea.deleteMany({
      where: {
        idea_id: item.idea_id,
        user_id: item.user_id,
        type: item.type,
      },
    });

    return data;
  } catch (error) {
    console.error("Prisma error:", error);
    throw new Error("Error deleting notification.");
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAllByUserId,
  create,
  updateById,
  deleteRedNotificationByDate,
  deleteById,
  deleteByIitem,
};
