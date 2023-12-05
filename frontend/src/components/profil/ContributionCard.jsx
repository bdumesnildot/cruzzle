import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Avatar, Chip, Divider, ListItemAvatar } from "@mui/material";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import logoMobile from "../../assets/logo/logoMobile.svg";
import { UserProfileContext } from "../../contexts/UserProfile";
import IdeaCard from "../idea/IdeaCard";
import { noPictureAvatar } from "../../utils/nopicture";

function ContributionCard({ ideas }) {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserProfileContext);
  const { avatar_url: avatarUrl, firstname, lastname } = user;

  const { created_at: createdAt } = ideas[0];

  let displayDate;

  if (dayjs(createdAt).isSame(dayjs().subtract(0, "day"), "day")) {
    displayDate = t("pages.users.profile.tabs.contributions.displayDate.today");
  } else if (dayjs(createdAt).isSame(dayjs().subtract(1, "day"), "day")) {
    displayDate = t(
      "pages.users.profile.tabs.contributions.displayDate.yesterday"
    );
  } else {
    displayDate = dayjs(createdAt)
      .locale(i18n.language)
      .format(t("pages.users.profile.dateFormats.shortVariant"));
  }
  return (
    <div className="my-4 w-full">
      <Divider>
        <Chip
          label={displayDate}
          className="bg-white border border-gray-400 border-solid font-bold text-md text-secondary-600 p-1"
        />
      </Divider>
      {ideas &&
        ideas.map((item, index) => {
          return (
            <div key={`${item.id}`} className="flex flex-col w-full mt-6 mb-8">
              <div className="w-full md:pl-6">
                <div className="flex flex-col w-full my-2">
                  <div className="flex align-items-center w-full">
                    <div className="flex flex-col">
                      <ListItemAvatar>
                        <Avatar
                          alt={t("alts.avatar")}
                          src={avatarUrl ?? noPictureAvatar}
                        />
                      </ListItemAvatar>
                      {ideas.length - 1 !== index && (
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          className="h-7 absolute left-9 top-14 z-10"
                        />
                      )}
                    </div>
                    <div className="flex items-center">
                      <p className="text-base text-secondary-600">
                        <b>
                          {firstname} {lastname}
                        </b>{" "}
                        {item.type === "created" && (
                          <Trans
                            i18nKey="pages.users.profile.tabs.contributions.created"
                            values={{ idea: item.title }}
                            components={{
                              b: <b />,
                            }}
                          />
                        )}
                        {item.type !== "created" && (
                          <Trans
                            i18nKey="pages.users.profile.tabs.contributions.added"
                            values={{ idea: item.title }}
                            components={{
                              b: <b />,
                            }}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-600 xl:pl-16 md:pl-14 pl-14 flex items-center mb-4">
                    <img
                      src={logoMobile}
                      alt={t("alts.logo")}
                      className="inline-block mr-1 w-5"
                    />{" "}
                    {dayjs(item.created_at)
                      .locale(i18n.language)
                      .format("HH:mm")}
                  </p>
                </div>
                <div className="w-full xl:pl-10 mb-4">
                  <IdeaCard isMini={false} idea={item} />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

ContributionCard.propTypes = {
  ideas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContributionCard;
