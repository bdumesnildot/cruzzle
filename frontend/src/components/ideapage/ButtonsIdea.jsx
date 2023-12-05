import {
  ArchiveBoxArrowDownIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button, IconButton, useMediaQuery, Divider } from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import {
  apiCreateIdeaLikes,
  apiDeleteIdeaLikesById,
  apiGetIdeaLikesByIdeaId,
} from "../../services/api.ideaLikes";
import { xl } from "../../utils/mediaQueries";
import { apiArchiveIdeas } from "../../services/api.ideas";
import DialogArchive from "./DialogArchive";
import DialogModify from "./DialogModify";
import {
  createNotification,
  deleteManyNotification,
} from "../../utils/notifications";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function ButtonsIdea() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const { id: userId } = user;
  const { idea, setIdea } = useContext(IdeaPageContext);
  const { user: userIdea } = idea;
  const smallQuery = useMediaQuery(xl.query);

  const [openDialogArchive, setOpenDialogArchive] = useState(false);
  const [openDialogModify, setOpenDialogModify] = useState(false);

  const { setOpen, setMessage } = useContext(AlertToastContext);

  const navigate = useNavigate();
  const location = useLocation();

  const isUserLikeIdea = () => {
    const ideaUserLike = idea.idea_like.filter(
      (item) => item.user_id === userId
    );
    return ideaUserLike.length > 0;
  };

  const handleClickArchive = async () => {
    if (idea.archived_at !== null || idea.deleted_at !== null) return;
    try {
      const archiveIdea = await apiArchiveIdeas(idea.id);
      if (archiveIdea) {
        const { archived_at: archivedIdea, ...restOfIdea } = idea;
        setIdea({ ...restOfIdea, archived_at: archiveIdea.archived_at });
        setOpenDialogArchive(false);
        setMessage(t("pages.ideas.idea.alert"));
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickModify = async () => {
    if (idea.archived_at !== null || idea.deleted_at !== null) return;
    try {
      setOpenDialogModify(false);
      navigate(`${location.pathname}/edit`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLike = async () => {
    if (idea.archived_at !== null || idea.deleted_at !== null) return;
    try {
      const getIdeaLikesByIdea = await apiGetIdeaLikesByIdeaId(idea.id);

      if (getIdeaLikesByIdea) {
        const searchLikeUser = getIdeaLikesByIdea.filter(
          (item) => item.user_id === userId
        );
        if (searchLikeUser.length > 0) {
          await apiDeleteIdeaLikesById(searchLikeUser[0].id);
          await deleteManyNotification(userId, idea, "like");
        } else {
          await apiCreateIdeaLikes(userId, idea.id);
          await createNotification(userId, idea, "like");
        }

        const { idea_like: ideaLike, ...restOfIdea } = idea;
        const getAllIdeaLikeByIdea = await apiGetIdeaLikesByIdeaId(idea.id);

        if (getAllIdeaLikeByIdea) {
          setIdea({ ...restOfIdea, idea_like: getAllIdeaLikeByIdea });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mb-2 xl:flex-col xl:absolute xl:top-20 xl:right-10">
      {!smallQuery && idea.archived_at === null && idea.deleted_at === null && (
        <div className="flex justify-between items-center py-2">
          {userId === userIdea.id && (
            <>
              <IconButton
                variant="outlined"
                color="primary"
                className="mx-2 mt-1"
                onClick={() => setOpenDialogModify(true)}
              >
                <PencilSquareIcon className="h-6 w-6" />
              </IconButton>
              <Divider orientation="vertical" className="mt-1" />
            </>
          )}
          {userId === userIdea.id && (
            <>
              <IconButton
                color="warning"
                className="mx-2 mt-1"
                onClick={() => setOpenDialogArchive(true)}
              >
                <ArchiveBoxArrowDownIcon className="h-6 w-6" />
              </IconButton>
              <Divider orientation="vertical" className="mt-1" />
            </>
          )}

          <IconButton
            color="info"
            variant={isUserLikeIdea() ? "contained" : "outlined"}
            className="mx-2 mt-1"
            onClick={() => handleClickLike()}
          >
            {isUserLikeIdea() ? (
              <HandThumbUpIconSolid className="h-6 w-6" />
            ) : (
              <HandThumbUpIcon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      )}
      {smallQuery && idea.archived_at === null && idea.deleted_at === null && (
        <>
          {userId === userIdea.id && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PencilSquareIcon className="h-6 w-6" />}
              className="rounded-full mx-2 my-2 sm:w-[136px]"
              onClick={() => setOpenDialogModify(true)}
            >
              {t("buttons.modify")}
            </Button>
          )}
          {userId === userIdea.id && (
            <Button
              variant="outlined"
              color="warning"
              startIcon={<ArchiveBoxArrowDownIcon className="h-6 w-6" />}
              className="rounded-full mx-2 my-2 sm:w-[136px]"
              onClick={() => {
                setOpenDialogArchive(true);
              }}
            >
              {t("buttons.archive")}
            </Button>
          )}
          <Button
            variant={isUserLikeIdea() ? "contained" : "outlined"}
            color="info"
            startIcon={<HandThumbUpIcon className="h-6 w-6" />}
            className="rounded-full mx-2 my-2 sm:w-[136px]"
            onClick={() => handleClickLike()}
          >
            {isUserLikeIdea() ? t("buttons.unlike") : t("buttons.like")}
          </Button>
        </>
      )}

      <DialogArchive
        open={openDialogArchive}
        setOpen={setOpenDialogArchive}
        handleAgree={handleClickArchive}
      />

      <DialogModify
        open={openDialogModify}
        setOpen={setOpenDialogModify}
        handleAgree={handleClickModify}
      />
    </div>
  );
}
export default ButtonsIdea;
