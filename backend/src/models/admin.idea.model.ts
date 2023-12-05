import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        user: {
          select: {
            id: true,
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
          },
        },
        created_at: true,
        archived_at: true,
        deleted_at: true,
        views: true,
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
            favorit: true,
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByIdByAdmin = async (id: number) => {
  try {
    const response = await prisma.idea.findUnique({
      select: {
        id: true,
        title: true,
        user: {
          select: {
            id: true,
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
          },
        },
        created_at: true,
        archived_at: true,
        deleted_at: true,
        views: true,
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
            favorit: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const ArchiveIdeaByAdmin = async (id: number) => {
  try {
    const data = await prisma.idea.update({
      where: {
        id,
      },
      data: {
        archived_at: new Date(),
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error Archiving/Deleting Idea.");
  } finally {
    await prisma.$disconnect();
  }
};

const DeleteIdeaByAdmin = async (id: number) => {
  try {
    const data = await prisma.idea.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error Archiving/Deleting Idea.");
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAllByAdmin,
  findByIdByAdmin,
  ArchiveIdeaByAdmin,
  DeleteIdeaByAdmin,
};
