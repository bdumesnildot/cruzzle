import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const FilterCommunityContext = createContext({});

function FilterCommunityProvider({ children }) {
  const [isDisable, setIsDisable] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const [agenciesValue, setAgenciesValue] = useState(0);
  const [locationValue, setLocationValue] = useState("all");
  const [roleValue, setRoleValue] = useState("all");
  const [positionValue, setPositionValue] = useState(0);

  const [lastnameContains, setLastnameContains] = useState("");
  const [firstnameContains, setFirstnameContains] = useState("");
  const [lastnameContainsValue, setLastnameContainsValue] = useState("");
  const [firstnameeContainsValue, setFirstnameContainsValue] = useState("");

  const [publicationDateStart, setPublicationDateStart] = useState(
    dayjs().locale("fr").subtract(7, "years").format("YYYY-MM-DD HH:mm:ss")
  );
  const [publicationDateEnd, setPublicationDateEnd] = useState(
    dayjs().locale("fr").format("YYYY-MM-DD HH:mm:ss")
  );

  const contextValue = useMemo(() => {
    return {
      isDisable,
      setIsDisable,
      lastnameContains,
      setLastnameContains,
      firstnameContains,
      setFirstnameContains,
      firstnameeContainsValue,
      setFirstnameContainsValue,
      lastnameContainsValue,
      setLastnameContainsValue,
      filterPanelOpen,
      setFilterPanelOpen,
      agenciesValue,
      setAgenciesValue,
      locationValue,
      setLocationValue,
      roleValue,
      setRoleValue,

      positionValue,
      setPositionValue,

      publicationDateStart,
      setPublicationDateStart,
      publicationDateEnd,
      setPublicationDateEnd,
    };
  }, [
    isDisable,
    setIsDisable,
    lastnameContains,
    setLastnameContains,
    lastnameContainsValue,
    setLastnameContainsValue,
    firstnameContains,
    setFirstnameContains,
    firstnameeContainsValue,
    setFirstnameContainsValue,
    filterPanelOpen,
    setFilterPanelOpen,

    agenciesValue,
    setAgenciesValue,
    locationValue,
    setLocationValue,
    roleValue,
    setRoleValue,
    positionValue,
    setPositionValue,

    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
  ]);

  return (
    <FilterCommunityContext.Provider value={contextValue}>
      {children}
    </FilterCommunityContext.Provider>
  );
}

FilterCommunityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterCommunityProvider;
