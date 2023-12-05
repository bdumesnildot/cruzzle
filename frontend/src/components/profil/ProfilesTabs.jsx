/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { LightBulbIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import TabPanel from "../tabs/TabPanel";
import AllyProps from "../tabs/AllyProps";
import PuzzleIcon from "../../assets/PuzzleIcon.svg";
import "dayjs/locale/fr";
import { UserProfileContext } from "../../contexts/UserProfile";
import PuzzlesTab from "./puzzles/PuzzlesTab";
import { getUserPuzzlePercentageAchievementObject } from "../../utils/gamification";
import ActivityTab from "./ActivityTab";
import ContributionsTabs from "./ContributionsTabs";

export default function ProfilesTabs() {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserProfileContext);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    mail,
    birthdate,
    phone,
    joined_at: joinedAt,
    biography,
    agency: { name: agencyName },
    position: { name: positionName },
    _count: { idea, comment },
  } = user;
  const [puzzleFinished, setPuzzleFinished] = useState(0);

  useEffect(() => {
    const puzzlesPercentageAchievement =
      getUserPuzzlePercentageAchievementObject(user);
    const puzzleTot = Object.values(puzzlesPercentageAchievement).reduce(
      (acc, percent) => {
        return acc + (percent === 100 ? 1 : 0);
      },
      0
    );
    setPuzzleFinished(puzzleTot);
  }, []);

  const userinfos = [
    {
      title: t("pages.users.profile.tabs.general.title"),
      content: positionName,
    },
    {
      title: t("pages.users.profile.tabs.general.agency"),
      content: agencyName,
    },
    {
      title: t("pages.users.profile.tabs.general.mail"),
      content: mail,
    },
    user.share_birthdate && user.birthdate
      ? {
          title: t("pages.users.profile.tabs.general.birthday"),
          content: dayjs(birthdate)
            .locale(i18n.language)
            .format(t("pages.users.profile.dateFormats.short")),
        }
      : null,
    user.share_phone && user.phone
      ? {
          title: t("pages.users.profile.tabs.general.phone"),
          content: phone,
        }
      : null,
    {
      title: t("pages.users.profile.tabs.general.joinedCompagny"),
      content: dayjs(joinedAt)
        .locale(i18n.language)
        .format(t("pages.users.profile.dateFormats.short")),
    },
  ];

  return (
    <div className="my-8" aria-label="Context">
      <Box className="my-4">
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className="w-full sticky z-[600] top-[66px] sm:top-[62px] bg-white"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="auto"
            variant="scrollable"
          >
            <Tab
              label={t("pages.users.profile.tabs.title.general")}
              {...AllyProps(0)}
            />
            <Tab
              label={t("pages.users.profile.tabs.title.activity")}
              {...AllyProps(1)}
            />
            <Tab
              label={t("pages.users.profile.tabs.title.contributions")}
              {...AllyProps(2)}
            />
            <Tab
              label={t("pages.users.profile.tabs.title.puzzles")}
              {...AllyProps(3)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className="w-full">
          <div className="flex flex-col md:flex-row gap-5 relative">
            <div className="w-4/5 md:w-2/3">
              <h3 className="text-black">
                {t("pages.users.profile.tabs.general.aboutme")}
              </h3>
              <p className="text-base mb-5  text-secondary-600">
                {biography || t("pages.users.profile.tabs.general.biography")}
              </p>
              <h3 className="text-black mb-5">
                {t("pages.users.profile.tabs.general.overview")}
              </h3>
              <div className="flex flex-col lg:flex-row gap-7">
                <div className="h-30 w-60 shadow-md rounded-2xl flex flex-col relative">
                  <img
                    className="h-10 w-10 absolute top-[-18px] left-[-18px]"
                    alt={t("alts.puzzleIcon")}
                    src={PuzzleIcon}
                  />
                  <h3 className="text-black ml-5 mt-2">
                    {t("pages.users.profile.tabs.general.puzzles")}
                  </h3>
                  <h2 className="text-black text-5xl ml-5 mb-5">
                    {puzzleFinished}
                  </h2>
                </div>
                <div className="h-30 w-60 shadow-md rounded-2xl flex flex-col relative">
                  <LightBulbIcon className="h-10 w-10 absolute top-[-18px] left-[-18px] text-primary-900 fill-current transform rotate-45" />
                  <h3 className="text-black ml-5 mt-2">
                    {t("pages.users.profile.tabs.general.ideas")}
                  </h3>
                  <h2 className="text-black text-5xl ml-5 mb-5">{idea}</h2>
                </div>
                <div className="h-30 w-60 shadow-md rounded-2xl flex flex-col relative">
                  <SquaresPlusIcon className="h-10 w-10 absolute top-[-18px] left-[-18px] text-primary-900 fill-current" />
                  <h3 className="text-black ml-5 mt-2">
                    {t("pages.users.profile.tabs.general.participations")}
                  </h3>
                  <h2 className="text-black text-5xl ml-5 mb-5">{comment}</h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col relative">
              {userinfos
                .filter((item) => item !== null)
                .map((item) => (
                  <div key={item.title} className="flex flex-col">
                    <h4 className="text-black text-base">{item.title}</h4>
                    <p className="text-base text-secondary-600">
                      {item.content}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className="w-full">
          <ActivityTab />
        </TabPanel>
        <TabPanel value={value} index={2} className="w-full">
          <ContributionsTabs />
        </TabPanel>
        <TabPanel value={value} index={3} className="w-full">
          <PuzzlesTab />
        </TabPanel>
      </Box>
    </div>
  );
}
