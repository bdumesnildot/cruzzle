import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

import IdeaDisplayer from "../../components/idea/IdeaDisplayer";
import IdeasProvider from "../../contexts/IdeasContext";
import Filterbar from "../../components/filterbar/Filterbar";
import { UserContext } from "../../contexts/UserContext";
import { FilterContext } from "../../contexts/FilterContext";
import { fetchByQuery, fetchAll } from "../../services/api.services";
import { MenuContext } from "../../contexts/MenuContext";
import { sm } from "../../utils/mediaQueries";

function Ideas() {
  const { t } = useTranslation();
  const [filteredIdeas, setFilteredIdeas] = useState();
  const [trendIdeas, setTrendIdeas] = useState();
  const { user } = useContext(UserContext);
  const { activeMenu } = useContext(MenuContext);
  const smallQuery = useMediaQuery(sm.query);
  const {
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories,
    trendingTag,
    titleContains,
    hasAttachment,
    hasNoComment,
  } = useContext(FilterContext);

  const {
    id: userId,
    agency: { id: userAgencyId },
  } = user;

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
    fetchByQuery("/api/ideas/filter", reqItems)
      .then((data) => {
        setFilteredIdeas(data);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [
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

  useEffect(() => {
    fetchAll("/api/ideas/trends")
      .then((data) => {
        setTrendIdeas(data);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, []);

  return (
    <IdeasProvider>
      <div className="ideas-page w-full h-min flex flex-col">
        <header
          className={`w-full px-6 sticky top-[66px] z-50 xl:w-8/12 sm:top-[62px] bg-white ${
            activeMenu && !smallQuery ? "hidden" : ""
          }`}
        >
          <h2>{t("pages.ideas.ideaspage.title")}</h2>
          <Filterbar />
        </header>
        <div className="ideas-header flex flex-row">
          <main className="ideas-main w-full xl:w-8/12">
            {filteredIdeas && (
              <IdeaDisplayer ideas={filteredIdeas} isMini={false} />
            )}
          </main>
          <aside className="w-4/12 hidden pl-4 pr-4 xl:inline sticky top-[62px] right-0 h-min">
            <h3>{t("pages.ideas.ideaspage.tendences")}</h3>
            {trendIdeas && <IdeaDisplayer ideas={trendIdeas} />}
          </aside>
        </div>
      </div>
    </IdeasProvider>
  );
}
export default Ideas;
