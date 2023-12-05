import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchAll } from "../../../services/api.services";
import IdeaDisplayer from "../../idea/IdeaDisplayer";

function Trends() {
  const { t } = useTranslation();
  const [trendIdeas, setTrendIdeas] = useState();

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
    <div className="w-full ">
      <h4 className="pl-5 text-black">{t("pages.home.dashboard.trends")}</h4>
      <div className="overflow-y-auto">
        {trendIdeas !== undefined ? (
          <IdeaDisplayer ideas={trendIdeas.slice(0, 2)} isMini />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Trends;
