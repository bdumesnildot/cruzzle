import {
  Avatar,
  AvatarGroup,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import ProgressChip from "../styledComponents/ProgressChip";
import CustomChip from "../styledComponents/CustomChip";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import ButtonsIdea from "./ButtonsIdea";
import LikesView from "./LikesView";
import { noPictureIdea, noPictureAvatar } from "../../utils/nopicture";

function HeaderIdeaPage() {
  const { t, i18n } = useTranslation();
  const { idea } = useContext(IdeaPageContext);
  const [openTeam, setOpenTeam] = useState(false);

  const handleClick = (event) => {
    setOpenTeam(event.currentTarget);
  };

  const handleClose = () => {
    setOpenTeam(null);
  };

  const open = Boolean(openTeam);

  return (
    <div
      className="flex flex-col w-full py-2 px-4 md:px-2 lg:px-6"
      aria-label="Header Idea Page"
    >
      <div
        className="flex flex-col xl:flex-row xl:items-center justify-between w-full"
        aria-label="Title"
      >
        <div className="flex items-center">
          <ProgressChip
            isArchived={idea.archived_at}
            isDeleted={idea.deleted_at}
          />
          <h1 className="text-xl md:text-3xl font-bold md:mt-2 xl:my-4 mx-2 p-0 w-auto">
            {idea.title}
          </h1>
        </div>
        <div className="flex justify-between">
          <LikesView />
          <ButtonsIdea />
        </div>
      </div>

      <div className="flex flex-col w-full lg:flex-row" aria-label="Context">
        <img
          src={idea.primary_img ?? noPictureIdea}
          alt="principal idea"
          className="w-full h-[214px] object-cover rounded md:w-[442px] md:h-[308px]"
        />
        <div className="flex flex-col content-between lg:px-4 md:h-full">
          {idea.idea_category.length > 0 && (
            <div className="flex my-2" aria-label="Category">
              {idea.idea_category.map((item) => (
                <CustomChip
                  key={item.category.label}
                  label={item.category.label}
                  colorchoice={item.category.color}
                  className="mr-2 md:mx-2"
                />
              ))}
            </div>
          )}
          <div className="flex md:px-4 my-2" aria-label="Published">
            <p>{t("pages.ideas.idea.headerIdea.published")}</p>
            <p className="mx-2 font-semibold">
              {dayjs(idea.created_at)
                .locale(i18n.language)
                .format(t("pages.ideas.idea.headerIdea.dateFormats.long"))}
            </p>
          </div>
          <div className="flex md:px-4 my-2" aria-label="Author">
            <p>{t("pages.ideas.idea.headerIdea.by")}</p>
            <Link
              to={`/users/${idea.user.id}`}
              className="mx-2 font-semibold no-underline text-primary-900 hover:text-primary-50"
            >
              {`${idea.user.firstname} ${idea.user.lastname}`}
            </Link>
          </div>
          {idea.idea_teams && idea.idea_teams.length > 0 && (
            <div className="flex items-center md:px-4 my-2" aria-label="Team">
              <p>{t("pages.ideas.idea.headerIdea.team")} :</p>
              <AvatarGroup spacing={8} className="mx-2">
                {idea.idea_teams.map((team, index) => {
                  if (index < 4) {
                    return (
                      <Tooltip
                        title={`${team.user.firstname} ${team.user.lastname}`}
                        key={team.user_id}
                      >
                        <Link to={`/users/${team.user_id}`}>
                          <Avatar
                            sx={{ width: 30, height: 30 }}
                            alt={`${team.user.firstname} ${team.user.lastname}`}
                            src={team.user.avatar_url ?? noPictureAvatar}
                            className="cursor-pointer"
                          />
                        </Link>
                      </Tooltip>
                    );
                  }
                  if (index === 4) {
                    return (
                      <Tooltip title="Other" key={team.user_id}>
                        <Avatar
                          sx={{ width: 30, height: 30 }}
                          className="cursor-pointer"
                          onClick={handleClick}
                        >
                          +{idea.idea_teams.length - 4}
                        </Avatar>
                      </Tooltip>
                    );
                  }
                  return null;
                })}
              </AvatarGroup>
              <Menu
                anchorEl={openTeam}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
              >
                {idea.idea_teams &&
                  idea.idea_teams.slice(4).map((team) => (
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to={`/users/${team.user_id}`}
                      key={team.user_id}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{ width: 30, height: 30 }}
                          className="cursor-pointer"
                          alt={`${team.user.firstname} ${team.user.lastname}`}
                          src={team.user.avatar_url ?? noPictureAvatar}
                        />
                      </ListItemIcon>
                      {team.user.firstname} {team.user.lastname}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          )}
          <div className="md:px-4 w-auto" aria-label="Context">
            <h2 className="text-xl">
              {t("pages.ideas.idea.headerIdea.context")}
            </h2>
            <p className="leading-6 text-base">{idea.context}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderIdeaPage;
