import { useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";
import localeText from "../../../locales/datapicker";

function FilterbarDatePickerFavorites() {
  const { t, i18n } = useTranslation();
  const {
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  } = useContext(FilterFavoritesContext);

  const handleChangeStart = (event) => {
    const inputDate = event.$d;
    setPublicationDateStart(
      dayjs(inputDate)
        .locale(i18n.language)
        .format(t("pages.ideas.ideaspage.dateFormats.long"))
    );
  };

  const handleChangeEnd = (event) => {
    const inputDate = event.$d;
    setPublicationDateEnd(
      dayjs(inputDate)
        .locale(i18n.language)
        .format(t("pages.ideas.ideaspage.dateFormats.long"))
    );
  };

  return (
    <>
      <DatePicker
        className="filter-date-start min-w-[270px] mb-4"
        slotProps={{ textField: { size: "small" } }}
        format={t("pages.ideas.ideaspage.dateFormats.short")}
        formatDensity="spacious"
        value={dayjs(publicationDateStart)}
        maxDate={dayjs(publicationDateEnd)}
        onChange={handleChangeStart}
        localeText={localeText}
      />
      <DatePicker
        className="filter-date-end min-w-[270px] bg-white"
        slotProps={{ textField: { size: "small" } }}
        format={t("pages.ideas.ideaspage.dateFormats.short")}
        formatDensity="spacious"
        value={dayjs(publicationDateEnd)}
        minDate={dayjs(publicationDateStart)}
        disableFuture
        onChange={handleChangeEnd}
        localeText={localeText}
      />
    </>
  );
}

export default FilterbarDatePickerFavorites;
