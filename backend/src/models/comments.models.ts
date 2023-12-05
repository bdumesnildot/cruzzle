import { PrismaClient } from "@prisma/client";
import { CreateComments, EditComments } from "../interfaces/comments.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.comment.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByIdeaId = async (id: number) => {
  try {
    const response = await prisma.comment.findMany({
      where: {
        idea_id: id,
      },
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
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const findTotalCommentsReceivedByUserId = async (userId: number) => {
  try {
    const userComments = await prisma.idea.findMany({
      where: {
        user_id: userId,
      },
      include: {
        comment: true,
      },
    });

    let totalComments = 0;
    userComments.forEach((idea) => {
      totalComments += idea.comment.length;
    });

    return totalComments;
  } finally {
    await prisma.$disconnect();
  }
};

const addComment = async (comment: CreateComments) => {
  const { idea_id: ideaId, user_id: userId, body } = comment;
  try {
    const response = await prisma.comment.create({
      data: { idea_id: ideaId, user_id: userId, body },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const editComment = async (comment: EditComments, id: number) => {
  const { body } = comment;
  try {
    const response = await prisma.comment.update({
      where: { id },
      data: {
        body,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const deleteCommentById = async (id: number) => {
  try {
    const response = await prisma.comment.delete({
      where: {
        id,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAll,
  findByIdeaId,
  findTotalCommentsReceivedByUserId,
  editComment,
  deleteCommentById,
  addComment,
};
