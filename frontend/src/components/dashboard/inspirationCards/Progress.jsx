import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import HalfCircleProgress from "./HalfCircleProgress";
import { getUserLevelObject } from "../../../utils/gamification";
import { UserContext } from "../../../contexts/UserContext";
import { apiGetTotalLikesReceivedByUserId } from "../../../services/api.ideaLikes";
import { apiGetTotalCommentsReceivedByUserId } from "../../../services/api.comments";

function Progress() {
  const { t } = useTranslation();
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const { user, userGamification, setUserGamification } =
    useContext(UserContext);
  const { id } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalLikesResponse = await apiGetTotalLikesReceivedByUserId(id);
        setTotalLikes(totalLikesResponse.data);

        const totalCommentsResponse = await apiGetTotalCommentsReceivedByUserId(
          id
        );
        setTotalComments(totalCommentsResponse.data);
      } catch (error) {
        console.error(
          "An error occurred while fetching total likes or comments data:",
          error
        );
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserGamification(getUserLevelObject(user));
    }
  }, [user]);

  return (
    <div
      id="progress-bar"
      className="w-full flex flex-col items-center h-full justify-around"
    >
      <div
        className="flex flex-col relative items-center h-24 w-full"
        aria-label="score"
      >
        <HalfCircleProgress userGamification={userGamification} />
        <div className="flex flex-col items-center absolute bottom-0">
          <span className="text-3xl">
            {userGamification.currentLevelMinMaxScore.max -
              userGamification.currentScore}
          </span>
          <span className=" text-secondary-600">
            {t("pages.home.inspirationCards.pointsNextLevel")}
          </span>
        </div>
      </div>

      <div id="likes-and-comments-received" className="w-full flex flex-col">
        <div className="flex flex-col justify-center items-center relative my-2">
          <div className="w-full relative flex justify-center items-center my-1">
            <HandThumbUpIcon className="h-12 text-primary-50 opacity-10 absolute mx-auto" />
            <span className="text-2xl">{totalLikes}</span>
          </div>
          <span className="pl-3 text-secondary-600 mt-2">
            {t("pages.home.inspirationCards.likesReceived")}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center relative my-1">
          <div className="w-full relative flex justify-center items-center">
            <ChatBubbleBottomCenterTextIcon className="h-12 text-primary-50 opacity-10 absolute mx-auto" />
            <span className="text-2xl">{totalComments}</span>
          </div>
          <span className="pl-3 text-secondary-600 mt-2">
            {t("pages.home.inspirationCards.commentsReceived")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Progress;
