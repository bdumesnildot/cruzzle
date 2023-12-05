import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

function Dropzone({ onDragActive, handleDropFiles, isClick = true, children }) {
  const { getRootProps, isDragActive } = useDropzone({
    onDrop: handleDropFiles,
    noClick: isClick,
  });

  useEffect(() => {
    onDragActive(isDragActive);
  }, [isDragActive, onDragActive]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...getRootProps()}>{children}</div>;
}

Dropzone.propTypes = {
  onDragActive: PropTypes.func.isRequired,
  handleDropFiles: PropTypes.func.isRequired,
  isClick: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Dropzone.defaultProps = {
  isClick: true,
};

export default Dropzone;
