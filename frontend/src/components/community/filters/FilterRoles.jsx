import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Select, FormControl, MenuItem } from "@mui/material";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../../contexts/FilterCommunityContext";

function FilterRoles({ canDisable = false, roleFilter }) {
  const { t } = useTranslation();
  const { filterPanelOpen, roleValue, setRoleValue } = useContext(
    FilterCommunityContext
  );

  const formattedString = (item) => {
    return item
      .split(/(?=[A-Z])/)
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  return (
    <FormControl
      disabled={canDisable ? filterPanelOpen : canDisable}
      className=""
    >
      <Select
        id="filter-autor-select"
        className="h-10 w-full rounded-full "
        color="primary"
        value={roleValue}
        onChange={(e) => {
          const { value } = e.target;
          setRoleValue(value);
        }}
        MenuProps={{
          classes: {
            paper: "max-h-80",
          },
        }}
        renderValue={(value) => {
          const textDict = {
            all: t("pages.users.community.filterRole.all"),
            ...(roleFilter &&
              roleFilter.reduce((dict, item) => {
                const updatedDict = { ...dict };
                updatedDict[item.name] = formattedString(item.name);
                return updatedDict;
              }, {})),
          };
          return (
            <>
              <Square3Stack3DIcon className="w-4 mr-2" />
              <span>{textDict[value]}</span>
            </>
          );
        }}
      >
        <MenuItem value="all">
          {t("pages.users.community.filterRole.all")}
        </MenuItem>
        {roleFilter &&
          roleFilter.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name
                .split(/(?=[A-Z])/)
                .map((word) => {
                  return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  );
                })
                .join(" ")}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

const roleFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
);

FilterRoles.propTypes = {
  canDisable: PropTypes.bool,
  roleFilter: roleFilterPropTypes.isRequired,
};

FilterRoles.defaultProps = {
  canDisable: false,
};

export default FilterRoles;
