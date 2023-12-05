import { PrismaClient } from "@prisma/client";
import CommentLike from "../interfaces/comments_likes.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.comment_like.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const response = await prisma.comment_like.findMany({
      where: {
        comment_id: id,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const findByUserIdAndCommentId = async (userId: number, commentId: number) => {
  try {
    const response = await prisma.comment_like.findFirst({
      where: {
        user_id: userId,
        comment_id: commentId,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const create = async (commentLike: CommentLike) => {
  try {
    const createdCommentLike = await prisma.comment_like.create({
      data: {
        user_id: commentLike.user_id,
        comment_id: commentLike.comment_id,
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
    const data = await prisma.comment_like.delete({
      where: { id },
    });
    return data;
  } catch (error) {
    throw new Error("Error deactivating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findById, create, remove, findByUserIdAndCommentId };
