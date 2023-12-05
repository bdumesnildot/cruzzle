import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import FilterBarCommunity from "../../components/community/FilterBarCommunity";
import FilterCommunityProvider from "../../contexts/FilterCommunityContext";
import FilterPanelCommunity from "../../components/community/FilterPanelCommunity";
import CardsDisplayerCommunity from "../../components/community/CardsDisplayerCommunity";
import apiRoles from "../../services/api.roles";
import apiPositions from "../../services/api.positions";
import apiAgencies from "../../services/api.agencies";
import { MenuContext } from "../../contexts/MenuContext";
import { sm } from "../../utils/mediaQueries";

function Community() {
  const { t } = useTranslation();
  const [roleFilter, setRoleFilter] = useState([]);
  const [positionFilter, setPositionFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [agenciesFilter, setAgenciesFilter] = useState([]);
  const { activeMenu } = useContext(MenuContext);
  const smallQuery = useMediaQuery(sm.query);

  const positionsFetch = async () => {
    try {
      const data = await apiPositions();
      if (data) {
        setPositionFilter(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rolesFetch = async () => {
    try {
      const data = await apiRoles();
      if (data) {
        setRoleFilter(
          data.map((role) => ({
            name: role.name,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const agenciesFetch = async () => {
    try {
      const data = await apiAgencies();
      if (data) {
        setAgenciesFilter(data.sort((a, b) => a.name.localeCompare(b.name)));
        const uniqueCountries = data
          .sort((a, b) => a.country.localeCompare(b.country))
          .reduce((unique, item) => {
            if (!unique.find((agency) => agency.country === item.country)) {
              unique.push(item);
            }
            return unique;
          }, []);
        setLocationFilter(uniqueCountries);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    rolesFetch();
    positionsFetch();
    agenciesFetch();
  }, []);

  return (
    <div className="w-full flex flex-col" aria-label="page">
      <FilterCommunityProvider>
        <div
          aria-label="header filter"
          className={`w-full sticky top-[66px] z-50 sm:top-[62px] bg-white ${
            activeMenu && !smallQuery ? "hidden" : ""
          }`}
        >
          <header className="w-full px-6">
            <h2>{t("pages.users.community.title")}</h2>
            <FilterBarCommunity
              roleFilter={roleFilter}
              positionFilter={positionFilter}
              locationFilter={locationFilter}
              agenciesFilter={agenciesFilter}
            />
          </header>
        </div>
        <CardsDisplayerCommunity />
        <FilterPanelCommunity
          roleFilter={roleFilter}
          positionFilter={positionFilter}
          locationFilter={locationFilter}
          agenciesFilter={agenciesFilter}
        />
      </FilterCommunityProvider>
    </div>
  );
}
export default Community;
