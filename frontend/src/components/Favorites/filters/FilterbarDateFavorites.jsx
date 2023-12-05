import { useEffect, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";

export default function FilterbarDateFavorites({ isDisable }) {
  const { t, i18n } = useTranslation();
  const {
    dateDelta,
    setDateDelta,
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  } = useContext(FilterFavoritesContext);
  const [isDisableByCustomDate, setisDisableByCustomDate] = useState(false);

  const today = dayjs().locale(i18n.language);
  const publicationDateEndIsToday =
    dayjs(publicationDateEnd).diff(today, "day") === 0;
  const deltaList = [30, 7, 0];

  const handleChange = (event) => {
    const { value } = event.target;
    setDateDelta(value);
    setPublicationDateEnd(
      dayjs()
        .locale(i18n.language)
        .format(t("pages.ideas.ideaspage.dateFormats.long"))
    );
    setPublicationDateStart(
      dayjs()
        .locale(i18n.language)
        .subtract(value, "day")
        .format(t("pages.ideas.ideaspage.dateFormats.long"))
    );
  };

  useEffect(() => {
    if (deltaList.includes(dateDelta) && publicationDateEndIsToday) {
      setisDisableByCustomDate(false);
    } else {
      setisDisableByCustomDate(true);
    }
  }, [dateDelta]);

  useEffect(() => {
    const daysDiff = dayjs(publicationDateEnd).diff(
      dayjs(publicationDateStart),
      "day"
    );
    setDateDelta(daysDiff);
  }, [publicationDateStart, publicationDateEnd]);

  return (
    <FormControl disabled={isDisable} className="w-40">
      <Select
        id="filter-date-select"
        className="h-10 w-full rounded-full"
        color="primary"
        value={deltaList.includes(dateDelta) ? dateDelta : ""}
        displayEmpty
        onChange={handleChange}
        renderValue={(value) => {
          const textDict = {
            30: t("pages.ideas.ideaspage.filterdate.pastmonth"),
            7: t("pages.ideas.ideaspage.filterdate.pastweek"),
            0: t("pages.ideas.ideaspage.filterdate.today"),
          };
          return (
            <>
              <CalendarDaysIcon className="w-4 mr-2" />
              {isDisableByCustomDate ? (
                <span>{t("pages.ideas.ideaspage.filterdate.custom")}</span>
              ) : (
                <span>{textDict[value]}</span>
              )}
            </>
          );
        }}
      >
        <MenuItem value={30}>
          {t("pages.ideas.ideaspage.filterdate.pastmonth")}
        </MenuItem>
        <MenuItem value={7}>
          {t("pages.ideas.ideaspage.filterdate.pastweek")}
        </MenuItem>
        <MenuItem value={0}>
          {t("pages.ideas.ideaspage.filterdate.today")}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

FilterbarDateFavorites.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
