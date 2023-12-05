import PropTypes from "prop-types";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

function ProgressChip({ className, isArchived, isDeleted }) {
  const { t } = useTranslation();
  let color;
  let label;
  switch (true) {
    case isDeleted !== null:
      color = "#d32f2f";
      label = t("components.customChip.deleted");
      break;
    case isArchived !== null:
      color = "#AAAAAA";
      label = t("components.customChip.archived");
      break;
    default:
      color = "#AFE2B1";
      label = t("components.customChip.inprogress");
      break;
  }

  return (
    <Chip
      sx={{ backgroundColor: color }}
      className={className}
      size="medium"
      label={label}
    />
  );
}

ProgressChip.propTypes = {
  isArchived: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  isDeleted: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  className: PropTypes.string,
};

ProgressChip.defaultProps = {
  isArchived: null,
  isDeleted: null,
  className: "",
};

export default ProgressChip;
