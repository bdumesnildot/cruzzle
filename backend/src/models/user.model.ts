import { PrismaClient } from "@prisma/client";
import { UpdatePasswordUser, User } from "../interfaces/users.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        avatar_url: true,
        firstname: true,
        lastname: true,
        biography: true,
        role: {
          select: {
            name: true,
          },
        },
        agency: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
          },
        },
        position: {
          select: {
            id: true,
            name: true,
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

const findActivitiesById = async (id: number) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        idea_like: {
          select: {
            liked_at: true,
            idea: {
              select: { title: true },
            },
          },
        },
        comment: {
          select: {
            created_at: true,
            idea: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findContributionsById = async (id: number) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        idea: {
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
                avatar_url: true,
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
            idea_teams: {
              select: {
                user_id: true,
                user: {
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    avatar_url: true,
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
        },
        idea_teams: {
          select: {
            idea: {
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
                    avatar_url: true,
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
                idea_teams: {
                  select: {
                    user_id: true,
                    user: {
                      select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        avatar_url: true,
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
            },
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const data = await prisma.user.findUnique({
      select: {
        id: true,
        mail: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        avatar_url: true,
        banner_url: true,
        firstname: true,
        lastname: true,
        link: true,
        birthdate: true,
        share_birthdate: true,
        phone: true,
        share_phone: true,
        biography: true,
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
        position: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            idea_like: true,
            comment: true,
            idea: true,
            comment_like: true,
            favorit: true,
            idea_teams: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByMail = async (mail: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        mail,
      },
      select: {
        id: true,
        mail: true,
        hashed_password: true,
        role_id: true,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const update = async (id: number, updatedUser: User) => {
  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
    return data;
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

interface UploadImage {
  banner_url?: string;
  avatar_url?: string;
}

const updateUserImage = async (imageData: UploadImage, id: number) => {
  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: imageData,
      select: {
        avatar_url: true,
        banner_url: true,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

const updatePassword = async (updatedPassword: UpdatePasswordUser) => {
  const { id, hashed_password: hashedPassword } = updatedPassword;
  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: { hashed_password: hashedPassword },
    });
    const { id: userId, mail } = data;
    return { id: userId, mail };
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

const findLeaderboard = async () => {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const data = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        _count: {
          select: {
            // Ideas created by the user this month
            idea: {
              where: {
                created_at: {
                  gte: startOfMonth,
                  lte: endOfMonth,
                },
                archived_at: null,
                deleted_at: null,
              },
            },
            // Ideas & comments liked by the user this month
            idea_like: {
              where: {
                liked_at: {
                  gte: startOfMonth,
                  lte: endOfMonth,
                },
              },
            },
            comment_like: {
              where: {
                comment: {
                  created_at: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                  },
                },
              },
            },
            // Comments given by the user this month
            comment: {
              where: {
                created_at: {
                  gte: startOfMonth,
                  lte: endOfMonth,
                },
              },
            },
            // Teams the user has been added to this month
            idea_teams: {
              where: {
                idea: {
                  created_at: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                  },
                },
              },
            },
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAll,
  findActivitiesById,
  findById,
  findByMail,
  update,
  updateUserImage,
  updatePassword,
  findLeaderboard,
  findContributionsById,
};
