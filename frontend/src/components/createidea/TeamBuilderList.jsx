import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Fab from "@mui/material/Fab";
import RemoveIcon from "@mui/icons-material/Remove";
import { noPictureAvatar } from "../../utils/nopicture";

export default function TeamBuilderList({ list, onChange }) {
  const handleRemove = (person) => {
    const filteredList = list.filter((name) => name !== person);
    onChange(filteredList); // set la valeur de team
  };

  return (
    <div aria-label="list">
      {list.map((person) => (
        <ListItem key={person.firstname} sx={{ height: 64 }}>
          <ListItemAvatar>
            <Avatar
              alt={`${person.firstname} ${person.lastname}`}
              src={person.avatar_url ?? noPictureAvatar}
              sx={{ width: 40, height: 40 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={`${person.firstname} ${person.lastname}`}
            secondary={person.position}
          />
          <Fab
            color="white"
            aria-label="remove"
            sx={{ minWidth: 40, width: 40, height: 40 }}
            value={person}
            onClick={() => handleRemove(person)}
          >
            <RemoveIcon sx={{ fontSize: 12 }} />
          </Fab>
        </ListItem>
      ))}
    </div>
  );
}

TeamBuilderList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
