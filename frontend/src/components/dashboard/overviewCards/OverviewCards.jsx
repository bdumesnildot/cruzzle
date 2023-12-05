import { useState, useEffect, useContext } from "react";
import {
  LightBulbIcon,
  PencilIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import puzzleIcon from "../../../assets/PuzzleIcon.svg";
import { apiIdeas } from "../../../services/api.ideas";
import { UserContext } from "../../../contexts/UserContext";
import Card from "./IndividualOverviewCard";
import { getUserPuzzlePercentageAchievementObject } from "../../../utils/gamification";

function OverviewCards() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const [myIdeas, setMyIdeas] = useState(0);
  const [participation, setParticipation] = useState(0);
  const [ideasCreatedToday, setIdeasCreatedToday] = useState(0);
  const [finishedPuzzles, setFinishedPuzzles] = useState(0);

  useEffect(() => {
    const updateMyIdeasAndParticipations = () => {
      const {
        _count: { idea: newIdea, comment_like: newParticipation },
      } = user;
      setParticipation(newParticipation);
      setMyIdeas(newIdea);
    };
    if (user) {
      updateMyIdeasAndParticipations();
    }
  }, [user]);

  useEffect(() => {
    const fetchIdeasCreatedToday = async () => {
      try {
        const response = await apiIdeas(`${user.id}/count`);
        setIdeasCreatedToday(response.count);
      } catch (error) {
        setIdeasCreatedToday("N/A");
        console.error("Error fetching ideas created today:", error);
      }
    };
    if (user) {
      fetchIdeasCreatedToday();
    }
  }, [user]);

  useEffect(() => {
    const updateFinishedPuzzles = async () => {
      try {
        const puzzlesPercentageAchievement =
          getUserPuzzlePercentageAchievementObject(user);
        const puzzleTot = Object.values(puzzlesPercentageAchievement).reduce(
          (acc, percent) => {
            return acc + (percent === 100 ? 1 : 0);
          },
          0
        );
        setFinishedPuzzles(puzzleTot);
      } catch (error) {
        setFinishedPuzzles("N/A");
        console.error("Error updating finished puzzles:", error);
      }
    };
    if (user) {
      updateFinishedPuzzles();
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full pb-4">
      <h4 className="text-black mb-4">{t("pages.home.dashboard.overview")}</h4>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 w-full">
        <Card
          isIcon
          icon={LightBulbIcon}
          rotate={45}
          cardTitle={t("pages.home.overview.yourideas")}
          state={myIdeas}
        />
        <Card
          isIcon
          icon={PencilIcon}
          rotate={0}
          cardTitle={t("pages.home.overview.todayideas")}
          state={ideasCreatedToday}
        />
        <Card
          isIcon
          icon={SquaresPlusIcon}
          rotate={0}
          cardTitle={t("pages.home.overview.participations")}
          state={participation}
        />
        <Card
          isIcon={false}
          icon={puzzleIcon}
          rotate={0}
          cardTitle={t("pages.home.overview.puzzles")}
          state={finishedPuzzles}
        />
      </div>
    </div>
  );
}

export default OverviewCards;
