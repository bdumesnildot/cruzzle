import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import findByFilter from "../models/ideaFilter.model";
import {
  findAll,
  countAllIdeas,
  findTrends,
  findById,
  findByUserIdAndDate,
  createIdea,
  addPrimaryImgIdea,
  deleteIdea,
  updateIdea,
  archiveIdea,
  findTrendsFavorits,
} from "../models/idea.model";
import {
  deleteFilesInFolder,
  deleteMultipleFilesInFirebase,
  getFileSize,
  uploadOneFileToFirebase,
  uploadToFirebase,
} from "../services/firebase";
import { UploadedFiles } from "../interfaces/uploadedfiles.interface";
import {
  createAttachements,
  deleteAllAttachmentsByIdea,
  deleteAttachmentsByContenUrl,
  getAllAttachementsByIdeaId,
} from "../models/attachments.models";
import {
  createTeams,
  deleteTeamByIdeaId,
  getTeamByIdeaId,
} from "../models/idea_teams.models";
import { UserTeams } from "../interfaces/idea_teams.interface";
import { FormattedCategory } from "../interfaces/idea_category.interface";
import {
  createCategoryByIdea,
  deleteCategoriesByIdeaId,
  getCategoryByIdeaId,
} from "../models/idea_category.models";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

const getIdeas = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalIdeasCount = async (req: Request, res: Response) => {
  try {
    const data = await countAllIdeas();
    res.status(200).json({ data });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Controller error generating total number of ideas." });
  }
};

const getIdeasTrends = async (req: Request, res: Response) => {
  try {
    const data = await findTrends();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(" error from controller");
  }
};

const getIdeasTrendsFavorits = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const data = await findTrendsFavorits(id);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).send(" error from controller");
  }
};

const getIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("Idea not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getIdeaByFilter = async (req: Request, res: Response) => {
  const filterQuery: IdeaFilterQuery = req.query;
  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getIdeasCreatedToday = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);
  try {
    const today = new Date();
    const count = await findByUserIdAndDate(userId, today);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).send(error);
  }
};

const postIdea = async (req: Request, res: Response) => {
  try {
    const { team, categories, ...idea } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);
    }
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    const userId = payload.id;

    const createdIdea = await createIdea(idea, userId);
    const idIdea = createdIdea.id;

    // If primaryImg or Attachements exists
    if (req.files && Object.keys(req.files).length > 0) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const allFiles: Express.Multer.File[] = [];

      for (const fieldName in files) {
        if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
          const fieldFiles = files[fieldName];
          allFiles.push(...fieldFiles);
        }
      }

      const uploadedFiles = await uploadToFirebase(allFiles, idIdea);
      let pictureIdea: UploadedFiles;
      let attachements: Array<UploadedFiles> = [];

      // Check if primaryImg exist else only attachments exists
      if (uploadedFiles[0].type === "primaryImg") {
        const [primaryImg, ...attachments] = uploadedFiles;
        attachements = attachments;
        pictureIdea = primaryImg;
        await addPrimaryImgIdea(idIdea, pictureIdea.url);
      } else {
        attachements = uploadedFiles;
      }

      if (attachements.length > 0) {
        const formattedAttachments = attachements.map((attachment) => ({
          idea_id: idIdea,
          content_url: attachment.url,
        }));
        await createAttachements(formattedAttachments);
      }
    }

    if (team.length > 0) {
      const formattedTeams = JSON.parse(team).map((user: UserTeams) => ({
        user_id: user.user_id,
        idea_id: idIdea,
      }));
      await createTeams(formattedTeams);
    }

    if (categories.length > 0) {
      const formattedCategories = JSON.parse(categories).map(
        (category: FormattedCategory) => ({
          idea_id: idIdea,
          category_id: category.id,
        })
      );

      await createCategoryByIdea(formattedCategories);
    }

    return res.status(201).json({ id: idIdea });
  } catch (error) {
    return res.status(500).json({ "Error when post idea :": error });
  }
};

const deleteIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await deleteIdea(id);
    res.status(204).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const { team, categories, primaryImg, attachement, ...rest } = req.body;
    const idea = rest;

    if (primaryImg) {
      idea.primary_img = primaryImg;
    }

    let arrayAttachement: string[] = [];
    if (attachement) {
      if (!Array.isArray(attachement)) {
        arrayAttachement = [attachement];
      } else {
        arrayAttachement = attachement;
      }
    }

    const actualIdea = await findById(id);

    const updatedIdea = await updateIdea(id, idea);

    // Bloc if : Check for primary_img on Idea
    if (actualIdea && updatedIdea) {
      if (
        req.files &&
        Object.prototype.hasOwnProperty.call(req.files, "primaryImg")
      ) {
        if (actualIdea.primary_img !== null) {
          await deleteFilesInFolder(`/ideas/${id}/primaryImg/`);
        }
        const primaryImgFiles = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        const primaryImgFile = primaryImgFiles.primaryImg[0];

        const uploadPrimaryImg = await uploadOneFileToFirebase(
          primaryImgFile,
          id
        );

        await addPrimaryImgIdea(id, uploadPrimaryImg.url);
      } else if (
        req.body.primaryImg === undefined &&
        updatedIdea.primary_img !== null
      ) {
        if (actualIdea.primary_img) {
          await updateIdea(id, { primary_img: null });
          await deleteFilesInFolder(`/ideas/${id}/primaryImg/`);
        }
      }
    }

    // Bloc if : Check for attachments exists on edit idea
    if (req.body.attachement) {
      const attachementsByIdea = await getAllAttachementsByIdeaId(id);
      const contentUrlsByIdea = attachementsByIdea.map(
        (item) => item.content_url
      );

      if (
        JSON.stringify(contentUrlsByIdea) !== JSON.stringify(arrayAttachement)
      ) {
        const extraAttachments = contentUrlsByIdea.filter(
          (url) => !arrayAttachement.includes(url)
        );
        await deleteMultipleFilesInFirebase(
          extraAttachments,
          `ideas/${id}/attachment/`
        );

        await Promise.all(
          extraAttachments.map((attachment) =>
            deleteAttachmentsByContenUrl(attachment)
          )
        );
      }
    } else if (req.body.attachement === undefined) {
      const attachementsByIdea = await getAllAttachementsByIdeaId(id);
      if (attachementsByIdea.length > 0) {
        await deleteAllAttachmentsByIdea(id);
      }
    }

    if (
      req.files &&
      Object.prototype.hasOwnProperty.call(req.files, "attachement")
    ) {
      if (req.files && Object.keys(req.files).length > 0) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        const allFiles: Express.Multer.File[] = [];
        for (const fieldName in files) {
          if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
            const fieldFiles = files[fieldName];
            allFiles.push(...fieldFiles);
          }
        }

        const uploadedFiles = await uploadToFirebase(allFiles, id);
        let attachements: Array<UploadedFiles> = [];
        if (uploadedFiles[0].type === "primaryImg") {
          uploadedFiles.shift();
        }
        attachements = uploadedFiles;

        if (attachements.length > 0) {
          const formattedAttachments = attachements.map((attachment) => ({
            idea_id: id,
            content_url: attachment.url,
          }));
          await createAttachements(formattedAttachments);
        }
      }
    }

    // Gestion of team
    let parsedTeam;
    if (team) {
      parsedTeam = JSON.parse(team);
      const lastTeam = await getTeamByIdeaId(id);
      const formattedTeams = parsedTeam.map((user: UserTeams) => ({
        user_id: user.user_id,
        idea_id: id,
      }));
      if (lastTeam.length === 0 && formattedTeams.length > 0) {
        await createTeams(formattedTeams);
      } else {
        await deleteTeamByIdeaId(id);
        if (formattedTeams.length > 0) {
          await createTeams(formattedTeams);
        }
      }
    }

    // Gestion of categories
    let parsedCategories;
    if (categories) {
      parsedCategories = JSON.parse(categories);

      const lastCategories = await getCategoryByIdeaId(id);
      const formattedCategories = parsedCategories.map(
        (category: FormattedCategory) => ({
          idea_id: id,
          category_id: category.id,
        })
      );

      if (lastCategories.length === 0 && formattedCategories.length > 0) {
        await createCategoryByIdea(formattedCategories);
      } else {
        await deleteCategoriesByIdeaId(id);
        if (formattedCategories.length > 0) {
          await createCategoryByIdea(formattedCategories);
        }
      }
    }

    const data = await findById(id);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ "Error when edit idea :": error });
  }
};

const updateIdeaViewById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const data: object = req.body;

  try {
    const updatedViews = await updateIdea(id, data);
    res.status(201).json({ "Idea views updated !": updatedViews });
  } catch (error) {
    res.status(500).json({ "Error when edit idea views:": error });
  }
};

const archivedIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await archiveIdea(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSizeFileByUrl = async (req: Request, res: Response): Promise<void> => {
  const { fileUrl } = req.query;
  try {
    const fileSize = await getFileSize(fileUrl as string);
    res.status(200).json({ fileSize });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getIdeas,
  getTotalIdeasCount,
  getIdeasTrends,
  getIdeasTrendsFavorits,
  getIdeaById,
  getIdeaByFilter,
  getIdeasCreatedToday,
  postIdea,
  deleteIdeaById,
  archivedIdeaById,
  updateIdeaById,
  updateIdeaViewById,
  getSizeFileByUrl,
};
