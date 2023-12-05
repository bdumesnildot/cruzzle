import { Button } from "@mui/material";
import PropTypes from "prop-types";

export default function ActionButton({ icon, text, onClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<span className="h-6 w-6">{icon}</span>}
      type="button"
      onClick={onClick}
      className="rounded-full mr-4 w-fit uppercase"
      sx={{
        boxShadow: 1,
        "&:hover": { boxShadow: 2 },
        "&:active, &.Mui-focusVisible": { boxShadow: 4 },
      }}
    >
      {text}
    </Button>
  );
}

ActionButton.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ActionButton.defaultProps = {
  onClick: () => {},
};
