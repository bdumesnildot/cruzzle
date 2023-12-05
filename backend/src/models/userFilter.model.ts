import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { UserFilterQuery } from "../interfaces/users.interface";

const prisma = new PrismaClient();

const findByFilter = async (filterQuery: UserFilterQuery) => {
  const {
    lastnameContains,
    firstnameContains,
    agenciesValue,
    locationValue,
    roleValue,
    positionValue,
    publicationDateStart,
    publicationDateEnd,
  } = filterQuery;

  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        avatar_url: true,
        banner_url: true,
        firstname: true,
        lastname: true,
        agency: {
          select: {
            name: true,
          },
        },
        position: {
          select: {
            name: true,
          },
        },
        joined_at: true,
      },

      where: {
        joined_at: {
          gte: dayjs(publicationDateStart).add(-12, "hour").toISOString(),
          lte: dayjs(publicationDateEnd).add(12, "hour").toISOString(),
        },
        firstname: {
          contains: firstnameContains !== "" ? firstnameContains : undefined,
        },
        lastname: {
          contains: lastnameContains !== "" ? lastnameContains : undefined,
        },
        position_id: {
          equals:
            positionValue !== "0" && positionValue !== undefined
              ? parseInt(positionValue, 10)
              : undefined,
        },
        role: {
          name: {
            equals: roleValue !== "all" ? roleValue : undefined,
          },
        },
        agency: {
          id: {
            equals:
              agenciesValue !== "0" && agenciesValue !== undefined
                ? parseInt(agenciesValue, 10)
                : undefined,
          },
          country: {
            equals:
              locationValue !== "all" && locationValue !== undefined
                ? locationValue
                : undefined,
          },
        },
      },
      orderBy: {
        lastname: "asc",
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

export default findByFilter;
