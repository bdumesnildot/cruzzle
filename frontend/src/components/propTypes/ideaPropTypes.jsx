import PropTypes from "prop-types";

const categoryPropTypes = PropTypes.shape({
  color: PropTypes.string,
  label: PropTypes.string,
});

const positionPropTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const agencyPropTypes = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
});

const FavoritPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    idea_id: PropTypes.number.isRequired,
  })
);

const userPropTypes = PropTypes.shape({
  id: PropTypes.number,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  position: positionPropTypes,
  avatar_url: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  agency: agencyPropTypes,
});

const ideaPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired,
  user: userPropTypes,
  created_at: PropTypes.string.isRequired,
  archived_at: PropTypes.string,
  deleted_at: PropTypes.string,
  favorite: FavoritPropTypes,
  primary_img: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  views: PropTypes.number.isRequired,
  idea_category: PropTypes.arrayOf(categoryPropTypes).isRequired,
  idea_teams: PropTypes.arrayOf(userPropTypes),
  _count: PropTypes.shape({
    comment: PropTypes.number.isRequired,
  }).isRequired,
});

const IdeasPropTypes = {
  isMini: PropTypes.bool.isRequired,
  ideas: PropTypes.arrayOf(ideaPropTypes).isRequired,
};

const IdeaPropTypes = {
  isMini: PropTypes.bool.isRequired,
  idea: ideaPropTypes,
};

export { IdeasPropTypes, IdeaPropTypes, ideaPropTypes };
