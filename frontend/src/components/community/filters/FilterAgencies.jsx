import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Select, FormControl, MenuItem } from "@mui/material";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../../contexts/FilterCommunityContext";

function FilterAgencies({ canDisable = false, agenciesFilter }) {
  const { t } = useTranslation();
  const { filterPanelOpen, agenciesValue, setAgenciesValue } = useContext(
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
        value={agenciesValue}
        onChange={(e) => setAgenciesValue(e.target.value)}
        MenuProps={{
          classes: {
            paper: "max-h-80",
          },
        }}
        renderValue={(value) => {
          const selectedMenuItem = agenciesFilter.find(
            (item) => item.id === value
          );
          let displayValue = "";
          if (value === 0) {
            displayValue = t("pages.users.community.filterAgencies.all");
          } else if (selectedMenuItem) {
            displayValue = selectedMenuItem.name;
          }
          return (
            <>
              <BuildingOffice2Icon className="w-4 mr-2" />
              <span>{displayValue}</span>
            </>
          );
        }}
      >
        <MenuItem value={0}>
          {t("pages.users.community.filterAgencies.all")}
        </MenuItem>
        {agenciesFilter &&
          agenciesFilter.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
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

FilterAgencies.propTypes = {
  canDisable: PropTypes.bool,
  agenciesFilter: locationFilterPropTypes.isRequired,
};

FilterAgencies.defaultProps = {
  canDisable: false,
};

export default FilterAgencies;
