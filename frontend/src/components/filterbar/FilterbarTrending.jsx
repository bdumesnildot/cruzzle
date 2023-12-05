import { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";

export default function FilterbarTrending({ isDisable }) {
  const { t } = useTranslation();
  const { trendingTag, setTrendingTag } = useContext(FilterContext);

  const handleChange = (event) => {
    setTrendingTag(event.target.value);
  };

  return (
    <FormControl disabled={isDisable} className="w-full">
      <Select
        id="filter-trending-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={trendingTag}
        onChange={handleChange}
        renderValue={(selected) => {
          const textDict = {
            recent: t("pages.ideas.ideaspage.filterbarTrending.recent"),
            view: t("pages.ideas.ideaspage.filterbarTrending.viewed"),
            comment: t("pages.ideas.ideaspage.filterbarTrending.commented"),
            like: t("pages.ideas.ideaspage.filterbarTrending.liked"),
          };
          return (
            <>
              <EyeIcon className="w-4 mr-2" />
              <span>{textDict[selected]}</span>
            </>
          );
        }}
      >
        <MenuItem value="recent">
          {t("pages.ideas.ideaspage.filterbarTrending.values.mostrecent")}
        </MenuItem>
        <MenuItem value="view">
          {t("pages.ideas.ideaspage.filterbarTrending.values.mostviewed")}
        </MenuItem>
        <MenuItem value="comment">
          {t("pages.ideas.ideaspage.filterbarTrending.values.mostcommented")}
        </MenuItem>
        <MenuItem value="like">
          {t("pages.ideas.ideaspage.filterbarTrending.values.mostliked")}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

FilterbarTrending.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
