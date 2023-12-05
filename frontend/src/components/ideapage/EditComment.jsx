import { useTranslation } from "react-i18next";
import { TextField, IconButton } from "@mui/material";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import { useContext } from "react";

import {
  apiGetCommentsByIdeaId,
  apiUpdateComments,
} from "../../services/api.comments";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import { AlertToastContext } from "../../contexts/AlertToastContext";

function EditComment({ commentId, content, setContent, setModify }) {
  const { t } = useTranslation();

  const { setIdea, idea } = useContext(IdeaPageContext);
  const { setOpen, setMessage, setSeverity } = useContext(AlertToastContext);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleButtonClick = async () => {
    const data = {
      body: content,
    };
    if (content) {
      try {
        const req = await apiUpdateComments(commentId, data);
        if (req) {
          setMessage(t("pages.ideas.idea.tabsIdea.editComment.alert.success"));
          setSeverity("success");
          setOpen(true);
          const { comment, ...rest } = idea;
          const getComments = await apiGetCommentsByIdeaId(idea.id);
          if (getComments) {
            setIdea({
              ...rest,
              comment: getComments,
            });
            setModify(false);
          } else {
            setMessage(t("pages.ideas.idea.tabsIdea.editComment.alert.error"));
            setSeverity("error");
            setOpen(true);
          }
        } else {
          setMessage(t("pages.ideas.idea.tabsIdea.editComment.alert.error"));
          setSeverity("error");
          setOpen(true);
        }
      } catch (error) {
        console.error(error);
        setMessage(t("pages.ideas.idea.tabsIdea.editComment.alert.error"));
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
    <div className="flex w-full">
      <div className="w-full relative p-0" aria-label="comment">
        <TextField
          id="commentUser"
          onChange={(e) => handleChange(e)}
          value={content}
          multiline
          minRows={1}
          maxRows={4}
          onKeyDown={handleKeyPress}
          placeholder={t(
            "pages.ideas.idea.tabsIdea.editComment.textfield.placeholder"
          )}
          className="w-full"
          sx={{
            borderRadius: "0.75rem",
            paddingBottom: "48px",
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
          color="primary"
          className="absolute right-2 bottom-[54px]"
          onClick={() => handleButtonClick()}
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
}

EditComment.propTypes = {
  setContent: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  setModify: PropTypes.func.isRequired,
  commentId: PropTypes.number.isRequired,
};

export default EditComment;
