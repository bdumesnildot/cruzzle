import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.favorit.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByFilter = async (filterQuery: IdeaFilterQuery) => {
  const {
    userId,
    userAgencyId,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  } = filterQuery;

  let { selectedCategories } = filterQuery;

  if (!selectedCategories) {
    selectedCategories = [];
  }

  try {
    const data = await prisma.favorit.findMany({
      select: {
        idea: {
          select: {
            id: true,
            title: true,
            context: true,
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
            idea_like: {
              select: {
                id: true,
                user_id: true,
                idea_id: true,
              },
            },
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
            idea_teams: {
              select: {
                user_id: true,
                user: {
                  select: {
                    firstname: true,
                    lastname: true,
                    position: true,
                    avatar_url: true,
                    agency: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        idea: {
          deleted_at: null,
          created_at: {
            gte: dayjs(publicationDateStart).add(-12, "hour").toISOString(),
            lte: dayjs(publicationDateEnd).add(12, "hour").toISOString(),
          },
          title: {
            contains: titleContains !== null ? titleContains : undefined,
          },
          attachment: hasAttachment === "true" ? { some: {} } : undefined,
          comment: hasNoComment === "true" ? { none: {} } : {},
          idea_category: {
            ...(selectedCategories.length > 0 && {
              some: { category_id: { in: selectedCategories.map(Number) } },
            }),
            ...(selectedCategories.length === 0 && { undefined }),
          },
          user: {
            ...(autorSelectionTag === "all" && {}),
            ...(autorSelectionTag === "currentUserAgency" && userAgencyId
              ? { agency: { id: parseInt(userAgencyId, 10) } }
              : {}),
            ...(autorSelectionTag === "currentUser" && userId
              ? { id: parseInt(userId, 10) }
              : {}),
          },
        },
        user_id: userId ? parseInt(userId, 10) : undefined,
      },
      orderBy: {
        idea: {
          ...(trendingTag === "recent" && { created_at: "desc" }),
          ...(trendingTag === "view" && { views: "desc" }),
          ...(trendingTag === "comment" && { comment: { _count: "desc" } }),
          ...(trendingTag === "like" && { idea_like: { _count: "desc" } }),
        },
      },
    });

    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const createFavorit = async (userId: number, ideaId: number) => {
  try {
    const existingFavorit = await prisma.favorit.findFirst({
      where: {
        user_id: userId,
        idea_id: ideaId,
      },
    });

    if (!existingFavorit) {
      const data = await prisma.favorit.create({
        data: {
          user_id: userId,
          idea_id: ideaId,
        },
      });
      return data;
    }
    return false;
  } catch (error) {
    throw new Error("Error creating new favorite");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteFavorit = async (userId: number, ideaId: number) => {
  try {
    const existingFavorit = await prisma.favorit.findFirst({
      where: {
        user_id: userId,
        idea_id: ideaId,
      },
    });

    if (existingFavorit) {
      await prisma.favorit.delete({
        where: {
          id: existingFavorit.id,
        },
      });
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error deleting favorite");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findByFilter, createFavorit, deleteFavorit };
