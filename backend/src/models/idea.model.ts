import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Idea, IdeaUpdate, PostIdea } from "../interfaces/ideas.interface";
import { getFileSize } from "../services/firebase";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.idea.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const countAllIdeas = async () => {
  try {
    const totalIdeas = await prisma.idea.count({
      where: {
        archived_at: null,
        deleted_at: null,
      },
    });

    return totalIdeas;
  } catch (error) {
    throw new Error("Model error generating total number of ideas.");
  } finally {
    await prisma.$disconnect();
  }
};

const findTrends = async () => {
  const last3Months: string = dayjs(dayjs()).subtract(90, "day").toISOString();

  try {
    const data = await prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        context: true,
        created_at: true,
        archived_at: true,
        deleted_at: true,
        favorit: true,
        goal: true,
        profits: true,
        risks: true,
        primary_img: true,
        views: true,
        attachment: true,
        idea_category: {
          select: {
            id: true,
            category: {
              select: {
                id: true,
                label: true,
                color: true,
              },
            },
          },
        },
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
          },
        },
      },
      where: {
        archived_at: null,
        deleted_at: null,
        created_at: {
          gte: last3Months,
        },
      },

      orderBy: [
        {
          comment: { _count: "desc" },
        },
        {
          idea_like: { _count: "desc" },
        },
        {
          views: "desc",
        },
      ],
      take: 3,
    });

    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findTrendsFavorits = async (value: number) => {
  const last3Months: string = dayjs(dayjs()).subtract(90, "day").toISOString();

  try {
    const data = await prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        context: true,
        created_at: true,
        archived_at: true,
        deleted_at: true,
        favorit: true,
        goal: true,
        profits: true,
        risks: true,
        primary_img: true,
        views: true,
        attachment: true,
        idea_category: {
          select: {
            id: true,
            category: {
              select: {
                id: true,
                label: true,
                color: true,
              },
            },
          },
        },
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
          },
        },
      },
      where: {
        archived_at: null,
        deleted_at: null,
        created_at: {
          gte: last3Months,
        },
        idea_category: {
          some: {
            category: {
              id: value,
            },
          },
        },
      },

      orderBy: [
        {
          comment: { _count: "desc" },
        },
        {
          idea_like: { _count: "desc" },
        },
        {
          views: "desc",
        },
      ],
      take: 1,
    });

    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const response = await prisma.idea.findUnique({
      select: {
        id: true,
        title: true,
        context: true,
        favorit: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            position: true,
            avatar_url: true,
            agency: true,
          },
        },
        comment: {
          select: {
            id: true,
            user_id: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                avatar_url: true,
              },
            },
            body: true,
            created_at: true,
            comment_like: {
              select: {
                id: true,
                comment_id: true,
                user_id: true,
              },
            },
          },
        },
        created_at: true,
        archived_at: true,
        deleted_at: true,
        goal: true,
        profits: true,
        risks: true,
        cloudshare: true,
        primary_img: true,
        views: true,
        idea_category: {
          select: {
            category: {
              select: {
                id: true,
                label: true,
                color: true,
              },
            },
          },
        },
        attachment: {
          select: {
            id: true,
            content_url: true,
          },
        },
        idea_teams: {
          select: {
            user_id: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                position: true,
                avatar_url: true,
                agency: true,
              },
            },
          },
        },
        idea_like: {
          select: {
            id: true,
            user_id: true,
            idea_id: true,
          },
        },
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (response) {
      response.attachment = await Promise.all(
        response.attachment.map(async (attachment) => {
          const size = await getFileSize(attachment.content_url);
          return { ...attachment, size };
        })
      );
    }

    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const findByUserIdAndDate = async (userId: number, date: Date) => {
  try {
    const response = await prisma.idea.count({
      where: {
        user_id: userId,
        created_at: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const createIdea = async (dataIdea: Idea, userId: number): Promise<Idea> => {
  const { title, context, ...otherDataIdea } = dataIdea;

  const data: PostIdea = {
    user_id: userId,
    title,
    context,
  };
  for (const field in otherDataIdea) {
    if (dataIdea[field]) {
      data[field] = dataIdea[field];
    }
  }

  try {
    const createdIdea: Idea = await prisma.idea.create({
      data,
    });
    return createdIdea;
  } catch (error) {
    throw new Error("Error creating new idea");
  } finally {
    await prisma.$disconnect();
  }
};

const addPrimaryImgIdea = async (id: number, url: string) => {
  try {
    const response = await prisma.idea.update({
      where: {
        id,
      },
      data: { primary_img: url },
    });
    return response;
  } catch (error) {
    throw new Error("Error creating new idea");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteIdea = async (id: number) => {
  try {
    const response = await prisma.idea.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return response;
  } catch (error) {
    throw new Error("Idea not found");
  } finally {
    await prisma.$disconnect();
  }
};

const archiveIdea = async (id: number) => {
  try {
    const response = await prisma.idea.update({
      where: { id },
      data: { archived_at: new Date() },
    });
    return response;
  } catch (error) {
    throw new Error("Idea not found");
  } finally {
    await prisma.$disconnect();
  }
};

const updateIdea = async (
  id: number,
  updateData: IdeaUpdate
): Promise<Idea | null> => {
  try {
    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: updateData,
    });

    return updatedIdea;
  } catch (error) {
    throw new Error("Error at update idea");
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAll,
  countAllIdeas,
  findTrends,
  findById,
  findTrendsFavorits,
  findByUserIdAndDate,
  createIdea,
  addPrimaryImgIdea,
  deleteIdea,
  archiveIdea,
  updateIdea,
};
