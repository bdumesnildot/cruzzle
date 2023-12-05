import { useContext } from "react";
import HorizontalScroll from "../../scroller/HorizontalScroll";
import FilterBtnAdvanceSearchFavorites from "./FilterBtnAdvanceSearchFavorites";
import FilterbarDateFavorites from "./FilterbarDateFavorites";
import FilterbarAutorFavorites from "./FilterbarAutorFavorites";
import FilterbarCategoryFavorites from "./FilterbarCategoryFavorites";
import FilterbarTrendingFavorites from "./FilterbarTrendingFavorites";
import FilterPanelFavorites from "./FilterPanelFavorites";
import { FilterFavoritesContext } from "../../../contexts/FilterFavoritesContext";

function FilterbarFavorites() {
  const { filterPanelIsOpen } = useContext(FilterFavoritesContext);

  return (
    <div className="filterbar w-full">
      <HorizontalScroll>
        <div className="w-fit min-w-full flex flex-row-reverse items-center lg:block">
          <div className="w-fit my-2 flex justify-end lg:w-full ml-2 lg:ml-0">
            <FilterbarDateFavorites isDisable={filterPanelIsOpen} />
          </div>
          <div className="w-full my-2 flex justify-start gap-2 lg:w-full lg:justify-between">
            <FilterBtnAdvanceSearchFavorites isDisable={filterPanelIsOpen} />
            <span className="w-36">
              <FilterbarAutorFavorites isDisable={filterPanelIsOpen} />
            </span>
            <span className="min-w-40 w-40 md:flex-grow">
              <FilterbarCategoryFavorites isDisable={filterPanelIsOpen} />
            </span>
            <span className="w-40">
              <FilterbarTrendingFavorites isDisable={filterPanelIsOpen} />
            </span>
          </div>
        </div>
      </HorizontalScroll>
      {filterPanelIsOpen && <FilterPanelFavorites />}
    </div>
  );
}

export default FilterbarFavorites;
