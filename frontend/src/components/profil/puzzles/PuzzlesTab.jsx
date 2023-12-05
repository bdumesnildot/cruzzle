import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserProfileContext } from "../../../contexts/UserProfile";
import { getUserPuzzlePercentageAchievementObject } from "../../../utils/gamification";
import Puzzle from "./Puzzle";
import treasureImg from "../../../assets/puzzle_treasure.svg";
import collectionImg from "../../../assets/puzzle_collection.svg";
import geoImg from "../../../assets/images/login.svg";

export default function PuzzlesTab() {
  const { t } = useTranslation();
  const { user } = useContext(UserProfileContext);
  const userPuzzles = getUserPuzzlePercentageAchievementObject(user);

  return (
    <div className="w-full flex gap-16">
      <div className="puzzles-container grow">
        <h3 className="text-xl mb-2">
          {t("pages.users.profile.tabs.puzzles.puzzlesLikes.title")}
          <span className="text-sm ml-2">
            {t("pages.users.profile.tabs.puzzles.puzzlesLikes.description")}
          </span>
        </h3>
        {userPuzzles.likesPuzzlePercentageAchievement !== undefined && (
          <Puzzle
            imageSrc="https://picsum.photos/700/500"
            progress={userPuzzles.likesPuzzlePercentageAchievement}
            revealOrder={[
              14, 18, 10, 5, 7, 20, 19, 1, 12, 3, 17, 11, 4, 15, 13, 6, 8, 16,
              2, 9,
            ]}
          />
        )}

        <h3 className="text-xl mb-1">
          {t("pages.users.profile.tabs.puzzles.puzzlesComments.title")}

          <span className="text-sm ml-2">
            {t("pages.users.profile.tabs.puzzles.puzzlesComments.description")}
          </span>
        </h3>
        {userPuzzles.commentsPuzzlePercentageAchievement !== undefined && (
          <Puzzle
            imageSrc="https://picsum.photos/601/400"
            progress={userPuzzles.commentsPuzzlePercentageAchievement}
            revealOrder={[
              17, 19, 8, 12, 5, 13, 15, 9, 4, 7, 11, 2, 3, 20, 14, 18, 10, 1,
              16, 6,
            ]}
          />
        )}
        <h3 className="text-xl mb-1">
          {t("pages.users.profile.tabs.puzzles.puzzlesIdeas.title")}

          <span className="text-sm ml-2">
            {t("pages.users.profile.tabs.puzzles.puzzlesIdeas.description")}
          </span>
        </h3>
        {userPuzzles.ideasPuzzlePercentageAchievement !== undefined && (
          <Puzzle
            imageSrc="https://picsum.photos/602/400"
            progress={userPuzzles.ideasPuzzlePercentageAchievement}
            revealOrder={[
              9, 10, 12, 8, 15, 19, 16, 2, 11, 17, 14, 1, 7, 6, 3, 20, 18, 13,
              4, 5,
            ]}
          />
        )}

        <h3 className="text-xl mb-1">
          {t("pages.users.profile.tabs.puzzles.puzzlesFavorites.title")}

          <span className="text-sm ml-2">
            {t("pages.users.profile.tabs.puzzles.puzzlesFavorites.description")}
          </span>
        </h3>
        {userPuzzles.favoritsPuzzlePercentageAchievement !== undefined && (
          <Puzzle
            imageSrc="https://picsum.photos/599/400"
            progress={userPuzzles.favoritsPuzzlePercentageAchievement}
            revealOrder={[
              11, 4, 14, 6, 5, 20, 2, 8, 15, 9, 7, 13, 3, 1, 12, 18, 19, 10, 16,
              17,
            ]}
          />
        )}

        <h3 className="text-xl mb-1">
          {t("pages.users.profile.tabs.puzzles.puzzlesTeams.title")}

          <span className="text-sm ml-2">
            {t("pages.users.profile.tabs.puzzles.puzzlesTeams.description")}
          </span>
        </h3>
        {userPuzzles.teamsPuzzlePercentageAchievement !== undefined && (
          <Puzzle
            imageSrc="https://picsum.photos/600/359"
            progress={userPuzzles.teamsPuzzlePercentageAchievement}
            revealOrder={[
              3, 14, 9, 17, 2, 8, 10, 11, 7, 16, 5, 6, 15, 4, 1, 20, 13, 12, 19,
              18,
            ]}
          />
        )}
      </div>

      <div className="image-container w-2/5 hidden lg:flex flex-col justify-around items-center">
        <img
          className="w-4/5"
          src={treasureImg}
          alt={t("pages.users.profile.tabs.puzzles.puzzlesImages.treasure")}
        />
        <img
          className="w-4/5"
          src={collectionImg}
          alt={t("pages.users.profile.tabs.puzzles.puzzlesImages.collection")}
        />
        <img
          className="w-4/5"
          src={geoImg}
          alt={t("pages.users.profile.tabs.puzzles.puzzlesImages.treasure")}
        />
      </div>
    </div>
  );
}
