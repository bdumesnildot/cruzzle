import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

const prisma = new PrismaClient();

const findByFilter = async (filterQuery: IdeaFilterQuery) => {
  const {
    userId,
    userAgencyId,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    trendingTag,
    titleContains = null,
    hasAttachment,
    hasNoComment,
  } = filterQuery;

  let { selectedCategories } = filterQuery;

  if (!selectedCategories) {
    selectedCategories = [];
  }

  try {
    const data = await prisma.idea.findMany({
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
            id: true,
            category: {
              select: {
                label: true,
                color: true,
              },
            },
          },
        },
        attachment: true,
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
        favorit: {
          select: {
            user_id: true,
          },
          where: {
            user_id: userId ? parseInt(userId, 10) : undefined,
          },
        },
        idea_like: {
          select: {
            id: true,
            user_id: true,
          },
          where: {
            user_id: userId ? parseInt(userId, 10) : undefined,
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

      orderBy: {
        ...(trendingTag === "recent" && { created_at: "desc" }),
        ...(trendingTag === "view" && { views: "desc" }),
        ...(trendingTag === "comment" && { comment: { _count: "desc" } }),
        ...(trendingTag === "like" && { idea_like: { _count: "desc" } }),
      },
    });

    return data;
  } finally {
    await prisma.$disconnect();
  }
};

export default findByFilter;
