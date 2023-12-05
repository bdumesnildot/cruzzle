import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";

export const FilterContext = createContext({});

function FilterProvider({ children }) {
  const [filterPanelIsOpen, setFilterPanelIsOpen] = useState(false);
  const [dateDelta, setDateDelta] = useState(30);
  const [publicationDateStart, setPublicationDateStart] = useState(
    dayjs().locale("fr").subtract(30, "day").format("YYYY-MM-DD HH:mm:ss")
  );
  const [publicationDateEnd, setPublicationDateEnd] = useState(
    dayjs().locale("fr").format("YYYY-MM-DD HH:mm:ss")
  );
  const [autorSelectionTag, setAutorSelectionTag] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [trendingTag, setTrendingTag] = useState("recent");
  const [titleContains, setTitleContains] = useState(null);
  const [hasAttachment, setHasAttachment] = useState(false);
  const [hasNoComment, setHasNoComment] = useState(false);
  const [ideasFiltered, setIdeasFiltered] = useState([]);

  const contextValue = useMemo(() => {
    return {
      filterPanelIsOpen,
      setFilterPanelIsOpen,
      dateDelta,
      setDateDelta,
      publicationDateStart,
      setPublicationDateStart,
      publicationDateEnd,
      setPublicationDateEnd,
      autorSelectionTag,
      setAutorSelectionTag,
      selectedCategories,
      setSelectedCategories,
      trendingTag,
      setTrendingTag,
      titleContains,
      setTitleContains,
      hasAttachment,
      setHasAttachment,
      hasNoComment,
      setHasNoComment,
      ideasFiltered,
      setIdeasFiltered,
    };
  }, [
    filterPanelIsOpen,
    setFilterPanelIsOpen,
    dateDelta,
    setDateDelta,
    publicationDateStart,
    setPublicationDateStart,
    publicationDateEnd,
    setPublicationDateEnd,
    autorSelectionTag,
    setAutorSelectionTag,
    selectedCategories,
    setSelectedCategories,
    trendingTag,
    setTrendingTag,
    titleContains,
    setTitleContains,
    hasAttachment,
    setHasAttachment,
    hasNoComment,
    setHasNoComment,
    ideasFiltered,
    setIdeasFiltered,
  ]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
