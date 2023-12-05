/* eslint-disable no-param-reassign */
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import FilterbarFavorites from "../../components/Favorites/filters/FilterbarFavorites";
import { UserContext } from "../../contexts/UserContext";
import { FilterFavoritesContext } from "../../contexts/FilterFavoritesContext";
import { fetchByQuery, fetchAll } from "../../services/api.services";
import { sm } from "../../utils/mediaQueries";
import { MenuContext } from "../../contexts/MenuContext";
import empty from "../../assets/emptyFavorites.svg";

function Favorits() {
  const { t } = useTranslation();
  const [trendIdeas, setTrendIdeas] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { activeMenu } = useContext(MenuContext);
  const smallQuery = useMediaQuery(sm.query);
  const { user } = useContext(UserContext);
  const {
    id: userId,
    agency: { id: userAgencyId },
  } = user;

  const {
    update,
    setUpdate,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
    favoritesFiltered,
    setFavoritesFiltered,
  } = useContext(FilterFavoritesContext);

  useEffect(() => {
    const reqItems = {
      userId,
      userAgencyId,
      publicationDateStart,
      publicationDateEnd,
      autorSelectionTag,
      selectedCategories,
      trendingTag,
      titleContains,
      hasAttachment,
      hasNoComment,
    };
    setIsloading(true);

    fetchByQuery("/api/favorits/filter", reqItems)
      .then((data) => {
        const favoritArray = [];
        data.map((item) => favoritArray.push(item.idea));

        setFavoritesFiltered(favoritArray);
        setIsloading(false);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [
    update,
    userId,
    userAgencyId,
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  ]);

  const getTrendsCategories = () => {
    const categoriesInFavorites = favoritesFiltered.flatMap((favorite) =>
      favorite.idea_category.map((item) => item.category.id)
    );

    const idCount = categoriesInFavorites.reduce((count, catId) => {
      count[catId] = (count[catId] || 0) + 1;
      return count;
    }, {});

    const sortedIds = Object.keys(idCount).sort(
      (a, b) => idCount[b] - idCount[a]
    );

    return sortedIds.slice(0, 3);
  };

  useEffect(() => {
    if (favoritesFiltered.length > 0) {
      const fetchData = async () => {
        try {
          const data = getTrendsCategories();
          const cardArr = await Promise.all(
            data.map((id) => fetchAll(`/api/ideas/trends/${id}`))
          );

          const uniqueIdeas = [
            ...new Map(cardArr.map((idea) => [idea.id, idea])).values(),
          ];
          setTrendIdeas(uniqueIdeas);
        } catch (error) {
          console.error("error from api.services.fetcherByQuery", error);
        }
      };
      fetchData();
    } else {
      fetchAll("/api/ideas/trends")
        .then((data) => {
          setTrendIdeas(data);
        })
        .catch((error) =>
          console.error("error from api.services.fetcherByQuery", error)
        );
    }
  }, [favoritesFiltered]);

  return (
    <div
      className={`${
        favoritesFiltered.length > 0 ? "h-min" : "h-full"
      } ideas-page w-full flex flex-col`}
    >
      <header
        className={`w-full px-6 sticky top-[66px] z-50 xl:w-8/12 sm:top-[62px] bg-white ${
          activeMenu && !smallQuery ? "hidden" : ""
        }`}
      >
        <h2>{t("pages.ideas.favorites.title")}</h2>
        <FilterbarFavorites />
      </header>
      <div className="ideas-header flex grow flex-row">
        <main className="ideas-main h-full grow w-full xl:w-8/12">
          {favoritesFiltered.length > 0 ? (
            <IdeaDisplayer
              setUpdate={setUpdate}
              ideas={favoritesFiltered}
              isMini={false}
            />
          ) : (
            !isLoading && (
              <div className="flex flex-col h-full justify-center items-center gap-4">
                <img
                  src={empty}
                  alt={t("alts.noFavoritesImg")}
                  className="w-full px-8 sm:w-1/2"
                />
                <h3>{t("pages.ideas.favorites.empty")}</h3>
              </div>
            )
          )}
        </main>
        <aside className="w-4/12 hidden pl-4 pr-4 xl:inline xl:sticky xl:top-[62px] xl:right-0 xl:h-min">
          <h3>{t("pages.ideas.favorites.trends")}</h3>
          {trendIdeas ? <IdeaDisplayer ideas={trendIdeas} /> : ""}
        </aside>
      </div>
    </div>
  );
}
export default Favorits;
