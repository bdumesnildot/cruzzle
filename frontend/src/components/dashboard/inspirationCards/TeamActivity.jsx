import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiTotalIdeasCount } from "../../../services/api.ideas";
import CountAnimation from "../../animations/CounterAnimation";
import puzzlePieces from "../../../assets/dashboard/PuzzlePieces.svg";

function TeamActivity() {
  const { t } = useTranslation();
  const [totalIdeas, setTotalIdeas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalIdeasResponse = await apiTotalIdeasCount();
        setTotalIdeas(totalIdeasResponse.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching total ideas data:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col justify-around h-full">
      <h3 className="text-black text-lg w-full text-center">
        {t("pages.home.inspirationCards.teamActivity")}
      </h3>
      <div
        id="score"
        className="w-full flex flex-col items-center justify-center text-center h-full relative"
      >
        <img
          src={puzzlePieces}
          alt="puzzle pieces"
          className="w-fit absolute opacity-30"
        />
        <CountAnimation targetCount={totalIdeas} />
        <span className="pt-4 text-secondary-600">
          {t("pages.home.inspirationCards.createdIdea")}
        </span>
      </div>
    </div>
  );
}

export default TeamActivity;
