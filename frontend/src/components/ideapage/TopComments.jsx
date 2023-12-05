import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import CommentBox from "./CommentBox";

function TopComments({ setTabValue }) {
  const { t } = useTranslation();
  const { idea } = useContext(IdeaPageContext);
  const { comment } = idea;
  const [sortComments, setSortComments] = useState(comment);

  useEffect(() => {
    const sortedComments = [...comment].sort(
      (a, b) => b.comment_like.length - a.comment_like.length
    );
    setSortComments(sortedComments);
  }, [idea]);

  return (
    <div className="w-full my-4" aria-label="top comment">
      <div className="flex justify-between items-center">
        <h3 className="text-xl mb-2">
          {t("pages.ideas.idea.tabsIdea.tabgeneral.topcomments")}
        </h3>
        <IconButton
          aria-label="see more"
          size="medium"
          onClick={() => setTabValue(2)}
        >
          <EllipsisHorizontalIcon className="h-6 w-6" />
        </IconButton>
      </div>
      {sortComments &&
        sortComments.map((item, index) =>
          index < 2 ? <CommentBox comment={item} key={item.id} /> : null
        )}
    </div>
  );
}

TopComments.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default TopComments;
