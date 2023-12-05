import { PrismaClient } from "@prisma/client";
import IdeaLike from "../interfaces/idea_likes.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.idea_like.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const response = await prisma.idea_like.findMany({
      where: {
        idea_id: id,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const findTotalLikesReceivedByUserId = async (userId: number) => {
  try {
    const userIdeas = await prisma.idea.findMany({
      where: {
        user_id: userId,
      },
      include: {
        idea_like: true,
      },
    });

    let totalLikes = 0;
    userIdeas.forEach((idea) => {
      totalLikes += idea.idea_like.length;
    });

    return totalLikes;
  } finally {
    await prisma.$disconnect();
  }
};

const findByUserIdAndCommentId = async (userId: number, ideaId: number) => {
  try {
    const response = await prisma.idea_like.findFirst({
      where: {
        user_id: userId,
        idea_id: ideaId,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const create = async (ideaLike: IdeaLike) => {
  try {
    const createdCommentLike = await prisma.idea_like.create({
      data: {
        user_id: ideaLike.user_id,
        idea_id: ideaLike.idea_id,
      },
    });
    return createdCommentLike;
  } catch (error) {
    throw new Error("Error creating user.");
  } finally {
    await prisma.$disconnect();
  }
};

const remove = async (id: number) => {
  try {
    const data = await prisma.idea_like.delete({
      where: { id },
    });
    return data;
  } catch (error) {
    throw new Error("Error delete idea like.");
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAll,
  findById,
  findTotalLikesReceivedByUserId,
  create,
  remove,
  findByUserIdAndCommentId,
};
