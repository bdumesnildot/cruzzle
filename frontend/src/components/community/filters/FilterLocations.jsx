import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Select, FormControl, MenuItem } from "@mui/material";
import { MapPinIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../../contexts/FilterCommunityContext";

function FilterLocations({ canDisable = false, locationFilter }) {
  const { t } = useTranslation();
  const { filterPanelOpen, setLocationValue, locationValue } = useContext(
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
        value={locationValue}
        onChange={(e) => setLocationValue(e.target.value)}
        MenuProps={{
          classes: {
            paper: "max-h-80",
          },
        }}
        renderValue={(value) => {
          const selectedMenuItem = locationFilter.find(
            (item) => item.country === value
          );
          let displayValue = "";
          if (value === "all") {
            displayValue = t("pages.users.community.filterLocation.all");
          } else if (selectedMenuItem) {
            displayValue = selectedMenuItem.country;
          }
          return (
            <>
              <MapPinIcon className="w-4 mr-2" />
              <span>{displayValue}</span>
            </>
          );
        }}
      >
        <MenuItem value="all">
          {t("pages.users.community.filterLocation.all")}
        </MenuItem>
        {locationFilter &&
          locationFilter.map((item) => (
            <MenuItem key={item.id} value={item.country}>
              {item.country}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

const locationFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  })
);

FilterLocations.propTypes = {
  canDisable: PropTypes.bool,
  locationFilter: locationFilterPropTypes.isRequired,
};

FilterLocations.defaultProps = {
  canDisable: false,
};

export default FilterLocations;
