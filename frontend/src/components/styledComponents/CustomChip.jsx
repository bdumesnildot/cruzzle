import { XCircleIcon } from "@heroicons/react/24/solid";
import { Chip } from "@mui/material";
import PropTypes from "prop-types";

function CustomChip({
  label,
  colorchoice = "rgba(189 189 189 / 87%)",
  ...props
}) {
  return (
    <Chip
      variant="outlined"
      label={label}
      deleteIcon={
        <span className="hover:brightness-90 flex">
          <XCircleIcon style={{ color: colorchoice }} className="w-6" />
        </span>
      }
      sx={{
        borderColor: colorchoice,
        color: colorchoice,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

CustomChip.propTypes = {
  label: PropTypes.string.isRequired,
  colorchoice: PropTypes.string.isRequired,
};

export default CustomChip;
