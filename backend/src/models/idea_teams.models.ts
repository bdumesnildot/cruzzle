import { PrismaClient } from "@prisma/client";
import { IdeaTeams } from "../interfaces/idea_teams.interface";

const prisma = new PrismaClient();

const createTeams = async (arrayOfUser: IdeaTeams[]) => {
  try {
    const data = await prisma.idea_teams.createMany({
      data: arrayOfUser,
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const getTeamByIdeaId = async (id: number) => {
  try {
    const data = await prisma.idea_teams.findMany({
      where: { idea_id: id },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const deleteTeamByIdeaId = async (id: number) => {
  try {
    const data = await prisma.idea_teams.deleteMany({
      where: { idea_id: id },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

export { createTeams, getTeamByIdeaId, deleteTeamByIdeaId };
