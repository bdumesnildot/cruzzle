import { Paper, Avatar, Button, ButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { HandThumbUpIcon as SolidHandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as OutlineHandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../../contexts/UserContext";
import EditComment from "./EditComment";
import {
  apiCreateCommentLikes,
  apiDeleteCommentsLikesById,
  apiGetCommentsLikesByCommentId,
} from "../../services/api.commentsLikes";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import { apiGetCommentsByIdeaId } from "../../services/api.comments";
import { noPictureAvatar } from "../../utils/nopicture";

function CommentBox({ comment, tabComment = false }) {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const { id: userId } = user;

  const { idea, setIdea } = useContext(IdeaPageContext);

  const [modify, setModify] = useState(false);
  const [content, setContent] = useState(comment.body);

  const isUserLikeComment = () => {
    const commentUserLike = comment.comment_like.filter(
      (item) => item.user_id === userId
    );
    return commentUserLike.length > 0;
  };

  const handleClick = async () => {
    try {
      const getCommentLikesByComment = await apiGetCommentsLikesByCommentId(
        comment.id
      );
      if (getCommentLikesByComment) {
        const searchLikeUser = getCommentLikesByComment.filter(
          (item) => item.user_id === userId
        );
        if (searchLikeUser.length > 0) {
          await apiDeleteCommentsLikesById(searchLikeUser[0].id);
        } else {
          await apiCreateCommentLikes(userId, comment.id);
        }

        const { comment: commentIdea, ...restOfIdea } = idea;
        const getAllCommentByIdea = await apiGetCommentsByIdeaId(idea.id);

        if (getAllCommentByIdea) {
          setIdea({ ...restOfIdea, comment: getAllCommentByIdea });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex w-full ${idea.archived_at === null ? "" : "mb-8"}`}>
      <div className="flex flex-col w-full mb-2">
        <div className="flex">
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 30, height: 30 }}
            src={comment.user.avatar_url ?? noPictureAvatar}
          />
          <div className="flex items-center">
            <h4 className="mx-2 text-base">
              {comment.user.firstname} {comment.user.lastname}
            </h4>
            <div className="flex items-center font-semibold">
              <p className="bloc text-secondary-600 text-sm">
                -{" "}
                {dayjs(comment.created_at)
                  .locale(i18n.language)
                  .format(t("pages.ideas.idea.commentBox.dateFormats.long"))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full pl-11">
          <div className="w-full" aria-label="comment">
            <Paper
              elevation={0}
              className="relative p-6 w-full rounded-xl border border-[#dadada] border-solid"
            >
              <div className="flex flex-col">
                {!modify && (
                  <div className="w-full whitespace-pre-line break-words">
                    {content}
                  </div>
                )}
                {modify && (
                  <EditComment
                    commentId={comment.id}
                    setModify={setModify}
                    content={content}
                    setContent={setContent}
                  />
                )}
                <Paper
                  elevation={0}
                  size="small"
                  className="absolute flex items-center px-4 bottom-[-20px] right-6 sm:w-24 h-8 border border-[#dadada] border-solid rounded-full"
                >
                  <div
                    className="flex items-center justify-center w-full text-secondary-600"
                    aria-label="like"
                  >
                    <SolidHandThumbUpIcon
                      className={`min-h-5 min-w-5 max-h-5 max-w-5 h-5 w-5 mx-1 ${
                        isUserLikeComment() ? "text-primary-50" : ""
                      }`}
                    />
                    <div
                      className={`mx-1 font-semibold ${
                        isUserLikeComment() ? "text-primary-50" : ""
                      }`}
                    >
                      {comment.comment_like.length}
                    </div>
                  </div>
                </Paper>
              </div>
            </Paper>
            <div className="flex pl-2">
              <ButtonGroup
                size="small"
                aria-label="small button group"
                disableRipple
                disableFocusRipple
              >
                {idea.archived_at === null && (
                  <Button
                    variant="text"
                    startIcon={<OutlineHandThumbUpIcon className="h-5 w-5" />}
                    className="flex  text-secondary-600"
                    onClick={() => handleClick()}
                    sx={{ margin: 1 }}
                  >
                    {!isUserLikeComment()
                      ? t("buttons.like")
                      : t("buttons.unlike")}
                  </Button>
                )}

                {tabComment && comment.user_id === userId && (
                  <Button
                    variant="text"
                    startIcon={<PencilSquareIcon className="h-5 w-5" />}
                    className="flex  text-secondary-600"
                    onClick={() => setModify(true)}
                    sx={{ margin: 1 }}
                  >
                    {t("buttons.modify")}
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const commentShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  comment_like: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      comment_id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
    })
  ),
  created_at: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }),
  user_id: PropTypes.number.isRequired,
});

CommentBox.propTypes = {
  comment: commentShape.isRequired,
  tabComment: PropTypes.bool,
};

CommentBox.defaultProps = {
  tabComment: false,
};

export default CommentBox;
