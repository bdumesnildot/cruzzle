import { Avatar, TextField, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import {
  apiCreateComments,
  apiGetCommentsByIdeaId,
} from "../../services/api.comments";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import { createNotification } from "../../utils/notifications";
import { noPictureAvatar } from "../../utils/nopicture";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function CreateComment({ tabValue }) {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState();

  const { setMessage, setSeverity, setOpen } = useContext(AlertToastContext);
  const { id: userId, avatar_url: avatar } = user;
  const { setIdea, idea } = useContext(IdeaPageContext);
  const params = useParams();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleButtonClick = async () => {
    const data = {
      user_id: userId,
      idea_id: parseInt(params.id, 10),
      body: comment,
    };
    if (comment) {
      try {
        const req = await apiCreateComments(data);
        if (req) {
          try {
            createNotification(user.id, idea, "comment");
          } catch (error) {
            console.error(error);
          } finally {
            setMessage(
              t("pages.ideas.idea.tabsIdea.createComment.alert.success")
            );
            setSeverity("success");
            setOpen(true);
            const { comment: commendIdea, ...rest } = idea;
            const getComments = await apiGetCommentsByIdeaId(idea.id);
            if (getComments) {
              setIdea({
                ...rest,
                comment: getComments,
              });
            }
            setComment("");
          }
        } else {
          setMessage(t("pages.ideas.idea.tabsIdea.createComment.alert.error"));
          setSeverity("error");
          setOpen(true);
        }
      } catch (error) {
        console.error(error);
        setMessage(t("pages.ideas.idea.tabsIdea.createComment.alert.error"));
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className="flex w-full mt-4">
      <Avatar
        alt="Remy Sharp"
        className="mx-4"
        src={avatar ?? noPictureAvatar}
        sx={{ width: 36, height: 36 }}
      />
      <div className="w-full relative p-0" aria-label="comment">
        <TextField
          autoFocus={tabValue === 2}
          id="commentUser"
          onChange={(e) => handleChange(e)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={comment}
          multiline
          minRows={1}
          maxRows={4}
          onKeyDown={handleKeyPress}
          placeholder={t(
            "pages.ideas.idea.tabsIdea.createComment.textfield.placeholder"
          )}
          className="w-full"
          sx={{
            borderRadius: "0.75rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              paddingBottom: "48px",
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <IconButton
          aria-label="see more"
          size="small"
          color={`${isFocused ? "primary" : ""}`}
          className="absolute right-2 bottom-1"
          onClick={() => handleButtonClick()}
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
}

CreateComment.propTypes = {
  tabValue: PropTypes.number.isRequired,
};

export default CreateComment;
