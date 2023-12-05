import { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { MenuItem, FormControl, Select } from "@mui/material";
import { PencilIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterAutor({ isDisable }) {
  const { t } = useTranslation();
  const { autorSelectionTag, setAutorSelectionTag } = useContext(FilterContext);

  const handleChange = (event) => {
    setAutorSelectionTag(event.target.value);
  };

  return (
    <FormControl disabled={isDisable} className="w-full">
      <Select
        id="filter-autor-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={autorSelectionTag}
        onChange={handleChange}
        renderValue={(value) => {
          const textDict = {
            all: t("pages.ideas.ideaspage.filterauthor.allauthors"),
            currentUserAgency: t("pages.ideas.ideaspage.filterauthor.myagency"),
            currentUser: t("pages.ideas.ideaspage.filterauthor.me"),
          };
          return (
            <>
              <PencilIcon className="w-4 mr-2" />
              <span>{textDict[value]}</span>
            </>
          );
        }}
      >
        <MenuItem value="all">
          {t("pages.ideas.ideaspage.filterauthor.allauthors")}
        </MenuItem>
        <MenuItem value="currentUserAgency">
          {t("pages.ideas.ideaspage.filterauthor.myagency")}
        </MenuItem>
        <MenuItem value="currentUser">
          {t("pages.ideas.ideaspage.filterauthor.me")}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

FilterAutor.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
