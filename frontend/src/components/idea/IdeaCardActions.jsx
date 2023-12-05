import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import {
  HandThumbUpIcon as HandThumbUpIconOutline,
  PencilIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  HandThumbUpIcon as HandThumbUpIconSolid,
} from "@heroicons/react/24/solid";

import { useMediaQuery } from "@mui/material";
import { ideaPropTypes } from "../propTypes/ideaPropTypes";

import {
  apiCreateIdeaLikes,
  apiDeleteIdeaLikesById,
  apiGetIdeaLikesByIdeaId,
} from "../../services/api.ideaLikes";
import { postFavorit, deleteFavorit } from "../../services/api.favorits";
import { sm } from "../../utils/mediaQueries";
import { FilterFavoritesContext } from "../../contexts/FilterFavoritesContext";
import { UserContext } from "../../contexts/UserContext";

export default function IdeaCardActions({
  isFavorite,
  isLiked,
  idea: newIdea,
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { favoritesFiltered, setFavoritesFiltered } = useContext(
    FilterFavoritesContext
  );
  const [liked, setLiked] = useState(isLiked);
  const [idea, setIdea] = useState(newIdea);
  const { user } = useContext(UserContext);
  const location = useLocation();

  const smallQuery = useMediaQuery(sm.query);

  const handleFavoriteClick = () => {
    if (location.pathname === "/favorites" && favorite) {
      deleteFavorit(user.id, idea.id, "favorits");
      const filterredFavorites = favoritesFiltered.filter(
        (item) => item.id !== idea.id
      );
      setFavoritesFiltered(filterredFavorites);

      setFavorite(false);
    }

    if (!favorite) {
      postFavorit(user.id, idea.id, "favorits");
      setFavorite(true);
    } else {
      deleteFavorit(user.id, idea.id, "favorits");
      setFavorite(false);
    }
  };

  const handleClickLike = async () => {
    const searchLikeUser = idea.idea_like.filter(
      (item) => item.user_id === user.id
    );
    try {
      if (searchLikeUser.length > 0) {
        await apiDeleteIdeaLikesById(searchLikeUser[0].id);
        const withoutDeletedLike = idea.idea_like.filter(
          (item) => item.user_id !== user.id
        );
        const { idea_like: ideaLike, ...rest } = idea;
        setIdea({ idea_like: withoutDeletedLike, ...rest });
        setLiked(false);
      } else {
        await apiCreateIdeaLikes(user.id, idea.id);
        const ideaLikes = await apiGetIdeaLikesByIdeaId(idea.id);

        const { idea_like: ideaLike, ...rest } = idea;
        setIdea({ idea_like: ideaLikes, ...rest });

        setLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hidden group-hover:flex duration-100">
      <div
        className={`${
          smallQuery
            ? "right-2 -top-5"
            : "left-1/2 transform -translate-x-1/2 -top-5"
        } flex justify-center items-center gap-3 h-10 absolute border-solid border border-gray-400 bg-slate-50 px-3 rounded-full lg:right-8`}
      >
        {favorite ? (
          <StarIconSolid
            className="h-6 w-6 text-primary-900 cursor-pointer"
            onClick={handleFavoriteClick}
          />
        ) : (
          <StarIconOutline
            className="h-6 w-6 text-gray-900 hover:text-primary-900 cursor-pointer"
            onClick={handleFavoriteClick}
          />
        )}
        <Link
          className="no-underline w-auto"
          to={`/ideas/${idea.id}`}
          state={{ tabStateValue: 2 }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
        </Link>
        {liked ? (
          <HandThumbUpIconSolid
            className="h-6 w-6 text-primary-900 cursor-pointer"
            onClick={handleClickLike}
          />
        ) : (
          <HandThumbUpIconOutline
            className="h-6 w-6 text-gray-900 hover:text-primary-900 cursor-pointer"
            onClick={handleClickLike}
          />
        )}
        <Link className="no-underline w-auto" to={`/ideas/${idea.id}`}>
          {user.id === idea.user.id && (
            <PencilIcon className="h-6 w-6 text-gray-900 hover:text-primary-900" />
          )}
        </Link>
      </div>
    </div>
  );
}

IdeaCardActions.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  idea: ideaPropTypes.isRequired,
};
