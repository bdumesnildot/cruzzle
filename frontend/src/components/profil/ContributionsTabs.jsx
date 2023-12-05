import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { UserProfileContext } from "../../contexts/UserProfile";
import { apiGeContributionsByUserId } from "../../services/api.users";
import ContributionCard from "./ContributionCard";
import NoActivity from "../../assets/no_activities.svg";

export default function ContributionsTabs() {
  const { user } = useContext(UserProfileContext);
  const [userContributions, setUserContributions] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    apiGeContributionsByUserId(user.id)
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
        if (groupedArrays.length > 0) {
          groupedArrays.push(currentGroup);
          setUserContributions(groupedArrays);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full">
      {!isLoading &&
        userContributions.length > 0 &&
        userContributions.map((item) => (
          <ContributionCard ideas={item} key={item[0].created_at} />
        ))}
      {!isLoading && userContributions.length === 0 && (
        <div className="flex justify-center w-48">
          <img
            src={NoActivity}
            alt={t("alts.noActivities")}
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </div>
  );
}
