import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Fab } from "@mui/material";

function ModifierButton({ onClick }) {
  return (
    <Fab
      className="h-10 w-10 bg-primary-900 flex items-center justify-center relative"
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <PencilSquareIcon className="text-white h-6 w-6" />
      </div>
    </Fab>
  );
}
ModifierButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModifierButton;
