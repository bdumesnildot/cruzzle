import { Button } from "@mui/material";
import PropTypes from "prop-types";

function UploadButton({ children, accept, multiple = false, onChange, id }) {
  const reset = (e) => {
    e.target.value = "";
  };
  return (
    <div>
      <label htmlFor={id}>
        <input
          accept={accept}
          className="hidden"
          id={id}
          type="file"
          multiple={multiple}
          onChange={onChange}
          onClick={reset}
        />
        <Button
          component="span"
          variant="contained"
          color="primary"
          className="w-[130px] rounded-full mx-2 my-2 sm:w-[174px]"
          sx={{
            boxShadow: 1,
            "&:hover": { boxShadow: 2 },
            "&:active, &.Mui-focusVisible": { boxShadow: 4 },
          }}
        >
          {children}
        </Button>
      </label>
    </div>
  );
}

export default UploadButton;

UploadButton.propTypes = {
  children: PropTypes.node.isRequired,
  accept: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

UploadButton.defaultProps = {
  multiple: false,
};
