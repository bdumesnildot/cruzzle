import { useContext } from "react";

import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FunnelIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { FilterCommunityContext } from "../../contexts/FilterCommunityContext";
import FilterRoles from "./filters/FilterRoles";
import FilterLocations from "./filters/FilterLocations";
import FilterAgencies from "./filters/FilterAgencies";
import FilterPositions from "./filters/FilterPositions";
import HorizontalScroll from "../scroller/HorizontalScroll";

function FilterBarCommunity({
  roleFilter,
  positionFilter,
  locationFilter,
  agenciesFilter,
}) {
  const { t } = useTranslation();
  const { filterPanelOpen, setFilterPanelOpen } = useContext(
    FilterCommunityContext
  );

  return (
    <div className="w-full">
      <HorizontalScroll>
        <div className="w-fit flex flex-row-reverse lg:w-full items-center lg:flex-col overflow-y-auto">
          <div className="w-full flex justify-end">
            <div className="lg:px-6 mx-2 lg:mx-0 lg:w-min-[140px] 2xl:w-min-[180px]">
              <FilterRoles canDisable roleFilter={roleFilter} />
            </div>
          </div>
          <div className="w-full flex my-2 items-center">
            <Button
              variant="outlined"
              color="primary"
              className="h-10 font-normal text-base normal-case rounded-full mx-2 min-w-[160px]"
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            >
              <FunnelIcon className="w-4 mr-2" />
              {t("pages.users.community.button.morefilter")}
            </Button>
            <div className="w-full flex space-x-2 lg:grid lg:grid-cols-3">
              <div className="lg:px-6 mx-2">
                <FilterLocations canDisable locationFilter={locationFilter} />
              </div>
              <div className="lg:px-6 mx-2">
                <FilterAgencies canDisable agenciesFilter={agenciesFilter} />
              </div>
              <div className="lg:px-6 mx-2">
                <FilterPositions canDisable positionFilter={positionFilter} />
              </div>
            </div>
          </div>
        </div>
      </HorizontalScroll>
    </div>
  );
}

const roleFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
);

const positionFilterPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
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

FilterBarCommunity.propTypes = {
  roleFilter: roleFilterPropTypes.isRequired,
  positionFilter: positionFilterPropTypes.isRequired,
  locationFilter: locationFilterPropTypes.isRequired,
  agenciesFilter: locationFilterPropTypes.isRequired,
};

export default FilterBarCommunity;
