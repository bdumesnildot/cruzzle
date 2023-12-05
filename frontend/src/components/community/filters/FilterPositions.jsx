import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Select, FormControl, MenuItem } from "@mui/material";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../../contexts/FilterCommunityContext";

function FilterPositions({ canDisable = false, positionFilter }) {
  const { t } = useTranslation();
  const { filterPanelOpen, positionValue, setPositionValue } = useContext(
    FilterCommunityContext
  );

  return (
    <FormControl
      disabled={canDisable ? filterPanelOpen : canDisable}
      className="w-full"
    >
      <Select
        id="filter-autor-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={positionValue}
        onChange={(e) => setPositionValue(e.target.value)}
        MenuProps={{
          classes: {
            paper: "max-h-80",
          },
        }}
        renderValue={(value) => {
          const selectedMenuItem = positionFilter.find(
            (item) => item.id === value
          );
          let displayValue = "";
          if (value === 0) {
            displayValue = t("pages.users.community.filterPosition.all");
          } else if (selectedMenuItem) {
            displayValue = selectedMenuItem.name;
          }
          return (
            <>
              <BriefcaseIcon className="w-4 mr-2" />
              <span>{displayValue}</span>
            </>
          );
        }}
      >
        <MenuItem value={0}>
          {t("pages.users.community.filterPosition.all")}
        </MenuItem>
        {positionFilter &&
          positionFilter.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

const positionFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })
);

FilterPositions.propTypes = {
  canDisable: PropTypes.bool,
  positionFilter: positionFilterPropTypes.isRequired,
};

FilterPositions.defaultProps = {
  canDisable: false,
};

export default FilterPositions;
