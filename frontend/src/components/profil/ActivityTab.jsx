import { useContext, useEffect, useState } from "react";
import "dayjs/locale/fr";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { UserProfileContext } from "../../contexts/UserProfile";
import { apiGeActivitiesByUserId } from "../../services/api.users";
import ActivityCard from "./ActivityCard";
import NoActivity from "../../assets/no_activities.svg";

export default function ActivityTab() {
  const { user } = useContext(UserProfileContext);
  const [userActivities, setUserActivities] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    apiGeActivitiesByUserId(user.id)
      .then((res) => {
        const groupedArrays = [];
        let currentGroup = [];
        setIsLoading(false);
        res.forEach((obj, index) => {
          const createdAt = dayjs(obj.created_at).startOf("day");
          if (
            index > 0 &&
            !createdAt.isSame(dayjs(res[index - 1].created_at).startOf("day"))
          ) {
            groupedArrays.push(currentGroup);
            currentGroup = [];
          }
          currentGroup.push(obj);
        });
        if (groupedArrays.length >= 0) {
          groupedArrays.push(currentGroup);
          setUserActivities(groupedArrays);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full">
      {isLoading && <div />}
      {!isLoading && userActivities[0].length > 0 && (
        <>
          {userActivities.map((item) => (
            <ActivityCard activities={item} key={item[0].created_at} />
          ))}
        </>
      )}
      {!isLoading && userActivities[0].length === 0 && (
        <div className="flex justify-center w-48">
          <img
            src={NoActivity}
            alt={t("alts.noActivityImg")}
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
}
