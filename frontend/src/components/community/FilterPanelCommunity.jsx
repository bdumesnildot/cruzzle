import { useContext } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../contexts/FilterCommunityContext";
import FilterLocations from "./filters/FilterLocations";
import FilterRoles from "./filters/FilterRoles";
import FilterAgencies from "./filters/FilterAgencies";
import FilterPositions from "./filters/FilterPositions";
import FieldSearchLastname from "./filters/FieldSearchLastname";
import FieldSearchFirstname from "./filters/FieldSearchFirstname";
import localeText from "../../locales/datapicker";

function FilterPanelCommunity({
  roleFilter,
  positionFilter,
  locationFilter,
  agenciesFilter,
}) {
  const { t, i18n } = useTranslation();
  const {
    filterPanelOpen,
    setFilterPanelOpen,
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
    setRoleValue,
    setPositionValue,
    setLocationValue,
    setAgenciesValue,
    setLastnameContains,
    setFirstnameContains,
    setLastnameContainsValue,
    setFirstnameContainsValue,
  } = useContext(FilterCommunityContext);

  const handleClickReset = () => {
    setPublicationDateStart(
      dayjs()
        .locale(i18n.language)
        .subtract(7, "years")
        .format(t("pages.users.community.dateFormats.long"))
    );
    setPublicationDateEnd(
      dayjs()
        .locale(i18n.language)
        .format(t("pages.users.community.dateFormats.long"))
    );
    setLastnameContains("");
    setLastnameContainsValue("");
    setFirstnameContains("");
    setFirstnameContainsValue("");
    setAgenciesValue(0);
    setLocationValue(t("pages.users.community.filterLocation.all"));
    setPositionValue(0);
    setRoleValue(t("pages.users.community.filterRole.all"));
  };

  const handleChangeStart = (event) => {
    const inputDate = event.$d;
    setPublicationDateStart(
      dayjs(inputDate).format(t("pages.users.community.dateFormats.long"))
    );
  };

  const handleChangeEnd = (event) => {
    const inputDate = event.$d;
    setPublicationDateEnd(
      dayjs(inputDate).format(t("pages.users.community.dateFormats.long"))
    );
  };

  return (
    filterPanelOpen && (
      <div
        className="h-screen w-screen md:w-80 fixed z-50 top-0 right-0 py-2 sm:py-12 px-6 flex flex-col gap-2 md:gap-6 border-solid border-gray-300 border-t-[0px] border-b-[0px] border-r-[0px] border-l-[1px] bg-white drop-shadow-xl"
        aria-label="filter-panel"
      >
        <h4>{t("pages.users.community.pannel.title")}</h4>
        <FilterRoles roleFilter={roleFilter} />
        <FilterLocations locationFilter={locationFilter} />
        <FilterAgencies agenciesFilter={agenciesFilter} />
        <FilterPositions positionFilter={positionFilter} />

        <div className="flex flex-col" aria-label="filter-panel-text">
          <h5>{t("pages.users.community.pannel.fieldsearch.title")} :</h5>
          <FieldSearchLastname />
          <FieldSearchFirstname />
        </div>

        <div className="filter-panel-date">
          <h5>{t("pages.users.community.pannel.datepicker.title")} :</h5>
          <DatePicker
            className="filter-date-start min-w-[270px] mb-4"
            slotProps={{ textField: { size: "small" } }}
            format={t("pages.users.community.dateFormats.shortVariant")}
            formatDensity="spacious"
            value={dayjs(publicationDateStart)}
            maxDate={dayjs(publicationDateEnd)}
            onChange={handleChangeStart}
            localeText={localeText}
          />
          <DatePicker
            className="filter-date-end min-w-[270px] bg-white"
            slotProps={{ textField: { size: "small" } }}
            format={t("pages.users.community.dateFormats.shortVariant")}
            formatDensity="spacious"
            value={dayjs(publicationDateEnd)}
            minDate={dayjs(publicationDateStart)}
            disableFuture
            onChange={handleChangeEnd}
            localeText={localeText}
          />
        </div>

        <footer className="grow flex flex-col items-center justify-center sm:justify-end">
          <Button
            variant="outlined"
            color="warning"
            className="w-40 h-10 rounded-full mb-4"
            onClick={handleClickReset}
          >
            {t("buttons.reset")}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className="w-40 h-10 rounded-full"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            {t("buttons.close")}
          </Button>
        </footer>
      </div>
    )
  );
}

const positionFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })
);

const roleFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
);

const locationFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  })
);

FilterPanelCommunity.propTypes = {
  roleFilter: roleFilterPropTypes.isRequired,
  positionFilter: positionFilterPropTypes.isRequired,
  locationFilter: locationFilterPropTypes.isRequired,
  agenciesFilter: locationFilterPropTypes.isRequired,
};

export default FilterPanelCommunity;
