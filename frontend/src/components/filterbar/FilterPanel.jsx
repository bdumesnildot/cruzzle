import { useTranslation } from "react-i18next";
import { useContext } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { FormControlLabel, Checkbox, Button } from "@mui/material";
import FilterbarCategory from "./FilterbarCategory";
import FilterbarAutor from "./FilterbarAutor";
import FilterbarTrending from "./FilterbarTrending";
import FilterbarTextSearch from "./FilterbarTextSearch";
import { FilterContext } from "../../contexts/FilterContext";
import FilterbarDatePicker from "./FilterbarDatePicker";

function FilterPanel() {
  const { t, i18n } = useTranslation();
  const {
    setDateDelta,
    filterPanelIsOpen,
    setFilterPanelIsOpen,
    hasAttachment,
    setHasAttachment,
    hasNoComment,
    setHasNoComment,
    setPublicationDateStart,
    setPublicationDateEnd,
    setAutorSelectionTag,
    setSelectedCategories,
    setTrendingTag,
    setTitleContains,
  } = useContext(FilterContext);

  const handleClickReset = () => {
    setDateDelta(30);
    setPublicationDateStart(
      dayjs()
        .locale(i18n.language)
        .subtract(30, "day")
        .format(t("pages.ideas.ideaspage.dateFormats.long"))
    );
    setPublicationDateEnd(
      dayjs()
        .locale(i18n.language)
        .format(t("pages.ideas.ideaspage.dateFormats.long"))
    );
    setAutorSelectionTag("all");
    setSelectedCategories([]);
    setTrendingTag("recent");
    setTitleContains([]);
    setHasAttachment(false);
    setHasNoComment(false);
  };

  return (
    <div className="filter-panel h-screen w-screen md:w-80 fixed z-50 top-0 right-0 py-12 px-6 flex flex-col gap-2 md:gap-6 border-solid border-gray-300 border-t-[0px] border-b-[0px] border-r-[0px] border-l-[1px] bg-white">
      <h4>{t("pages.ideas.ideaspage.filterpannel.title")}</h4>
      <FilterbarCategory isDisable={!filterPanelIsOpen} />
      <FilterbarAutor isDisable={!filterPanelIsOpen} />
      <FilterbarTrending isDisable={!filterPanelIsOpen} />

      <div className="filter-panel-box ml-3">
        <FormControlLabel
          control={<Checkbox checked={hasAttachment} />}
          label={t("pages.ideas.ideaspage.filterpannel.attachments")}
          onChange={() => setHasAttachment(!hasAttachment)}
        />

        <FormControlLabel
          control={<Checkbox checked={hasNoComment} />}
          label={t("pages.ideas.ideaspage.filterpannel.notcommentedyet")}
          onChange={() => setHasNoComment(!hasNoComment)}
        />
      </div>

      <div className="filter-panel-text">
        <h5>
          {t("pages.ideas.ideaspage.filterpannel.fieldtext.textsearch.title")}:
        </h5>
        <FilterbarTextSearch />
      </div>

      <div className="filter-panel-date">
        <h5>
          {t("pages.ideas.ideaspage.filterpannel.fieldtext.datepicker.title")}:
        </h5>
        <FilterbarDatePicker />
      </div>

      <footer className="grow flex flex-col items-center justify-end">
        <Button
          variant="outlined"
          color="warning"
          className="w-40 h-8 rounded-full mb-4"
          onClick={handleClickReset}
        >
          {t("buttons.reset")}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="w-40 h-8 rounded-full"
          onClick={() => setFilterPanelIsOpen(!filterPanelIsOpen)}
        >
          {t("buttons.close")}
        </Button>
      </footer>
    </div>
  );
}

export default FilterPanel;
